import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router-dom';
import './App.css';
import Phrase from '../Phrase/Phrase'

class App extends Component {
  render() {
    return(
      <Switch>
        <Route exact path='/' component={Phrase}/>
        {/*<Route path='/schedule' component={Schedule}/> */}
      </Switch>
    )
  }
}

export default App;
