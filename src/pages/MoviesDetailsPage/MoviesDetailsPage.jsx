import css from "./MoviesDetailsPage.module.css";
import axios from "axios";
import Loader from "../../components/Loader/Loader";
import { useEffect, useState, useRef } from "react";
import { useParams, useLocation, Link, Outlet } from "react-router-dom";

const MoviesDetailsPage = () => {
  const [movies, setMovies] = useState(null);
  const [loader, setLoader] = useState(false);

  const location = useLocation();
  const backRef = useRef(location.state?.from ?? "/");

  const { movieId } = useParams();

  useEffect(() => {
    async function fetchMovie() {
      try {
        setLoader(true);
        const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;

        const options = {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOTA1NDYxZWZlMjFkNzljNGNjODUwMDgyNzZkNmJmYiIsIm5iZiI6MTcyNDE3NzU2Ny4yMjE4ODYsInN1YiI6IjY2YzFiZWE0YzM0MGY3MDllMGMyMWY3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qgD4TkBZHZj1C94QJw_7WDuP1JuznwefhaM80g6K4oo",
          },
        };
        const { data } = await axios.get(url, options);
        setMovies(data);
      } catch (error) {
        alert(JSON.stringify(error));
      } finally {
        setLoader(false);
      }
    }
    fetchMovie();
  }, [movieId]);

  return (
    <>
      {movies !== null && (
        <div className={css.wrapper}>
          <Link className={css.link} to={backRef.current}>
            <button type="button" className={css.btn}>
              &larr; Back to home
            </button>
          </Link>

          <div className={css.div}>
            <img
              src={`https://image.tmdb.org/t/p/w500/${movies.poster_path}`}
              width={450}
            />
            <div className={css.details}>
              <div>
                <h1>{movies.title}</h1>
                <p>User score: {movies.vote_average}</p>
                <h2>Overview</h2>
                <p>{movies.overview}</p>
                <h2>Genres</h2>
                <p>{movies?.genres?.map((item) => item.name).join(", ")}</p>
              </div>

              <div className={css.cast_rev}>
                <Link to="cast" className={css.link}>
                  Cast
                </Link>
                <Link to="reviews" className={css.link}>
                  Reviews
                </Link>
              </div>
            </div>

            <div>
              <Outlet />
            </div>
          </div>
        </div>
      )}

      {loader && <Loader />}
    </>
  );
};

export default MoviesDetailsPage;
