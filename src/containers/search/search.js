import React, { useState, useEffect, useRef, Fragment } from "react";
import TextInput from "../../components/UI/Input/textInput/textInput";
import FindedVocabs from "../../components/findedVocabs/findedVocabs";
import Spinner from "../../components/UI/spinner/spinner";
import classes from "./search.module.css";
// import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Axios from "axios";
import { connect } from "react-redux";
const Search = (props) => {
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
                    searchValue.length === 0
                        ? ""
                        : "?auth=" + props.token + '&orderBy="word"&equalTo="' + searchValue + '"';

                Axios.get(`https://dictionary-react.firebaseio.com/${props.userId}.json` + query)
                    .then((res) => {
                        console.log(res);
                        setLoading(false);
                        setResponse(res.data);
                        setInputTouched(true);
                    })
                    .catch((err) => {
                        console.log(err);
                        setLoading(false);
                        setError(err.message);
                    });

                // fetch(`https://dictionary-react.firebaseio.com/${props.userId}.json` + query, {
                //     method: "GET",
                //     headers: {
                //         "Content-Type": "application/json",
                //     },
                // })
                //     .then((response) => {
                //         return response.json();
                //     })
                //     .then((res) => {
                //         console.log(res);
                //         setLoading(false);
                //         setResponse(res);
                //         setInputTouched(true);
                //     })
                //     .catch((err) => {
                //         console.log(err);
                //         setLoading(false);
                //         setError(err.message);
                //     });
            }
        }, 500);
        return () => {
            clearTimeout(timer);
        };
    }, [searchValue, inputValueRef, props.token, props.userId]);
    useEffect(() => {
        if (searchValue.length === 0) {
            setInputTouched(false);
        }
    }, [searchValue.length]);

    const inputChangeHandler = (e) => {
        setSearchValue(e.target.value);
    };

    return (
        <Fragment>
            <div className={classes.InputWrapper}>
                <TextInput
                    inputValueRef={inputValueRef}
                    inputType="text-input"
                    placeholder="Search"
                    onChangeOfTextInput={(e) => inputChangeHandler(e)}
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

const mapStateToProps = (state) => {
    return {
        token: state.token,
        userId: state.userId,
    };
};

export default connect(mapStateToProps)(Search);
//(withErrorHandler(Search, Axios))
