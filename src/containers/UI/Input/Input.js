import React from "react";
import classes from "./Input.module.css";
import Bin from "../../../svg/bin.svg";

const Input = props => {
    let inputElement = null;
    switch (props.inputType) {
        case "text-input":
            inputElement = (
                <input
                    className={classes.InputText}
                    type="text"
                    name="vocab"
                    placeholder="Vocab..."
                    onChange={e => props.changed(e)}
                ></input>
            );
            break;
        case "textarea":
            inputElement = (
                <textarea
                    onChange={e => props.changed(e, props.boxId)}
                    value={props.definition}
                    className={classes.TextArea}
                    placeholder="Vocab Definition"
                />
            );
            break;
        case "textarea-with-delete":
            inputElement = (
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
                        placeholder="Example"
                    ></textarea>
                </div>
            );
            break;

        case "select":
            inputElement = (
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
            break;
        default:
            return (inputElement = <input></input>);
    }
    return (
        // <div className={classes.Input}>
        // <label className={classes.Label}>{props.label}</label>
        inputElement
        // </div>
    );
};

export default Input;
