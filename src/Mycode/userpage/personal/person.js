import React from 'react';
import './current.css';
import axios from 'axios';
import {} from 'react-router-dom';
import {connect} from 'react-redux';



class CurrentContent extends React.Component{
    

    render(){
        return(
            <div className="Current">
                <div>
                    <h2>Current User Information</h2>
                </div>
                <Personal />

            </div>
        )
    }
}





class Personal extends React.Component{
    state = {
        Firstname:"",
        Lastname:"",
        Othername:"",
        Age:"",
        Sex:"M",
        Date_of_birth:"",
        m_status:"M",
    }

    scanInput = e=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    mariageStatus=(e)=>{
        this.setState({
            m_status:e.target.value
        })
    }

    sex=e=>{
        this.setState({
            Sex:e.target.value
        })
    }
    registerOrUpdate=()=>{
        const data = {
            firstname:this.state.Firstname,
            lastname:this.state.Lastname,
            othernames:this.state.Othername,
            age:this.state.Age,
            sex:this.state.Sex,
            status:this.state.m_status,
            date_of_birth:this.state.Date_of_birth
        }
        if(this.props.exists){
            (async()=>{
                await axios.put("http://127.0.0.1:5000/personal",data,{
                headers:{
                    myToken:this.props.myToken
                } 
                })
                axios.get("http://127.0.0.1:5000/personal",{
                    headers:{
                        myToken:this.props.myToken
                    } 
                }).then(response=>console.log(response.data))

            })()
            
        }
        else{
            (async ()=>{
                console.log(data)

                await axios.post("http://127.0.0.1:5000/personal",data,{
                    headers:{
                        myToken:this.props.myToken
                    }
                })
                axios.get("http://127.0.0.1:5000/personal",{
                    headers:{
                        myToken:this.props.myToken
                    } 
                }).then(response=>{
                    this.props.updateUserInfo(response.data)
                })
            })()
            
        }


    }
    render(){
        return (
            <div>
                <div className="Personal">
                    <h3>User Personal Info</h3>
                    <div className="userPersForm">
                        <div className="ui form">
                            <div className="ui fluid input">
                                <input type="text" placeholder="Firstname" name="Firstname" onChange={this.scanInput}/>      
                            </div>
                            <div className="ui fluid input">
                                <input type="text" placeholder="Lastname" name="Lastname" onChange={this.scanInput}/>      
                            </div>
                            <div className="ui fluid input">
                                <input type="text" placeholder="Othername" name="Othername" onChange={this.scanInput}/>      
                            </div>
                            <div className="ui fluid input">
                                <input type="number" placeholder="Age" name="Age" onChange={this.scanInput}/>      
                            </div>
                            <div className="ui fluid input">
                                <input type="date" placeholder="Date of Birth" name="Date_of_birth" onChange={this.scanInput}/>      
                            </div>
                            <select className="ui fluid search dropdown" name="Sex" onChange={this.sex} value={this.state.Sex}>
                                <option value="M">Male</option>
                                <option value="F">Female</option>
                            </select>
                            <select className="ui fluid search dropdown" name="MaritalStatus" value={this.state.m_status} onChange={this.mariageStatus}>
                                <option value="S">Single</option>
                                <option value="M">Married</option>
                            </select>

                            <div className="ui button" onClick={this.registerOrUpdate}>{this.props.exists? "Update":"Register"}</div>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}

const updatePerson =(update)=>({
    type:"UPDATE_PERSONAL_INFO",
    data:update
})
const mapStateToProps =(state)=>{
    return{
        exists:state.personalInfo.exists,
        myToken:state.user_info.token
    }
}

const mapDispatchToProp=(dispatch)=>{
    return {
        updateUserInfo: (personal)=>dispatch(updatePerson(personal))
    }
}
export default connect(mapStateToProps,mapDispatchToProp)(Personal);