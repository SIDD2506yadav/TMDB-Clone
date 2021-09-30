import React from "react";
import { Link, useParams } from "react-router-dom";
import { useShowFetch } from "../../hooks/useShowFetch";
import { BACKDROP_SIZE, POSTER_SIZE, IMAGE_BASE_URL } from "../../config";
import no_image from "../../assets/no_image.jpg";
import { Showdetails } from "./Show-details";
import "./Show-styles.css";

export const Show = () => {
    const { showId } = useParams();

    const { state } = useShowFetch(showId);
    const genres = [];

    state.genres?.map((genre) => {
        genres.push(genre.name);
    });

    return (
        <div className="show">
            <div
                className="show_intro"
                style={{
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${IMAGE_BASE_URL}${BACKDROP_SIZE}${state.backdrop_path})`,
                }}
            >
                <Showdetails state={state} genres={genres} />
            </div>
            <span className="show_castAndStatus container">
                <div className="show_castDetails">
                    <h3>Cast</h3>
                    <div className="show_castList">
                        {state?.actors?.map((actor) => (
                            <Link
                                to={`/actor/${actor.id}`}
                                className="link_tag"
                            >
                                <div className="show_castActor" key={actor.id}>
                                    <img
                                        src={
                                            actor.profile_path
                                                ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}`
                                                : no_image
                                        }
                                        alt={actor?.name}
                                    />
                                    <p>
                                        <strong>{actor?.name}</strong>
                                    </p>
                                    <small>{actor?.character}</small>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="show_status">
                    <h3>Show Status and Details</h3>
                    <strong>Status</strong>
                    <small>{state?.status}</small>
                    <strong>Original Language</strong>
                    <small>{state?.original_language}</small>
                </div>
            </span>
            <div className="container show_similarShows">
                <h3>Similar Shows</h3>
                <div className="similar_showList">
                    {state?.similar?.results.map((similarMovie) => (
                        <Link to={`/show/${similarMovie.id}`}>
                            <div className="similarShow">
                                <img
                                    src={
                                        similarMovie.poster_path
                                            ? `${IMAGE_BASE_URL}${POSTER_SIZE}${similarMovie.poster_path}`
                                            : no_image
                                    }
                                    alt=""
                                />
                                <a href={`/movie/${similarMovie?.id}`}>
                                    <strong>{similarMovie?.title}</strong>
                                </a>
                                <small>{similarMovie?.release_date}</small>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <div className="show_seasons container">
                <h4>Seasons</h4>
                <span className="show_season_list">
                    {state?.seasons?.map((season) => (
                        <div className="show_season">
                            <img
                                src={
                                    season.poster_path
                                        ? `${IMAGE_BASE_URL}${POSTER_SIZE}${season.poster_path}`
                                        : no_image
                                }
                                alt={season.name}
                            />
                            <span className="show_seasonDetails">
                                <span className="show_season_name">
                                    <h5>{season?.name}</h5>
                                    <h6>
                                        {season?.air_date} |{" "}
                                        {season?.episode_count} Episodes
                                    </h6>
                                </span>
                                <p>{season?.overview}</p>
                            </span>
                        </div>
                    ))}
                </span>
            </div>
        </div>
    );
};
