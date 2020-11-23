using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TechRSSReader.Infrastructure.Persistence.Migrations
{
    public partial class AddReadRatedDate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "UserRatedDate",
                table: "RssFeedItems",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "UserReadDate",
                table: "RssFeedItems",
                type: "datetime2",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserRatedDate",
                table: "RssFeedItems");

            migrationBuilder.DropColumn(
                name: "UserReadDate",
                table: "RssFeedItems");
        }
    }
}
