import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import { AuthContext } from "../../../context/AuthContext";
import './NavLinks.css';

const NavLinks = (props) => {
    const authContext = useContext(AuthContext);

    return (
        <ul className="nav-links">
            <li>
                <NavLink to="/" exact>
                    ALL USERS
                </NavLink>
            </li>
            {authContext.isAuthenticated && (
                <>
                    <li>
                        <NavLink to={`/${authContext.user?.id}/places`} exact>
                            MY PLACES
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/places/new">ADD PLACE</NavLink>
                    </li>
                </>
            )}
            <li>
                {authContext.isAuthenticated ? (
                    <div className="auth-nav">
                        <span className="user-name">Welcome, {authContext.user?.name}</span>
                        <button
                            className="nav-logout"
                            onClick={authContext.logout}
                        >
                            LOGOUT
                        </button>
                    </div>
                ) : (
                    <NavLink to="/auth">AUTHENTICATE</NavLink>
                )}
            </li>
        </ul>
    );
};

export default NavLinks;