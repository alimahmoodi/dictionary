import React from "react";
import classes from "./textarea.module.css";
const TextArea = props => {
    let textAreaClass = [classes.TextArea];
    if (
        (props.definitionIsValid === false && props.definitionIsTouched === true) ||
        (props.overAllValidMessage === true && props.definitionIsValid === false)
    ) {
        textAreaClass.push(classes.Invalid);
    }
    return (
        <textarea
            onChange={e => props.onChangeOfDefinitionValue(e, props.boxId)}
            value={props.definitionValue}
            className={textAreaClass.join(" ")}
            placeholder="Vocab Definition"
        />
    );
};

export default TextArea;
