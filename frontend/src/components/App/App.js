import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import './App.css';
import Game from '../Game/Game';
import Phrase from '../Phrase/Phrase'

class App extends Component {
  render() {
    return(
      <Switch>
        <Route exact path='/' component={Game}/>
        <Route path='/roster' component={Phrase}/> 
        {/*<Route path='/schedule' component={Schedule}/> */}
      </Switch>
    )
  }
}

export default App;
