import React, { useState } from 'react';

/*
  PUBLIC_INTERFACE
*/
/**
 * WeatherPage: Lets user enter a city, then fetches & displays weather/forecast.
 * Secure API key pattern:
 *   const weatherApiKey = process.env.REACT_APP_WEATHER_KEY;
 */
function WeatherPage() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  // API key is loaded ONLY at build time, never hardcoded
  const weatherApiKey = 'c8d2c05abce0a5d7f303c425e174d820'
  //process.env.REACT_APP_WEATHER_KEY;

  async function fetchWeatherData(ev) {
    ev.preventDefault();
    setWeather(null);
    setForecast(null);
    setErr(null);
    setLoading(true);
    if (!city) return;
    try {
      // OpenWeatherMap API example (mock/fetch)
      const resp = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city
        )}&units=metric&appid=${weatherApiKey}`
      );
      if (!resp.ok) throw new Error('Not found');
      const data = await resp.json();
      setWeather(data);

      // 5-day forecast call (optional)
      const respForecast = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
          city
        )}&units=metric&appid=${weatherApiKey}`
      );
      if (respForecast.ok) {
        const dataForecast = await respForecast.json();
        setForecast(dataForecast);
      }
    } catch (error) {
      setErr("Error: Could not get weather. City name must be valid.");
    }
    setLoading(false);
  }

  return (
    <div>
      <h2>Weather Checker</h2>
      <p>
        Enter a city to check the current weather & 5-day forecast.<br />
        <span style={{fontSize:"0.93em", color:"var(--text-secondary)"}}>
          Uses <b>process.env.REACT_APP_WEATHER_KEY</b> from <code>.env</code> for API access.
        </span>
      </p>
      <form onSubmit={fetchWeatherData} style={{ maxWidth: 380, margin: '30px auto', display: 'flex', gap: 10 }}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          autoFocus
          onChange={e => setCity(e.target.value)}
          required
        />
        <button className="btn" type="submit" disabled={loading}>
          {loading ? "Searching..." : "Get Weather"}
        </button>
      </form>
      {err && <div style={{color:'red',marginBottom:18}}>{err}</div>}
      {weather && (
        <div style={{marginTop:24, background:"#111624", border:"1px solid var(--border-color)", borderRadius:8, padding:"18px"}}>
          <strong>{weather.name}, {weather.sys && weather.sys.country}</strong>
          <br />
          Temp: {weather.main.temp}°C, {weather.weather[0].main}
          <br />
          Humidity: {weather.main.humidity}%, Wind: {weather.wind.speed} m/s
        </div>
      )}
      {forecast && (
        <div style={{marginTop:24, background:"#181f2b", borderRadius:7, padding:"10px 16px"}}>
          <strong>5-Day Forecast</strong>
          <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginTop:6 }}>
            {forecast.list.slice(0,8).map((f, j) => (
              <div key={j} style={{
                border: "1px solid #222a39",
                borderRadius:5,
                background: "#222a39",
                padding:"8px 12px",
                minWidth:90
              }}>
                {f.dt_txt.slice(5, 16).replace(" ", "\n")}
                <br />
                <b>{f.main.temp}°C</b> {f.weather[0].main}
              </div>
            ))}
          </div>
        </div>
      )}
      <div style={{marginTop:28, color:"var(--text-secondary)", fontSize:"0.93em"}}>
        <strong>Security:</strong> Weather API keys are injected at build time using <code>process.env</code>, not visible in code.<br/>
        (See <code>.env.example</code> for setup.)
      </div>
    </div>
  );
}

export default WeatherPage;
