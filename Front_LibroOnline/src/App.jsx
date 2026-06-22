// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/NavBar/NavBar'               // El Navbar escolar que personalizamos
import Footer from './components/Footer/Footer'               // Tu componente de pie de página

// IMPORTACIÓN DE PÁGINAS (Ecosistema LibrOnline)
import Login from './pages/Login/Login'
import Home from './pages/Home' // Tu página de bienvenida pública

// Módulo de Usuarios (El que acabamos de sincronizar con datos mock)
import UsuarioListPage from './pages/UsuarioListPage'
import UsuarioFormPage from './pages/UsuarioFormPage'

// Componente Layout para reutilizar el Navbar y Footer de forma limpia
function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="container my-4" style={{ minHeight: '80vh' }}>
        {children}
      </main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* 1. RUTAS SIN NAVBAR (Fuera del sistema) */}
          <Route path="/login" element={<Login />} />

          {/* 2. RUTAS PÚBLICAS CON NAVBAR */}
          <Route path="/" element={<Layout><Home /></Layout>} />

          {/* 3. RUTAS PROTEGIDAS: DIRECTORES O ADMINISTRADORES (Gestión de Usuarios) */}
          <Route 
            path="/usuarios" 
            element={
              <PrivateRoute roles={['ADMIN', 'DIRECTOR', 'ADMINISTRADOR']}>
                <Layout><UsuarioListPage /></Layout>
              </PrivateRoute>
            } 
          />
          <Route 
            path="/usuarios/agregar" 
            element={
              <PrivateRoute roles={['ADMIN', 'DIRECTOR', 'ADMINISTRADOR']}>
                <Layout><UsuarioFormPage /></Layout>
              </PrivateRoute>
            } 
          />

          {/* 4. RUTAS PROTEGIDAS: DOCENTES (Marcadores de posición futuros) */}
          <Route 
            path="/registrar-asistencia" 
            element={
              <PrivateRoute roles={['DOCENTE']}>
                <Layout><div className="container mt-4"><h2>Módulo Asistencia (Microservicio Asistencia)</h2></div></Layout>
              </PrivateRoute>
            } 
          />

          {/* CATCH-ALL: Cualquier URL inválida redirige al Inicio */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}