import React, { Component } from 'react';
import Draggabilly from 'draggabilly';

class App extends React.Component {
  constructor() {
    super();
    // bind the methods
    this._renderWindows = this._renderWindows.bind(this);
    this._dragWindows = this._dragWindows.bind(this);
    this._deleteWindow = this._deleteWindow.bind(this);
    // set the inital state of the windows
    this.state = {
      windows: {
        '01': {
          id: '1',
          pos: [10, 10]
        },
        '02': {
          id: '2',
          pos: [50, 150]
        },
        '03': {
          id: '3',
          pos: [120, 50]
        },
        '04': {
          id: '4',
          pos: [200, 350]
        },
        '05': {
          id: '5',
          pos: [500, 150]
        },
      }
    };
  }

  componentDidMount() {
    // execute drag window function
    this._dragWindows();
  }

  _dragWindows() {
    // save the state in a var
    const state = this.state;
    // get all draggable elements
    const draggableElems = document.querySelectorAll('.window');
    // array of Draggables
    let draggies = []
    // init Draggables
    for ( let i = 0, len = draggableElems.length; i < len; i++ ) {
      const draggableElem = draggableElems[i];
      const draggie = new Draggabilly( draggableElem, {
        // options for the draggable elements
        // axis: 'x',
      });
      draggies.push( draggie );
      // when element is clicked on
      draggie.on( 'pointerDown', function( event, pointer ) {
        const we = document.querySelectorAll('.window');
        // loop through all elements
        for ( let i = 0, len = we.length; i < len; i++ ) {
          // remove current z-index
          we[i].style.zIndex = '0';
        }
        // then set the selected element z-index to 10
        this.element.style.zIndex = '10';
      });
      // show the current position of the element on page
      // draggie.on( 'dragStart', function( event, pointer ) {
        // console.log(pointer.pageX);
        // console.log(pointer.pageY);
      // });
      // callback for when the element is moving
      // draggie.on( 'dragMove', function( event, pointer, moveVector ) {
        // console.log(moveVector);
      // });
      // when element is dragged around, update it's location on state
      draggie.on( 'dragEnd', function(event, pointer) {
        const elem = this.element;
        const elemKey = elem.dataset.id;
        // set the state with the updated position of the element
        state.windows[elemKey].pos[0] = elem.style.left.replace(/\D/g,'');
        state.windows[elemKey].pos[1] = elem.style.top.replace(/\D/g,'');

        // console.log(elem);
        // console.log(elem.style.left);
        // console.log(elem.style.top);
        // console.log(pointer.pageX);
        // console.log(pointer.pageY);
        // console.log(state.windows[elemKey]);
      });
    }
  }

  _toggleMinMaxWindow(e, windows = 'one') {
    let elem = [];
    const className = 'minimized';

    if (windows === 'all') {
      // get all window element
      elem = document.querySelectorAll('.window');
      console.log(windows);
      console.log(elem);
    } else {
      // get single window element
      elem = [e.target.parentElement.parentElement];
      console.log(windows);
      console.log(elem);
    }
    // loop through all elements
    for ( let i = 0, len = elem.length; i < len; i++ ) {
      // add class
      if (elem[i].classList) {
        elem[i].classList.toggle(className);
      } else {
        var classes = elem[i].className.split(' ');
        var existingIndex = classes.indexOf(className);

        if (existingIndex >= 0)
          classes.splice(existingIndex, 1);
        else
          classes.push(className);

        elem[i].className = classes.join(' ');
      }
    }
  }

  _deleteWindow(key) {
    // copy current state
    const newState = {...this.state};
    // delete selected object
    delete this.state.windows[key];
    // set new state
    this.setState({newState});
  }

  _renderWindows(key, window) {
    const { id, pos } = window[key];
    // check if there are windows
    if (window) {
      return (
        <div key={key} data-id={key} className="window" style={{left: pos[0] + 'px', top: pos[1] + 'px'}}>
          <div className="window-topBar">
            window name
            <a href="#" onClick={(e) => this._toggleMinMaxWindow(e)}>_</a>
            <a href="#" onClick={() => this._deleteWindow(key)}>x</a>
          </div>
          <div className="window-content">
            <p>id = {id}</p>
            <p>posX = {pos[0]}</p>
            <p>posY = {pos[1]}</p>
          </div>
        </div>
      )
    }
  }

  render() {
    const windows = this.state.windows;
    return (
      <div>
        <div className="controls">
          <a href="#" onClick={(e) => this._toggleMinMaxWindow(e, 'all')}>Toggle min/max all</a>
        </div>

        {Object.keys(windows).map(key => this._renderWindows(key, windows))}
      </div>
    )
  }
}

export default App;
