import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import css from "./MovieReviews.module.css";
import Loader from "../../components/Loader/Loader";

const MovieReviews = () => {
  const [movies, setMovies] = useState(null);
  const [loader, setLoader] = useState(false);

  const { movieId } = useParams();

  useEffect(() => {
    async function fetchReviews() {
      try {
        setLoader(true);
        const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US`;

        const options = {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOTA1NDYxZWZlMjFkNzljNGNjODUwMDgyNzZkNmJmYiIsIm5iZiI6MTcyNDE3NzU2Ny4yMjE4ODYsInN1YiI6IjY2YzFiZWE0YzM0MGY3MDllMGMyMWY3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qgD4TkBZHZj1C94QJw_7WDuP1JuznwefhaM80g6K4oo",
          },
        };
        const { data } = await axios.get(url, options);
        setMovies(data.results);
      } catch (error) {
        alert(JSON.stringify(error));
      } finally {
        setLoader(false);
      }
    }
    fetchReviews();
  }, [movieId]);

  return (
    <>
      {loader && <Loader />}
      <ul>
        {Array.isArray(movies) && movies.length > 0 ? (
          movies.map((item) => {
            return (
              <li key={item.id}>
                <h1 className={css.h1}>{item.author}</h1>
                <p className={css.p}>{item.content}</p>
              </li>
            );
          })
        ) : (
          <p className={css.not}>We don`t have any reviews for this movie.</p>
        )}
      </ul>
    </>
  );
};

export default MovieReviews;
