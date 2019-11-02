import React from 'react';
import Axios from 'axios';
import {connect} from 'react-redux';


class Occupation extends React.Component{
    state = {
        Occupation:"",
        Previous:"",
        CompOrSchoolName:"",
        position:"",
        exists:false
    }

    scanInput=(e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
        
    }
    registerUpdate=()=>{
        const data = {
            occ_name:this.state.Occupation,
            prev_occ:this.state.Previous,
            comp_name:this.state.CompOrSchoolName,
            position:this.state.position
        }
        console.log(data)
        if(this.props.exists){
            (async()=>{
                await Axios.put("http://127.0.0.1:5000/occupation",data,{
                    headers:{
                        myToken:this.props.myToken
                    }
                })
                Axios.get("http://127.0.0.1:5000/occupation",{
                    headers:{
                        myToken:this.props.myToken
                    } 
                }).then(res=>{
                    this.props.occupationInfo(res.data)
                })
            })()     
        }
        else{
            (async()=>{
                await Axios.post("http://127.0.0.1:5000/occupation",data,{
                    headers:{
                        myToken:this.props.myToken
                    }
                })
                Axios.get("http://127.0.0.1:5000/occupation",{
                    headers:{
                        myToken:this.props.myToken   
                    }
                }).then(res=>{
                    this.props.occupationInfo(res.data)
                })
            })()
        }

    }
    render(){
        return(
            <div>
                <div className="Personal">
                    <h3>Occupational Information</h3>
                    <div className="userPersForm">
                        <div className="ui form">
                            <div className="ui fluid input">
                                <input type="text" placeholder="Occupation" name="Occupation" value={this.state.Occupation} onChange={this.scanInput}/>      
                            </div>
                            <div className="ui fluid input">
                                <input type="text" placeholder="Previous Occup..." name="Previous" value={this.state.Previous} onChange={this.scanInput}/>      
                            </div>
                            <div className="ui fluid input">
                                <input type="text" placeholder="Company Name/School" name="CompOrSchoolName" value={this.state.CompOrSchoolName} onChange={this.scanInput}/>      
                            </div>
                            <div className="ui fluid input">
                                <input type="text" placeholder="position" name="position" value={this.state.position} onChange={this.scanInput}/>      
                            </div>
                            <div className="ui button" onClick={this.registerUpdate}>{this.props.exists?"Update":"Register"}</div>
                        </div>
                    </div>
                </div>
            </div>
                
        )
    }
}


const occupation = data=>{
    return{
        type:"OCCUPATION_INFO",
        data:data
    }
}

const mapDispatchToProps = dispatch=>{
    return {
        occupationInfo: (data)=>dispatch(occupation(data))
    }
}


const mapStateToProps=(state)=>{
    return {
        exists: state.occupation.exists,
        myToken: state.user_info.token
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Occupation);