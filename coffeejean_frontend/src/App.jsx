import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="min-h-screen grid place-items-center bg-slate-600">
        <button className="px-6 py-3 text-white font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-700">
          Hola Progra Web 2 con Tailwind CSS
        </button>
      </div>
    </>
  )
}

export default App
