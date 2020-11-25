using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TechRSSReader.Infrastructure.Persistence.Migrations
{
    public partial class WeeklyBlogSummary : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "WeeklyBlogSummaries",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BlogId = table.Column<int>(type: "int", nullable: false),
                    ItemsExcluded = table.Column<int>(type: "int", nullable: false),
                    ItemsRatedAtLeastThree = table.Column<int>(type: "int", nullable: false),
                    NewItems = table.Column<int>(type: "int", nullable: false),
                    ItemsRead = table.Column<int>(type: "int", nullable: false),
                    WeekBegins = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WeeklyBlogSummaries", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WeeklyBlogSummaries_Blogs_BlogId",
                        column: x => x.BlogId,
                        principalTable: "Blogs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_WeeklyBlogSummaries_BlogId",
                table: "WeeklyBlogSummaries",
                column: "BlogId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "WeeklyBlogSummaries");
        }
    }
}
