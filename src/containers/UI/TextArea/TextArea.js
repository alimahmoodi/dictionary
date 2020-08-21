import React from "react";
import classes from "./TextArea.module.css";
import Bin from "../../../svg/bin.svg";

const TextArea = props => {
    return (
        <div className={classes.TextAreaDiv}>
            <img
                onClick={e => props.deleteSentence(e, props.boxId, props.sentenceId)}
                className={classes.Bin}
                src={Bin}
                alt="recyclebin"
            />

            <textarea
                className={classes.TextArea}
                onChange={e => props.valueOfTextArea(e, props.boxId, props.sentenceId)}
            ></textarea>
        </div>
    );
};
export default TextArea;
