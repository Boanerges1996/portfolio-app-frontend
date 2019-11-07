import React from 'react';
import {connect} from 'react-redux';
class OccupationProfile extends React.Component{
    render(){
        return(
            <div className="personalProfile">
                My working experience is seen here in this part. I previously worked as a {this.props.prev_occ}.
                But am cuurently a {this.props.occ_name} working at {this.props.comp_name}. I am the 
                {this.props.position} at {this.props.comp_name}.
            </div>
        )
    }
}

const mapStateToProps=state=>{
    return {
        prev_occ:state.occupation.prev_occ,
        occ_name:state.occupation.occ_name,
        comp_name:state.occupation.comp_name,
        position:state.occupation.position
    }
}

export default connect(mapStateToProps)(OccupationProfile)