import React from "react";
import { useParams, Link } from "react-router-dom";
import { useMovieFetch } from "../../hooks/useMovieFetch";
import { BACKDROP_SIZE, POSTER_SIZE, IMAGE_BASE_URL } from "../../config";
import { convertMoney } from "../../Helpers";
import no_image from "../../assets/no_image.jpg";
import "./Movie-styles.css";
import { Moviedetails } from "./Movie-details";
import { CircularScore } from "../CircularScore";

export const Movie = () => {
    const { movieId } = useParams();

    const { state } = useMovieFetch(movieId);
    const genres = [];

    state.genres?.map((genre) => {
        genres.push(genre.name);
    });

    console.log(state?.similar?.results[0].poster_path);

    return (
        <div className="movie">
            <div
                className="movie_intro"
                style={{
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)), url(${IMAGE_BASE_URL}${BACKDROP_SIZE}${state?.backdrop_path})`,
                }}
            >
                <Moviedetails state={state} genres={genres} />
            </div>
            <span className="movie_castAndStatus container">
                <div className="movie_left">
                    <div className="movie_castDetails">
                        <h3>Cast</h3>
                        <div className="movie_castList">
                            {state?.actors?.map((actor) => (
                                <Link
                                    to={`/actor/${actor?.id}`}
                                    className="link_tag"
                                >
                                    <div
                                        className="movie_castActor"
                                        key={actor?.id}
                                    >
                                        <img
                                            src={
                                                actor?.profile_path
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
                    <div className="movie_similarMovies">
                        <h3>Similar Movies</h3>
                        <div className="similar_movieList">
                            {state?.similar?.results?.map((similarMovie) => (
                                <Link
                                    to={`/movie/${similarMovie?.id}`}
                                    className="link_tag"
                                >
                                    <div className="similarMovie">
                                        <img
                                            src={
                                                similarMovie.poster_path
                                                    ? `${IMAGE_BASE_URL}${POSTER_SIZE}${similarMovie?.poster_path}`
                                                    : no_image
                                            }
                                            alt=""
                                        />
                                        <span className="movie_similarMovieScore">
                                            <CircularScore
                                                percentage={Math.floor(
                                                    similarMovie?.vote_average *
                                                        10,
                                                )}
                                            />
                                        </span>
                                        <p>
                                            <strong>
                                                {similarMovie?.title}
                                            </strong>
                                        </p>
                                        <small>
                                            {similarMovie?.release_date}
                                        </small>
                                    </div>{" "}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="movie_status">
                    <h3>Movie Status and Details</h3>
                    <strong>Status</strong>
                    <small>{state?.status}</small>
                    <strong>Original Language</strong>
                    <small>{state?.original_language}</small>
                    <strong>Budget</strong>
                    <small>{convertMoney(state?.budget)}</small>
                    <strong>Revenue</strong>
                    <small>{convertMoney(state?.revenue)}</small>
                </div>
            </span>
        </div>
    );
};
