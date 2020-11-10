using Microsoft.EntityFrameworkCore.Migrations;

namespace TechRSSReader.Infrastructure.Persistence.Migrations
{
    public partial class AddExcludedByKeyword : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_KeywordToExclude_Blogs_BlogId",
                table: "KeywordToExclude");

            migrationBuilder.DropForeignKey(
                name: "FK_KeywordToInclude_Blogs_BlogId",
                table: "KeywordToInclude");

            migrationBuilder.AddColumn<bool>(
                name: "ExcludedByKeyword",
                table: "RssFeedItems",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_RssFeedItems_BlogId_ReadAlready_ExcludedByKeyword",
                table: "RssFeedItems",
                columns: new[] { "BlogId", "ReadAlready", "ExcludedByKeyword" });

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

            migrationBuilder.DropIndex(
                name: "IX_RssFeedItems_BlogId_ReadAlready_ExcludedByKeyword",
                table: "RssFeedItems");

            migrationBuilder.DropColumn(
                name: "ExcludedByKeyword",
                table: "RssFeedItems");

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
