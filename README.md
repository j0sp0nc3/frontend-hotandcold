# 🔥 Frontend Hot and Cold

**Aplicación web moderna para servicios de calefacción, climatización y ventilación**

## 🎯 Descripción

Frontend React + Vite para Hot and Cold. Sistema integrado con backend API para gestión de productos, cotizaciones y contacto.

## 📋 Stack Tecnológico

- **React 19.1.0** - Biblioteca UI
- **Vite 6.2.0** - Build tool
- **Tailwind CSS** - Framework CSS
- **Axios** - Cliente HTTP
- **React Router** - Navegación
- **Firebase Auth** - Autenticación

## 🚀 Inicio Rápido

### 1. Instalación

```bash
cd frontend-hotandcold
npm install
```

### 2. Configuración

Crear archivo `.env.local` (ver `.env.example`):

```env
# API Configuration
VITE_API_KEY=tu-api-key-generado-aleatoriamente
VITE_API_URL=http://localhost:3000
```

**⚠️ SEGURIDAD:**
- **NUNCA** commitear archivos `.env` o `.env.local` al repositorio
- **Usar** el mismo `VITE_API_KEY` configurado en el backend
- **Generar** API key aleatorio fuerte con: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- **Configurar** las mismas variables en el dashboard de Render para producción

### 3. Iniciar Aplicación

**Desarrollo local:**
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 🔐 Seguridad

- Todas las peticiones al backend requieren API Key en header `X-API-Key`
- Las operaciones de administración requieren autenticación JWT adicional
- Los archivos `.env*` están excluidos del repositorio vía `.gitignore`

## 📚 Más Información

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
