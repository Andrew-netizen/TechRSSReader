using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using TechRSSReader.Domain.Entities;

namespace TechRSSReader.Infrastructure.Persistence.Configurations
{
    public class UserTagConfiguration : IEntityTypeConfiguration<UserTag>
    {
        public void Configure(EntityTypeBuilder<UserTag> builder)
        {
            builder.Property(ut => ut.Text)
                .HasMaxLength(100)
                .IsRequired();

            builder.Property(ut => ut.CreatedBy)
                .HasMaxLength(450)
                .IsRequired();

            builder.Property(ut => ut.LastModifiedBy)
                .HasMaxLength(450);
        }
    }
}
