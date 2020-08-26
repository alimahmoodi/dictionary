import React from "react";
import classes from "./Select.module.css";
const select = props => {
    return (
        <select
            onChange={e => props.onChangeTypeOfVocab(e)}
            className={classes.Select}
            value={props.partOfSpeech}
        >
            <option value="verb">verb</option>
            <option value="noun">noun</option>
            <option value="adjective">adjective</option>
        </select>
    );
};
export default select;
