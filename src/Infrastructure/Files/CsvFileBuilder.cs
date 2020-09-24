using TechRSSReader.Application.Common.Interfaces;
using TechRSSReader.Application.TodoLists.Queries.ExportTodos;
using TechRSSReader.Infrastructure.Files.Maps;
using CsvHelper;
using System.Collections.Generic;
using System.IO;
using TechRSSReader.Domain.Entities;
using TechRSSReaderML.Model;
using AutoMapper;
using System;

namespace TechRSSReader.Infrastructure.Files
{
    public class CsvFileBuilder : ICsvFileBuilder
    {
        private readonly IMapper _mapper;

        public CsvFileBuilder(IMapper mapper)
        {
            _mapper = mapper; 
        }

        public byte[] BuildTodoItemsFile(IEnumerable<TodoItemRecord> records)
        {
            using var memoryStream = new MemoryStream();
            using (var streamWriter = new StreamWriter(memoryStream))
            {
                using var csvWriter = new CsvWriter(streamWriter);

                csvWriter.Configuration.RegisterClassMap<TodoItemRecordMap>();
                csvWriter.WriteRecords(records);
            }

            return memoryStream.ToArray();
        }

        public void CreateModelDataFile(IEnumerable<RssFeedItem> records, string fileName)
        {
            List<StarRatingInput> csvInput = new List<StarRatingInput>();
            foreach (RssFeedItem item in records)
            {
                StarRatingInput starRating = _mapper.Map<StarRatingInput>(item);
                starRating = Sanitize(starRating);
                csvInput.Add(starRating);
            }
            using StreamWriter fileWriter = File.CreateText(fileName);

            CsvHelper.Configuration.Configuration configuration = new CsvHelper.Configuration.Configuration();
            configuration.Delimiter = "\t";

            using var csvWriter = new CsvWriter(fileWriter, configuration);

            csvWriter.Configuration.RegisterClassMap<StarRatingInputClassMap>();
            csvWriter.WriteRecords(csvInput);
        }

        private StarRatingInput Sanitize(StarRatingInput input)
        {
            StarRatingInput result = input;
            result.Author = SanitizeField(input.Author);
            result.Categories = SanitizeField(input.Categories);
            result.Content = SanitizeField(input.Content);
            result.Description = SanitizeField(input.Description);
            result.Link = SanitizeField(input.Link);
            result.Title = SanitizeField(input.Title);
            return result;

        }

        private string SanitizeField(string input)
        {
            string result = input;
            if (input == null)
                return result;

            result = input.Replace("\t", string.Empty).Replace("\r", string.Empty).Replace("\n", string.Empty);
            return result; 
        }
    }
}
