import { useState, useEffect } from "react";
import API from "../API";
import { isPersistedState } from "../Helpers";

export const useShowFetch = (showId) => {
    const [state, setState] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchShow = async () => {
            try {
                setLoading(true);
                setError(false);

                const show = await API.fetchShow(showId);
                const credits = await API.fetchShowCredit(showId);
                const similar = await API.fetchSimilarShow(showId);

                //Get directors only
                const directors = credits.crew.filter(
                    (member) => member.job === "Director",
                );

                setState({
                    ...show,
                    actors: credits.cast,
                    directors,
                    similar,
                });
                setLoading(false);
            } catch (err) {
                setError(true);
            }
        };
        const ssessionState = isPersistedState(showId);

        if (ssessionState) {
            setState(ssessionState);
            setLoading(false);
            return;
        }
        fetchShow();
    }, [showId]);

    return { state, loading, error };
};
