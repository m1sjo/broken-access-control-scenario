using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using webapi.Model;


namespace webapi.Controllers
{
    [ApiController]
    [EnableCors]
    [Route("[controller]")]
    public class AuthController : Controller
    {
        private readonly IConfiguration _config;

        public AuthController(IConfiguration configuration)
        {
            this._config = configuration;
        }

        // Database Sample
        private readonly List<LoginData> _knownLoginData = new()
        {
            new LoginData() { Username = "Daniel", Password = "QvhCUWPY4gbY2AsuIkS9" },
            new LoginData() { Username = "Patrick", Password = "IMOWBXxcCEUwi8thGPDG" },
            new LoginData() { Username = "Josip", Password = "Wh0N33dsAP@ssw0rd" }
        };

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginData request)
        {
            if (IsValidUser(request.Username, request.Password))
            {
                var token = GenerateToken(request.Username);
                return Ok(new { token });
            }

            return Unauthorized();
        }

        private bool IsValidUser(string username, string password)
            => _knownLoginData.Where(att => att.Username == username & att.Password == password).Any();

        private string GenerateToken(string username)
        {
            // Create a new securityKey instance.
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:SecretKey"]));

            // Sign the credentials.
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            // Create the JWT-Claims
            var jwtClaims = new[] { new Claim(ClaimTypes.Name, username) };

            // Create a new JwtSecurityToken instance.
            var jwt = new JwtSecurityToken(
                issuer: null,
                audience: null,
                claims: jwtClaims,
                expires: DateTime.UtcNow.AddDays(1),
                signingCredentials: credentials
                );

            // Return the Token.
            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }


    }
}
