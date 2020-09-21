import React, { Component } from "react";
import { connect } from "react-redux";
import { logOut } from "../../store/actionCreators";
import { Redirect } from "react-router-dom";
class Logout extends Component {
    componentDidMount() {
        this.props.logout();
    }
    render() {
        return <Redirect to="/" />;
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logOut()),
    };
};
export default connect(null, mapDispatchToProps)(Logout);
