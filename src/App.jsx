import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Layout from './components/Layout'
import About from './pages/About'
import Portfolio from './pages/Portfolio'
import Contact from './pages/Contact'
import Clientes from './pages/Clientes'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sobre-heriberto-lara" element={<About />} />
          <Route path="/portafolio-proyectos-nextjs" element={<Portfolio />} />
          <Route path="/contacto-desarrollador-web" element={<Contact />} />
          <Route path="/consigue-mas-clientes" element={<Clientes />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
