using Microsoft.AspNetCore.Mvc;
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

    [HttpGet(Name = "GetSmartHomeInformation")]
    public SmartHomeInformation Get()
    {
        return _smartHomeInformation;
    }

    [HttpGet("GetTemperature")]
    public int GetTemperature()
    {
        return _smartHomeInformation.Temperatur;
    }

    [HttpGet("GetHumidity")]
    public int GetHumidity()
    {
        return _smartHomeInformation.Humidity;
    }

    [HttpGet("GetLightState")]
    public bool GetLightState()
    {
        return _smartHomeInformation.IsLightOn;
    }

    [HttpPost("SwitchLightState")]
    public void SwitchLightState()
    {
        _smartHomeInformation.IsLightOn = !_smartHomeInformation.IsLightOn;
    }
}
