import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useActorFetch } from "../../hooks/useActorFetch";
import { IMAGE_BASE_URL, POSTER_SIZE } from "../../config";
import "./Actor-styles.css";

export const Actor = () => {
    const { actorId } = useParams();
    const { setActorId, state } = useActorFetch();

    useEffect(() => {
        setActorId(actorId);
    }, [actorId]);

    console.log(state);

    return (
        <div className="actor">
            <div className="actor_details container">
                <div className="actor_left">
                    <img
                        src={`${IMAGE_BASE_URL}${POSTER_SIZE}${state?.profile_path}`}
                        alt=""
                    />
                    <h1>{state?.name}</h1>
                </div>
                <div className="actor_right">
                    <h1>{state?.name}</h1>
                    <h4>Personal Info</h4>
                    <h5>Known For</h5>
                    <small>{state?.known_for_department}</small>
                    <h5>Birthday</h5>
                    <small>{state?.birthday}</small>
                    <h5>Place of Birth</h5>
                    <small>{state?.place_of_birth}</small>
                    <h5>Also Known As</h5>
                    {state?.also_known_as?.map((knownAs, index) => (
                        <small key={index}>{knownAs}</small>
                    ))}
                    <h3>Biography</h3>
                    <p>{state?.biography}</p>
                </div>
            </div>
        </div>
    );
};
