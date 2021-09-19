import { useState, useEffect } from "react";
import API from "../API";
import { isPersistedState } from "../Helpers";

export const useMovieFetch = (movieId) => {
    const [state, setState] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchMovie = async () => {
            try {
                setLoading(true);
                setError(false);

                const movie = await API.fetchMovie(movieId);
                const credits = await API.fetchCredits(movieId);
                const similar = await API.fetchSimilar(movieId);

                //Get directors only
                const directors = credits.crew.filter(
                    (member) => member.job === "Director",
                );

                setState({
                    ...movie,
                    actors: credits.cast,
                    directors,
                    similar,
                });
                setLoading(false);
            } catch (err) {
                setError(true);
            }
        };
        const ssessionState = isPersistedState(movieId);

        if (ssessionState) {
            setState(ssessionState);
            setLoading(false);
            return;
        }
        fetchMovie();
    }, [movieId]);

    return { state, loading, error };
};
