import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./HeroImage-styles.css";
import { useHomeFetch } from "../../hooks/useHomeFetch";
import { BACKDROP_SIZE, IMAGE_BASE_URL } from "../../config";

const HeroImage = () => {
    const [search, setSearch] = useState("");
    const history = useHistory();
    const { state } = useHomeFetch("popular", "movie");

    const handleSearch = () => {
        if (search.length > 0) {
            history.push(`/search?search=${search}`);
        }
    };
    // console.log("movies are", state);
    return (
        <div
            className="container heroImage"
            style={{
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${IMAGE_BASE_URL}${BACKDROP_SIZE}${state?.results[0]?.backdrop_path})`,
            }}
        >
            <h1>Welcome.</h1>
            <h3>
                Millions of movies, TV shows and people to discover. Explore
                now.
            </h3>
            <span className="heroImage_searchBox">
                <input
                    type="text"
                    placeholder="Search for a movie, tv show, person...."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </span>
        </div>
    );
};

export default HeroImage;
