import { useState, useEffect } from "react";

//API
import API from "../API";

const initialState = {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
};

export const useSearchFetch = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [movieState, setMovieState] = useState(initialState);
    const [showState, setShowState] = useState(initialState);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isLoadingMoreMovies, setIsLoadingMoreMovies] = useState(false);
    const [isLoadingMoreShows, setIsLoadingMoreShows] = useState(false);

    const fetchMovies = async (page, searchTerm = "") => {
        try {
            setError(false);
            setLoading(true);

            const movies = await API.fetchMovies(searchTerm, page, "", "movie");

            setMovieState((prev) => ({
                ...movies,
                results:
                    page > 1
                        ? [...prev.results, ...movies.results]
                        : [...movies.results],
            }));
        } catch (error) {
            setError(true);
        }

        setLoading(false);
    };
    const fetchShows = async (page, searchTerm = "") => {
        try {
            setError(false);
            setLoading(true);
            const shows = await API.fetchMovies(searchTerm, page, "", "show");

            setShowState((prev) => ({
                ...shows,
                results:
                    page > 1
                        ? [...prev.results, ...shows.results]
                        : [...shows.results],
            }));
        } catch (error) {
            setError(true);
        }

        setLoading(false);
    };

    useEffect(() => {
        if (searchTerm.length > 0) {
            // const sessionState = isPersistedState("homeState");
            // if (sessionState) {
            //     movieState(sessionState);
            //     return;
            // }
            setMovieState(initialState);
            fetchMovies(1, searchTerm);
            setShowState(initialState);
            fetchShows(1, searchTerm);
        }
    }, [searchTerm]);

    useEffect(() => {
        if (!isLoadingMoreMovies) return;
        if (searchTerm.length === 0) return;
        fetchMovies(movieState.page + 1, searchTerm);
        setIsLoadingMoreMovies(false);
    }, [isLoadingMoreMovies]);

    useEffect(() => {
        if (!isLoadingMoreShows) return;
        if (searchTerm.length === 0) return;
        fetchShows(showState.page + 1, searchTerm);
        setIsLoadingMoreShows(false);
    }, [isLoadingMoreShows]);

    return {
        movieState,
        showState,
        loading,
        error,
        searchTerm,
        setSearchTerm,
        setIsLoadingMoreMovies,
        setIsLoadingMoreShows,
    };
};
