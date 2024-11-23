import React, { useState } from 'react';
import axios from 'axios';

const SellProduct = ({ product }) => {
    const [quantity, setQuantity] = useState('');
    const [totalPrice, setTotalPrice] = useState(0);

    // Actualiza el totalPrice cuando cambie la cantidad
    const handleQuantityChange = (e) => {
        const newQuantity = e.target.value;
        setQuantity(newQuantity);

        // Calculamos el precio total (precio * cantidad)
        if (newQuantity && newQuantity > 0) {
            setTotalPrice(product.precio * newQuantity);
        } else {
            setTotalPrice(0);
        }
    };

    const handleSell = () => {
        if (!quantity || quantity <= 0) {
            alert('Por favor, ingrese una cantidad válida.');
            return;
        }

        axios
            .post('http://localhost:3001/api/sell', {
                idproducto: product.idproducto,
                cantidad: parseInt(quantity, 10),
            })
            .then(() => {
                alert('Venta realizada con éxito');
                setQuantity('');
                setTotalPrice(0); // Resetear el total al vender
            })
            .catch((error) => console.error(error));
    };

    return (
        <div className="text-center">
            <h3 className="text-success">Vender Producto</h3>
            <p className="mt-3">
                <strong>Producto seleccionado:</strong> {product.nombre}
            </p>
            <p>
                <strong>Precio:</strong> ${product.precio}
            </p>
            <input
                type="number"
                className="form-control mt-3 mb-3 w-50 mx-auto"
                placeholder="Cantidad"
                value={quantity}
                onChange={handleQuantityChange}
                style={{
                    borderColor: '#28a745',
                    boxShadow: '0 0 10px rgba(40,167,69,0.3)',
                }}
            />
            {totalPrice > 0 && (
                <p className="text-success">
                    <strong>Precio Total:</strong> ${totalPrice}
                </p>
            )}
            <button className="btn btn-success mt-3 w-50 mx-auto" onClick={handleSell}>
                Realizar Venta
            </button>
        </div>
    );
};

export default SellProduct;
