import { render } from 'react-dom';

import './App.css';
import { Home } from './components/home/index';

function App() {

  const home = Home()

  return (
    <div>

      { home }

    </div>
  );
}

export default App;
