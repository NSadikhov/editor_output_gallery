import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Editor_Output from './Components/Editor-Output';
import Gallery from './Components/Gallery';
import Navbar from './Components/Navbar';

function App() {
  return (
    <Router>
      <section className='container'>
        <div className='content'>
          <Switch>
            <Route path='/' exact component={Editor_Output} />
            <Route path='/gallery' component={Gallery} />
          </Switch>
        </div>
        <Navbar />
      </section>
    </Router>
  );
}

export default App;
