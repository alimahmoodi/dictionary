import React from "react";
import classes from "./toolbar.module.css";
import { NavLink } from "react-router-dom";

const Toolbar = (props) => {
    let navigation = null;
    if (props.isAuth) {
        navigation = (
            <div className={classes.Toolbar}>
                <nav>
                    <ul className={classes.NavigationItems}>
                        <li>
                            <NavLink
                                exact
                                to="/EnterByMe"
                                className={classes.NavLink}
                                activeClassName={classes.active}
                            >
                                Enter By Me
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
                        <li>
                            <NavLink
                                exact
                                to="/logout"
                                className={classes.NavLink}
                                activeClassName={classes.active}
                            >
                                LogOut
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }
    return navigation;
};

export default Toolbar;
