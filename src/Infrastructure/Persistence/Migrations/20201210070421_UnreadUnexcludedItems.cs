using Microsoft.EntityFrameworkCore.Migrations;

namespace TechRSSReader.Infrastructure.Persistence.Migrations
{
    public partial class UnreadUnexcludedItems : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UnreadUnexcludedItems",
                table: "Blogs",
                type: "int",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UnreadUnexcludedItems",
                table: "Blogs");
        }
    }
}
