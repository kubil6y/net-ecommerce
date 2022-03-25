using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class ProductsController : ControllerBase
  {
    private readonly StoreContext _context;

    public ProductsController(StoreContext context)
    {
      this._context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<Product>>> GetProducts()
    {
      return await this._context.Products.ToListAsync();
    }

    [HttpGet("{id}")] // api/products/3
    public async Task<ActionResult<Product>> GetProductById(int id)
    {
      return await this._context.Products.FindAsync(id);
    }
  }
}