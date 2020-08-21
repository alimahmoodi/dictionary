import React from "react";
import classes from "./formBuilder.module.css";
import Form from "../Form/Form";

class FormBuilder extends React.Component {
    render() {
        return (
            <div className={classes.FormBuilder}>
                <Form />
            </div>
        );
    }
}

export default FormBuilder;
