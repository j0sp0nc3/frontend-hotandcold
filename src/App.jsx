import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from './components/PrivateRoute';

// Lazy loading de páginas para optimizar carga inicial
const HomePage = lazy(() => import("./pages/HomePage"));
const Climatizacion = lazy(() => import('./pages/Climatizacion'));
const Tienda = lazy(() => import('./pages/tienda'));
const Ventilacion = lazy(() => import("./pages/Ventilacion"));
const Calefaccion = lazy(() => import("./pages/Calefaccion"));
const Login = lazy(() => import("./pages/login"));
const ImageUpload = lazy(() => import("./components/ImageUpload"));
const ProductDetail = lazy(() => import("./components/ProductDetail"));
const TestMejoras = lazy(() => import("./pages/TestMejoras"));

// Componente de carga
const LoadingFallback = () => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontSize: '1.5rem',
    color: '#333'
  }}>
    Cargando...
  </div>
);

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<HomePage />} /> 
          <Route path="/climatizacion" element={<Climatizacion />} />
          <Route path="/tienda" element={<Tienda />} />
          <Route path="/ventilacion" element={<Ventilacion />} /> 
          <Route path="/producto/:id" element={<ProductDetail />} />
          <Route path="/calefaccion" element={<Calefaccion />} />
          <Route path="/login" element={<Login />} />
          <Route path="/test-mejoras" element={<TestMejoras />} />
          
          {/* Ruta protegida */}
          <Route 
            path="/image" 
            element={
              <PrivateRoute>
                <ImageUpload />
              </PrivateRoute>
            } 
          />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
