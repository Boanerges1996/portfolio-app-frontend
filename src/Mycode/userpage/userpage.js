import React from 'react';
import './userpage.css'
import { Header } from 'semantic-ui-react';
import {connect} from 'react-redux';
import CurrentContent from './personal/person';
import Occupation from './occupation/occupation';
import Contact from './contact/address';
import CurrentInfomation from './current/current';

class Userpage extends React.Component{
    state = {
        buttonStyles:{
            bgColorCurrent:"#b794f6",
            colorCurrent:"black",
            bgColorPerson:"#b794f6",
            colorPerson:"black",
            bgColorOccupation:"#b794f6",
            colorOccupation:"black",
            bgColorContact:"#b794f6",
            colorContact:"black"
        },
        PersonalInfo:false,
        Occupation:false,
        Contact:false,
        CurrentInfo:true
    }
    changeCurrentColor =()=>{
        this.setState({
            buttonStyles:{
                bgColorCurrent:"blue",
                colorCurrent:"white",
                bgColorPerson:"#b794f6",
                colorPerson:"black",
                bgColorOccupation:"#b794f6",
                colorOccupation:"black",
                bgColorContact:"#b794f6",
                colorContact:"black"               
            },
            PersonalInfo:false,
            Occupation:false,
            Contact:false,
            CurrentInfo:true
        })
    }
    changePersonColor =()=>{
        this.setState({
            buttonStyles:{
                bgColorCurrent:"#b794f6",
                colorCurrent:"black",
                bgColorPerson:"blue",
                colorPerson:"white",
                bgColorOccupation:"#b794f6",
                colorOccupation:"black",
                bgColorContact:"#b794f6",
                colorContact:"black"
            },
            PersonalInfo:true,
            Occupation:false,
            Contact:false,
            CurrentInfo:false
        })
    }
    changeOccupationColor =()=>{
        this.setState({
            buttonStyles:{
                bgColorCurrent:"#b794f6",
                colorCurrent:"black",
                bgColorPerson:"#b794f6",
                colorPerson:"black",
                bgColorOccupation:"blue",
                colorOccupation:"white",
                bgColorContact:"#b794f6",
                colorContact:"black"
            },
            PersonalInfo:false,
            Occupation:true,
            Contact:false,
            CurrentInfo:false
        })
    }
    changeContactColor =()=>{
        this.setState({
            buttonStyles:{
                bgColorCurrent:"#b794f6",
                colorCurrent:"black",
                bgColorPerson:"#b794f6",
                colorPerson:"black",
                bgColorOccupation:"#b794f6",
                colorOccupation:"black",
                bgColorContact:"blue",
                colorContact:"white"
            },
            PersonalInfo:false,
            Occupation:false,
            Contact:true,
            CurrentInfo:false
        })
    }


    render(){
        const avatarStyles = {
            textAlign:'right'
        }

        return (

            <div className="Userpage">
                <div className="userHeader">
                    <div className="complogo">
                    
                        <img className="ui tiny avatar image" src={require("../image.png")}/>
                    </div>
                    <div className="userAvatar">
                        {this.props.username}
                        <img className="ui tiny avatar image" src={this.props.user_avatar}/>
                        <i className="angle down icon"></i>
                    </div>
                </div>
                <div className="userBody">
                    <div className="controlPanel">
                        <div className="avatar">

                        </div>
                        <div className="content">
                            <div className="btn" style={{backgroundColor:this.state.buttonStyles.bgColorCurrent,color:this.state.buttonStyles.colorCurrent}} onClick={this.changeCurrentColor}><i className="address big book outline icon"></i>Curent</div>
                            <div className="btn" style={{backgroundColor:this.state.buttonStyles.bgColorPerson,color:this.state.buttonStyles.colorPerson}} onClick={this.changePersonColor}><i className="user large icon"></i>Personal Info</div>
                            <div className="btn" style={{backgroundColor:this.state.buttonStyles.bgColorOccupation,color:this.state.buttonStyles.colorOccupation}} onClick={this.changeOccupationColor}><i className="shipping fast large icon"></i>Occupation</div>
                            <div className="btn" style={{backgroundColor:this.state.buttonStyles.bgColorContact,color:this.state.buttonStyles.colorContact}} onClick={this.changeContactColor}><i className="phone large icon"></i>Contact</div>
                        </div>
                    </div>
                    <div className="mainContent">
                        {this.state.PersonalInfo?<CurrentContent />:<div></div>}
                        {this.state.Occupation?<Occupation />:<div />}
                        {this.state.Contact?<Contact/>:<div />}
                        {this.state.CurrentInfo?<CurrentInfomation />:<div />}
                    </div>

                </div>
                
            </div>
        )
    }
}


//This component assessing the library

const mapStateToProps=(state)=>{
    return {
        username: state.user_info.username,
        user_avatar: state.user_info.user_avatar
    }
}

export default connect(mapStateToProps)(Userpage);