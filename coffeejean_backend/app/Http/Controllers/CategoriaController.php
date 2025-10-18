<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoriaResource;
use Illuminate\Http\Request;
use App\Models\Categoria;

class CategoriaController extends Controller
{
    public function index()
    {
        return CategoriaResource::collection(Categoria::all());
    }
}
