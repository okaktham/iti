import React, { useState, useEffect } from 'react';
import './Product.css'

export default function Product() {
    const [products, setProducts] = useState([
        { id: 1, name: 'Laptop', price: 999, quantity: 5 },
        { id: 2, name: 'Mouse', price: 25, quantity: 12 },
        { id: 3, name: 'Keyboard', price: 75, quantity: 8 },
        { id: 4, name: 'Monitor', price: 299, quantity: 3 },
    ]);
    const [totalProducts, setTotalProducts] = useState(0);

    useEffect(() => {
        const total = products.reduce(
            (sum, product) => sum + product.quantity,
            0
        );
        setTotalProducts(total);
    }, [products]);

    const updateQuantity = (id, change) => {
        setProducts(prevProducts =>
            prevProducts.map(product => {
                if (product.id === id) {
                    const newQuantity = product.quantity + change;
                    if (newQuantity < 0) {
                        return { ...product, quantity: 0 };
                    }
                    return { ...product, quantity: newQuantity };
                }
                return product;
            })
        );
    };

    const deleteProduct = id => {
        setProducts(prevProducts =>
            prevProducts.filter(product => product.id !== id)
        );
    };

    return (
        <div className="product-manager">
            <h1>Product Manager</h1>
            
            <div className="total-display">
                Total Products in Stock: {totalProducts}
            </div>

            {products.length === 0 && (
                <div className="no-products">
                    No products available
                </div>
            )}
            
            {products.length > 0 && (
                <div className="product-grid">
                    {products.map(product => (
                        <div key={product.id} className="product-card">
                            <h3>{product.name}</h3>
                            <p className="product-price">${product.price}</p>
                            <div className="quantity-display">
                                Quantity: {product.quantity}
                            </div>
                            <div className="button-group">
                                <button onClick={() => updateQuantity(product.id, 1)}>+</button>
                                <button onClick={() => updateQuantity(product.id, -1)} disabled={product.quantity === 0}>-</button>
                            </div>
                            <button className="delete-button" onClick={() => deleteProduct(product.id)}>Delete</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}