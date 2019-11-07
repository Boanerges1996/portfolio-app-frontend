import React from 'react';
import {connect} from 'react-redux';

class PersonalProfile extends React.Component{

    render(){
        return(
            <div className="personalProfile">
                <p> Hello Fellas, I am {this.props.name}. I was born on {this.props.dateOfBirth} and am 
                currently {this.props.age} years old. I am a {this.props.sex==="M"?"Male":"Female"} 
                 and am {this.props.marital==="M"?"Married":"Single"}. This is just a short summary of my
                or my personal information. If you would like to know about me, scroll down to see my contact
                details that I have provide.
                </p>
            </div>
        )
    }
}

const mapStateToProps=state=>{
    return{
        name: state.personalInfo.firstname+" "+state.personalInfo.othername+" "+state.personalInfo.lastname,
        dateOfBirth: state.personalInfo.date_of_birth,
        age: state.personalInfo.age,
        sex: state.personalInfo.sex,
        marital: state.personalInfo.marriage_status,
    }
}
export default connect(mapStateToProps)(PersonalProfile)