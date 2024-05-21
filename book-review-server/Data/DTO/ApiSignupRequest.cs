using System.ComponentModel.DataAnnotations;

namespace book_review_server.Data.DTO
{
    public class ApiSignupRequest
    {
        [Required(ErrorMessage = "First name is required!")]
        public required string FirstName { get; set; }

        [Required(ErrorMessage = "Last name is required!")]
        public required string LastName { get; set; }

        [Required(ErrorMessage = "Username is required!")]
        public required string Username { get; set; }

        [Required(ErrorMessage = "Password is requied!")]
        public required string Password { get; set; }
    }
}
