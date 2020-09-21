import React from "react";
import classes from "./register.module.css";

const Register = (props) => {
    return (
        <div className={classes.Back}>
            <div className={classes.LogInHolder}>{props.children}</div>
        </div>
    );
};

export default Register;
