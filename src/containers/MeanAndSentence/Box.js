import React from "react";
import classes from "./Box.module.css";
import Meaning from "./Meaning/Meaning";
import Sentence from "./Sentence/Sentence";
import TextArea from "../UI/TextArea/TextArea";
import TextAreaMeaning from "../UI/TextArea/TextAreaMeaning";
import Select from "../UI/Select/Select";
import Close from "../../svg/close.svg";
import Icon from "@material-ui/core/Icon";
import { green } from "@material-ui/core/colors";

class Box extends React.Component {
    render() {
        let exampleSentence = this.props.examples.map((item, id) => {
            return (
                <TextArea
                    key={id}
                    deleteExample={this.props.deleteExample}
                    exampleId={id}
                    onChangeOfExapleValue={this.props.onChangeOfExapleValue}
                    valueOfExample={item}
                />
            );
        });

        return (
            <div className={classes.Box}>
                {this.props.numOfBoxes > 1 && (
                    <img
                        src={Close}
                        className={classes.Close}
                        alt="recycleBin"
                        onClick={e => this.props.deleteBox(e, this.props.boxId)}
                    />
                )}
                <Select
                    onChangeTypeOfVocab={e => this.props.onChangeTypeOfVocab(e, this.props.boxId)}
                    boxId={this.props.boxId}
                    partOfSpeech={this.props.partOfSpeech}
                />
                <Meaning labelType={this.props.labelType}>
                    <TextAreaMeaning
                        boxId={this.props.boxId}
                        onValueOfDefinition={this.props.onValueOfDefinition}
                        definition={this.props.definition}
                    />
                </Meaning>
                <Sentence>
                    {exampleSentence}
                    <button
                        className={classes.Button}
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
            </div>
        );
    }
}
export default Box;
