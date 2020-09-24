using TechRSSReader.Application.TodoLists.Queries.ExportTodos;
using System.Collections.Generic;
using TechRSSReader.Domain.Entities;

namespace TechRSSReader.Application.Common.Interfaces
{
    public interface ICsvFileBuilder
    {
        byte[] BuildTodoItemsFile(IEnumerable<TodoItemRecord> records);

        void CreateModelDataFile(IEnumerable<RssFeedItem> records, string fileName);

    }
}
