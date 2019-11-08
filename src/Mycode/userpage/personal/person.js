import React from 'react';
import './current.css';
import axios from 'axios';
import {} from 'react-router-dom';
import {connect} from 'react-redux';
import {storage} from '../../../firebase/firebase';



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
        image:null,
        imageUrl:null
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
            date_of_birth:this.state.Date_of_birth,
            avatarURL:this.state.imageUrl
        }
        console.log(data)
        if(this.props.exists){
            (async()=>{
                await axios.put("http://127.0.0.1:5000/images",data,{
                    headers:{
                        myToken:this.props.myToken
                    }
                })
                await axios.put("http://127.0.0.1:5000/personal",data,{
                    headers:{
                        myToken:this.props.myToken
                    } 
                })
                await axios.get("http://127.0.0.1:5000/personal",{
                    headers:{
                        myToken:this.props.myToken
                    } 
                }).then(response=>console.log(response.data))

                await axios.get("http://127.0.0.1:5000/images",{
                    headers:{
                        myToken:this.props.myToken
                    }
                })
                .then(res=>{
                    this.props.user_info(res.data)
                })
                

            })()
            
        }
        else{
            (async ()=>{
                console.log(data)
                await axios.put("http://127.0.0.1:5000/images",data,{
                    headers:{
                        myToken:this.props.myToken
                    }
                })

                await axios.post("http://127.0.0.1:5000/personal",data,{
                    headers:{
                        myToken:this.props.myToken
                    }
                })

                await axios.get("http://127.0.0.1:5000/images",{
                    headers:{
                        myToken:this.props.myToken
                    }
                })
                .then(res=>{
                    this.props.user_info(res.data)
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
    uploadImage=(e)=>{
        const file = e.target.files[0]
            const uploadTask = storage.ref(`images/${file.name}`).put(file)
            uploadTask.on('state_changed',(snapshot)=>{
                // Shows our progress
            },(error)=>{
                // error function
                console.log(error)
            },
            ()=>{
                storage.ref('images').child(file.name).getDownloadURL().then(url=>{
                    console.log(url)
                    this.props.url(url)
                    this.setState({
                        imageUrl:url
                    },()=>{
                        console.log("URL is"+this.state.imageUrl)
                    })
                })
            })
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
                            <div className="ui fluid input">    
                                <input type="File" placeholder="Age" name="Age" accept="image/*" onChange={this.uploadImage}/>    
                            </div>

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

const updateAvatar=data=>{
    return {
        type:"UPDATE_AVATAR_URL",
        data: data
    }
}
const URL=data=>{
    return {
        type:"URL",
        data:data
    }
}

const mapDispatchToProp=(dispatch)=>{
    return {
        updateUserInfo: (personal)=>dispatch(updatePerson(personal)),
        user_info: (info)=>dispatch(updateAvatar(info)),
        url: (data)=>dispatch(URL(data))
    }
}
export default connect(mapStateToProps,mapDispatchToProp)(Personal);