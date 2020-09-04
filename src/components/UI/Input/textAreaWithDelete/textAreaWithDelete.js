import React from "react";
import classes from "./textAreaWithDelete.module.css";
import Bin from "../../../../svg/bin.svg";

const textAreaWithDelete = props => {
    let textAreaWithDeleteClass = [classes.TextArea];
    if (
        (props.isValid === false && props.isTouched) ||
        (props.overAllValidMessage === true && props.isValid === false)
    ) {
        textAreaWithDeleteClass.push(classes.Invalid);
    }
    return (
        <div className={classes.TextAreaDiv}>
            <img
                onClick={() => props.deleteExample(props.exampleId)}
                className={classes.Bin}
                src={Bin}
                alt="recyclebin"
            />

            <textarea
                className={textAreaWithDeleteClass.join(" ")}
                onChange={e => props.onChangeOfExapleValue(e, props.exampleId)}
                value={props.valueOfExample}
                placeholder="Example"
            ></textarea>
        </div>
    );
};

export default textAreaWithDelete;
