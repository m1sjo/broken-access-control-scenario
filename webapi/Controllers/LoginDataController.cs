using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using webapi.Model;

namespace webapi.Controllers;

[ApiController]
[Route("[controller]")]
public class LoginDataController : Controller
{
    private readonly List<LoginData> _knownLoginData = new()
    {
        new LoginData() { Username = "Daniel", Password = "QvhCUWPY4gbY2AsuIkS9" },
        new LoginData() { Username = "Patrick", Password = "IMOWBXxcCEUwi8thGPDG" },
    };

    private readonly IConfiguration _configuration;

    public LoginDataController(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    [HttpPost]
    public IActionResult Login([FromBody] LoginData loginData)
    {
        if (UserExists(loginData.Username, loginData.Password))
        {
            var token = GenerateJwtToken(loginData.Username);
            return Ok(new { token });
        }

        return Unauthorized();
    }

    private string GenerateJwtToken(string username)
    {
        var jwtSettings = _configuration.GetSection("JwtSettings");
        var secretKey = Encoding.ASCII.GetBytes(jwtSettings["SecretKey"]);

        var claims = new[]
        {
                new Claim(ClaimTypes.Name, username)
            };

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddDays(1),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(secretKey), SecurityAlgorithms.HmacSha256Signature)
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }

    private bool UserExists(string username, string password) => _knownLoginData.Where(l => l.Username == username & l.Password == password).Any();
}
