# 🚀 Frontend Mejorado - Hot and Cold Services

## 📁 Nueva Estructura

```
src/
├── components/
│   ├── ui/                    # ✨ NUEVO: Componentes reutilizables
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── Input.jsx
│   │   ├── Modal.jsx
│   │   └── index.js
│   ├── navbar.jsx             # ⚡ Optimizado con React.memo
│   ├── footer.jsx             # ⚡ Optimizado con React.memo
│   └── ...
├── hooks/                     # ✨ NUEVO: Custom Hooks
│   ├── useForm.js            # Hook para formularios
│   ├── useModal.js           # Hook para modales
│   ├── useFetch.js           # Hook para peticiones
│   ├── useLocalStorage.js    # Hook para localStorage
│   └── index.js
├── services/                  # ✨ NUEVO: Capa de servicios
│   ├── api.js                # Instancia Axios configurada
│   ├── authService.js        # Servicios de autenticación
│   ├── productService.js     # Servicios de productos
│   ├── contactService.js     # Servicios de contacto
│   └── index.js
├── context/
│   └── AuthContext.jsx        # ⚡ Mejorado con JWT y verificación
├── App.jsx                    # ⚡ Lazy Loading implementado
└── ...
```

## 🎯 Mejoras Implementadas

### 1. **Custom Hooks** 🪝

#### `useForm`
```jsx
import { useForm } from './hooks';

const { values, handleChange, handleSubmit } = useForm(
  { email: '', password: '' },
  async (data) => {
    await login(data);
  }
);
```

#### `useModal`
```jsx
import { useModal } from './hooks';

const { isOpen, modalData, openModal, closeModal } = useModal();

<Modal isOpen={isOpen} onClose={closeModal}>
  {modalData}
</Modal>
```

#### `useFetch`
```jsx
import { useFetch } from './hooks';

const { data, loading, error } = useFetch('/api/products');
```

#### `useLocalStorage`
```jsx
import { useLocalStorage } from './hooks';

const [theme, setTheme] = useLocalStorage('theme', 'light');
```

---

### 2. **Servicios API** 🌐

#### Uso de servicios
```jsx
import { authService, productService, contactService } from './services';

// Login
const result = await authService.login({ email, password });

// Obtener productos
const products = await productService.getAll({ categoria: 'climatizacion' });

// Enviar contacto
await contactService.sendMessage(formData);
```

#### Características:
- ✅ Interceptores automáticos para tokens
- ✅ Manejo de errores global
- ✅ Logout automático en token expirado
- ✅ Headers configurados

---

### 3. **Componentes UI Reutilizables** 🎨

#### Button
```jsx
import { Button } from './components/ui';

<Button variant="primary" size="large" loading={isLoading}>
  Enviar
</Button>
```

**Variantes:** `primary`, `secondary`, `success`, `danger`, `outline`
**Tamaños:** `small`, `medium`, `large`

#### Card
```jsx
import { Card } from './components/ui';

<Card 
  title="Producto" 
  subtitle="Descripción"
  image="/assets/product.jpg"
  hover
  onClick={handleClick}
>
  Contenido del card
</Card>
```

#### Input
```jsx
import { Input } from './components/ui';

<Input
  label="Email"
  type="email"
  name="email"
  value={email}
  onChange={handleChange}
  error={errors.email}
  required
/>
```

#### Modal
```jsx
import { Modal } from './components/ui';

<Modal 
  isOpen={isOpen} 
  onClose={closeModal}
  title="Título del Modal"
  size="large"
>
  Contenido del modal
</Modal>
```

**Tamaños:** `small`, `medium`, `large`

---

### 4. **Lazy Loading & Code Splitting** ⚡

Las rutas ahora cargan bajo demanda:
- ✅ Carga inicial más rápida
- ✅ Bundles más pequeños
- ✅ Mejor performance
- ✅ Suspense con fallback de carga

---

### 5. **AuthContext Mejorado** 🔐

```jsx
const { user, loading, error, login, logout, updateUser, isAuthenticated } = useAuth();

// Login mejorado
const result = await login({ email, password });
if (result.success) {
  // Login exitoso
}

// Verificación automática de token al cargar
// Logout automático si token expira
```

**Nuevas características:**
- ✅ Verificación de token JWT
- ✅ Loading state
- ✅ Error handling
- ✅ updateUser para actualizar datos
- ✅ isAuthenticated boolean

---

### 6. **Optimización con React.memo** 🚀

Componentes optimizados:
- ✅ `Navbar` - evita re-renders innecesarios
- ✅ `Footer` - callbacks memoizados
- ✅ Todos los componentes UI

**Beneficios:**
- Menos re-renders
- Mejor performance
- Mejor experiencia de usuario

---

## 📝 Cómo Usar

### Importar componentes UI
```jsx
import { Button, Card, Input, Modal } from './components/ui';
```

### Importar hooks
```jsx
import { useForm, useModal, useFetch, useLocalStorage } from './hooks';
```

### Importar servicios
```jsx
import { authService, productService, contactService } from './services';
```

---

## 🎨 Ejemplo Completo de Formulario

```jsx
import React from 'react';
import { useForm } from './hooks';
import { Button, Input } from './components/ui';
import { contactService } from './services';

const ContactForm = () => {
  const { values, handleChange, handleSubmit, isSubmitting } = useForm(
    {
      nombre: '',
      email: '',
      mensaje: ''
    },
    async (data) => {
      await contactService.sendMessage(data);
      alert('Mensaje enviado!');
    }
  );

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Nombre"
        name="nombre"
        value={values.nombre}
        onChange={handleChange}
        required
      />
      
      <Input
        label="Email"
        type="email"
        name="email"
        value={values.email}
        onChange={handleChange}
        required
      />
      
      <Button type="submit" loading={isSubmitting}>
        Enviar
      </Button>
    </form>
  );
};
```

---

## 🔥 Próximos Pasos Sugeridos

1. **Testing**: Agregar tests con Vitest
2. **Storybook**: Documentar componentes UI
3. **PWA**: Convertir en Progressive Web App
4. **i18n**: Internacionalización
5. **Dark Mode**: Tema oscuro

---

## 📦 Dependencias Actuales

- React 19.1.0
- React Router DOM 7.5.1
- Axios 1.8.4
- Tailwind CSS 4.1.4
- Firebase 11.6.0
- SweetAlert2 11.22.0
- React Icons 5.5.0

---

## 🛠️ Scripts Disponibles

```bash
npm run dev      # Desarrollo
npm run build    # Producción
npm run preview  # Preview build
```

---

**Creado con ❤️ usando las mejores prácticas de React 2026**
