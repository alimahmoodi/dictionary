import React from "react";
import classes from "./selectInput.module.css";
const selectInput = props => {
    return (
        <select
            onChange={e => props.onChangeTypeOfVocab(e)}
            className={classes.Select}
            value={props.partOfSpeech}
        >
            <option value="verb">verb</option>
            <option value="noun">noun</option>
            <option value="adjective">adjective</option>
            <option value="adverb">adverb</option>
        </select>
    );
};

export default selectInput;
