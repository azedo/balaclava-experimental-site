// components/Logo.js

// main imports
import React, { Component } from 'react';

class Logo extends Component {
  _animateLogo(e, action) {
    const elem = e.target;
    const imgStatic = elem.getAttribute('data-static');
    const imgGif = elem.getAttribute('data-gif');

    if (action === 'start') {
      elem.setAttribute('src', imgGif);
    } else {
      elem.setAttribute('src', imgStatic);
    }
  }

  render() {
    return (
      <div className="page-logo">
        <img src={logo_static} data-static={logo_static} data-gif={logo_animated} alt="Balaclava Studio" onMouseOver={(e) => this._animateLogo(e, 'start')} onMouseOut={(e) => this._animateLogo(e, 'stop')} />
      </div>
    )
  }
}

export default Logo;
