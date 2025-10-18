<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use App\Http\Resources\ProductoCollection; // ✅ Importamos la colección
use Illuminate\Http\Request;

class ProductoController extends Controller
{
    /**
     * Muestra todos los productos disponibles en orden descendente.
     */
    public function index()
    {
        // 🔹 Trae todos los productos con 'disponible = 1', ordenados por id descendente
        return new ProductoCollection(
            Producto::where('disponible', 1)
                ->orderBy('id', 'DESC')
                ->get()
        );
    }

    public function update(Request $request, Producto $producto)
    {
        //
        $producto->disponible = 0;
        $producto->save();
        return [
            'producto' => $producto
        ];
    }
}
