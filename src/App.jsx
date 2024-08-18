import { NavLink } from 'react-router-dom'
import css from './App.module.css'
import clsx from 'clsx'

function App() {


  return (
    <div>
      <header>
        <nav className={css.nav}>
          <NavLink className={({ isActive })=>clsx(css.link, isActive && css.active)} to="/">Home</NavLink>
          <NavLink className={({ isActive })=>clsx(css.link, isActive && css.active)} to="/movies">Movies</NavLink>
        </nav>
      </header>

    </div>
  )
}

export default App
