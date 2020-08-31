import React from "react";
import classes from "./Box.module.css";
import Meaning from "./Meaning/Meaning";
import Sentence from "./Sentence/Sentence";
import Close from "../../svg/close.svg";
import Icon from "@material-ui/core/Icon";
import { green } from "@material-ui/core/colors";
import InputLabel from "../UI/Label/InputLabel";
import Input from "../UI/Input/Input";

class Box extends React.Component {
    render() {
        let exampleSentence = this.props.examples.map((item, id) => {
            return (
                <Input
                    key={id}
                    deleteExample={this.props.deleteExample}
                    exampleId={id}
                    onChangeOfExapleValue={this.props.onChangeOfExapleValue}
                    valueOfExample={item}
                    inputType="textarea-with-delete"
                />
            );
        });

        return (
            <div className={classes.Box}>
                <div className={classes.selectWrapper}>
                    <InputLabel>Select Type Of Word</InputLabel>
                    <Input
                        onChangeTypeOfVocab={e =>
                            this.props.onChangeTypeOfVocab(e, this.props.boxId)
                        }
                        boxId={this.props.boxId}
                        partOfSpeech={this.props.partOfSpeech}
                        inputType="select"
                    />
                </div>
                <Meaning>
                    <Input
                        inputType="textarea"
                        changed={this.props.onValueOfDefinition}
                        definition={this.props.definition}
                        boxId={this.props.boxId}
                    />
                </Meaning>
                <Sentence>
                    {exampleSentence}
                    <button
                        className={classes.AddSentenceButton}
                        onClick={e => this.props.addSentence(e, this.props.boxId)}
                    >
                        Add Sentence
                    </button>
                </Sentence>
                {this.props.isLast && (
                    <Icon
                        color="secondary"
                        style={{ fontSize: 40, color: green[500] }}
                        onClick={this.props.addBox}
                        className={classes.Circle}
                    >
                        add_circle
                    </Icon>
                )}

                <div className={classes.CloseHolder}>
                    {this.props.numOfBoxes > 1 && (
                        <img
                            src={Close}
                            className={classes.Close}
                            alt="recycleBin"
                            onClick={e => this.props.deleteBox(e, this.props.boxId)}
                        />
                    )}
                </div>
            </div>
        );
    }
}
export default Box;
