import React from 'react';
import {connect} from 'react-redux';

class ContactProfile extends React.Component{
    render(){
        return(
            <div className="personalProfile">
                <h2>These are my contact information</h2>
                <br />
                <ul>
                    <li>Home address: {this.props.home_add}</li>
                    <li>Work address: {this.props.work_add}</li>
                    <li>Post address: {this.props.postal_add}</li>
                    <li>Telephone number: {this.props.phone}</li>
                    <li>Email address: {this.props.email}</li>
                </ul>
            </div>
        )
    }
}


const mapStateToProp = state=>{
    return {
        home_add: state.contact.home_add,
        work_add: state.contact.work_add,
        postal_add: state.contact.postal_add,
        phone: state.contact.phone,
        email: state.user_info.email
    }

}
export default connect(mapStateToProp)(ContactProfile)