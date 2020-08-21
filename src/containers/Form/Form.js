import React from "react";
import InputText from "../UI/Inputs/InputText";
import Box from "../MeanAndSentence/Box";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import classes from "./Form.module.css";
import axios from "axios";

class Form extends React.Component {
    state = {
        //[numOfSentences , 'type of vocab' ,['value of sentence 1', ''value od sentence 2',..] ,'meaning of vocab']
        boxspec: [],
        vocab: ""
    };
    addBoxHandler = () => {
        let oldBoxspec = [...this.state.boxspec];
        oldBoxspec.push([0, "", [], ""]);
        this.setState({
            boxspec: oldBoxspec
        });
    };
    deleteBoxHandler = (e, BoxId) => {
        let oldBoxspec = [...this.state.boxspec];
        oldBoxspec.splice(BoxId, 1);
        this.setState({
            boxspec: oldBoxspec
        });
    };

    addSentenceHandler = (e, BoxId) => {
        e.preventDefault();
        let oldNum = this.state.boxspec[BoxId][0];
        let updatedNum = oldNum + 1;
        let oldSentenceValue = this.state.boxspec[BoxId][2];
        oldSentenceValue.push("");
        let updatedBoxspec = [...this.state.boxspec];
        updatedBoxspec[BoxId][0] = updatedNum;
        updatedBoxspec[BoxId][2] = oldSentenceValue;

        this.setState({
            boxspec: updatedBoxspec
        });
    };
    deleteSentenceHandler = (e, BoxId, sentenceId) => {
        e.preventDefault();
        let oldNum = this.state.boxspec[BoxId][0];
        let oldSentenceValue = this.state.boxspec[BoxId][2];
        oldSentenceValue.splice(sentenceId, 1);
        let updatedNum = oldNum - 1;
        let updatedBoxspec = [...this.state.boxspec];

        updatedBoxspec[BoxId][0] = updatedNum;
        updatedBoxspec[BoxId][2] = oldSentenceValue;
        this.setState({
            boxspec: updatedBoxspec
        });
    };

    typeOfVocabHandler = (e, BoxId) => {
        let updatedBoxspec = [...this.state.boxspec];
        updatedBoxspec[BoxId][1] = e.target.value;
        this.setState({
            boxspec: updatedBoxspec
        });
    };

    valueOfTextAreaHandler = (e, BoxId, sentenceId) => {
        let updatedBoxspec = [...this.state.boxspec];
        updatedBoxspec[BoxId][2][sentenceId] = e.target.value;
        this.setState({
            boxspec: updatedBoxspec
        });
    };

    valueOfMeaningHandler = (e, boxId) => {
        let Meaning = this.state.boxspec[boxId][3];
        Meaning = e.target.value;
        let updatedBoxspec = [...this.state.boxspec];
        updatedBoxspec[boxId][3] = Meaning;
        this.setState({
            boxspec: updatedBoxspec
        });
    };

    sendDataHandler = e => {
        e.preventDefault();
        let vocabulary = {};

        vocabulary["vocab"] = this.state.vocab;
        this.state.boxspec.forEach(box => {
            let type = box[1];
            let sentences = box[2];
            let meaning = box[3];
            let mean = "mean";

            if (!(mean in vocabulary)) {
                vocabulary[mean] = {};
            }
            if (!vocabulary[mean].hasOwnProperty(type)) {
                console.log("nabood");
                vocabulary[mean][type] = {};
            }
            if (vocabulary[mean].hasOwnProperty(type)) {
                vocabulary[mean][type][meaning] = sentences;
            }
        });

        axios.post("https://dictionary-react.firebaseio.com/vocab.json", vocabulary).then(res => {
            console.log(res);
        });
    };

    mainVocab = e => {
        this.setState({
            vocab: e.target.value
        });
    };

    render() {
        let boxes = [];
        boxes = this.state.boxspec.map((item, i) => {
            return (
                <Box
                    key={i}
                    boxId={i}
                    numOfSentence={item[0]}
                    addSentence={this.addSentenceHandler}
                    deleteSentence={this.deleteSentenceHandler}
                    typeOfVocab={this.typeOfVocabHandler}
                    labelType={item[1]}
                    deleteBox={this.deleteBoxHandler}
                    valueOfTextArea={this.valueOfTextAreaHandler}
                    valueOfMeaning={this.valueOfMeaningHandler}
                    valueOfMeaning2Way={item[3]}
                    selectValue={item[1]}
                />
            );
        });
        return (
            <Aux>
                <form>
                    <InputText vocab={this.mainVocab} />
                    {boxes}
                </form>
                <div className={classes.ButtonDiv}>
                    <button className={classes.Button} onClick={this.addBoxHandler}>
                        Add another Box
                    </button>

                    <button className={classes.Button} onClick={this.sendDataHandler}>
                        submit form
                    </button>
                </div>
            </Aux>
        );
    }
}

export default Form;
