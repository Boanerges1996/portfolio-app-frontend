import React from 'react';
import {Link,Redirect,Route} from 'react-router-dom';
import './login.css';
import {connect} from 'react-redux';
import axios from 'axios';




class Login extends React.Component{

    state = {
        username:"",
        password:"",
        userinfo:"",
        loginError:false
    }

    Login_right = ()=>{
        axios.post("https://dorthear.herokuapp.com/sign_in",{
            username:this.state.username,
            password:this.state.password
        }).then(response =>{
            this.props.user_info(response.data)
            this.setState({
                userinfo:response.data,
                loginError:!response.data.login
            })
        })
        

    }
    inpUsername = e =>{
        this.setState({
            username:e.target.value
        })
    }
    inpPassword = e =>{
        this.setState({
            password:e.target.value
        })
    }



    render(){
        if(this.state.userinfo.login){
            axios.get("https://dorthear.herokuapp.com/personal",{
                headers:{
                    myToken:this.state.userinfo.token
                }
            }).then(response=>{
                this.props.personalInfo(response.data)
            })

            axios.get("https://dorthear.herokuapp.com/occupation",{
                headers:{
                    myToken:this.state.userinfo.token
                }
            }).then(response=>{
                this.props.occupation(response.data)
            })

            axios.get("https://dorthear.herokuapp.com/address",{
                headers:{
                    myToken:this.state.userinfo.token
                }
            }).then(response=>{
                this.props.contacts(response.data)
            })

            return <Redirect to='/Userpage' />
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
                                <i className="unlock icon"></i>
                                <input type="password" placeholder="password" onChange={this.inpPassword}/>
                            </div>  
                        </div><br/>
                        <div className="ui animated button" tabIndex="0" onClick={this.Login_right}>
                            <div className="visible content">Login</div>
                            <div className="hidden content"><i className="angle right icon"></i></div>
                        </div>
                        <div>{(this.state.loginError)?<LoginError />:""}</div>
                    </div>

                    <br/>
                    <div>
                        <Link to='/Signup'>Sigup</Link> a free account
                    </div>
                </div>
            </div>
        )
    }
}

const user_information = (user) => ({
    type:"USER_INFO",
    info:user,
})
const personalInfo =(existance)=>({
    type:"PERSONAL_INFO",
    person:existance
})

const occupationInfo =(data)=>({
    type:"OCCUPATION_INFO",
    occupation:data
})

const contact = (data)=>({
    type:"CONTACT_INFO",
    contacts:data
})


function LoginError(props){
    return(
        <div className="LoginError">
            Forget your password
        </div>
    )
}

const mapDispatchToProps = (dispatch) =>{
    return {
        user_info: (user)=> dispatch(user_information(user)),
        personalInfo: (existance)=> dispatch(personalInfo(existance)),
        occupation: (data)=> dispatch(occupationInfo(data)),
        contacts: (data)=> dispatch(contact(data))
    }

}

export default connect(null,mapDispatchToProps)(Login);






