import React from 'react';
import SearchCityComponent from './components/SearchCityComponent'
import './App.css';
import {Container} from 'react-bootstrap';

const App = () => {
  return (
    <Container className="App">
      {/* <CitySelector /> */}
      <SearchCityComponent />
    </Container>
  );
};

export default App;
