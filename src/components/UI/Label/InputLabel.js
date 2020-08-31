import React from "react";
import classes from "./InputLabel.module.css";

const InputLabel = props => {
    return <label className={classes.Label}>{props.children}</label>;
};
export default InputLabel;
