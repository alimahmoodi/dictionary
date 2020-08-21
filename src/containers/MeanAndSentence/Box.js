import React from "react";
import classes from "./Box.module.css";
import Meaning from "./Meaning/Meaning";
import Sentence from "./Sentence/Sentence";
import TextArea from "../UI/TextArea/TextArea";
import TextAreaMeaning from "../UI/TextArea/TextAreaMeaning";
import Select from "../UI/Select/Select";
import Close from "../../svg/close.svg";

class Box extends React.Component {
    render() {
        let Sentences = [...Array(this.props.numOfSentence)].map((item, i) => {
            return (
                <TextArea
                    key={i}
                    boxId={this.props.boxId}
                    sentenceId={i}
                    deleteSentence={this.props.deleteSentence}
                    valueOfTextArea={this.props.valueOfTextArea}
                />
            );
        });

        return (
            <div className={classes.Box}>
                <img
                    src={Close}
                    className={classes.Close}
                    alt="recycleBin"
                    onClick={e => this.props.deleteBox(e, this.props.boxId)}
                />
                <Select
                    typeOfVocab={this.props.typeOfVocab}
                    selectId={this.props.boxId}
                    selectValue={this.props.selectValue}
                />
                <Meaning labelType={this.props.labelType}>
                    <TextAreaMeaning
                        boxId={this.props.boxId}
                        valueOfMeaning={this.props.valueOfMeaning}
                        valueOfMeaning2Way={this.props.valueOfMeaning2Way}
                    />
                </Meaning>
                <Sentence>
                    {Sentences}
                    <button
                        className={classes.Button}
                        onClick={e => this.props.addSentence(e, this.props.boxId)}
                    >
                        Add Sentence
                    </button>
                </Sentence>
            </div>
        );
    }
}
export default Box;
