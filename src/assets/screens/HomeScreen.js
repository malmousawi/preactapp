import { h, Fragment } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { route } from 'preact-router';
import HourlyForecast from './HourlyForecast';
import './HomeScreen.css';

function HomeScreen({ lng, lat, city }) {
  // Your code logic...
  // ...
     //NOTE: I know that it's conviluted to pass the lat, lng, and city name as into variables, and then into secondary variables
    // and then into tertiary variables to use, but it was the only way that worked for me, ideally it should be immediatley passed into 
    //variables for immediate use but idk why it wouldn't work for me that way. We'll try to polish it up but don't take this as
    // a misunderstanding of react basics on our part we are aware of how it should be done. 

    const[lng, setLng] = useState(route.params.lng) //Takes input from param from previous map in longitude
    const[lat, setLat] = useState(route.params.lat) //Takes input from param from previous map in latitude
    const [city2, setCity2] = useState(route.params.city) //Takes input from param from previous map as city name

    let [latitudeTest, setLatitudeTest] = useState(lat); // Passes input from lng to the API 
    let [longitudeTest, setLongitudeTest] = useState(lng); // Passes input from lat to the API 
    let [cityID, setCityID] = useState(city2); // Passes input from city2 to the API 


    const [data, setData] = useState(); //Saves the value gotten from the bottom API, for the current weather

    useEffect(() => { //API for current weather
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitudeTest}&lon=${longitudeTest}&appid=a8007d417a83d1024caf3513b131c698`)
        .then(res => res.json())
        .then(res => setData(res))
        .catch(err => console.log(err))
    }, [])

    const [fifDayData, setFifDayData] = useState(); //Saves the value gotten from the bottom API, for the weather 30 days in advance 

    useEffect(() => { //API for weather 30 days in advance 
        fetch(`https://pro.openweathermap.org/data/2.5/forecast/climate?q=${cityID}&appid=a8007d417a83d1024caf3513b131c698&cnt=30`)
        .then(res => res.json())
        .then(res => setFifDayData(res))
        .catch(err => console.log(err))
    }, [])

    var date = new Date(); // Creates date object 

    var currentDate = new Date(date.setTime( date.getTime() + 0 * 86400000 )); // gets current date 


    const [days, setDays] = useState([ //Gets date 15 days from now and turns it into an array to be used 
        { date: new Date(date.setTime( date.getTime() + 14 * 86400000 )), icon: "icon", key: 'Monday'},
        { date: new Date(date.setTime( date.getTime() + 1 * 86400000 )), icon: "icon", key: 'Tuesday'},
        { date: new Date(date.setTime( date.getTime() + 1 * 86400000 )), icon: "icon", key: 'Wednesday'},
        { date: new Date(date.setTime( date.getTime() + 1 * 86400000 )), icon: "icon", key: 'Thursday'},
        { date: new Date(date.setTime( date.getTime() + 1 * 86400000 )), icon: "icon", key: 'Friday'},
        { date: new Date(date.setTime( date.getTime() + 1 * 86400000 )), icon: "icon", key: 'Saturday'},
        { date: new Date(date.setTime( date.getTime() + 1 * 86400000 )), icon: "icon", key: 'Sunday'}
    ]);


  return (
    <Fragment>
      <div className="container">
        {/* Your Preact code */}
        <TouchableOpacity onClick={() => route('/map')}>
        <h1 className="location-box">{loc}</h1>
        </TouchableOpacity>
        <h1 className="celsius-box">{Math.round(data.main.temp - 273.15)}°C</h1>
        <TouchableOpacity onClick={() => route('/detailed-view', {temp: data.main.temp, icon: data.weather[0].main, weatherDesc: data.weather[0].description, humidity: data.main.humidity})}>
        <h1 className="info-box">Detailed View</h1>
        </TouchableOpacity>
        <HourlyForecast />
        <div className="fifday-advance-box">
        <TouchableOpacity onClick={() => route('/fif-day-view', {test: "PASSED", city: cityID})}>
            <h1 style={{textAlign:'center', padding: 2, fontWeight: 'bold'}}>15 Day forecast, {currentDate.toDateString()}</h1>
        </TouchableOpacity>
        {days.map((item, j=15) => {
            return (
            <TouchableOpacity className="days-box" key={item.key} onClick={() => route('/detailed-view', {temp: fifDayData.list[j+15].temp.day, icon: fifDayData.list[j+15].weather[0].main, weatherDesc: fifDayData.list[j+15].weather[0].description, humidity: fifDayData.list[j+15].humidity})}>
                <h1>
                {item.date.toDateString()} | {Math.round(fifDayData.list[j+15].temp.day - 273.15)}°C ..
                {fifDayData.list[j+15].weather[0].main === "Clouds" ? (
                    <span className="test-box-1-view">
                    <img className="image-box-test" src="../../../app/assets/Clouds.png" alt="Clouds" />
                    </span>
                ) : fifDayData.list[j+15].weather[0].main === "Rain" ? (
                    <span className="test-box-1-view">
                    <img className="image-box-test" src="../../../app/assets/Rain.png" alt="Rain" />
                    </span>
                ) : fifDayData.list[j+15].weather[0].main === "Clear" ? (
                    <span className="test-box-1-view">
                    <img className="image-box-test" src="../../../app/assets/Clouds.png" alt="Clear" />
                    </span>
                ) : null}
                </h1>
            </TouchableOpacity>
            );
        })}
        </div>

      </div>
    </Fragment>
  );
}

export default HomeScreen;
