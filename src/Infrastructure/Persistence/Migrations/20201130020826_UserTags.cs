using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TechRSSReader.Infrastructure.Persistence.Migrations
{
    public partial class UserTags : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UserTags",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Text = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: false),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastModifiedBy = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: true),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserTags", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "FeedItemUserTags",
                columns: table => new
                {
                    RssFeedItemId = table.Column<int>(type: "int", nullable: false),
                    UserTagId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FeedItemUserTags", x => new { x.RssFeedItemId, x.UserTagId });
                    table.ForeignKey(
                        name: "FK_FeedItemUserTags_RssFeedItems_RssFeedItemId",
                        column: x => x.RssFeedItemId,
                        principalTable: "RssFeedItems",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FeedItemUserTags_UserTags_UserTagId",
                        column: x => x.UserTagId,
                        principalTable: "UserTags",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_FeedItemUserTags_UserTagId",
                table: "FeedItemUserTags",
                column: "UserTagId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "FeedItemUserTags");

            migrationBuilder.DropTable(
                name: "UserTags");
        }
    }
}
