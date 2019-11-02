import React from 'react';
import './homepage.css';
import {Link} from 'react-router-dom';


class Homepage extends React.Component{



    render(){
        const loginSign = {
            textAlign:"right"
        }
        const bodyHome = {
            color:"white"
        }
        return (
        <div className="homepage">
            <div className="myHeader">
                <div className="ui equal width grid ">
                    <div className="row">
                        <div className="eight wide column">
                            <div className="first">
                                <img src={require("./image.png")} className="ui mini circular image"/>
                                
                            </div>
                        </div>
                        <div className="eight wide column" style={loginSign}>
                            <div className="last">
                                <div className="ui buttons">
                                    <Link to="/Login">
                                        <button className="ui button violet"><i className="unlock icon"></i>Login</button>
                                    </Link>
                                    <Link to='/Signup'>
                                        <button className="ui button violet"><i className="user icon"></i>Sign up</button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>   
            </div>
            <div className="homeBody">
                <h2 class="ui center aligned icon header" style={bodyHome}>
                    <i class="circular users icon"></i>
                    Create a simple user Portfolio<br/>
                    Login to continue with your registration<br/>
                    Sign up to see what we have to offer
                </h2>

            </div>
            <div className="homeFooter">
                <div className="ui three centered grid">
                    <div className="three wide column">Samson</div>
                    <div className="three wide column">Kwaku  </div>
                    <div className="three wide column"> Nkwuu</div>

                </div>
            </div>

        </div>
        )
    }
}
export default Homepage;