import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
// import { categorias as categoriasDB } from "../data/categorias"; //Comentado para obtener las categorías desde el backend y ya no desde un archivo estático
import clienteAxios from "../config/axios"; // ✅ Importamos el clienteAxios para hacer peticiones al backend

// 1️⃣ Creamos el contexto del Quiosco
const QuioscoContext = createContext();

// 2️⃣ Definimos el proveedor que encapsula toda la lógica y estados globales
const QuioscoProvider = ({ children }) => {

  // --- Estados principales del contexto ---
  const [categorias, setCategorias] = useState([]); // Guarda todas las categorías, ahora vacío inicialmente porque se cargan desde el backend
  const [categoriaActual, setCategoriaActual] = useState({}); // Guarda la categoría seleccionada
  const [modal, setModal] = useState(false);                   // Controla si el modal está abierto o cerrado
  const [producto, setProducto] = useState({});                // Guarda el producto actual
  const [pedido, setPedido] = useState([]);                    // Guarda los productos agregados al pedido
  const [total, setTotal] = useState(0);                       // Guarda el total del pedido

  // --- Calcula el total automáticamente cuando cambia el pedido ---
  useEffect(() => {
    const nuevoTotal = pedido.reduce(
      (total, producto) => producto.precio * producto.cantidad + total,
      0
    );
    setTotal(nuevoTotal);
  }, [pedido]);

  // 🆕 --- Obtiene las categorías desde el backend mediante la API ---
   // Actualizar la función de obtener categorias porque ahora necesitamos el token ya que movimos los endpoints detras de autenticación
    const obtenerCategorias = async () => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            const {data} = await clienteAxios('/api/categorias', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setCategorias(data.data)
            setCategoriaActual(data.data[0])
        } catch (error) {
            console.log(error)
        }
    }


  // 🆕 --- Ejecuta la carga inicial de categorías al montar el componente ---
  useEffect(() => {
    obtenerCategorias(); // Llamamos la función una sola vez al cargar el provider
  }, []);

  // --- Cambia la categoría actual al hacer clic en una ---
  const handleClickCategoria = (id) => {
    const categoria = categorias.find((cat) => cat.id === id);
    setCategoriaActual(categoria);
  };

  // --- Abre o cierra el modal ---
  const handleClickModal = () => setModal(!modal);

  // --- Establece el producto actual (por ejemplo, cuando el usuario hace clic en uno) ---
  const handleSetProducto = (producto) => setProducto(producto);

  // --- Agrega un producto al pedido o actualiza si ya existe ---
  const handleAgregarPedido = ({ categoria_id, ...producto }) => {
    if (pedido.some((p) => p.id === producto.id)) {
      // Si ya existe, lo actualiza
      const pedidoActualizado = pedido.map((p) =>
        p.id === producto.id ? producto : p
      );
      setPedido(pedidoActualizado);
      toast.success("Cambios guardados correctamente");
    } else {
      // Si no existe, lo agrega
      setPedido([...pedido, producto]);
      toast.success("Producto agregado al pedido");
    }
  };

  // --- Abre el modal para editar la cantidad de un producto ---
  const handleEditarCantidad = (id) => {
    const productoActualizar = pedido.find((p) => p.id === id);
    setProducto(productoActualizar);
    setModal(true);
  };

  // --- Elimina un producto del pedido ---
  const handleEliminarProducto = (id) => {
    const pedidoActualizado = pedido.filter((p) => p.id !== id);
    setPedido(pedidoActualizado);
    toast.success("Producto eliminado del pedido");
  };

// Función para crear un nuevo pedido
    // Esta función debe de agregarse despues de la función handleEliminarProductoPedido
    const handleSubmitNuevaOrden = async (logout) => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            const {data} = await clienteAxios.post('/api/pedidos', 
            {
                total,
                productos: pedido.map(producto => {
                    return {
                        id: producto.id,
                        cantidad: producto.cantidad
                    }
                })
            }, 
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            toast.success(data.message);
            setTimeout(() => {
                setPedido([])
            }, 1000);

            // Cerrar la sesión del usuario
            setTimeout(() => {
                localStorage.removeItem('AUTH_TOKEN');
                logout();
            }, 3000);
        } catch (error) {
            console.log(error)
        }
    }

    // Esta función debe de agregarse despues de la función handleSubmitNuevaOrden
    const handleClickCompletarPedido = async id => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            await clienteAxios.put(`/api/pedidos/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    const handleClickProductoAgotado = async id => {
        const token = localStorage.getItem('AUTH_TOKEN')
        try {
            await clienteAxios.put(`/api/productos/${id}`, null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        } catch (error) {
            console.log(error)
        }
    }
    
    // Hay que retornar la función en el provider modifica la parte del return
    return (
        <QuioscoContext.Provider
            value={{                
                categorias,
                categoriaActual,
                handleClickCategoria,
                modal,
                handleClickModal,
                producto,
                handleSetProducto,
                pedido,
                handleAgregarPedido,
                handleEditarCantidad,
                handleEliminarProducto,
                total,
                handleSubmitNuevaOrden,
                handleClickCompletarPedido,
                handleClickProductoAgotado
            }}
        >
            {children}
        </QuioscoContext.Provider>
    )
;
};

// 3️⃣ Exportamos el Provider y el Contexto
export { QuioscoProvider };
export default QuioscoContext;
