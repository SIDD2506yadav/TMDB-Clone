import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { useSearchFetch } from "../../hooks/useSearchFetch";
import { POSTER_SIZE, IMAGE_BASE_URL } from "../../config";
import { Loader } from "../Loader/Loader";
import no_image from "../../assets/no_image.jpg";
import "./Search-styles.css";

export const Search = () => {
    const history = useHistory();
    const query = new URLSearchParams(window.location.search);
    const search = query.get("search");
    const [shown, setShown] = useState(1);

    if (search.length === 0) {
        history.push("/");
    }

    const {
        movieState,
        showState,
        loading,
        setSearchTerm,
        setIsLoadingMoreMovies,
        setIsLoadingMoreShows,
    } = useSearchFetch();

    const loadMore = () => {
        if (shown === 1) {
            setIsLoadingMoreMovies(true);
        } else {
            setIsLoadingMoreShows(true);
        }
    };

    const showMovies = () => {
        setShown(1);
    };

    const showShows = () => {
        setShown(2);
    };

    useEffect(() => {
        setSearchTerm(search);
    }, [search]);

    return (
        <div className="search">
            <h3 className="container">Search results for {search}</h3>
            <div className="container search_view">
                <span className="search_left">
                    <h3>Search Results</h3>
                    <small
                        onClick={showMovies}
                        className={shown === 1 ? "search_grayBackground" : ""}
                    >
                        Movies ({movieState?.results.length})
                    </small>
                    <small
                        onClick={showShows}
                        className={shown === 2 ? "search_grayBackground" : ""}
                    >
                        Tv Shows ({showState?.results?.length})
                    </small>
                </span>
                <div className="search_right">
                    <div className="search_movies">
                        {shown === 1
                            ? movieState?.results?.map((movie) => (
                                  <Link
                                      className="search_linkWrap"
                                      to={`/movie/${movie?.id}`}
                                  >
                                      <div className="search_movie">
                                          <img
                                              src={
                                                  movie?.poster_path
                                                      ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                                                      : no_image
                                              }
                                              alt=""
                                          />
                                          <div className="search_movieDetails">
                                              <span className="search_movieName">
                                                  <h5>{movie?.title}</h5>
                                                  <h6>{movie?.release_date}</h6>
                                              </span>
                                              <p>{movie?.overview}</p>
                                          </div>
                                      </div>
                                  </Link>
                              ))
                            : showState?.results?.map((show) => (
                                  <Link
                                      className="search_linkWrap"
                                      to={`/show/${show?.id}`}
                                  >
                                      <div className="search_movie">
                                          <img
                                              src={
                                                  show.poster_path
                                                      ? `${IMAGE_BASE_URL}${POSTER_SIZE}${show.poster_path}`
                                                      : no_image
                                              }
                                              alt=""
                                          />
                                          <div className="search_movieDetails">
                                              <span className="search_movieName">
                                                  <h5>{show?.name}</h5>
                                                  <h6>
                                                      {show?.first_air_date}
                                                  </h6>
                                              </span>
                                              <p>{show?.overview}</p>
                                          </div>
                                      </div>
                                  </Link>
                              ))}
                        {loading ? <Loader /> : null}
                        <button onClick={loadMore}>Load More</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
