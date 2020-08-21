import React from "react";
import classes from "./Meaning.module.css";
import InputLabel from "../../UI/Label/InputLabel";

class Meaning extends React.Component {
    render() {
        return (
            <div className={classes.Meaning}>
                <InputLabel> meaning as {this.props.labelType}</InputLabel>
                {this.props.children}
            </div>
        );
    }
}
export default Meaning;
