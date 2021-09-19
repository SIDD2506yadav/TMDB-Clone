import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Navbar-styles.css";
import { Link } from "react-router-dom";
import ClearIcon from "@material-ui/icons/Clear";
import { Search } from "@material-ui/icons";

const Navbar = () => {
    const [crossShown, setCrossShown] = useState(false);
    const [searchText, setSearchText] = useState("");
    const history = useHistory();

    const handleCross = () => {
        setCrossShown(!crossShown);
    };

    const handleSubmit = (e) => {
        if (searchText.length > 0) {
            history.push(`/search?search=${searchText}`);
        }
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container container-fluid">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarTogglerDemo02"
                        aria-controls="navbarTogglerDemo02"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <Link to="/" className="navbar-brand">
                        <img
                            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
                            alt=""
                            width="80"
                            height="40"
                            className="d-inline-block align-text-top"
                        ></img>
                    </Link>

                    <div
                        className="collapse navbar-collapse"
                        id="navbarTogglerDemo02"
                    >
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
                        {crossShown ? (
                            <ClearIcon
                                className={`d-flex navbar_crossIcon`}
                                onClick={handleCross}
                            />
                        ) : (
                            <Search
                                className={`d-flex navbar_searchIcon`}
                                onClick={handleCross}
                            />
                        )}
                    </div>
                </div>
            </nav>
            <div
                className={`navbar_searchBox container ${
                    crossShown ? "" : "navbar_searchNotShown"
                }`}
            >
                <input
                    type="text"
                    placeholder="Search here...."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <Search onClick={handleSubmit} className="navbar_sendSearch" />
                <ClearIcon
                    onClick={handleCross}
                    className="navbar_searchCross"
                />
            </div>
        </>
    );
};

export default Navbar;
