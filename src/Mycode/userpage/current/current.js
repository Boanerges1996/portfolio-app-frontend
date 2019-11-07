import React from 'react';
import {connect} from 'react-redux';
import PersonalProfile from './personalProfile';
import OccupationProfile from './occupationProfile';
import ContactProfile from './contactInfo';


class CurrentInformation extends React.Component{

    render(){
        return(
            <div className="currentInfo">
                <div className="ui segment">
                    <img className="ui centered medium image" src={this.props.avatarUrl}/>
                    <h3 className="center">{this.props.email}</h3>
                </div>
                {this.props.person?<PersonalProfile/>:<div />}
                {this.props.occupation?<OccupationProfile />:<div />}
                {this.props.contact?<ContactProfile />:<div />}
            </div>
        )
    }
}



const mapStateToProps=state=>{
    return{
        avatarUrl:state.user_info.user_avatar,
        person: state.personalInfo.exists,
        occupation: state.occupation.exists,
        contact: state.contact.exists,
        email: state.user_info.email
    }
}

export default connect(mapStateToProps)(CurrentInformation);