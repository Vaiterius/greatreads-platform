using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace book_review_server.Data.Migrations
{
    /// <inheritdoc />
    public partial class RemoveImageUrlOnReviewModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ImageUrl",
                table: "Reviews");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ImageUrl",
                table: "Reviews",
                type: "character varying(2048)",
                maxLength: 2048,
                nullable: true);
        }
    }
}
