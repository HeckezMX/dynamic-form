import React, { Component } from 'react';
import MultiField from '../multiField/MultiField';
import '../assets/css/body.css';

class Body extends Component {
  render() {
    return (
      <div className="body__content">
        <MultiField />
      </div>
    );
  }
}
export default Body;
