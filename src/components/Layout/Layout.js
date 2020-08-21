import React from "react";
import Aux from "../../hoc/Auxiliary/Auxiliary";

const Layout = props => {
    return (
        <Aux>
            <div>some Stuff,nav or ....</div>
            <main>{props.children}</main>
        </Aux>
    );
};

export default Layout;
