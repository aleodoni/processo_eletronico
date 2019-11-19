import React, { Component } from 'react';
import Router from './Router'

class App extends Component {
  constructor(props){
    super(props);
    this.state={

    }
  }
  render() {
    return (
        <div>
            <div>
                <Router/>
            </div>
        }
        </div>
    );
  }
}
export default App;
