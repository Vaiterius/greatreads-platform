using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace book_review_server.Data.Models
{
    [Table("ReviewTags")]
    public class ReviewTag
    {
        [Required]
        public required int ReviewId { get; set; }

        [Required]
        public required int TagId { get; set; }

        public Review Review { get; } = null!;

        public Tag Tag { get; } = null!;
    }
}
