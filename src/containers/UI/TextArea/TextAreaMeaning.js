import React from "react";
import classes from "./TextArea.module.css";

const TextAreaMeaning = props => {
    return (
        <div className={classes.TextAreaDiv}>
            <textarea
                className={classes.TextArea}
                onChange={e => props.valueOfMeaning(e, props.boxId)}
                value={props.valueOfMeaning2Way}
            ></textarea>
        </div>
    );
};
export default TextAreaMeaning;
