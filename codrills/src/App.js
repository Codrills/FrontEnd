import React from "react";
import { Switch, Route } from "react-router-dom";
import Register from './Components/Register';
import Login from './Components/Login'
import Navigation from './Components/Navigation'
import Home from './Components/Home'

function App() {
  return (
    <div>
<Navigation/>
    <Switch>
      <Route path="/" render={() => <Home/>}/>
      <Route exact path="/" render={() => <Login/>}/>
      <Route path="/register" render={() => <Register/>}/>
    </Switch>

    </div>

  );
}

export default App;
