using Coravel.Invocable;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Threading;
using System.Threading.Tasks;
using MediatR;
using TechRSSReader.Application.Common.Interfaces;
using System.IO;

namespace TechRSSReader.WebUI.Services
{
    public class UpdateUserInterestModelService : IInvocable, ICancellableInvocable
    {
        private readonly ILogger<UpdateUserInterestModelService> _logger;
        private readonly IServiceProvider _serviceProvider;
        private readonly IWebHostEnvironment _webHostEnvironment;

        public UpdateUserInterestModelService(IServiceProvider serviceProvider, IWebHostEnvironment webHostEnvironment)
        {
            _logger = serviceProvider.GetService<ILogger<UpdateUserInterestModelService>>();
            _serviceProvider = serviceProvider;
            _webHostEnvironment = webHostEnvironment;

        }

        public CancellationToken CancellationToken { get; set; }

        public async Task Invoke()
        {
            try
            {
                using (var scope = _serviceProvider.CreateScope())
                {
                    var services = scope.ServiceProvider;
                    var mediator = services.GetService<IMediator>();
                    _logger.LogInformation("Started UpdateUserInterestModelService at" + DateTime.Now);
                    string modelDataFileName = string.Empty;
                    string temporaryModelFile = string.Empty; 
                    try
                    {
                        IModelTrainingService modelTrainingService = services.GetService<IModelTrainingService>();
                        modelDataFileName = await modelTrainingService.CreateModelDataFileAsync();

                        _logger.LogInformation($"Model Data File Name is:{modelDataFileName}");

                        temporaryModelFile = await modelTrainingService.CreateModel(modelDataFileName);

                        _logger.LogInformation($"Temporary Model File is:{modelDataFileName}");
                        if (!string.IsNullOrWhiteSpace(temporaryModelFile))
                        {
                            string contentRootPath = _webHostEnvironment.ContentRootPath; 
                            string modelDirectory = Path.Combine(contentRootPath, "MLModels");
                            if (!Directory.Exists(modelDirectory))
                                Directory.CreateDirectory(modelDirectory);
                            string modelFile = Path.Combine(modelDirectory, "MLModel.zip");
                            if (File.Exists(modelFile))
                                File.Delete(modelFile);
                            File.Copy(temporaryModelFile, modelFile);
                            _logger.LogInformation($"Copied {temporaryModelFile} to {modelFile}");
                        }
                        
                        await modelTrainingService.UpdateFeedItemPredictions();

                    }
                    catch (Exception exception)
                    {
                        _logger.LogError($"Exception in UpdateUserInterestModelService: {exception.Message}, Stack Trace: {exception.StackTrace}");
                    }
                    finally
                    {
                        if (File.Exists(modelDataFileName))
                            File.Delete(modelDataFileName);
                        if (File.Exists(temporaryModelFile))
                            File.Delete(temporaryModelFile);
                    }

                    _logger.LogInformation("Finished UpdateUserInterestModelService at" + DateTime.Now);
                }
            }
            catch (Exception exception)
            {
                _logger.LogInformation($"Exception in UpdateUserInterestModelService:{exception.Message}, Stack Trace:{exception.StackTrace}");
            }
        }
    }
}
