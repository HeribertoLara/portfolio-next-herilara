import { Suspense, lazy } from 'react'
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Layout from './components/Layout'
import IntroLoader from './components/IntroLoader'

const About = lazy(() => import('./pages/About'))
const Portfolio = lazy(() => import('./pages/Portfolio'))
const Contact = lazy(() => import('./pages/Contact'))
const Clientes = lazy(() => import('./pages/Clientes'))
const Brokers = lazy(() => import('./pages/Brokers'))
const NotFound = lazy(() => import('./pages/NotFound'))

function App() {
  return (
    <BrowserRouter>
      <IntroLoader />
      <Layout>
        <Suspense fallback={<div className="app-route-fallback" aria-hidden="true" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sobre-heriberto-lara" element={<About />} />
            <Route path="/portafolio" element={<Portfolio />} />
            <Route path="/portafolio-proyectos-nextjs" element={<Navigate to="/portafolio" replace />} />
            <Route path="/contacto-desarrollador-web" element={<Contact />} />
            <Route path="/consigue-mas-clientes" element={<Clientes />} />
            <Route path="/mas-ventas-para-brokers" element={<Brokers />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  )
}

export default App
