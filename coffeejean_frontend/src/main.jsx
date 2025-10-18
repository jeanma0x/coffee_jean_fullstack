import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { QuioscoProvider } from './context/QuioscoProvider.jsx'
import router from './router.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  /**En el strict mode definimos el ruteo por <RouterProvider>, entonces react respeta el contexto de la aplicacion
   * y el ruteo que definimos en router.jsx
   * 
   * El strict mode es una herramienta para destacar problemas potenciales en una aplicacion de React.
   * Activa comprobaciones y advertencias adicionales para sus descendientes.
   * No renderiza nada en la interfaz de usuario.
   */
  <StrictMode>
    <QuioscoProvider>
      <RouterProvider router={router} />
    </QuioscoProvider>
  </StrictMode>,
)
