import React, { useState, useEffect, useRef, Fragment } from "react";
import TextInput from "../../components/UI/Input/textInput/textInput";
import FindedVocabs from "../../components/findedVocabs/findedVocabs";
import Spinner from "../../components/UI/spinner/spinner";
import classes from "./search.module.css";
const Search = () => {
    const [searchValue, setSearchValue] = useState("");
    const [response, setResponse] = useState({});
    const [loading, setLoading] = useState(false);
    const [inputTouched, setInputTouched] = useState(false);
    const [error, setError] = useState(false);
    const inputValueRef = useRef();
    useEffect(() => {
        const timer = setTimeout(() => {
            if (
                searchValue === inputValueRef.current.value &&
                inputValueRef.current.value.trim() !== ""
            ) {
                setLoading(true);
                setError(false);
                let query =
                    searchValue.length === 0 ? "" : `?orderBy="word"&equalTo="${searchValue}"`;

                fetch("https://dictionary-react.firebaseio.com/vocab.json" + query)
                    .then(response => {
                        return response.json();
                    })
                    .then(res => {
                        setLoading(false);
                        setResponse(res);
                        setInputTouched(true);
                    })
                    .catch(err => {
                        setLoading(false);
                        setError(err.message);
                    });
            }
        }, 500);
        return () => {
            clearTimeout(timer);
        };
    }, [searchValue, inputValueRef]);
    useEffect(() => {
        if (searchValue.length === 0) {
            setInputTouched(false);
        }
    }, [searchValue.length]);

    const inputChangeHandler = e => {
        setSearchValue(e.target.value);
    };

    return (
        <Fragment>
            <div className={classes.InputWrapper}>
                <TextInput
                    inputValueRef={inputValueRef}
                    inputType="text-input"
                    placeholder="Search"
                    onChangeOfTextInput={e => inputChangeHandler(e)}
                    textInputValue={searchValue}
                />
                <div className={classes.SpinnerWrapper}>{loading ? <Spinner /> : null}</div>
            </div>

            <FindedVocabs
                searchResponse={response}
                Touched={inputTouched}
                filled={searchValue}
                errorMessage={error}
                loadingStatus={loading}
            />
        </Fragment>
    );
};

export default Search;
