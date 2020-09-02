import React, { useEffect, Fragment, useReducer } from "react";
import classes from "./findedVocabs.module.css";
const ACTION = {
    Set_Error_Message: "setErrorMessage",
    Set_Loading_Status: "setLoadingStatus",
    Set_Not_Found: "setNotFound",
    Set_Enter_Something: "setEnterSomething",
    Set_Vocab_Definitions_1: "setVocabDefinitions1",
    Set_Vocab_Definitions_2: "setVocabDefinitions2"
};
const reducer = (state, action) => {
    switch (action.type) {
        case ACTION.Set_Error_Message:
            return {
                vocabDefinitions: [],
                notFound: false,
                enterSomeThing: false,
                error: action.payload.errorMeesage,
                loading: false
            };
        case ACTION.Set_Loading_Status:
            return {
                vocabDefinitions: [],
                notFound: false,
                enterSomeThing: false,
                error: false,
                loading: true
            };
        case ACTION.Set_Not_Found:
            return {
                vocabDefinitions: [],
                notFound: true,
                enterSomeThing: false,
                error: false,
                loading: false
            };
        case ACTION.Set_Enter_Something:
            return {
                vocabDefinitions: [],
                notFound: false,
                enterSomeThing: true,
                error: false,
                loading: false
            };
        case ACTION.Set_Vocab_Definitions_1:
            return {
                vocabDefinitions: [],
                notFound: false,
                enterSomeThing: false,
                error: false,
                loading: false
            };
        case ACTION.Set_Vocab_Definitions_2:
            return {
                vocabDefinitions: [...action.payload.data],
                notFound: false,
                enterSomeThing: false,
                error: false,
                loading: false
            };
    }
};

const FindedVocabs = props => {
    const [state, dispatch] = useReducer(reducer, {
        vocabDefinitions: [],
        notFound: false,
        enterSomeThing: false,
        error: false,
        loading: false
    });

    useEffect(() => {
        let result = [];
        if (props.errorMessage) {
            dispatch({
                type: ACTION.Set_Error_Message,
                payload: { errorMeesage: props.errorMessage }
            });
        } else if (props.loadingStatus) {
            dispatch({ type: ACTION.Set_Loading_Status });
        } else if (
            Object.keys(props.searchResponse).length === 0 &&
            props.Touched &&
            props.filled.length > 0
        ) {
            dispatch({ type: ACTION.Set_Not_Found });
        } else if (props.filled.length === 0) {
            dispatch({ type: ACTION.Set_Enter_Something });
        } else if (Object.keys(props.searchResponse).length > 0) {
            dispatch({ type: ACTION.Set_Vocab_Definitions_1 });

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
                dispatch({ type: ACTION.Set_Vocab_Definitions_2, payload: { data: result } });
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
    if (state.enterSomeThing) {
        vocabFindedBox = <p className={classes.NotFound}>enter what you want</p>;
    } else if (state.notFound) {
        vocabFindedBox = <p className={classes.NotFound}>Vocab Not Found</p>;
    } else if (state.error) {
        vocabFindedBox = <p className={classes.NotFound}>{props.errorMessage}</p>;
    } else if (state.loading) {
        vocabFindedBox = null;
    } else {
        vocabFindedBox = state.vocabDefinitions;
    }

    return vocabFindedBox;
};

export default FindedVocabs;
