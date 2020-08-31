import React from "react";
import Aux from "../../hoc/Auxiliary/Auxiliary";
import Toolbar from "../toolbar/toolbar";

const Layout = props => {
    return (
        <Aux>
            <div>
                <Toolbar></Toolbar>
            </div>
            <main>{props.children}</main>
        </Aux>
    );
};

export default Layout;
