import { Routes, Route, Link } from 'react-router-dom'
import Product from './components/Product/Product'
import About from './components/About/About'
import NotFound from './components/NotFound/NotFound'
import './App.css'

function App() {
  return (
    <>
      <nav className="navbar">
        <Link to="/" className="nav-link">Products</Link>
        <Link to="/about" className="nav-link">About</Link>
      </nav>
      
      <Routes>
        <Route path="/" element={<Product />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App