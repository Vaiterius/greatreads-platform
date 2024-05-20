using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using book_review_server.Data;
using book_review_server.Data.Models;
using book_review_server.Data.DTO;

namespace book_review_server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReviewsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ReviewsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Reviews
        [HttpGet]
        public async Task<ActionResult<ApiResult<Review>>> GetReviews(
            int pageIndex = 0,
            int pageSize = 10,
            string? bookId = null,
            string? tag = null)
        {
            // Get all reviews including their respective tags
            IQueryable<Review> query = _context.Reviews
                .Include(r => r.Tags)
                .AsNoTracking();

            // Filter by bookId if provided.
            if (!string.IsNullOrEmpty(bookId))
            {
                query = query.Where(r => r.BookId == bookId);
            }

            // Filter by tag if provided.
            if (!string.IsNullOrEmpty(tag))
            {
                query = query.Where(r => r.Tags.Any(t => t.Name == tag));
            }

            // Map to ReviewDTO.
            IQueryable<ReviewDTO> dtoQuery = query.Select(r => new ReviewDTO
            {
                Id = r.Id,
                CreatedAt = r.CreatedAt,
                LastUpdatedAt = r.LastUpdatedAt,
                Title = r.Title,
                Body = r.Body,
                Rating = r.Rating,
                BookId = r.BookId,
                Tags = r.Tags.Select(t => t.Name).ToList()
            });

            // Create paginated result
            var paginatedResult = await ApiResult<ReviewDTO>.CreateAsync(
                dtoQuery,
                pageIndex,
                pageSize
            );

            return Ok(paginatedResult);
        }

        // GET: api/Reviews/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Review>> GetReview(int id)
        {
            //var review = await _context.Reviews.FindAsync(id);
            var review = await _context.Reviews
                .Include(r => r.Tags)
                .FirstOrDefaultAsync(r => r.Id == id);

            if (review == null)
            {
                return NotFound();
            }

            var reviewDto = new ReviewDTO
            {
                Id = id,
                CreatedAt = review.CreatedAt,
                LastUpdatedAt = review.LastUpdatedAt,
                Title = review.Title,
                Body = review.Body,
                Rating = review.Rating,
                BookId = review.BookId,
                Tags = review.Tags.Select(t => t.Name).ToList()
            };

            return Ok(reviewDto);
        }

        // PUT: api/Reviews/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutReview(int id, Review review)
        {
            if (id != review.Id)
            {
                return BadRequest();
            }

            _context.Entry(review).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ReviewExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Reviews
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Review>> PostReview(ReviewDTO reviewDto)  // TODO: create DTO for review tag conversions.
        {
            Console.WriteLine("Tags received: " + string.Join(", ", reviewDto.Tags));

            var review = new Review
            {
                CreatedAt = DateTime.UtcNow,
                LastUpdatedAt = DateTime.UtcNow,
                Title = reviewDto.Title,
                Body = reviewDto.Body,
                Rating = reviewDto.Rating,
                BookId = reviewDto.BookId,
            };

            foreach (var tagName in reviewDto.Tags)
            {
                var tag = await _context.Tags.FirstOrDefaultAsync(t => t.Name.ToLower() == tagName.ToLower());
                if (tag == null)
                {
                    tag = new Tag { Name = tagName.ToLower() };
                    _context.Tags.Add(tag);
                }
                review.Tags.Add(tag);
            }

            _context.Reviews.Add(review);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetReview", new { id = review.Id }, review);
        }

        // DELETE: api/Reviews/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteReview(int id)
        {
            var review = await _context.Reviews.FindAsync(id);
            if (review == null)
            {
                return NotFound();
            }

            _context.Reviews.Remove(review);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ReviewExists(int id)
        {
            return _context.Reviews.Any(e => e.Id == id);
        }
    }
}
