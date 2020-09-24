using System.Threading.Tasks;

namespace TechRSSReaderML.ConsoleApp.Services
{
    interface IModelTrainingService
    {
        public Task<string> CreateStarRatingTsvAsync();

        public Task UpdateFeedItemPredictions();

    }
}
