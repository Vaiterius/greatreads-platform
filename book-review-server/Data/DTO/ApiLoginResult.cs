namespace book_review_server.Data.DTO
{
    public class ApiLoginResult
    {
        // TRUE if login attempt successful, FALSE otherwise.
        public bool Success { get; set; }

        // Login result message.
        public required string Message { get; set; }
        
        // The JWT token if the login attempt is successful, NULL if not.
        public string? Token { get; set; }
    }
}
