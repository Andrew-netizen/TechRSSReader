using System.Threading.Tasks;

namespace TechRSSReader.Application.Common.Interfaces
{
    public interface IModelTrainingService
    {
        public Task<string> CreateModelDataFileAsync();

        public Task UpdateFeedItemPredictions();

        public Task<string> CreateModel(string fileName);
    }
}
