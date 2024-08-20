import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import MoviesPage from './pages/MoviesPage/MoviesPage'
import Navigation from './components/Navigation/Navigation'
import './App.module.css'

function App() {

  return (
    <div>
      <Navigation />
      <main>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/movies' element={<MoviesPage/>} />
        </Routes>
      </main>
      <footer></footer>
    </div>
  )
}

export default App
