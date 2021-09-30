import { useState, useEffect } from "react";

import API from "../API";

const initialState = {};

export const useActorFetch = (actorId) => {
    // const [actorId, setActorId] = useState("");
    const [state, setState] = useState(initialState);

    const fetchActor = async () => {
        try {
            const actor = await API.fetchActor(actorId);
            setState({
                ...actor,
            });
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchActor();
    }, [actorId]);

    return {
        state,
    };
};
