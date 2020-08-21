import React from "react";
import classes from "./Sentence.module.css";
import Label from "../../UI/Label/InputLabel";

class Sentence extends React.Component {
    render() {
        return (
            <div className={classes.Sentence}>
                <Label>Sample Sentence</Label>
                {this.props.children}
            </div>
        );
    }
}
export default Sentence;
