import React from "react";
import Box from "../../components/MeanAndSentence/Box";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import classes from "./Form.module.css";
import axios from "axios";
import Spinner from "../../components/UI/spinner/spinner";
import TextInput from "../../components/UI/Input/textInput/textInput";
import Label from "../../components/UI/Label/InputLabel";

class Form extends React.Component {
    state = {
        word: "",
        results: [
            {
                definition: "",
                partOfSpeech: "noun",
                examples: [],
                isLast: true,
                definitionIsValid: false,
                definitionIsTouched: false,
                definitionsOverAllSend: false
            }
        ],
        loading: false,
        error: null,
        wordIsValid: false,
        wordIsTouched: false,
        overAllValid: false,
        wordOverAllSend: false,
        formOverAllSend: false
    };

    deleteBoxHandler = (e, BoxId) => {
        let copyOfResults = [...this.state.results];
        copyOfResults.splice(BoxId, 1);
        console.log(copyOfResults);
        const resultsLength = copyOfResults.length;
        if (resultsLength > 0 && copyOfResults[resultsLength - 1].isLast === false) {
            copyOfResults[resultsLength - 1].isLast = true;
        }
        const totalValidation = this.overallValidityCheck(copyOfResults);
        this.setState({
            results: copyOfResults,
            overAllValid: totalValidation
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
            isLast: true,
            definitionIsValid: false,
            definitionIsTouched: false,
            overAllSend: false
        };
        copyOfResults.push(newBox);
        const totalValidation = this.overallValidityCheck(copyOfResults);
        this.setState({
            results: copyOfResults,
            overAllValid: totalValidation
        });
    };

    addExampleHandler = (e, boxId) => {
        e.preventDefault();
        let copyOfResults = [...this.state.results];
        let copyOfBox = { ...copyOfResults[boxId] };
        let copyOfExamples = [...copyOfBox.examples];
        copyOfExamples.push({
            expValue: "",
            isValid: false,
            isTouched: false,
            exampleOverAllSend: false
        });
        copyOfResults[boxId].examples = copyOfExamples;
        const totalValidation = this.overallValidityCheck(copyOfResults);
        this.setState({
            results: copyOfResults,
            overAllValid: totalValidation
        });
    };

    deleteExampleHandler = (exampleId, boxId) => {
        let copyOfResults = [...this.state.results];
        let copyOfBox = { ...copyOfResults[boxId] };
        let copyOfExamples = [...copyOfBox.examples];
        copyOfExamples.splice(exampleId, 1);
        copyOfResults[boxId].examples = copyOfExamples;
        const totalValidation = this.overallValidityCheck(copyOfResults);
        this.setState({
            results: copyOfResults,
            overAllValid: totalValidation
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

    valueOfExampleHandler = (e, exampleId, boxId) => {
        let copyOfResults = [...this.state.results];
        let copyOfBox = { ...copyOfResults[boxId] };
        let copyOfExamples = [...copyOfBox.examples];
        let editedExample = { ...copyOfExamples[exampleId] };
        editedExample.expValue = e.target.value;
        editedExample.isTouched = true;

        editedExample.isValid = editedExample.expValue.trim() === "" ? false : true;
        copyOfResults[boxId].examples[exampleId] = editedExample;

        const totalValidation = this.overallValidityCheck(copyOfResults);

        this.setState({
            results: copyOfResults,
            overAllValid: totalValidation
        });
    };

    valueOfDefinitionHandler = (e, boxId) => {
        let copyOfResults = [...this.state.results];
        let copyOfBox = { ...copyOfResults[boxId] };
        copyOfBox.definition = e.target.value;
        copyOfBox.definitionIsTouched = true;

        copyOfBox.definitionIsValid = copyOfBox.definition.trim() === "" ? false : true;
        copyOfResults[boxId] = copyOfBox;
        const totalValidation = this.overallValidityCheck(copyOfResults);
        this.setState({
            results: copyOfResults,
            overAllValid: totalValidation
        });
    };

    vocabHandler = e => {
        let copyOfResults = [...this.state.results];
        const wordValidation = e.target.value.trim() === "" ? false : true;
        let totalValidation = this.overallValidityCheck(copyOfResults, wordValidation);
        totalValidation = totalValidation && wordValidation;
        this.setState({
            word: e.target.value,
            wordIsTouched: true,
            wordIsValid: wordValidation,
            overAllValid: totalValidation
        });
    };

    overallValidityCheck = (copyOfResults, wordValidation) => {
        let valid = true;
        if (wordValidation) {
            valid = valid && wordValidation;
        } else {
            valid = valid && this.state.wordIsValid;
        }

        copyOfResults.forEach(item => {
            if (item.definitionIsValid === false) {
                valid = false;
            }
            item.examples.forEach(item => {
                if (item.isValid === false) {
                    valid = false;
                }
            });
        });
        return valid;
    };

    sendDataHandler = e => {
        e.preventDefault();
        let copyOfResults = [...this.state.results];
        copyOfResults.forEach(item => {
            item.definitionsOverAllSend = true;
            item.examples.forEach(item => {
                item.exampleOverAllSend = true;
            });
        });
        this.setState({
            loading: true,
            overAllSend: false,
            results: copyOfResults,
            error: null,
            formOverAllSend: false,
            wordOverAllSend: false
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

        if (this.state.overAllValid) {
            axios
                .post("https://dictionary-react.firebaseio.com/vocab.json", completeData)
                .then(() => {
                    let copyOfResults = [...this.state.results];
                    copyOfResults.splice(1, copyOfResults.length - 1);
                    copyOfResults[copyOfResults.length - 1].isLast = true;
                    copyOfResults[copyOfResults.length - 1].examples.splice(
                        0,
                        copyOfResults[copyOfResults.length - 1].examples.length
                    );
                    copyOfResults[0].definition = "";
                    copyOfResults[0].definitionIsValid = false;
                    copyOfResults[0].definitionIsTouched = false;
                    copyOfResults[0].definitionsOverAllSend = false;
                    this.setState({
                        loading: false,
                        word: "",
                        results: copyOfResults,
                        wordIsValid: false,
                        wordIsTouched: false,
                        overAllValid: false,
                        wordOverAllSend: false
                    });
                })
                .catch(err => {
                    this.setState({ error: err.message, loading: false });
                });
        } else {
            let copyOfResults = [...this.state.results];
            copyOfResults.forEach(item => {
                item.definitionsOverAllSend = true;
                item.examples.forEach(item => {
                    item.exampleOverAllSend = true;
                });
            });
            this.setState({
                loading: false,
                wordOverAllSend: true,
                results: copyOfResults,
                formOverAllSend: true
            });
        }
    };

    render() {
        let boxes = [];
        boxes = this.state.results.map((item, boxId) => {
            return (
                <Box
                    key={boxId}
                    boxId={boxId}
                    definitionIsValid={item.definitionIsValid}
                    definitionIsTouched={item.definitionIsTouched}
                    definitionOverAllSend={item.definitionsOverAllSend}
                    overAllValid={this.state.overAllValid}
                    examples={item.examples}
                    addSentence={this.addExampleHandler}
                    labelType={item.partOfSpeech}
                    isLast={item.isLast}
                    deleteExample={exampleId => this.deleteExampleHandler(exampleId, boxId)}
                    deleteBox={this.deleteBoxHandler}
                    addBox={this.addBoxHandler}
                    numOfBoxes={this.state.results.length}
                    partOfSpeech={item.partOfSpeech}
                    definitionValue={item.definition}
                    valueOfExample={item.examples}
                    onChangeOfExapleValue={(e, exampleId) =>
                        this.valueOfExampleHandler(e, exampleId, boxId)
                    }
                    onChangeTypeOfVocab={this.typeOfVocabHandler}
                    onChangeOfDefinitionValue={this.valueOfDefinitionHandler}
                    overAllSend={this.state.overAllSend}
                />
            );
        });

        let errorMessage = this.state.formOverAllSend ? (
            <p className={classes.EmptyMessage}>fill empty inputs</p>
        ) : this.state.error ? (
            <p className={classes.EmptyMessage}>{this.state.error}</p>
        ) : null;
        return (
            <Aux>
                <form>
                    <div className={classes.InputContainer}>
                        <Label additionClass="Align">word:</Label>
                        <TextInput
                            wordIsTouched={this.state.wordIsTouched}
                            wordIsValid={this.state.wordIsValid}
                            onChangeOfTextInput={this.vocabHandler}
                            placeholder="Enter Word..."
                            textInputValue={this.state.word}
                            overAllValid={this.state.overAllValid}
                            wordOverAllSend={this.state.wordOverAllSend}
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
                {errorMessage}
            </Aux>
        );
    }
}

export default Form;
