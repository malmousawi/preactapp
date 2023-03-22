import { h, Component } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { GoogleMap, LoadScript, Autocomplete } from '@react-google-maps/api';
import './Map.css';

const Map = ({ onPlaceSelected }) => {
  const [latitude, setLatitude] = useState(51.507351);
  const [longitude, setLongitude] = useState(-0.127758);
  const [autocomplete, setAutocomplete] = useState(null);

  const containerStyle = {
    width: '100%',
    height: '100%',
  };

  const center = {
    lat: latitude,
    lng: longitude,
  };

  const onLoad = (data) => {
    setAutocomplete(data);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      setLatitude(lat);
      setLongitude(lng);
      onPlaceSelected(place);
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };

  return (
    <LoadScript
      id="script-loader"
      googleMapsApiKey="AIzaSyC-5jwkIJFTQ2Myg0BN3JlD-bGNcwcWdZE"
      libraries={['places']}
    >
      <div className="mapContainer">
        <Autocomplete
          onLoad={onLoad}
          onPlaceChanged={onPlaceChanged}
          types={['geocode']}
        >
          <input
            type="text"
            placeholder="Please enter the location whose weather you want to see"
            className="autocompleteInput"
          />
        </Autocomplete>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={10}
          options={{
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
        ></GoogleMap>
      </div>
    </LoadScript>
  );
};

export default Map;
