import React, { Component } from 'react';
import Draggabilly from 'draggabilly';
import axios from 'axios';
import Logo from './components/Logo';
import Window from './components/Window';
import img1 from './img/balaclava-img-box-1.png';

class App extends Component {
  constructor() {
    super();
    // bind the methods
    this._renderWindows = this._renderWindows.bind(this);
    this._dragWindows = this._dragWindows.bind(this);
    this._toggleMinMaxWindow = this._toggleMinMaxWindow.bind(this);
    this._deleteWindow = this._deleteWindow.bind(this);
    this._dragUpdate = this._dragUpdate.bind(this);

    // set the inital state of the windows
    this.state = {
      windows: {
        '01': {
          id: '1',
          pos: [10, 10],
          windowType: 'regular',
        },
        '02': {
          id: '2',
          pos: [50, 150],
          windowType: 'regular',
        },
        '03': {
          id: '3',
          pos: [120, 50],
          windowType: 'regular',
        },
        '04': {
          id: '4',
          pos: [200, 350],
          windowType: 'regular',
        },
        '05': {
          id: '5',
          pos: [500, 150],
          windowType: 'regular',
        },
      },
      minWindows: 0,
    };
  }

  componentWillMount() {
    // check if there is saved windows positions in localStorage
    const localStorageRef = localStorage.getItem('balaclava-windows-position');

    if (localStorageRef) {
      // update our App component's order state
      this.setState({
        windows: JSON.parse(localStorageRef)
      });
    }
  }

  componentDidMount() {
    // server request using axios
    const requestUrl = 'http://codepen.io/jobs.json';
    this.serverRequest = axios.get(requestUrl)
        .then((result) => {
          this.setState({
            jobs: result.data.jobs
          });
        });

    // execute drag window function
    this._dragWindows();
  }

  componentWillUnmount() {
    this.serverRequest.abort();
  }

  _renderWindows(key, window) {
    const { pos, windowType } = window[key];
    // check if there are windows
    if (window) {
      return (
        <Window key={key} index={key} windowType={windowType} position={pos} _toggleMinMaxWindow={this._toggleMinMaxWindow} _deleteWindow={this._deleteWindow} content={img1} />
      )
    }
  }

  _dragWindows() {
    const mSelf = this;
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
      // when element is dragged around, update it's location on state
      draggie.on( 'dragEnd', function(event, pointer) {
        const elem = this.element;
        const elemKey = elem.dataset.id;
        // set the state with the updated position of the element
        const left = elem.style.left.replace(/\D/g,'');
        const top = elem.style.top.replace(/\D/g,'');
        mSelf._dragUpdate(elemKey, left, top);
      });
    }
  }

  _dragUpdate(key, x, y) {
    // update our state
    // get all windows
    let allWindows = {...this.state.windows};
    // update current window position
    allWindows[key] = {
      id: allWindows[key].id,
      pos: [x, y],
      windowType: allWindows[key].windowType
    };
    // set the new state
    this.setState({
      windows: allWindows
    });

    localStorage.setItem('balaclava-windows-position', JSON.stringify(allWindows));

    // log
    // console.log(`[log] ✅ Reply "${reply.text}" by ${reply.author} added to comment #${reply.commentid} successfully!`);
  }

  _toggleMinMaxWindow(e, windows = 'one') {
    let elem = [],
        addWindows,
        minWindows;
    const className = 'is-minimized';

    // check if it is one or all elements to minimize
    if (windows === 'all') {
      // get all window element
      elem = document.querySelectorAll('.window');
      addWindows = elem.length;
    } else {
      // get single window element
      elem = [e.target.parentElement.parentElement.parentElement];
      addWindows = 1;
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

      // save to state
      // TODO fix the toggle button that is not changing the state correctly
      // TODO make sure that the state never goes negative!
      if (!elem[i].classList.contains(className)) {
        minWindows = this.state.minWindows - addWindows;
        this.setState({minWindows});
      } else {
        minWindows = this.state.minWindows + addWindows;
        this.setState({minWindows});
      }
    }
  }

  _deleteWindow(e, key) {
    e.preventDefault();
    // copy current state
    const newState = {...this.state};
    // delete selected object
    delete this.state.windows[key];
    // set new state
    this.setState({newState});
  }

  render() {
    const windows = this.state.windows;
    return (
      <div className="page">
        <div className="controls">
          <a href="#" onClick={(e) => this._toggleMinMaxWindow(e, 'all')}>Toggle min/max all</a>
        </div>
        <Logo />

        {Object.keys(windows).map(key => this._renderWindows(key, windows))}
      </div>
    )
  }
}

export default App;
