import React from "react";
import { Link } from "react-router-dom";
import { useHomeFetch } from "../../hooks/useHomeFetch";
import "./PopularMovies-styles.css";
import { ArrowForward } from "@material-ui/icons";
import { CircularScore } from "../CircularScore";
import no_image from "../../assets/no_image.jpg";
import { POSTER_SIZE, IMAGE_BASE_URL } from "../../config";
import { Loader } from "../Loader/Loader";

export const PopularMovies = ({ type, title, category }) => {
    const { state, error, setIsLoadingMore, loading, isLoadingMore } =
        useHomeFetch(type, category);

    if (error) {
        return <div>Something went wrong...</div>;
    }

    return (
        <div className="container popularMovies">
            <h2>{title}</h2>
            <div className="popularMovies_list">
                {state?.results?.map((movie) => (
                    <Link
                        to={`/${category}/${movie.id}`}
                        className="popularMovies_link"
                        key={movie?.id}
                    >
                        <div className="popularMovies_movie" key={movie?.id}>
                            <img
                                src={
                                    movie?.poster_path
                                        ? IMAGE_BASE_URL +
                                          POSTER_SIZE +
                                          movie.poster_path
                                        : no_image
                                }
                                alt=""
                            />
                            <span className="popularMovies_score">
                                <CircularScore
                                    percentage={movie?.vote_average * 10}
                                />
                            </span>
                            {movie.title ? (
                                <p>
                                    <strong>{movie?.title}</strong>
                                </p>
                            ) : (
                                <p>
                                    <strong>{movie?.name}</strong>
                                </p>
                            )}
                            {movie.release_date ? (
                                <small>{movie?.release_date}</small>
                            ) : (
                                <small>{movie?.first_air_date}</small>
                            )}
                        </div>
                    </Link>
                ))}
                {loading ? <Loader /> : null}
                {!isLoadingMore ? (
                    <button onClick={() => setIsLoadingMore(true)}>
                        Load more <ArrowForward />
                    </button>
                ) : null}
            </div>
        </div>
    );
};
