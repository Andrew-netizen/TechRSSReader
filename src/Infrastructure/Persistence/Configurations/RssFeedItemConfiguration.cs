using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TechRSSReader.Domain.Entities;

namespace TechRSSReader.Infrastructure.Persistence.Configurations
{
    public class RssFeedItemConfiguration : IEntityTypeConfiguration<RssFeedItem>
    {
        public void Configure(EntityTypeBuilder<RssFeedItem> builder)
        {
            builder.Property(item => item.Author)
                .HasMaxLength(200);

            builder.Property(item => item.Categories)
                .HasMaxLength(500);

            // Nothing to add here now; this field is too long.
            builder.Property(item => item.Content);

            builder.Property(item => item.CreatedBy)
                .HasMaxLength(450)
                .IsRequired();

            // Nothing to add here now; this field is too long
            // builder.Property(item => item.Description);

            builder.Property(item => item.LastModifiedBy)
                .HasMaxLength(450);

            builder.Property(item => item.Link)
                .HasMaxLength(1000)
                .IsRequired();

            builder.Property(item => item.PublishingDateString)
                .HasMaxLength(100);

            builder.Property(item => item.RetrievedDateTime)
                .IsRequired();

            builder.Property(item => item.RssId)
                .HasMaxLength(500);

            builder.Property(item => item.Title)
                .HasMaxLength(500)
                .IsRequired();
                
        }
    }
}
