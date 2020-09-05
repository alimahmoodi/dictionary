import React from "react";
import classes from "./Meaning.module.css";
import Label from "../../UI/Label/InputLabel";
class Meaning extends React.Component {
    render() {
        return (
            <div className={classes.Meaning}>
                <Label>word definition</Label>
                {this.props.children}
            </div>
        );
    }
}
export default Meaning;
