import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import css from "./MovieCast.module.css";
import Loader from "../../components/Loader/Loader";
import foto from "../../assets/no_image.jpg";

const MovieCast = () => {
  const [movies, setMovies] = useState(null);
  const [loader, setLoader] = useState(false);

  const { movieId } = useParams();

  useEffect(() => {
    async function fetchCast() {
      try {
        setLoader(true);
        const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`;

        const options = {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOTA1NDYxZWZlMjFkNzljNGNjODUwMDgyNzZkNmJmYiIsIm5iZiI6MTcyNDE3NzU2Ny4yMjE4ODYsInN1YiI6IjY2YzFiZWE0YzM0MGY3MDllMGMyMWY3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qgD4TkBZHZj1C94QJw_7WDuP1JuznwefhaM80g6K4oo",
          },
        };
        const { data } = await axios.get(url, options);
        setMovies(data.cast);
      } catch (error) {
        alert(JSON.stringify(error));
      } finally {
        setLoader(false);
      }
    }
    fetchCast();
  }, [movieId]);

  return (
    <>
      <ul className={css.ul}>
        {Array.isArray(movies) &&
          movies.map((item) => {
            return (
              <li className={css.li} key={item.id}>
                <img className={css.img}
                  src={
                    item.profile_path
                      ? `https://image.tmdb.org/t/p/w200${item.profile_path}`
                      : foto 
                  }
                  alt="foto"
                />
                <p className={css.p}>{item.name}</p>
              </li>
            );
          })}
      </ul>

      {loader && <Loader />}
    </>
  );
};

export default MovieCast;
