// import css from "./HomePage.module.css";
import { useEffect, useState } from "react";
import Title from "../../components/Title/Title";
import Loader from "../../components/Loader/Loader";
import MoviesList from "../../components/MoviesList/MoviesList";
import axios from "axios";

const HomePage = () => {
  const [movies, setMovies] = useState(null);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    async function fetchTrending() {
      try {
        setLoader(true);
        const url =
          "https://api.themoviedb.org/3/trending/movie/day?include_adult=false&language=en-US&page=1";

        const options = {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiOTA1NDYxZWZlMjFkNzljNGNjODUwMDgyNzZkNmJmYiIsIm5iZiI6MTcyNDE3NzU2Ny4yMjE4ODYsInN1YiI6IjY2YzFiZWE0YzM0MGY3MDllMGMyMWY3MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qgD4TkBZHZj1C94QJw_7WDuP1JuznwefhaM80g6K4oo",
          },
        };
        const {data} = await axios.get(url, options);
        setMovies(data.results);
      } catch (error) {
        alert(JSON.stringify(error))
      } finally {
        setLoader(false);
      }
    }
    fetchTrending();
  }, []);

  return (
    <>
      <Title />
      {loader && <Loader />}
      {movies !== null && <MoviesList movies={movies} />}
    </>
  );
};

export default HomePage;
