import React, { useState, useEffect, useRef, Fragment } from "react";
import Input from "../../components/UI/Input/Input";
import FindedVocabs from "../../components/findedVocabs/findedVocabs";
const Search = props => {
    const [searchValue, setSearchValue] = useState("");
    const [response, setResponse] = useState({});
    const [loading, setLoading] = useState(false);
    const inputValueRef = useRef();
    useEffect(() => {
        setTimeout(() => {
            if (
                searchValue === inputValueRef.current.value &&
                inputValueRef.current.value.trim() !== ""
            ) {
                setLoading(true);
                let query =
                    searchValue.length === 0 ? "" : `?orderBy="word"&equalTo="${searchValue}"`;

                fetch("https://dictionary-react.firebaseio.com/vocab.json" + query)
                    .then(response => {
                        return response.json();
                    })
                    .then(res => {
                        setLoading(false);
                        setResponse(res);
                        // console.log(res);
                    })
                    .catch(err => {
                        setLoading(false);
                        console.log(err);
                    });
            }
        }, 500);
    }, [searchValue, inputValueRef]);
    return (
        <Fragment>
            <div>
                <Input
                    inputValueRef={inputValueRef}
                    inputType="text-input"
                    placeholder="Search"
                    changed={e => setSearchValue(e.target.value)}
                    textInputValue={searchValue}
                />
            </div>

            <FindedVocabs searchResponse={response} loading={loading} />
        </Fragment>
    );
};

export default Search;
