using Microsoft.AspNetCore.Mvc;
using webapi.Model;

namespace webapi.Controllers;

[ApiController]
[Route("[controller]")]
public class LoginDataController : Controller
{
    private readonly List<LoginData> _knownLoginData = new()
    {
        new LoginData() { Username = "Daniel", Password = "QvhCUWPY4gbY2AsuIkS9" },
        new LoginData() { Username = "Patrick", Password = "IMOWBXxcCEUwi8thGPDG" }
    };

    [HttpPost]
    public bool AreUserCredentialsCorrect(string userName, string password)
    {
        return _knownLoginData.Where(ad => ad.Username == userName && ad.Password == password).Any();
    }
}
