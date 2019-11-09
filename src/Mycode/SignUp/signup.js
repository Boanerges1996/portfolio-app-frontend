import React from 'react';
import './signup.css';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

class Signup extends React.Component{

    state = {
        username:"",
        email:"",
        password:"",
        confirmPassword:"",
        user_info:{}
    }

    componentDidMount(){
            
    }

    inpUsername = (e)=>{
        this.setState({
            username:e.target.value
        })
    }
    inpEmail = e =>{
        this.setState({
            email:e.target.value
        })
    }
    inpPassword = e =>{
        this.setState({
            password:e.target.value
        })
    }
    inpConfirmPass = e =>{
        this.setState({
            confirmPassword:e.target.value
        },()=>{console.log(this.state.confirmPassword)})
        
    }
    signUp =()=>{
        axios.post("https://dorthear.herokuapp.com/user_registration",{
            username:this.state.username,
            email:this.state.email,
            password:this.state.password
        }).then(response=>{
            this.props.user_info(response.data)
        })

    }



    render(){
        if(this.props.login){
            return <Redirect to="/Userpage" />
        }
        return(
            <div className="signup">
                <div className="logo">
                    <div class="ui small image">
                        <img src={require('../image.png')}/>
                    </div>
                </div>
                <div className="signupForm">
                    <h2>Create your account</h2>
                    <div className="ui form">

                        <div className="ui input field">
                            <div className="ui icon input">
                                <i className="user icon"></i>
                                <input type="text" placeholder="username" onChange={this.inpUsername}/>
                            </div>                           
                        </div>
                        <div className="ui input field">
                            <div className="ui icon input">
                                <i className="book icon"></i>
                                <input type="text" placeholder="email" onChange={this.inpEmail}/>
                            </div>  
                        </div>

                        <div className="ui input field">
                            <div className="ui icon input">
                                <i className="unlock icon"></i>
                                <input type="password" placeholder="password" onChange={this.inpPassword}/>
                            </div>  
                        </div>
                        <div className="ui input field">
                            <div className="ui icon input">
                                <i className="unlock icon"></i>
                                <input type="password" placeholder="confirm password" onChange={this.inpConfirmPass}/>
                            </div>  
                        </div>
                        <br/>
                        <div className="ui animated button" tabIndex="0" onClick={this.signUp}>
                            <div className="visible content">Signup</div>
                            <div className="hidden content"><i className="angle right icon"></i></div>
                        </div>

                    </div>
                    <br/>
                    <div>
                        If you already have an account <Link to='/Login'>Login</Link>
                    </div>
                </div>
            </div>
        )
    }
}
const user_information =(user)=>{
    return{
        type:"USER_INFO",
        info:user
    }
}

const mapStateToProps=(state)=>{
    return {
        login: state.user_info.login
    }
}

const mapDispatchtoProps = (dispatch) =>{
    return{
        user_info: (user)=> dispatch(user_information(user))
    }
}

export default connect(mapStateToProps,mapDispatchtoProps)(Signup);