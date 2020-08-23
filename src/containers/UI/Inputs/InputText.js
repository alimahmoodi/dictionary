import React from "react";
import classes from "./InputText.module.css";

const InputText = props => {
    return (
        <input
            className={classes.InputText}
            type="text"
            name="vocab"
            placeholder="Vocab..."
            onChange={e => props.onVocabChange(e)}
        ></input>
    );
};
export default InputText;
