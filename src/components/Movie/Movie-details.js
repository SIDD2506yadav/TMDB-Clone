import React from "react";
import { POSTER_SIZE, IMAGE_BASE_URL } from "../../config";
import { calcTime } from "../../Helpers";
import { CircularScore } from "../CircularScore";

export const Moviedetails = ({ state, genres }) => {
    return (
        <span className="movie_details container">
            <img
                src={`${IMAGE_BASE_URL}${POSTER_SIZE}${state?.poster_path}`}
                alt=""
            />
            <span className="movie_detail">
                <h2>
                    {state?.title}
                    {` (${state?.release_date?.substring(0, 4)})`}
                </h2>
                <strong>
                    {state?.release_date?.replaceAll("-", "/")}
                    {"(US)"}
                    <b> . </b>
                    {genres.join(", ")}
                    <b> . </b>
                    {calcTime(state?.runtime)}
                </strong>
                <span className="movie_scoreDetails">
                    <span className="movie_circularProgressBar">
                        <CircularScore percentage={state?.vote_average * 10} />
                    </span>
                    <h6>
                        User <br /> Score
                    </h6>
                </span>

                <b>
                    <i>{state?.tagline}</i>
                </b>
                <span className="movie_description">
                    <h4>Overview</h4>
                    <small>
                        <i>{state?.overview}</i>
                    </small>
                </span>
                <span className="movie_directors">
                    {state?.directors?.map((director) => (
                        <span>
                            <strong>{director.name}</strong>
                            <p>Director</p>
                        </span>
                    ))}
                </span>
            </span>
        </span>
    );
};
