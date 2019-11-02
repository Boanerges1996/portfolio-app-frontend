import React from 'react';
import logo from './logo.svg';
import './App.css';
import Homepage from './Mycode/myApp';
import Signup from './Mycode/SignUp/signup';
import {Route, BrowserRouter as Router,Link,Redirect} from 'react-router-dom'
import Login from './Mycode/Login/login';
import Userpage from './Mycode/userpage/userpage';
import {connect} from 'react-redux';

class App extends React.Component{
  render(){
    return (
      <Router>
        <div className="App">
          <Route exact path='/' component={Homepage}/>
          <Route exact path='/Signup' component={Signup}/>
          <Route exact path='/Login' component={Login}/>
          <Route exact path='/Userpage' component={Userpage}/>
          {/* {this.props.isAuthenticated? <Redirect to='/Userpage'/> : <Redirect to='/Login'/>} */}
        </div>
      </Router>
     
    );
  }
  
}


const mapStateToProps=(state)=>{
  return {
    isAuthenticated: state.isAuthenticated
  }

}

export default connect(mapStateToProps)(App);