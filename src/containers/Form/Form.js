import React from "react";
// import InputText from "../UI/Inputs/InputText";
import Box from "../../components/MeanAndSentence/Box";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import classes from "./Form.module.css";
import axios from "axios";
import Spinner from "../../components/UI/spinner/spinner";
import Input from "../../components/UI/Input/Input";

class Form extends React.Component {
    state = {
        word: "",
        results: [
            {
                definition: "",
                partOfSpeech: "noun",
                examples: [],
                isLast: true
            }
        ],
        loading: false,
        error: null
    };

    deleteBoxHandler = (e, BoxId) => {
        let copyOfResults = [...this.state.results];
        copyOfResults.splice(BoxId, 1);
        console.log(copyOfResults);
        const resultsLength = copyOfResults.length;
        if (resultsLength > 0 && copyOfResults[resultsLength - 1].isLast === false) {
            copyOfResults[resultsLength - 1].isLast = true;
        }
        this.setState({
            results: copyOfResults
        });
    };
    checkForLast = () => {};

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
        copyOfResults.forEach(item => {
            item.isLast = false;
        });
        let newBox = {
            definition: "",
            partOfSpeech: "noun",
            examples: [],
            isLast: true
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

    sendDataHandler = e => {
        e.preventDefault();
        this.setState({
            loading: true
        });
        let completeData = {
            word: this.state.word
        };
        const data = this.state.results.map(item => {
            return {
                definition: item.definition,
                examples: item.examples,
                partOfSpeech: item.partOfSpeech
            };
        });

        completeData.results = data;

        axios
            .post("https://dictionary-react.firebaseio.com/vocab.json", completeData)
            .then(() => {
                let copyOfResults = [...this.state.results];
                copyOfResults.splice(1, copyOfResults.length - 1);
                copyOfResults[copyOfResults.length - 1].isLast = true;
                this.setState({
                    loading: false,
                    word: "",
                    results: copyOfResults
                });
            })
            .catch(err => {
                this.setState({ error: err.message, loading: false });
            });
    };

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
                    isLast={item.isLast}
                    addBox={this.addBoxHandler}
                    numOfBoxes={this.state.results.length}
                />
            );
        });
        return (
            <Aux>
                <form>
                    <div className={classes.InputContainer}>
                        <Input
                            inputType="text-input"
                            changed={this.vocabHandler}
                            placeholder="Vocab..."
                            textInputValue={this.state.word}
                        />
                    </div>

                    {boxes}
                </form>
                <div className={classes.ButtonDiv}>
                    <button className={classes.Button} onClick={this.sendDataHandler}>
                        <span>submit form</span>
                        {this.state.loading ? <Spinner /> : null}
                    </button>
                </div>
            </Aux>
        );
    }
}

export default Form;
