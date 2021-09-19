import React from "react";
import HeroImage from "./components/HeroImage/HeroImage";
import { PopularMovies } from "./components/PopularMovies/PopularMovies";

export const Home = () => {
    return (
        <>
            <HeroImage />
            <PopularMovies
                type="popular"
                title="Popular Movies"
                category="movie"
            />
            <PopularMovies
                type="topRated"
                title="Top Rated Movies"
                category="movie"
            />
            <PopularMovies
                type="popular"
                title="Popular Shows"
                category="show"
            />
            <PopularMovies
                type="topRated"
                title="Top Rated Shows"
                category="show"
            />
        </>
    );
};
