import React, { useState } from 'react';
import axios from 'axios';
import './styles/Weather.css';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const apiKey = 'fe4feefa8543e06d4f3c66d92c61b69c';

  const fetchWeather = async (city) => {
    try {
      // Get latitude and longitude of the city using OpenWeatherMap Geocoding API
      const geoResponse = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`);
      const { lat, lon } = geoResponse.data[0];

      // Fetch weather data using latitude and longitude
      const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`);
      setWeather(weatherResponse.data);
      setError('');
    } catch (err) {
      setError('City not found or invalid API key');
      setWeather(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather(city);
  };

  return (
    <div className="weather-container">
      <h1>Weather App <i class="fas fa-bolt"></i></h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Get Weather</button>
      </form>
      {error && <p className="error">{error}</p>}
      {weather && (
        <div className="weather-info">
          <h2>{weather.name}, {weather.sys.country}</h2>
          <p><i className="fas fa-cloud-sun"></i> {weather.weather[0].description}</p>
          <p><i className="fas fa-thermometer-half"></i> Temperature: {weather.main.temp}°C</p>
          <p><i className="fas fa-temperature-low"></i> Feels Like: {weather.main.feels_like}°C</p>
          <p><i className="fas fa-temperature-high"></i> Min Temperature: {weather.main.temp_min}°C</p>
          <p><i className="fas fa-temperature-high"></i> Max Temperature: {weather.main.temp_max}°C</p>
          <p><i className="fas fa-tachometer-alt"></i> Pressure: {weather.main.pressure} hPa</p>
          <p><i className="fas fa-tint"></i> Humidity: {weather.main.humidity}%</p>
          <p><i className="fas fa-eye"></i> Visibility: {weather.visibility} meters</p>
          <p><i className="fas fa-wind"></i> Wind Speed: {weather.wind.speed} m/s</p>
          <p><i className="fas fa-location-arrow"></i> Wind Direction: {weather.wind.deg}°</p>
          <p><i className="fas fa-cloud"></i> Cloudiness: {weather.clouds.all}%</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
