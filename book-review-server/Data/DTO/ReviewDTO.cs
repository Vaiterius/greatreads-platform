namespace book_review_server.Data.DTO
{
    public class ReviewDTO
    {
        public int? Id { get; set; }  // Not required inbound.

        public DateTime? CreatedAt { get; set; }  // Not required inbound.

        public DateTime? LastUpdatedAt { get; set; }  // Not required inbound.
        public required string Title { get; set; }
        public required string Body { get; set; }
        public required decimal Rating { get; set; }
        public required string BookId { get; set; }
        public required List<string> Tags { get; set; }
    }
}
