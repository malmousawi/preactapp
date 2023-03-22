import { h } from 'preact';
import { route } from 'preact-router';
import './FirstScreen.css';

function FirstScreen() {
  const handleButtonClick = () => {
    route('/map');
  };

  return (
    <div className="background-img">
      <div className="container">
        <div className="image-box">
          <img src="../../../app/assets/logo.jpg" alt="Logo" width="280" height="210" />
        </div>
        <div className="button">
          <p style={{fontWeight: 'bold', fontSize: 25 }}>GUI Weather App Group 49</p>
        </div>
        <button className="button" onClick={handleButtonClick}>
          <span className="button-text">Click here to enter location</span>
        </button>
      </div>
    </div>
  );
}

export default FirstScreen;
