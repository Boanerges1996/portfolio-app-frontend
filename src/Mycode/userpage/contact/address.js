import React from 'react';
import {connect} from 'react-redux';
import Axios from 'axios';

class Contact extends React.Component{

    state = {
        home_add:"",
        work_add:"",
        postal_add:"",
        telephone:""
    }


    scanInput=e=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    onRegisterUpdate=()=>{
        const data = {
            home_add:this.state.home_add,
            work_add:this.state.work_add,
            postal_add:this.state.postal_add,
            telephone:this.state.telephone
        }
        if(this.props.exists){
            //This updates
            (async()=>{
                await Axios.put("http://127.0.0.1:5000/address",data,{
                    headers:{
                        myToken: this.props.mytoken
                    }
                })
                Axios.get("http://127.0.0.1:5000/address",{
                    headers:{
                        myToken: this.props.mytoken
                    }
                }).then(res=>{
                    this.props.contacts(res.data)
                })
            })()
        }
        else{
            (async ()=>{
                console.log(this.props.mytoken)
                let res = await Axios.post("http://127.0.0.1:5000/address",data,{
                    headers:{
                        myToken: this.props.mytoken
                    }
                })
                Axios.get("http://127.0.0.1:5000/address",{
                    headers:{
                        myToken:this.props.mytoken 
                    }
                }).then(resp=>{
                    this.props.contacts(resp.data)
                })
            })()

        }
        console.log(data)

    }
    render(){
        return(
            <div>
                <div className="Personal">
                    <h3>Contact Information</h3>
                    <div className="userPersForm">
                        <div className="ui form">
                            <div className="ui fluid input">
                                <input type="text" placeholder="Home address" name="home_add" onChange={this.scanInput}/>      
                            </div>
                            <div className="ui fluid input">
                                <input type="text" placeholder="Work address" name="work_add" onChange={this.scanInput}/>      
                            </div>
                            <div className="ui fluid input">
                                <input type="text" placeholder="Postal address" name="postal_add" onChange={this.scanInput}/>      
                            </div>
                            <div className="ui fluid input">
                                <input type="text" placeholder="Telephone" name="telephone" />      
                            </div>
                            <div className="ui button" onClick={this.onRegisterUpdate}>{this.props.exists?"Update":"Register"}</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const ContactInfoFetch=data=>{
    return {
        type:"CONTACT_INFO",
        contacts:data
    }
}

const mapStateToProps = (state)=>{
    return {
        exists: state.contact.exists,
        mytoken: state.user_info.token
    }
}

const mapDispatchToProps = dispatch=>{
    return {
        contacts: (data)=>dispatch(ContactInfoFetch(data))
    }
    
}

export default connect(mapStateToProps,mapDispatchToProps)(Contact);