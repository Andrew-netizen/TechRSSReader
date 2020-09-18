using Microsoft.EntityFrameworkCore.Migrations;

namespace TechRSSReader.Infrastructure.Persistence.Migrations
{
    public partial class RemoveUserInterestFlag : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_KeywordToExclude_Blogs_BlogId",
                table: "KeywordToExclude");

            migrationBuilder.DropForeignKey(
                name: "FK_KeywordToInclude_Blogs_BlogId",
                table: "KeywordToInclude");

            migrationBuilder.DropColumn(
                name: "UserInterestPrediction",
                table: "RssFeedItems");

            migrationBuilder.DropColumn(
                name: "UserInterested",
                table: "RssFeedItems");

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

            migrationBuilder.AddColumn<bool>(
                name: "UserInterestPrediction",
                table: "RssFeedItems",
                type: "bit",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "UserInterested",
                table: "RssFeedItems",
                type: "bit",
                nullable: true);

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
