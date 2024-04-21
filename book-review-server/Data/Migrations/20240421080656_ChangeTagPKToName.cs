using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace book_review_server.Data.Migrations
{
    /// <inheritdoc />
    public partial class ChangeTagPKToName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ReviewTag_Tags_TagsId",
                table: "ReviewTag");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Tags",
                table: "Tags");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ReviewTag",
                table: "ReviewTag");

            migrationBuilder.DropIndex(
                name: "IX_ReviewTag_TagsId",
                table: "ReviewTag");

            migrationBuilder.DropColumn(
                name: "Id",
                table: "Tags");

            migrationBuilder.DropColumn(
                name: "TagsId",
                table: "ReviewTag");

            migrationBuilder.AddColumn<string>(
                name: "TagsName",
                table: "ReviewTag",
                type: "character varying(25)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Tags",
                table: "Tags",
                column: "Name");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ReviewTag",
                table: "ReviewTag",
                columns: new[] { "ReviewsId", "TagsName" });

            migrationBuilder.CreateIndex(
                name: "IX_ReviewTag_TagsName",
                table: "ReviewTag",
                column: "TagsName");

            migrationBuilder.AddForeignKey(
                name: "FK_ReviewTag_Tags_TagsName",
                table: "ReviewTag",
                column: "TagsName",
                principalTable: "Tags",
                principalColumn: "Name",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ReviewTag_Tags_TagsName",
                table: "ReviewTag");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Tags",
                table: "Tags");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ReviewTag",
                table: "ReviewTag");

            migrationBuilder.DropIndex(
                name: "IX_ReviewTag_TagsName",
                table: "ReviewTag");

            migrationBuilder.DropColumn(
                name: "TagsName",
                table: "ReviewTag");

            migrationBuilder.AddColumn<int>(
                name: "Id",
                table: "Tags",
                type: "integer",
                nullable: false,
                defaultValue: 0)
                .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn);

            migrationBuilder.AddColumn<int>(
                name: "TagsId",
                table: "ReviewTag",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Tags",
                table: "Tags",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ReviewTag",
                table: "ReviewTag",
                columns: new[] { "ReviewsId", "TagsId" });

            migrationBuilder.CreateIndex(
                name: "IX_ReviewTag_TagsId",
                table: "ReviewTag",
                column: "TagsId");

            migrationBuilder.AddForeignKey(
                name: "FK_ReviewTag_Tags_TagsId",
                table: "ReviewTag",
                column: "TagsId",
                principalTable: "Tags",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
