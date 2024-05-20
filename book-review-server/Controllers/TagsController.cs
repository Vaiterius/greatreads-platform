using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using book_review_server.Data;
using book_review_server.Data.Models;
using Microsoft.AspNetCore.Authorization;

namespace book_review_server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TagsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TagsController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Tags
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tag>>> GetTags()
        {
            // Get names only.
            List<string> tags = await _context.Tags
                .Select(t => t.Name)
                .ToListAsync();

            return Ok(tags);
        }

        // GET: api/Tags/fiction
        [HttpGet("{name}")]
        public async Task<ActionResult<Tag>> GetTag(string name)
        {
            var tag = await _context.Tags.FindAsync(name);

            if (tag == null)
            {
                return NotFound();
            }

            return tag;
        }

        // PUT: api/Tags/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize]
        [HttpPut("{name}")]
        public async Task<IActionResult> PutTag(string name, Tag tag)
        {
            if (name != tag.Name)
            {
                return BadRequest();
            }

            _context.Entry(tag).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TagExists(name))
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

        // POST: api/Tags
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Tag>> PostTag(Tag tag)
        {
            _context.Tags.Add(tag);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (TagExists(tag.Name))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetTag", new { name = tag.Name }, tag);
        }

        // DELETE: api/Tags/5
        [Authorize]
        [HttpDelete("{name}")]
        public async Task<IActionResult> DeleteTag(string name)
        {
            var tag = await _context.Tags.FindAsync(name);
            if (tag == null)
            {
                return NotFound();
            }

            _context.Tags.Remove(tag);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TagExists(string name)
        {
            return _context.Tags.Any(e => e.Name == name);
        }
    }
}
