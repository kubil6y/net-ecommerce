using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
  public class StoreContext : DbContext
  {
    public StoreContext(DbContextOptions options) : base(options)
    { }

    // Database Tables
    public DbSet<Product> Products { get; set; }
  }
}