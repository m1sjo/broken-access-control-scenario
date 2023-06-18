using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using webapi.Model;

namespace webapi.Controllers;

[ApiController]
[Route("[controller]")]
public class SmartHomeInformationController : ControllerBase
{
    private static readonly Random _random = new();

    // Alternatively get from database.
    private static readonly SmartHomeInformation _smartHomeInformation = new()
    {
        Temperatur = _random.Next(-10, 31),
        Humidity = _random.Next(0, 101),
        IsLightOn = false
    };

    #region Smarthome Info

    [HttpGet("GetInfo")]
    [Authorize]
    public ActionResult<SmartHomeInformation> GetSmartHomeInfo()
    {
        return Ok(_smartHomeInformation);
    }

    [HttpGet("GetTemperature")]
    [Authorize]
    public ActionResult<int> GetTemperature()
    {
        return Ok(_smartHomeInformation.Temperatur);
    }
    
    [HttpGet("GetHumidity")]
    [Authorize]
    public ActionResult<int> GetHumidity()
    {
        return Ok(_smartHomeInformation.Humidity);
    }
    
    [HttpGet("GetLightState")]
    [Authorize]
    public ActionResult<bool> GetLightState()
    {
        return Ok(_smartHomeInformation.IsLightOn);
    }
     
    [HttpPost("SwitchLightState")]
    [Authorize]
    public void SwitchLightState()
    {
        _smartHomeInformation.IsLightOn = !_smartHomeInformation.IsLightOn;
    }

    #endregion Smarthome Info
}
