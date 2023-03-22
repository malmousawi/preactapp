import { h, Component } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import './HourlyForecast.css';

function HourlyForecast(props) {
  const [hoursTemp, setHoursTemp] = useState();
  let [latitudeTest, setLatitudeTest] = useState("51.507351");
  let [longitudeTest, setLongitudeTest] = useState("-0.127758");

  useEffect(() => {
    fetch(`https://pro.openweathermap.org/data/2.5/forecast/hourly?id=524901&appid=a8007d417a83d1024caf3513b131c698&cnt=24`)
      .then(res => res.json())
      .then(res => setHoursTemp(res))
      .catch(err => console.log(err))
  }, []);

  const hours = [
    { hours: "00:00", key: '0' },
    { hours: "01:00", key: '1' },
    // ...
    { hours: "22:00", key: '22' },
    { hours: "23:00", key: '23' },
  ];

  return (
    <div className="forecastBar">
      {
        hoursTemp ? <div className="forecastBar">
          <div className="scrollContainer">
            {hours.map((item, i) => {
              return (
                <div className="hoursBox" key={item.key}>
                  {/* <img src="/path/to/WeatherIcon.jpg" className="imageBox" /> */}
                  <p className="textBox">
                    {Math.round(hoursTemp.list[i].main.temp - 273.15)}°C
                  </p>
                  <p className="textBox">
                    {item.hours}
                  </p>
                </div>
              )
            })}
          </div>
        </div> : null
      }
    </div>
  );
}

export default HourlyForecast;
