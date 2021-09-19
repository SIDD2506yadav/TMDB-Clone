import { useState, useEffect } from "react";

import API from "../API";

const initialState = {
    page: 0,
    results: [],
    total_pages: 0,
    total_results: 0,
};

export const useHomeFetch = (type, category) => {
    const [state, setState] = useState({ ...initialState });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const fetchMovies = async (page) => {
        try {
            setError(false);
            setLoading(true);

            const movies = await API.fetchMovies("", page, type, category);

            setState((prev) => ({
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

    useEffect(() => {
        setState(initialState);
        fetchMovies(1);
    }, [type]);

    useEffect(() => {
        if (!isLoadingMore) return;
        fetchMovies(state.page + 1);
        setIsLoadingMore(false);
    }, [isLoadingMore, fetchMovies]);

    return {
        state,
        loading,
        error,
        isLoadingMore,
        setIsLoadingMore,
    };
};
