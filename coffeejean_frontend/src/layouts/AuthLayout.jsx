import { Outlet } from "react-router-dom"

export default function AuthLayout() {
  return (
    <main className="max-w-4xl m-auto mt-10 md:mt-28 flex
    flex-col md:flex-row items-center">

      <img
      src="../img/coffee_logo.png" 
      alt="Imagen de Logo Principal" 
      className="max-w-xs"
      />

      <div className="w-full p-10">
        <Outlet />
      </div>
    </main>
  )
}