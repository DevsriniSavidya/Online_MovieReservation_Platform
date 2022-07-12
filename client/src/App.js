import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {DataProvider} from './GlobalState';
import Header from './components/headers/Header.js';
import Pages from './components/mainpages/Pages';

function App() {
  return (
    <DataProvider>
      <Router>
          <Header />
          <Pages/>
      </Router>
    </DataProvider>
  );
}

export default App;
