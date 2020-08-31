import React from "react";
import classes from "./toolbar.module.css";
import { NavLink } from "react-router-dom";

const Toolbar = props => {
    return (
        <div className={classes.Toolbar}>
            <nav>
                <ul className={classes.NavigationItems}>
                    <li>
                        <NavLink
                            exact
                            to="/"
                            className={classes.NavLink}
                            activeClassName={classes.active}
                        >
                            Enter By Me
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            exact
                            to="/useapi"
                            className={classes.NavLink}
                            activeClassName={classes.active}
                        >
                            Use Api
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            exact
                            to="/search"
                            className={classes.NavLink}
                            activeClassName={classes.active}
                        >
                            Search
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Toolbar;
