import React, { useState } from "react";
import "./App.css";
import axios from "axios";

export default function WeatherSearch() {
  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState("");
  const [description, setDescription] = useState("");
  const [humidity, setHumidity] = useState("");
  const [wind, setWind] = useState("");
  const [icon, setIcon] = useState("");

  function showWeather(response) {
    setTemperature(response.data.main.temp);
    setDescription(response.data.weather[0].description);
    setHumidity(response.data.main.humidity);
    setWind(response.data.wind.speed);
    setIcon(
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=95305de3e8d4bce4d78d7b45f3327153&units=metric`;
    axios.get(url).then(showWeather);
  }

  function updateCity(event) {
    event.preventDefault();
    setCity(event.target.value);
  }

  if (temperature) {
    return (
      <div className="SearchButton">
        <form onSubmit={handleSubmit}>
          <input
            type="search"
            placeholder="Type a city"
            onChange={updateCity}
          />
          <input type="submit" value="Search" />
        </form>

        <ul className="WeatherForecast">
          <p>{city}</p>
          <li>Temperature: {Math.round(temperature)}°C</li>
          <li>Description: {description}</li>
          <li>Humidity: {Math.round(humidity)}%</li>
          <li>Wind: {Math.round(wind)} Km/hr</li>
          <li>
            <img src={icon} alt="forecast" />
          </li>
        </ul>
      </div>
    );
  } else
    return (
      <div className="SearchButton">
        <form onSubmit={handleSubmit}>
          <input
            type="search"
            placeholder="Type a city"
            onChange={updateCity}
          />
          <input type="submit" value="Search" />
        </form>
      </div>
    );
}
