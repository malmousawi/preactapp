// import './style';
// import App from './components/app';

// export default App;

import { h, render } from 'preact';
import App from './App';

const rootElement = document.getElementById('app');
render(<App />, rootElement);
