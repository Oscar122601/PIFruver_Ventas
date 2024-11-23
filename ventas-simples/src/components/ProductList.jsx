import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = ({ onSelectProduct }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/api/products')
            .then(response => setProducts(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h3 className="text-center text-success">Lista de Productos</h3>
            <ul className="list-group mt-4">
                {products.map((product) => (
                    <li
                        key={product.idproducto}
                        className="list-group-item d-flex justify-content-between align-items-center"
                        onClick={() => onSelectProduct(product)}
                        style={{
                            cursor: 'pointer',
                            backgroundColor: '#d4edda', // Fondo verde suave
                            transition: 'background-color 0.3s ease',
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#c3e6cb'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#d4edda'}
                    >
                        {product.nombre}
                        <span className="badge bg-success rounded-pill">
                            ${product.precio}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
