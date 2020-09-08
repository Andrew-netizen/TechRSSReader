using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TechRSSReader.Infrastructure.Persistence.Migrations
{
    public partial class RssFeedItems : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_KeywordToExclude_Blogs_BlogId",
                table: "KeywordToExclude");

            migrationBuilder.DropForeignKey(
                name: "FK_KeywordToInclude_Blogs_BlogId",
                table: "KeywordToInclude");

            migrationBuilder.CreateTable(
                name: "RssFeedItems",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedBy = table.Column<string>(maxLength: 450, nullable: false),
                    Created = table.Column<DateTime>(nullable: false),
                    LastModifiedBy = table.Column<string>(maxLength: 450, nullable: true),
                    LastModified = table.Column<DateTime>(nullable: true),
                    Author = table.Column<string>(maxLength: 200, nullable: true),
                    BlogId = table.Column<int>(nullable: false),
                    Categories = table.Column<string>(maxLength: 200, nullable: true),
                    Content = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    Link = table.Column<string>(maxLength: 1000, nullable: false),
                    PublishingDate = table.Column<DateTime>(nullable: true),
                    PublishingDateString = table.Column<string>(maxLength: 100, nullable: true),
                    RetrievedDateTime = table.Column<DateTime>(nullable: false),
                    RssId = table.Column<string>(maxLength: 500, nullable: true),
                    Title = table.Column<string>(maxLength: 500, nullable: false),
                    UserInterested = table.Column<bool>(nullable: true),
                    UserInterestPrediction = table.Column<bool>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RssFeedItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RssFeedItems_Blogs_BlogId",
                        column: x => x.BlogId,
                        principalTable: "Blogs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_RssFeedItems_BlogId",
                table: "RssFeedItems",
                column: "BlogId");

            migrationBuilder.AddForeignKey(
                name: "FK_KeywordToExclude_Blogs_BlogId",
                table: "KeywordToExclude",
                column: "BlogId",
                principalTable: "Blogs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_KeywordToInclude_Blogs_BlogId",
                table: "KeywordToInclude",
                column: "BlogId",
                principalTable: "Blogs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_KeywordToExclude_Blogs_BlogId",
                table: "KeywordToExclude");

            migrationBuilder.DropForeignKey(
                name: "FK_KeywordToInclude_Blogs_BlogId",
                table: "KeywordToInclude");

            migrationBuilder.DropTable(
                name: "RssFeedItems");

            migrationBuilder.AddForeignKey(
                name: "FK_KeywordToExclude_Blogs_BlogId",
                table: "KeywordToExclude",
                column: "BlogId",
                principalTable: "Blogs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_KeywordToInclude_Blogs_BlogId",
                table: "KeywordToInclude",
                column: "BlogId",
                principalTable: "Blogs",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
