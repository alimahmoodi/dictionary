import React from "react";
import classes from "./InputSelect.module.css";
import InputLabel from "../Label/InputLabel";
import Select from "../Select/Select";
const InputSelect = () => {
    return (
        <div className={classes.ContainerSelect}>
            <InputLabel>Select Type of Vocab:</InputLabel>
            <Select />
        </div>
    );
};
export default InputSelect;
