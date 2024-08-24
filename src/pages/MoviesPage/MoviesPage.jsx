import axios from "axios";
import { useSearchParams } from "react-router-dom";
import {useState, useEffect } from "react";
import FormSearch from '../../components/FormSearch/FormSearch';
import Loader from "../../components/Loader/Loader";
import MoviesList from "../../components/MovieList/MovieList";

function MoviesPage() {
  const [movies, setMovies] = useState(null);
  const [loader, setLoader] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams({});

  const query = searchParams.get("query");

  const search = (value) => {
    setSearchParams({query: value.search});
  };

 
  useEffect(() => {
    if (!query) return;
    async function searchMovie() {
      try {
        setLoader(true);
        const url = `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${query}&language=en-US`;

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
    searchMovie();
  }, [query]);

  return (
    <>
      <FormSearch search={search} />
      {loader && <Loader />}
      <MoviesList movies={movies} />
    </>
  )
}

export default MoviesPage