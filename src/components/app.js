import { h } from 'preact';
import { Router } from 'preact-router';
import HomeScreen from './components/HomeScreen';
import DetailedView from './components/DetailedView';
import FifDayView from './components/FifDayView';
import Map from './components/Map';
import FirstScreen from './components/FirstScreen';

const App = () => {
  return (
    <div id ="app">
      <Router>
        <FirstScreen path="/" />
        <Map path="/map" />
        <HomeScreen path="/home" />
        <DetailedView path="/detailed" />
        <FifDayView path="/fifday" />
      </Router>
    </div>
  );
};

export default App;
