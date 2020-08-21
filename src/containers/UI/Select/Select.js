import React from "react";
import classes from "./Select.module.css";
const select = props => {
    return (
        <select
            onChange={e => props.typeOfVocab(e, props.selectId)}
            className={classes.Select}
            value={props.selectValue}
        >
            <option value="">select type of word</option>
            <option value="verb">verb</option>
            <option value="noun">noun</option>
            <option value="adjective">adjective</option>
        </select>
    );
};
export default select;
