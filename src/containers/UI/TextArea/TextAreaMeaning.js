import React from "react";
import classes from "./TextArea.module.css";

const TextAreaMeaning = props => {
    return (
        <div className={classes.TextAreaDiv}>
            <textarea
                className={classes.TextArea}
                onChange={e => props.onValueOfDefinition(e, props.boxId)}
                value={props.definition}
            ></textarea>
        </div>
    );
};
export default TextAreaMeaning;
