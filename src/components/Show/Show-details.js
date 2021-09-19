import React from "react";
import { POSTER_SIZE, IMAGE_BASE_URL } from "../../config";
import { CircularScore } from "../CircularScore";

export const Showdetails = ({ state, genres }) => {
    return (
        <span className="container show_details">
            <img
                src={`${IMAGE_BASE_URL}${POSTER_SIZE}${state.poster_path}`}
                alt=""
            />
            <span className="show_detail">
                <h2>
                    {state.name}
                    {` (${state?.first_air_date?.substring(0, 4)})`}
                </h2>
                <strong>
                    {state?.first_air_date?.replaceAll("-", "/")}
                    {"(US)"}
                    <b> . </b>
                    {genres.join(", ")}
                    <b> . </b>
                    {/* {calcTime(state?.episode_run_time[0])} */}
                </strong>
                <span className="show_scoreDetails">
                    <span className="show_circularProgressBar">
                        <CircularScore percentage={state?.vote_average * 10} />
                    </span>
                    <h6>
                        User <br /> Score
                    </h6>
                </span>
                <b>
                    <i>{state?.tagline}</i>
                </b>
                <span className="show_description">
                    <h4>Overview</h4>
                    <small>
                        <i>{state?.overview}</i>
                    </small>
                </span>
                <span className="show_directors">
                    {state.created_by?.map((director) => (
                        <span>
                            <strong>{director?.name}</strong>
                            <p>Director</p>
                        </span>
                    ))}
                </span>
            </span>
        </span>
    );
};
