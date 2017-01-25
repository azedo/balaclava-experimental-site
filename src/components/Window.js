// components/Window.js

// main imports
import React, { Component } from 'react';

class Window extends Component {
  render() {
    return (
      <div data-id={this.props.index} className={`window window-${this.props.windowType}`} style={{left: this.props.position[0] + 'px', top: this.props.position[1] + 'px', position: 'absolute'}}>
        <div className="window-top">
          <div className="window-top-controls">
            <a href="#" className="window-top-btn" onClick={(e) => this.props._toggleMinMaxWindow(e)}>_</a>
            <a href="#" className="window-top-btn" onClick={(e) => this.props._deleteWindow(e, this.props.index)}>x</a>
          </div>
        </div>
        <div className="window-content">
          <div className="window-content-img">
            <img src={this.props.content} alt="Project name" />
          </div>
          <div className="window-content-text">
            <h3>Who they are</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda corrupti voluptates at.</p>
            <p>Quaerat mollitia rerum sint nihil omnis dolore, recusandae similique dignissimos cupiditate et deleniti, rem dicta expedita qui est.</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Window;
