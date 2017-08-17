import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import '../assets/css/header.css';

class Header extends Component {
  render() {
    return (
      <header>
        <div className="header__content">
          <AppBar title="Dynamic Form" />
        </div>
      </header>
    );
  }
}
export default Header;
