// App.js
// 2021-08-31
// Michael Cole (mcole042891.prof.dev@gmail.com)
//
// App layout logic
// ----------------

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import './App.css';
import { Home } from './components/home/index';
import MiniBank from './components/minibank/index';

function App() {

  return (
    <Router>

        <Switch>

          <Route path="/minibank">
            <MiniBank />
          </Route>


          <Route path="/">
            <Home />
          </Route>


        </Switch>

    </Router>
  );
}

export default App;
