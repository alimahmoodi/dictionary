import React from "react";
import InputText from "../UI/Inputs/InputText";
import Box from "../MeanAndSentence/Box";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import classes from "./Form.module.css";
// import axios from "axios";

class Form extends React.Component {
    state = {
        word: "",
        results: [
            // {
            //     definition: "the act of making something (a product) from raw materials",
            //     partOfSpeech: "noun",
            //     examples: [
            //         "He manufactured a popular cereal",
            //         "this gland manufactures a specific substance only"
            //     ]
            // },
            // {
            //     definition: "the organized action of making of goods and services for sale",
            //     partOfSpeech: "noun",
            //     examples: ["this gland manufactures a specific substance only"]
            // }
        ]
    };

    deleteBoxHandler = (e, BoxId) => {
        let oldBox = [...this.state.results];
        oldBox.splice(BoxId, 1);
        this.setState({
            results: oldBox
        });
    };

    addSentenceHandler = (e, boxId) => {
        e.preventDefault();
        let copyOfResults = [...this.state.results];
        let copyOfBox = { ...copyOfResults[boxId] };
        let copyOfExamples = [...copyOfBox.examples];
        copyOfExamples.push("");
        copyOfResults[boxId].examples = copyOfExamples;
        this.setState({
            results: copyOfResults
        });
    };

    addBoxHandler = () => {
        let copyOfResults = [...this.state.results];
        let newBox = {
            definition: "",
            partOfSpeech: "noun",
            examples: []
        };
        copyOfResults.push(newBox);
        this.setState({
            results: copyOfResults
        });
    };

    deleteExampleHandler = (exampleId, boxId) => {
        let copyOfResults = [...this.state.results];
        let copyOfBox = { ...copyOfResults[boxId] };
        let copyOfExamples = [...copyOfBox.examples];
        copyOfExamples.splice(exampleId, 1);
        copyOfResults[boxId].examples = copyOfExamples;
        this.setState({
            results: copyOfResults
        });
    };

    typeOfVocabHandler = (e, boxId) => {
        let copyOfResults = [...this.state.results];
        let copyOfBox = { ...copyOfResults[boxId] };
        copyOfBox.partOfSpeech = e.target.value;
        copyOfResults[boxId] = copyOfBox;
        this.setState({
            results: copyOfResults
        });
    };

    exapleValueHandler = (e, exampleId, boxId) => {
        let copyOfResults = [...this.state.results];
        let copyOfBox = { ...copyOfResults[boxId] };
        let copyOfExamples = [...copyOfBox.examples];
        copyOfExamples[exampleId] = e.target.value;
        copyOfResults[boxId].examples = copyOfExamples;
        this.setState({
            results: copyOfResults
        });
    };

    vocabHandler = e => {
        this.setState({
            word: e.target.value
        });
    };

    valueOfDefinitionHandler = (e, boxId) => {
        let copyOfResults = [...this.state.results];
        let copyOfBox = { ...copyOfResults[boxId] };
        copyOfBox.definition = e.target.value;
        copyOfResults[boxId] = copyOfBox;
        this.setState({
            results: copyOfResults
        });
    };

    // sendDataHandler = e => {
    //     e.preventDefault();
    //     let vocabulary = {};

    //     vocabulary["vocab"] = this.state.vocab;
    //     this.state.boxspec.forEach(box => {
    //         let type = box[1];
    //         let sentences = box[2];
    //         let meaning = box[3];
    //         let mean = "mean";

    //         if (!(mean in vocabulary)) {
    //             vocabulary[mean] = {};
    //         }
    //         if (!vocabulary[mean].hasOwnProperty(type)) {
    //             console.log("nabood");
    //             vocabulary[mean][type] = {};
    //         }
    //         if (vocabulary[mean].hasOwnProperty(type)) {
    //             vocabulary[mean][type][meaning] = sentences;
    //         }
    //     });

    //     axios.post("https://dictionary-react.firebaseio.com/vocab.json", vocabulary).then(res => {
    //         console.log(res);
    //     });
    // };

    render() {
        let boxes = [];
        boxes = this.state.results.map((item, boxId) => {
            return (
                <Box
                    key={boxId}
                    boxId={boxId}
                    partOfSpeech={item.partOfSpeech}
                    definition={item.definition}
                    examples={item.examples}
                    addSentence={this.addSentenceHandler}
                    onChangeOfExapleValue={(e, exampleId) =>
                        this.exapleValueHandler(e, exampleId, boxId)
                    }
                    deleteExample={exampleId => this.deleteExampleHandler(exampleId, boxId)}
                    valueOfExample={item.examples}
                    onChangeTypeOfVocab={this.typeOfVocabHandler}
                    labelType={item.partOfSpeech}
                    deleteBox={this.deleteBoxHandler}
                    onValueOfDefinition={this.valueOfDefinitionHandler}
                />
            );
        });
        return (
            <Aux>
                <form>
                    <InputText onVocabChange={this.vocabHandler} />
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
