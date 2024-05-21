using System.ComponentModel.DataAnnotations;

namespace book_review_server.Data.DTO
{
    public class ApiLoginRequest
    {
        [Required(ErrorMessage = "Username is required!")]
        public required string Username { get; set; }
        [Required(ErrorMessage = "Password is required!")]
        public required string Password { get; set; }
    }
}
