import React, { useEffect } from 'react'
import './style.css'
import { useState } from 'react'
import WeatherDetails from './WeatherDetails'

function SearchMain() {
    const [searchTerm, setSearchTerm] = useState("mumbai")
    const [tempInfo, setTempInfo] = useState({})
    const changeHandler = (e) => {
        setSearchTerm(e.target.value)
        //console.log(searchTerm)
        
    }
    const getWeatherInfo = async () => {
        let temp, humidity, pressure, weatherType, name, speed, country, sunset;
      
        try {
          let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=metric&appid=ed2e443ec3f9d435b5c9c042977b9449`;
          let res = await fetch(url);
          let data = await res.json();
      
          temp = data.main.temp;
          humidity = data.main.humidity;
          pressure = data.main.pressure;
          weatherType = data.weather[0].main;
          name = data.name;
          speed = data.wind.speed;
          country = data.sys.country;
          sunset = data.sys.sunset;
        } catch (error) {
          console.log(error);
        }
      
        const myNewWeatherInfo = {
          temp,
          humidity,
          pressure,
          weatherType,
          name,
          speed,
          country,
          sunset,
        };
        setTempInfo(myNewWeatherInfo);
      };
      

    useEffect(() => {
        getWeatherInfo()
    }, [])
    
    
  

  return (
    <>
    <div className='wrap'>
        <div className="search">
            <input type='search' placeholder='Enter your city....' id='search'
            onChange={changeHandler} className='searchInput'
            />
            <button className='searchButton' onClick={getWeatherInfo}>Search</button>
        

        </div>
        
      
    </div>
    <WeatherDetails {...tempInfo} />
    </>
  )
}

export default SearchMain

