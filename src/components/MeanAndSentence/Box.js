import React from "react";
import classes from "./Box.module.css";
import Meaning from "./Meaning/Meaning";
import Sentence from "./Sentence/Sentence";
import Close from "../../svg/close.svg";
import Icon from "@material-ui/core/Icon";
import { green } from "@material-ui/core/colors";
import InputLabel from "../UI/Label/InputLabel";

import SelectInput from "../UI/Input/selectInput/selectInput";
import TextArea from "../UI/Input/textarea/textarea";
import TextAreaWithDelete from "../UI/Input/textAreaWithDelete/textAreaWithDelete";

class Box extends React.Component {
    render() {
        let exampleSentence = this.props.examples.map((item, id) => {
            return (
                <TextAreaWithDelete
                    key={id}
                    deleteExample={this.props.deleteExample}
                    exampleId={id}
                    onChangeOfExapleValue={this.props.onChangeOfExapleValue}
                    valueOfExample={item.expValue}
                    isValid={item.isValid}
                    isTouched={item.isTouched}
                    exampleOverAllSend={item.exampleOverAllSend}
                    overAllValid={this.props.overAllValid}
                />
            );
        });

        return (
            <div className={classes.Box}>
                <div className={classes.selectWrapper}>
                    <InputLabel>Select Type Of Word</InputLabel>
                    <SelectInput
                        onChangeTypeOfVocab={e =>
                            this.props.onChangeTypeOfVocab(e, this.props.boxId)
                        }
                        boxId={this.props.boxId}
                        partOfSpeech={this.props.partOfSpeech}
                    />
                </div>
                <Meaning>
                    <TextArea
                        onChangeOfDefinitionValue={this.props.onChangeOfDefinitionValue}
                        definitionValue={this.props.definitionValue}
                        definitionIsTouched={this.props.definitionIsTouched}
                        definitionIsValid={this.props.definitionIsValid}
                        boxId={this.props.boxId}
                        overAllValid={this.props.overAllValid}
                        definitionOverAllSend={this.props.definitionOverAllSend}
                    />
                </Meaning>
                <Sentence>
                    {exampleSentence}
                    <button
                        className={classes.AddSentenceButton}
                        onClick={e => this.props.addSentence(e, this.props.boxId)}
                    >
                        Add Example Sentence
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
