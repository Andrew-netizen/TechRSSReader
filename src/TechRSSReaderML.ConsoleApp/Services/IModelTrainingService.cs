using System.Threading.Tasks;

namespace TechRSSReaderML.ConsoleApp.Services
{
    interface IModelTrainingService
    {
        public Task<string> CreateModelDataFileAsync();

        public Task UpdateFeedItemPredictions();

    }
}
