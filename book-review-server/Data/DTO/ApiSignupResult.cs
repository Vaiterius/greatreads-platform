namespace book_review_server.Data.DTO
{
    public class ApiSignupResult
    {
        public bool Success { get; set; }
        public required string Message { get; set; }
        public string? Token { get; set; }
    }
}
