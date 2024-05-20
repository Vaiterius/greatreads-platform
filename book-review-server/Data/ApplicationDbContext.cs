using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using book_review_server.Data.Models;
namespace book_review_server.Data
{
    /// <summary>
    /// This class is in charge of all of the entity objects during runtime, including
    /// populating them with data from the database, keeping track of changes, and
    /// persisting them to the database during CRUD operations.
    /// </summary>
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext() : base() {}
        public ApplicationDbContext(DbContextOptions options) : base(options) {}

        public DbSet<Review> Reviews => Set<Review>();
        public DbSet<Tag> Tags => Set<Tag>();
    }
}
