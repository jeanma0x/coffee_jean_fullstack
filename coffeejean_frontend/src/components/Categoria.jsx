import useQuiosco from "../hooks/useQuiosco" //importamos el custom hook

export default function Categoria({ categoria }) {

    const { handleClickCategoria, categoriaActual } = useQuiosco() // agregamos categoriaActual

  const { icono, id, nombre } = categoria
  // funcion para resaltar la categoria actual
  const resaltarCategoriaActual = () => categoriaActual.id === id ? 'bg-amber-400' : 'bg-white'
  

  return (
    //Ahora vamos a agregar una clase condicional para resaltar la categoria actual
    //convertimos el string en un template string usando las comillas invertidas ``
    //y agregamos la clase condicional usando el operador ternario
    <div className={`${resaltarCategoriaActual()} flex items-center gap-4 border w-full p-3 hover:bg-amber-400 cursor-pointer`}>
      <img 
            alt="Imagen Icono"
            src={`/img/icono_${icono}.svg`}
            className="w-12"
        />
        <button 
            className="text-lg font-bold cursor-pointer truncate"
            type="button"
            onClick={() => handleClickCategoria(id)} // Actualizamos la categoria actual al hacer click en una categoria
            >
            {nombre}
        </button>
    </div>
  )
}