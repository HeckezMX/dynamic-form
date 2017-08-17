import React, { Component } from 'react';
// components
import Header from './commons/Header'
import Body from './commons/Body';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="header">
          <Header />
        </div>
        <div className="body">
          <Body />
        </div>
      </div>
    );
  }
}

export default App;
