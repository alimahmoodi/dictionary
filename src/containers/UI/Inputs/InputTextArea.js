import React from "react";
import classes from "./InputTextArea.module.css";
import InputLabel from "../Label/InputLabel";
import TextArea from "../TextArea/TextArea";
import Select from "../Select/Select";
const InputTextArea = props => {
    return (
        <div className={classes.FormGroup}>
            <InputLabel>{props.labelType}</InputLabel>
            <TextArea></TextArea>
        </div>
    );
};
export default InputTextArea;
