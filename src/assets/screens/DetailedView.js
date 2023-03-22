import { h } from 'preact';
import { useState } from 'preact/hooks';
import { Link } from 'preact-router/match';
import { route } from 'preact-router';
import './DetailedView.css';

function DetailedView({ temp, icon, weatherDesc, humidity }) {
  const tempVar = Math.round(temp - 273.15);

  return (
    <div className="container">
      {
        icon === "Clouds" ? <img src="/assets/Clouds.png" className="image-box" />
          :
          icon === "Rain" ? <img src="/assets/Rain.png" className="image-box" />
            :
            icon === "Clear" ? <p>Image For Clear</p> : <p>NULL VALUE</p>
      }
      <p className="celsius-box">{tempVar}°C</p>
      <p className="description-box">{weatherDesc}</p>
      <div className="image-box1">{
        icon === "Rain" ? <img className="image-box2" src="/assets/NotSuitable.png" />
          :
          <img className="image-box2" src="/assets/tick2.png" />
      }</div>
      <p className="prompt-box">
        {
          icon === "Rain" ? <p>Not suitable for racing</p> : <p>Suitable for racing</p>
        }
      </p>
      <div className="detailed-box">
        <p style={{ textAlign: 'center', padding: 10, fontWeight: 'bold' }}>Jocky Details Box</p>
        <p className="j-box">Rain: {icon === "Rain" ? weatherDesc : <p>Not Raining</p>}</p>
        <p className="j-box">Muddiness: {icon === "Rain" ? <p>is muddy</p> : <p>is not Muddy</p>}</p>
        <p className="j-box">Humidity: {humidity}%</p>
        <p className="j-box">Temperature affect on the Horse: {tempVar > -15 || tempVar < 25 ? <p>Negligable</p> : tempVar < -15 ? <p>Extremely Cold</p> : tempVar > 25 ? <p>Extremely Hot</p> : null}</p>
        <p className="j-box">Temperature affect on the Ground: {tempVar > -15 || tempVar < 25 ? <p>Normal</p> : tempVar < -15 ? <p>Extremely Hard</p> : tempVar > 25 ? <p>Extremely Soft</p> : null}</p>
      </div>
    </div>
  );
}

export default DetailedView;
