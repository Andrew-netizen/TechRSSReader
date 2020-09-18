using Microsoft.EntityFrameworkCore.Migrations;

namespace TechRSSReader.Infrastructure.Persistence.Migrations
{
    public partial class AddUserRating : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_KeywordToExclude_Blogs_BlogId",
                table: "KeywordToExclude");

            migrationBuilder.DropForeignKey(
                name: "FK_KeywordToInclude_Blogs_BlogId",
                table: "KeywordToInclude");

            migrationBuilder.AlterColumn<string>(
                name: "Categories",
                table: "RssFeedItems",
                maxLength: 500,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(200)",
                oldMaxLength: 200,
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserRating",
                table: "RssFeedItems",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "UserRatingPrediction",
                table: "RssFeedItems",
                nullable: true);

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

            migrationBuilder.DropColumn(
                name: "UserRating",
                table: "RssFeedItems");

            migrationBuilder.DropColumn(
                name: "UserRatingPrediction",
                table: "RssFeedItems");

            migrationBuilder.AlterColumn<string>(
                name: "Categories",
                table: "RssFeedItems",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: true,
                oldClrType: typeof(string),
                oldMaxLength: 500,
                oldNullable: true);

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
