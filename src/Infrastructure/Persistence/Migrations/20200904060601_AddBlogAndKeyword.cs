using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace TechRSSReader.Infrastructure.Persistence.Migrations
{
    public partial class AddBlogAndKeyword : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Blogs",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CreatedBy = table.Column<string>(maxLength: 450, nullable: false),
                    Created = table.Column<DateTime>(nullable: false),
                    LastModifiedBy = table.Column<string>(maxLength: 450, nullable: true),
                    LastModified = table.Column<DateTime>(nullable: true),
                    Title = table.Column<string>(maxLength: 200, nullable: false),
                    XmlAddress = table.Column<string>(maxLength: 500, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Blogs", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "KeywordToExclude",
                columns: table => new
                {
                    BlogId = table.Column<int>(nullable: false),
                    Keyword = table.Column<string>(maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KeywordToExclude", x => new { x.BlogId, x.Keyword });
                    table.ForeignKey(
                        name: "FK_KeywordToExclude_Blogs_BlogId",
                        column: x => x.BlogId,
                        principalTable: "Blogs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "KeywordToInclude",
                columns: table => new
                {
                    BlogId = table.Column<int>(nullable: false),
                    Keyword = table.Column<string>(maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KeywordToInclude", x => new { x.BlogId, x.Keyword });
                    table.ForeignKey(
                        name: "FK_KeywordToInclude_Blogs_BlogId",
                        column: x => x.BlogId,
                        principalTable: "Blogs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "KeywordToExclude");

            migrationBuilder.DropTable(
                name: "KeywordToInclude");

            migrationBuilder.DropTable(
                name: "Blogs");
        }
    }
}
