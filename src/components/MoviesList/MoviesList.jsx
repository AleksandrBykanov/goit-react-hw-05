import { Link, useLocation } from "react-router-dom";
import css from "./MoviesList.module.css";
import image from "../../assets/no_foto.jpg";

const MoviesList = ({ movies }) => {
  const location = useLocation();
  return (
    <ul className={css.ul}>
      {Array.isArray(movies) &&
        movies.map((movie) => {
          return (
            <li className={css.li} key={movie.id}>
              <Link state={{ from: location }} to={`/movies/${movie.id}`}>
                <img
                  className={css.img}
                  src={
                    movie.backdrop_path
                      ? `https://image.tmdb.org/t/p/w200${movie.backdrop_path}`
                      : image
                  }
                  alt={movie.title}
                />
                <p className={css.p}>{movie.title}</p>
              </Link>
            </li>
          );
        })}
    </ul>
  );
};

export default MoviesList;
