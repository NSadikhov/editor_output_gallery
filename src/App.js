import React, { useRef } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Editor_Output from './Components/Editor-Output';
import Gallery from './Components/Gallery';
import Navbar from './Components/Navbar';

function App() {
  const contentRef = useRef(null);

  return (
    <Router>
      <section className='container'>
        <div className='content' ref={contentRef}>
          <Switch>
            <Route path='/' exact component={Editor_Output} />
            <Route path='/gallery' component={Gallery} />
          </Switch>
        </div>
        <Navbar contentRef={contentRef} />
      </section>
    </Router>
  );
}

export default App;
