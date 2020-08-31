import React, { useState, useEffect, Fragment } from "react";
import classes from "./findedVocabs.module.css";

const FindedVocabs = props => {
    const [vocabDefinitions, setvocabDefinitions] = useState([]);
    const [loading, setLoading] = useState(null);

    useEffect(() => {
        let result = [];
        if (Object.keys(props.searchResponse).length === 0) {
            setvocabDefinitions([]);
        } else {
            for (let id in props.searchResponse) {
                const word = props.searchResponse[id].word;
                const def = props.searchResponse[id].results.map((item, id) => {
                    return (
                        <Fragment key={id}>
                            <span className={classes.WordType}>{item.partOfSpeech}</span>
                            <div className={classes.YellowLine}></div>
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
    }, [props.searchResponse]);

    useEffect(() => {
        setLoading(props.loading);
    }, [props.loading]);

    return loading ? <div className={classes.ResultBox}>loading...</div> : vocabDefinitions;
};

export default FindedVocabs;
