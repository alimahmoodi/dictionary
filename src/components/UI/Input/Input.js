import React from "react";
import classes from "./Input.module.css";
import Bin from "../../../svg/bin.svg";

const Input = props => {
    console.log(props.wordIsValid);
    let inputElement = null;
    let inputTextClass = [classes.InputText];
    let textAreaClass = [classes.TextArea];
    let textAreaWithDeleteClass = [classes.TextArea];
    if (props.wordIsTouched === true && props.wordIsValid === false) {
        inputTextClass.push(classes.Invalid);
    }
    if (props.definitionIsValid === false && props.definitionIsTouched === true) {
        textAreaClass.push(classes.Invalid);
    }
    if (props.isValid === false && props.isTouched) {
        textAreaWithDeleteClass.push(classes.Invalid);
    }
    switch (props.inputType) {
        case "text-input":
            inputElement = (
                <input
                    ref={props.inputValueRef}
                    className={inputTextClass.join(" ")}
                    type="text"
                    name="vocab"
                    placeholder={props.placeholder}
                    onChange={e => props.onChangeOfTextInput(e)}
                    value={props.textInputValue}
                    autoComplete="off"
                ></input>
            );
            break;
        case "textarea":
            inputElement = (
                <textarea
                    onChange={e => props.onChangeOfDefinitionValue(e, props.boxId)}
                    value={props.definitionValue}
                    className={textAreaClass.join(" ")}
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
                        className={textAreaWithDeleteClass.join(" ")}
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
    return inputElement;
};

// export default Input;
