import { Link, useLocation } from "react-router-dom";
import css from "./MoviesList.module.css";

const MoviesList = ({movies}) => {
  
  const location = useLocation();
  return (
    <ul className={css.list}>
      {Array.isArray(movies) && movies.map((movie) => {
        return (
          <li key={movie.id}>
            <Link state={{ from: location }} to={`/movies/${movie.id}`}>
              <p>{movie.title}</p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default MoviesList;
