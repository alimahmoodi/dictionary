import React from "react";
import Aux from "../../hoc/Auxiliary/Aux";

const Layout = props => {
    return (
        <Aux>
            <div>some Stuff,nav or ....</div>
            <main>{props.children}</main>
        </Aux>
    );
};

export default Layout;
