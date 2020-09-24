using MediatR;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using TechRSSReader.Application.Common.Interfaces;
using TechRSSReader.Application.RssFeedItems.Commands.UpdateRatingPredictions;
using TechRSSReader.Application.RssFeedItems.Queries;
using TechRSSReader.Domain.Entities;

namespace TechRSSReaderML.ConsoleApp.Services
{
    class ModelTrainingService : IModelTrainingService
    {
        IMediator Mediator { get; }
        ICsvFileBuilder CsvFileBuilder { get; }

        public ModelTrainingService(IMediator mediator, ICsvFileBuilder csvFileBuilder)
        {
            Mediator = mediator;
            CsvFileBuilder = csvFileBuilder; 
        }
        public async Task<string> CreateStarRatingTsvAsync()
        {
            List<RssFeedItem> feedItems = await Mediator.Send(new GetRatedFeedItemsQuery()) as List<RssFeedItem>;
            string dataFileName = Path.GetTempPath() + Guid.NewGuid().ToString() + ".tsv";
            CsvFileBuilder.CreateModelDataFile(feedItems, dataFileName);
            return dataFileName;
        }

        public async Task UpdateFeedItemPredictions()
        {
            _ = await Mediator.Send(new UpdateRatingPredictionsCommand());
        }
    }
}
