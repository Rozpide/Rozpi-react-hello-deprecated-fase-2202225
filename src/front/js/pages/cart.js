import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/cart.css";

export const Cart = () => {
    const { store, actions } = useContext(Context);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchCart = async () => {
            const userId = JSON.parse(localStorage.getItem("user")).id;
            const response = await fetch(`/api/cart?user_id=${userId}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem("token")}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setCartItems(data);
            }
        };
        fetchCart();
    }, [actions]);

    return (
        <div className="cart-container">
            <h1>Tu Carrito</h1>
            {cartItems.length > 0 ? (
                <ul>
                    {cartItems.map((item) => (
                        <li key={item.id}>
                            <p>{item.product.name}</p>
                            <p>Cantidad: {item.quantity}</p>
                            <p>Precio: ${(item.product.price * item.quantity).toFixed(2)}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay productos en el carrito.</p>
            )}
        </div>
    );
};
