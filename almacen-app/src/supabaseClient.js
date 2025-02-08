import { createClient } from '@supabase/supabase-js';
import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import './App.css';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_DATABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

function App() {
  const [productos, setProductos] = useState([]);
  const [nombre, setNombre] = useState('');
  const [cantidad, setCantidad] = useState(0);

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    const { data } = await supabase.from('productos').select('*');
    setProductos(data);
  };

  const agregarProducto = async () => {
    const { data } = await supabase
      .from('productos')
      .upsert({ nombre, cantidad, fecha: new Date().toISOString().split('T')[0] });
    fetchProductos();
  };

  const borrarProducto = async (id) => {
    await supabase.from('productos').delete().eq('id', id);
    fetchProductos();
  };

  return (
    <div className="App">
      <h1>Gestión de Salidas de Almacén</h1>
      <input
        type="text"
        placeholder="Nombre del producto"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input
        type="number"
        placeholder="Cantidad"
        value={cantidad}
        onChange={(e) => setCantidad(Number(e.target.value))}
      />
      <button onClick={agregarProducto}>Agregar Producto</button>
      <ul>
        {productos.map((producto) => (
          <li key={producto.id}>
            {producto.nombre} - {producto.cantidad} - {producto.fecha}
            <button onClick={() => borrarProducto(producto.id)}>Borrar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;