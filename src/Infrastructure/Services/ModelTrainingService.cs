using MediatR;
using Microsoft.Extensions.Logging;
using Microsoft.ML;
using Microsoft.ML.Data;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using TechRSSReader.Application.Common.Interfaces;
using TechRSSReader.Application.RssFeedItems.Commands.UpdateRatingPredictions;
using TechRSSReader.Application.RssFeedItems.Queries;
using TechRSSReader.Domain.Entities;
using TechRSSReaderML.Model;

namespace TechRSSReader.Infrastructure.Services
{
    public class ModelTrainingService: IModelTrainingService
    {
        private readonly ILogger<ModelTrainingService> _logger;
        IMediator Mediator { get; }
        ICsvFileBuilder CsvFileBuilder { get; }
        private static MLContext mlContext = new MLContext(seed: 1);

        public ModelTrainingService(IMediator mediator, ICsvFileBuilder csvFileBuilder, ILogger<ModelTrainingService> logger)
        {
            Mediator = mediator;
            CsvFileBuilder = csvFileBuilder;
            _logger = logger; 
        }

        /// <summary>
        /// Creates a Model Data File and returns the full path of the created file.
        /// </summary>
        /// <returns></returns>
        public async Task<string> CreateModelDataFileAsync()
        {

            _logger.LogInformation($"=============== Loading the Data ===============");

            List<RssFeedItem> feedItems = await Mediator.Send(new GetRatedFeedItemsQuery()) as List<RssFeedItem>;
            string dataFileName = Path.GetTempPath() + Guid.NewGuid().ToString() + ".tsv";
            CsvFileBuilder.CreateModelDataFile(feedItems, dataFileName);
            return dataFileName;
        }

        public async Task UpdateFeedItemPredictions()
        {
            _ = await Mediator.Send(new UpdateRatingPredictionsCommand());
        }

        /// <summary>
        /// Creates a Model and returns the full path of the ZIP file created.
        /// </summary>
        /// <param name="filePath"></param>
        /// <returns></returns>
        public  async Task<string> CreateModel(string filePath)
        {
            try
            {
                
                // Load Data
                IDataView trainingDataView = mlContext.Data.LoadFromTextFile<StarRatingInput>(
                                                path: filePath,
                                                hasHeader: true,
                                                separatorChar: '\t',
                                                allowQuoting: true,
                                                allowSparse: false);

                // Build training pipeline
                IEstimator<ITransformer> trainingPipeline = BuildTrainingPipeline(mlContext);

                // Train the Model
                ITransformer mlModel = TrainModel(trainingDataView, trainingPipeline);

                // Evaluate quality of Model
                Evaluate(mlContext, trainingDataView, trainingPipeline);

                // Save model
                string modelFileName = "MLModel.zip";
                //Include this as the easiest way of making the method async. 
                // Hopefully in the future the Microsoft.ML library includes more async methods, 
                // so that this will not be necessary.
                await Task.Delay(1);
                return SaveModel(mlContext, mlModel, modelFileName, trainingDataView.Schema);

            }
            catch (Exception exception)
            {
                _logger.LogError($"Exception in UserInterestModelBuilder: {exception.Message}, Stack Trace:{exception.StackTrace}");
                return string.Empty;
            }
        }

        private IEstimator<ITransformer> BuildTrainingPipeline(MLContext mlContext)
        {
            // Data process configuration with pipeline data transformations 
            var dataProcessPipeline = mlContext.Transforms.Conversion.ConvertType(new[] { new InputOutputColumnPair("ReadAlready", "ReadAlready") })
                                      .Append(mlContext.Transforms.Categorical.OneHotEncoding(new[] { new InputOutputColumnPair("CreatedBy", "CreatedBy"), new InputOutputColumnPair("Created", "Created"), new InputOutputColumnPair("LastModifiedBy", "LastModifiedBy"), new InputOutputColumnPair("Author", "Author"), new InputOutputColumnPair("RetrievedDateTime", "RetrievedDateTime"), new InputOutputColumnPair("UserInterested", "UserInterested") }))
                                      .Append(mlContext.Transforms.Categorical.OneHotHashEncoding(new[] { new InputOutputColumnPair("Categories", "Categories") }))
                                      .Append(mlContext.Transforms.Text.FeaturizeText("LastModified_tf", "LastModified"))
                                      .Append(mlContext.Transforms.Text.FeaturizeText("Content_tf", "Content"))
                                      .Append(mlContext.Transforms.Text.FeaturizeText("Description_tf", "Description"))
                                      .Append(mlContext.Transforms.Text.FeaturizeText("Link_tf", "Link"))
                                      .Append(mlContext.Transforms.Text.FeaturizeText("PublishingDate_tf", "PublishingDate"))
                                      .Append(mlContext.Transforms.Text.FeaturizeText("PublishingDateString_tf", "PublishingDateString"))
                                      .Append(mlContext.Transforms.Text.FeaturizeText("RssId_tf", "RssId"))
                                      .Append(mlContext.Transforms.Text.FeaturizeText("Title_tf", "Title"))
                                      .Append(mlContext.Transforms.Concatenate("Features", new[] { "ReadAlready", "CreatedBy", "Created", "LastModifiedBy", "Author", "RetrievedDateTime", "UserInterested", "Categories", "LastModified_tf", "Content_tf", "Description_tf", "Link_tf", "PublishingDate_tf", "PublishingDateString_tf", "RssId_tf", "Title_tf", "Id", "BlogId", "UserInterestPrediction", "UserRatingPrediction" }));
            // Set the training algorithm 
            var trainer = mlContext.Regression.Trainers.LightGbm(labelColumnName: "UserRating", featureColumnName: "Features");

            var trainingPipeline = dataProcessPipeline.Append(trainer);

            return trainingPipeline;
        }

        private void Evaluate(MLContext mlContext, IDataView trainingDataView, IEstimator<ITransformer> trainingPipeline)
        {
            // Cross-Validate with single dataset (since we don't have two datasets, one for training and for evaluate)
            // in order to evaluate and get the model's accuracy metrics
            _logger.LogInformation("=============== Cross-validating to get model's accuracy metrics ===============");
            var crossValidationResults = mlContext.Regression.CrossValidate(trainingDataView, trainingPipeline, numberOfFolds: 5, labelColumnName: "UserRating");
            PrintRegressionFoldsAverageMetrics(crossValidationResults);
        }

        private string GetAbsolutePath(string relativePath)
        {
            FileInfo _dataRoot = new FileInfo(typeof(ModelTrainingService).Assembly.Location);
            string assemblyFolderPath = _dataRoot.Directory.FullName;

            string fullPath = Path.Combine(assemblyFolderPath, relativePath);

            return fullPath;
        }

        private void PrintRegressionFoldsAverageMetrics(IEnumerable<TrainCatalogBase.CrossValidationResult<RegressionMetrics>> crossValidationResults)
        {
            var L1 = crossValidationResults.Select(r => r.Metrics.MeanAbsoluteError);
            var L2 = crossValidationResults.Select(r => r.Metrics.MeanSquaredError);
            var RMS = crossValidationResults.Select(r => r.Metrics.RootMeanSquaredError);
            var lossFunction = crossValidationResults.Select(r => r.Metrics.LossFunction);
            var R2 = crossValidationResults.Select(r => r.Metrics.RSquared);

            _logger.LogInformation($"*************************************************************************************************************");
            _logger.LogInformation($"*       Metrics for Regression model      ");
            _logger.LogInformation($"*------------------------------------------------------------------------------------------------------------");
            _logger.LogInformation($"*       Average L1 Loss:       {L1.Average():0.###} ");
            _logger.LogInformation($"*       Average L2 Loss:       {L2.Average():0.###}  ");
            _logger.LogInformation($"*       Average RMS:           {RMS.Average():0.###}  ");
            _logger.LogInformation($"*       Average Loss Function: {lossFunction.Average():0.###}  ");
            _logger.LogInformation($"*       Average R-squared:     {R2.Average():0.###}  ");
            _logger.LogInformation($"*************************************************************************************************************");

        }

        private string SaveModel(MLContext mlContext, ITransformer mlModel, string modelRelativePath, DataViewSchema modelInputSchema)
        {
            // Save/persist the trained model to a .ZIP file
            string modelFileName = GetAbsolutePath(modelRelativePath);
            _logger.LogInformation($"=============== Saving the model  ===============");
            mlContext.Model.Save(mlModel, modelInputSchema, modelFileName);
            _logger.LogInformation("The model is saved to {0}", modelFileName);
            return modelFileName;
        }

        private ITransformer TrainModel(IDataView trainingDataView, IEstimator<ITransformer> trainingPipeline)
        {
            _logger.LogInformation("=============== Training  model ===============");

            ITransformer model = trainingPipeline.Fit(trainingDataView);
            
            _logger.LogInformation("=============== End of training process ===============");

            return model;
        }
    }
}
