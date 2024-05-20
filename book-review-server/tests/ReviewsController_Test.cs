using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;
using Microsoft.EntityFrameworkCore;

using book_review_server.Controllers;
using book_review_server.Data;
using book_review_server.Data.Models;
using Xunit.Abstractions;


namespace tests
{
    public class ReviewsController_Test : IDisposable
    {
        private readonly ITestOutputHelper _output;  // Output to console for debugging.
        private readonly ApplicationDbContext _context;
        private readonly ReviewsController _reviewsController;
        private readonly TagsController _tagsController;

        public ReviewsController_Test(ITestOutputHelper output)
        {
            // Arrange (define the required assets)
            DbContextOptions<ApplicationDbContext> options = new DbContextOptionsBuilder<ApplicationDbContext>()
                .UseInMemoryDatabase(databaseName: "book-review-server")
                .Options;
            _output = output;
            _context = new ApplicationDbContext(options);
            _reviewsController = new ReviewsController(_context);
            _tagsController = new TagsController(_context);
        }
        public void Dispose()
        {
            _context.Database.EnsureDeleted();
            _context.Dispose();
        }

        [Fact]
        public async Task GetReview()
        {
            var review = new Review
            {
                Id = 1,
                Title = "Test title",
                Body = "This is a test body",
                CreatedAt = DateTime.Now,
                Rating = (decimal)10.0,
                BookId = "https://www.googleapis.com/books/v1/volumes/VgqzCwAAQBAJ"
            };
            _context.Reviews.Add(review);
            _context.SaveChanges();

            Review? review_existing = null;
            Review? review_notExisting = null;

            // Act (invoke the tests)
            review_existing = (await _reviewsController.GetReview(1)).Value;
            review_notExisting = (await _reviewsController.GetReview(2)).Value;

            // Assert (verify that conditions are met)
            Assert.NotNull(review_existing);
            Assert.Null(review_notExisting);
        }

        [Fact]
        public async Task CreateReview()
        {
            var newReview = new Review
            {
                Id = 2,
                Title = "Test title",
                Body = "This is a test body",
                CreatedAt = DateTime.Now,
                Rating = (decimal)10.0,
                BookId = "https://www.googleapis.com/books/v1/volumes/VgqzCwAAQBAJ"
            };

            var tags = new List<string> { "Science", "Fiction", "Fantasy" };
            foreach (var tagName in tags)
            {
                var tag = await _context.Tags.FirstOrDefaultAsync(t => t.Name == tagName) ?? new Tag { Name = tagName };
                _context.Tags.Add(tag);
                newReview.Tags.Add(tag);
            }

            _context.Reviews.Add(newReview);
            _context.SaveChanges();

            Review? review_exists = (await _reviewsController.GetReview(2)).Value;
            Tag? scienceTagExists = (await _tagsController.GetTag("Science")).Value;
            Tag? horrorTagNotExists = (await _tagsController.GetTag("Horror")).Value;

            Assert.NotNull(review_exists);
            Assert.NotNull(scienceTagExists);
            Assert.Null(horrorTagNotExists);
            _output.WriteLine(_context.Tags.Count().ToString());
            Assert.Equal(3, _context.Tags.Count());
            _output.WriteLine(_context.Reviews.Count().ToString());
            //Assert.Equal(2, _context.Reviews.Count());

            // Get all tags from the Review.
            var review = _context.Reviews
                .Include(r => r.Tags)  // Include the join table entries.
                .FirstOrDefault(r => r.Id == 2);
            Assert.NotNull(review);
            Assert.Equal(3, review.Tags.Count());
            string[] expectedTags = ["Science", "Fiction", "Fantasy"];
            var actualTags = review.Tags.Select(t => t.Name);
            Assert.True(expectedTags.SequenceEqual(actualTags), "Tags do not matched expected values");

            foreach (var tag in review.Tags.Select(t => t.Name))
            {
                _output.WriteLine($"Retrieved Tag: {tag}");
            }
        }
    }
}
