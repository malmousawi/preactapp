import { h } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { route } from 'preact-router';
import './FifDayView.css';

function FifDayView({ city }) {
  // This screen shows the weather 15 days in advance for the jockey to view

  const [city2, setCity2] = useState(city); // Is used to get the cityID for the API Call

  let [cityID, setCityID] = useState(city2); // Is used to get the cityID for the API Call

  const [fifDayData, setFifDayData] = useState(); // Stores the values of the weather 15 days in advance (the data)

  useEffect(() => {
    fetch(`https://pro.openweathermap.org/data/2.5/forecast/climate?q=${cityID}&appid=a8007d417a83d1024caf3513b131c698&cnt=30`)
      .then(res => res.json())
      .then(res => setFifDayData(res))
      .catch(err => console.log(err));
  }, []);

  var date = new Date(); // date object to create dates

  var currentDate = new Date(date.setTime(date.getTime() + 0 * 86400000)); // gets current date

  let balls = 14; // A counter used for incrementing values in the array

  const [days, setDays] = useState([ // the days array, which prints the dates in advance (15 days)
    { date: new Date(date.setTime(date.getTime() + 14 * 86400000)), icon: balls = balls + 1, key: 'Monday' },
    { date: new Date(date.setTime(date.getTime() + 1 * 86400000)), icon: balls = balls + 1, key: 'Tuesday' },
    { date: new Date(date.setTime(date.getTime() + 1 * 86400000)), icon: balls = balls + 1, key: 'Wednesday' },
    { date: new Date(date.setTime(date.getTime() + 1 * 86400000)), icon: balls = balls + 1, key: 'Thursday' },
    { date: new Date(date.setTime(date.getTime() + 1 * 86400000)), icon: balls = balls + 1, key: 'Friday' },
    { date: new Date(date.setTime(date.getTime() + 1 * 86400000)), icon: balls = balls + 1, key: 'Saturday' },
    { date: new Date(date.setTime(date.getTime() + 1 * 86400000)), icon: balls = balls + 1, key: 'Sunday' }
  ]);

  const renderHeader = () => ( // For the header (the titles of the columns, date, temp, etc)
    <div className={styles.row}>
      <span className={styles.headerCell}>Date</span>
      <span className={styles.headerCell}>Temp</span>
      <span className={styles.headerCell}>Weather</span>
      <span className={styles.headerCell}>Suitability</span>
    </div>
  );

  return (
    <div className={styles.container}>
      {fifDayData && (
        <div className={styles.container}>
          <div>{renderHeader()}</div>
          {days.map((item) => {
            return (
              <div
                onClick={() =>
                  route(
                    `/detailed-view/${fifDayData.list[item.icon].temp.day}/${fifDayData.list[item.icon.weather[0].main]}/${fifDayData.list[item.icon].weather[0].description}/${fifDayData.list[item.icon].humidity}`
                    )
                  }
                  className={styles.row}
                >
                  <span className={styles.cell}>{item.date.toDateString()}</span>
                  <span className={styles.cell}>{Math.round(fifDayData.list[item.icon].temp.day - 273.15)}°C</span>
                  <span className={styles.cell}>
                    {fifDayData.list[item.icon].weather[0].main === 'Clouds' ? (
                      <img className={styles.imageBox} src="path/to/clouds.png" />
                    ) : fifDayData.list[item.icon].weather[0].main === 'Rain' ? (
                      <img className={styles.imageBox} src="path/to/rain.png" />
                    ) : null}
                  </span>
                  <span className={styles.cell}>
                    {fifDayData.list[item.icon].weather[0].main === 'Rain' || Math.round(fifDayData.list[item.icon].temp.day - 273.15) < 10 ? (
                      <img className={styles.imageBox} src="path/to/notSuitable.png" />
                    ) : (
                      <img className={styles.imageBox} src="path/to/tick2.png" />
                    )}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
  
  export default FifDayView;
  

