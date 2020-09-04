import React from "react";
import classes from "./textInput.module.css";
const textInput = props => {
    let inputTextClass = [classes.InputText];
    if (
        (props.wordIsTouched === true && props.wordIsValid === false) ||
        (props.overAllValidMessage === true && props.wordIsValid === false)
    ) {
        inputTextClass.push(classes.Invalid);
    }

    return (
        <input
            ref={props.inputValueRef}
            className={inputTextClass.join(" ")}
            type="text"
            name="vocab"
            placeholder={props.placeholder}
            onChange={e => props.onChangeOfTextInput(e)}
            value={props.textInputValue}
            autoComplete="off"
        ></input>
    );
};

export default textInput;
