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
    public DbSet<Basket> Baskets { get; set; }
  }
}

// NOTE we did not add BasketItems as DbSet,
// because we will not query BasketItems individually,
// EF will take care of relationships for us.
// Only add the tables we want to query!