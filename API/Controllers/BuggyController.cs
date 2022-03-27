using System;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  public class BuggyController : BaseApiController
  {
    [HttpGet("not-found")]
    public ActionResult GetNotFound()
    {
      return NotFound();
    }

    [HttpGet("bad-request")]
    public ActionResult GetBadRequest()
    {
      // this one returns a text.
      // this will cause a problem on the client
      //   return BadRequest("This is a bad request");
      var response = new ProblemDetails
      {
        Title = "This is a bad request",
      };
      return BadRequest(response);
    }

    [HttpGet("unauthorized")]
    public ActionResult GetUnauthorized()
    {
      return Unauthorized();
    }

    [HttpGet("validation-error")]
    public ActionResult GetValidationError()
    {
      ModelState.AddModelError("Problem1", "This is the first error");
      ModelState.AddModelError("Problem2", "This is the second error");
      return ValidationProblem();
    }

    [HttpGet("server-error")]
    public ActionResult GetServerError()
    {
      // throw an exception
      // this should be handled by developer! (we will create a middleware for this)
      throw new Exception("This is a server error");
    }
  }
}