using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;
using TechRSSReader.Domain.Entities;
using TechRSSReader.Domain.ValueObjects;

namespace TechRSSReader.Infrastructure.Persistence.Configurations
{
    public class BlogConfiguration : IEntityTypeConfiguration<Blog>
    {
        public void Configure(EntityTypeBuilder<Blog> builder)
        {
            builder.Property(b => b.Title)
               .HasMaxLength(200)
               .IsRequired();

            builder.Property(b => b.XmlAddress)
                .HasMaxLength(500)
                .IsRequired();

            builder.Property(t => t.CreatedBy)
            .HasMaxLength(450)
            .IsRequired();

            builder.Property(t => t.LastModifiedBy)
                .HasMaxLength(450);

            builder.OwnsMany<KeywordToExclude>("KeywordsToExclude", k =>
            {
                k.WithOwner().HasForeignKey("BlogId");
                k.HasKey(new string[] { "BlogId", "Keyword" });
                k.Property<string>("Keyword").HasMaxLength(50).IsRequired();
            });

            builder.OwnsMany<KeywordToInclude>("KeywordsToInclude", k =>
            {
                k.WithOwner().HasForeignKey("BlogId");
                k.HasKey(new string[] { "BlogId", "Keyword" });
                k.Property<string>("Keyword").HasMaxLength(50).IsRequired();
            });

        }
    }
}
