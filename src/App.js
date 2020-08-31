import React from "react";
import Layout from "./components/Layout/Layout";
import FormBuilder from "./containers/formBuilder/formBuilder";
import Search from "./containers/search/search";
import { Switch, Route } from "react-router-dom";

function App() {
    return (
        <Layout>
            <Switch>
                <Route path="/search" exact component={Search} />
                <Route path="/" exact component={FormBuilder} />
            </Switch>
        </Layout>
    );
}

export default App;
