using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TechRSSReader.Domain.Entities;

namespace TechRSSReader.Infrastructure.Persistence.Configurations
{
    public class WeeklyBlogSummaryConfiguration : IEntityTypeConfiguration<WeeklyBlogSummary>
    {
        public void Configure(EntityTypeBuilder<WeeklyBlogSummary> builder)
        {
            builder.Ignore(s => s.NewNotExcluded);
        }
    }
}
