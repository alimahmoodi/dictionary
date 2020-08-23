import React from "react";
import classes from "./TextArea.module.css";
import Bin from "../../../svg/bin.svg";

const TextArea = props => {
    return (
        <div className={classes.TextAreaDiv}>
            <img
                onClick={() => props.deleteExample(props.exampleId)}
                className={classes.Bin}
                src={Bin}
                alt="recyclebin"
            />

            <textarea
                className={classes.TextArea}
                onChange={e => props.onChangeOfExapleValue(e, props.exampleId)}
                value={props.valueOfExample}
            ></textarea>
        </div>
    );
};
export default TextArea;
