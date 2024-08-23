import { Link } from "react-router-dom";
import css from './NotFoundPage.module.css'

const NotFoundPage = () => {
  return (
    <div className={css.div}>
          <h1>This Page not exist</h1>
          <Link className={css.link} to='/'>Go to Home page</Link>
    </div>
  );
}

export default NotFoundPage