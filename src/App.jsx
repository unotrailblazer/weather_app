import axios from "axios"
import { useState } from "react"

const ourKey = import.meta.env.VITE_WEATHER_APP_API_KEY;

function App() {

  const [weatherData, setWeatherData] = useState({})
  const [location, setLocation] = useState('')


  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${ourKey}`

  const searchLoc = (event) => {

    if (event.key === 'Enter') {

      axios.get(url).then((response) => {
        setWeatherData(response.data)
        console.log('The data coming is ', response.data);
      })

      setLocation('')
    }

  }

  const toCelsius = (kelvin) => {

    // Perform the conversion
    // var celsius = Math.round(kelvin - 273.15);
    var celsius = Math.max(0, Math.ceil(kelvin - 273.15));

    // Return the result
    return celsius;
  }

  return (

    <div className="app">

      <div className="search">
        <input
          value={location}
          onChange={e => setLocation(e.target.value)}
          onKeyDown={searchLoc}
          placeholder="Enter city name"
          type="text" />
      </div>

      <div className="container">
        <div className="top">
          <div className="location">
            <p>{weatherData.name}</p>
          </div>
          <div className="temp">
            {weatherData?.main ? <h1>{toCelsius(weatherData?.main?.temp)}°C</h1> : null}
          </div>
          <div className="description">
            {weatherData?.weather ? <p>{weatherData?.weather[0].main}</p> : null}
          </div>
        </div>

        {
          weatherData?.main != undefined &&

          <div className="bottom">
            <div className="feels">
              {weatherData?.main ? <p className="bold">{toCelsius(weatherData?.main?.feels_like)}°C</p> : null}
              <p>Feels like</p>
            </div>
            <div className="humidity">
              {weatherData?.main ? <p className="bold">{(weatherData?.main?.humidity)}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {weatherData?.main ? <p className="bold">{Math.round(weatherData?.wind?.speed)} MPH</p> : null}
              <p>Wind speed</p>
            </div>
          </div>
        }

      </div>
    </div>


  )
}

export default App
