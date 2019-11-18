import React, { Component } from 'react';
import Menu from './pages/Menu'
import Router from './Router'
import Login from "./pages/Login";
import { Route } from 'react-router-dom'

class App extends Component {
  constructor(props){
    super(props);
    this.state={

    }
  }
  render() {
    const path = window.location.pathname;
    return (
        <div>
            <Route path='/' exact component={Login} />
            <Route path='/processo-eletronico' exact component={Login} />
            {(path !== '/' && path !== '/processo-eletronico') &&
            <div>
                <Menu />
                <Router/>
            </div>
        }
        </div>
    );
  }
}
export default App;
