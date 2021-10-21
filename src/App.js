import React from "react";
import {BrowserRouter as Router,Link,Route,Switch} from 'react-router-dom';
import Validation from "./components/Validation";
import Login2 from "./components/Login2";

import Todo1 from "./components/Todo1";
import Root from './components/Root';

function App(){
  return(
    <>
    <Router>        
      <Switch>
        <Route path="/" exact component={Root}/>
        <Route path="/register" exact component={Validation}/>
        <Route path="/login" exact component={Login2}/>
        
        <Route path="/todo1" exact component={Todo1}/>
      </Switch>
    </Router>
    </>
  )

}
export default App;


/// Give me 5 mins Ill be ba sure