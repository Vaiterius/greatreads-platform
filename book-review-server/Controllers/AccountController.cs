using book_review_server.Data;
using book_review_server.Data.DTO;
using book_review_server.Data.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;

namespace book_review_server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly JwtHandler _jwtHandler;

        public AccountController(
            ApplicationDbContext context,
            UserManager<ApplicationUser> userManager,
            JwtHandler jwtHandler
        )
        {
            _context = context;
            _userManager = userManager;
            _jwtHandler = jwtHandler;
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Login(ApiLoginRequest loginRequest)
        {
            var user = await _userManager.FindByNameAsync(loginRequest.Username);
            if (user == null || !await _userManager.CheckPasswordAsync(user, loginRequest.Password))
            {
                return Unauthorized(new ApiLoginResult()
                {
                    Success = false,
                    Message = "Invalid username or password"
                });
            }

            var secToken = await _jwtHandler.GetTokenAsync(user);
            var jwt = new JwtSecurityTokenHandler().WriteToken(secToken);
            return Ok(new ApiLoginResult()
            {
                Success = true,
                Message = "Login successful",
                Token = jwt
            });
        }

        [HttpPost("Signup")]
        public async Task<IActionResult> Signup(ApiSignupRequest signupRequest)
        {
            // Check if user with username already exists.
            ApplicationUser? existingUser = await _userManager.FindByNameAsync(signupRequest.Username);
            if (existingUser != null)
            {
                return BadRequest(new ApiSignupResult()
                {
                    Success = false,
                    Message = "Account with the username already exists"
                });
            }

            // Create the new user if all is well.
            ApplicationUser newUser = new()
            {
                UserName = signupRequest.Username,
                FirstName = signupRequest.FirstName,
                LastName = signupRequest.LastName,
                SecurityStamp = Guid.NewGuid().ToString(),
            };

            var result = await _userManager.CreateAsync(newUser, signupRequest.Password)
                ?? throw new InvalidOperationException();
            if (!result.Succeeded)
            {
                return BadRequest(new ApiSignupResult
                {
                    Success = false,
                    Message = "Account creation failed!",
                });
            }


            newUser.LockoutEnabled = false;
            await _context.SaveChangesAsync();

            var secToken = await _jwtHandler.GetTokenAsync(newUser);
            var jwt = new JwtSecurityTokenHandler().WriteToken(secToken);

            return Ok(new ApiSignupResult()
            {
                Success = true,
                Message = "Account creation successful",
                Token = jwt
            });
        }

        // GET: api/Account/Users
        [HttpGet("Users")]
        public async Task<ActionResult<IEnumerable<UserDetailsDTO>>> GetUsers()
        {
            var userDtos = await _userManager.Users
                .Select(user => new UserDetailsDTO
                {
                    Username = user.UserName,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                })
                .ToListAsync();

            return Ok(userDtos);
        }

        // GET: api/Account/Users/{username}
        [HttpGet("Users/{username}")]
        public async Task<ActionResult<UserDetailsDTO>> GetUser(string username)
        {
            var user = await _userManager.FindByNameAsync(username);
            if (user == null)
            {
                return NotFound(new { Message = "User not found"});
            }

            return Ok(new UserDetailsDTO
            {
                Username = username,
                FirstName = user.FirstName,
                LastName = user.LastName,
            });
        }
    }
}
