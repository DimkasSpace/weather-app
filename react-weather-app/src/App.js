import React, { useState, useEffect } from 'react';
import logo from './sun.svg';
import './App.css';

function App() {
  const [city, setCity] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false)
  const [errMessage, setErrMessage] = useState("")

  const fetchData = () => {
    // fetch(`https:/api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${process.env.REACT_APP_KEY}&units=metric`)
    fetch(`https:/api.openweathermap.org/data/2.5/weather?q=${city}&APPID=9ea0aeab738bca025e8368d4febab564&units=metric`)
      .then(res => res.json())
      .then(res1 => {
        console.log(res1)
        if (!Object.keys(res1).includes("main")) {
          setErrMessage(res1.message);
          setErr(true);
          setLoading(false)
          console.log(err, errMessage)
        } else {
          setData(res1);
          setLoading(true)
          setErr(false);
        }
      })
  };

  const getData = (e) => {
    e.preventDefault();
    console.log(city);
    fetchData();
  }

  // useEffect(() => {
  //   fetchData();
  // }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Weather App</h1>
      </header>

      <form onSubmit={getData}>
        <input type="text" onChange={e => setCity(e.target.value)} />
        <button type="submit" className="searchBtn">search</button>
      </form>

      <div className="weather-content">
        {err ? errMessage : (<>
          <h2>City: {city} </h2>
          <p>Current temperature: <span className="bold"> {loading ? data.main.temp : null} °C </span></p>
          <p>Max temperature: <span className="bold"> {loading ? data.main.temp_max : null} °C </span></p>
          <p>Min temperature: <span className="bold"> {loading ? data.main.temp_min : null} °C</span></p>
          <p>Humidity: <span className="bold"> {loading ? data.main.humidity : null} % </span></p>
          <p>Weather description: <span className="bold"> {loading ? data.weather[0].description : null} </span></p>
          <p>Wind deg: <span className="bold"> {loading ? data.wind.deg : null} </span></p>
          <p>Wind speed: <span className="bold"> {loading ? data.wind.speed : null} </span></p>
        </>)
        }
      </div>
    </div>
  );
}

export default App;
