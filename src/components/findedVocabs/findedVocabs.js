import React, { useState, useEffect, Fragment } from "react";
import classes from "./findedVocabs.module.css";

const FindedVocabs = props => {
    const [vocabDefinitions, setvocabDefinitions] = useState([]);
    const [notFound, setNotFound] = useState(false);
    const [enterSomeThing, setEnterSomething] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let result = [];
        if (props.errorMessage) {
            console.log("-1");
            setvocabDefinitions([]);
            setNotFound(false);
            setEnterSomething(false);
            setError(false);
            setLoading(false);
            setError(props.errorMessage);
        } else if (props.loadingStatus) {
            console.log("0");
            setNotFound(false);
            setEnterSomething(false);
            setError(false);
            setLoading(true);
        } else if (
            Object.keys(props.searchResponse).length === 0 &&
            props.Touched &&
            props.filled.length > 0
        ) {
            console.log("1");
            setvocabDefinitions([]);
            setNotFound(true);
            setEnterSomething(false);
            setError(false);
        } else if (Object.keys(props.searchResponse).length === 0 && props.filled.length === 0) {
            console.log("2");
            setvocabDefinitions([]);
            setEnterSomething(true);
            setNotFound(false);
            setError(false);
        } else if (Object.keys(props.searchResponse).length > 0) {
            console.log("3");
            setNotFound(false);
            setEnterSomething(false);
            setError(false);
            setLoading(false);
            console.log(props.searchResponse);
            for (let id in props.searchResponse) {
                const word = props.searchResponse[id].word;
                const def = props.searchResponse[id].results.map((item, id) => {
                    return (
                        <Fragment key={id}>
                            <div className={classes.YellowLine}></div>
                            <span className={classes.WordType}>{item.partOfSpeech}</span>
                            <p className={classes.Definition}>{item.definition}</p>
                            {item.examples &&
                                item.examples.map((item, id) => {
                                    return (
                                        <p className={classes.Example} key={id}>
                                            -{item}
                                        </p>
                                    );
                                })}
                        </Fragment>
                    );
                });
                result.push(
                    <div className={classes.Wrapper} key={id}>
                        <h3 className={classes.MainVocab}>{word}</h3>
                        {def}
                    </div>
                );
                setvocabDefinitions(result);
            }
        }
    }, [
        props.searchResponse,
        props.filled,
        props.Touched,
        props.errorMessage,
        props.loading,
        props.loadingStatus
    ]);

    let vocabFindedBox = null;
    if (enterSomeThing) {
        vocabFindedBox = <p className={classes.NotFound}>enter what you want</p>;
    } else if (notFound) {
        vocabFindedBox = <p className={classes.NotFound}>Vocab Not Found</p>;
    } else if (error) {
        vocabFindedBox = <p className={classes.NotFound}>{props.errorMessage}</p>;
    } else if (loading) {
        vocabFindedBox = null;
    } else {
        vocabFindedBox = vocabDefinitions;
    }

    return vocabFindedBox;
};

export default FindedVocabs;
