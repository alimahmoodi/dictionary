import React from "react";
import classes from "./Meaning.module.css";
class Meaning extends React.Component {
    render() {
        return <div className={classes.Meaning}>{this.props.children}</div>;
    }
}
export default Meaning;
