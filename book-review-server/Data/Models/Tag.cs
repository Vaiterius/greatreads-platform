using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
namespace book_review_server.Data.Models
{
    [Table("Tags")]
    [Index(nameof(Name))]
    public class Tag
    {
        [Key]
        [Required]
        [StringLength(25, ErrorMessage = "Name length too long")]
        public required string Name { get; set; }

        public ICollection<Review>? Reviews { get; } = [];
    }
}
