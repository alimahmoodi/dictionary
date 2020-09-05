import React from "react";
import classes from "./InputLabel.module.css";

const InputLabel = props => {
    const labelClass = [classes.Label];
    if (props.additionClass) {
        labelClass.push(classes.Align);
    }
    return <label className={labelClass.join(" ")}>{props.children}</label>;
};
export default InputLabel;
