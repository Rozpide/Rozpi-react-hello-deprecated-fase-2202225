const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            user: null, // Para guardar la información del usuario autenticado
            products: [], // Lista de productos
            cart: [], // Elementos del carrito
            orders: [], // Lista de pedidos
            notifications: [], // Notificaciones del usuario
        },
        actions: {
            // Autenticación
            login: async (email, password) => {
                try {
                    const response = await fetch('/api/login', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email, password }),
                    });
                    if (!response.ok) throw new Error("Error en el login");
                    const data = await response.json();
                    sessionStorage.setItem('token', data.token);
                    setStore({ user: data.user });
                } catch (error) {
                    console.error("Error durante el login:", error);
                }
            },
            register: async (name, email, password) => {
                try {
                    const response = await fetch('/api/register', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ name, email, password }),
                    });
                    if (!response.ok) throw new Error("Error en el registro");
                    alert("Usuario registrado con éxito");
                } catch (error) {
                    console.error("Error durante el registro:", error);
                }
            },
            logout: () => {
                sessionStorage.removeItem('token');
                setStore({ user: null });
            },

            // Productos
            getProducts: async () => {
                try {
                    const response = await fetch('/api/products');
                    if (!response.ok) throw new Error("Error al obtener productos");
                    const products = await response.json();
                    setStore({ products });
                } catch (error) {
                    console.error("Error al cargar los productos:", error);
                }
            },
            getProductDetails: async (id) => {
                try {
                    const response = await fetch(`/api/products/${id}`);
                    if (!response.ok) throw new Error("Error al obtener el producto");
                    const product = await response.json();
                    return product;
                } catch (error) {
                    console.error("Error al obtener detalles del producto:", error);
                }
            },

            // Carrito
            getCart: async (userId) => {
                try {
                    const response = await fetch(`/api/cart?user_id=${userId}`);
                    if (!response.ok) throw new Error("Error al obtener el carrito");
                    const cart = await response.json();
                    setStore({ cart });
                } catch (error) {
                    console.error("Error al cargar el carrito:", error);
                }
            },
            addToCart: async (userId, productId, quantity) => {
                try {
                    const response = await fetch('/api/cart', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ user_id: userId, product_id: productId, quantity }),
                    });
                    if (!response.ok) throw new Error("Error al agregar al carrito");
                    await getActions().getCart(userId); // Refrescar el carrito
                } catch (error) {
                    console.error("Error al agregar al carrito:", error);
                }
            },
            removeFromCart: async (cartItemId) => {
                try {
                    const response = await fetch(`/api/cart/${cartItemId}`, { method: 'DELETE' });
                    if (!response.ok) throw new Error("Error al eliminar del carrito");
                    const userId = getStore().user.id;
                    await getActions().getCart(userId); // Refrescar el carrito
                } catch (error) {
                    console.error("Error al eliminar del carrito:", error);
                }
            },

            // Pedidos
            createOrder: async (userId, cartItems) => {
                try {
                    const response = await fetch('/api/orders', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ user_id: userId, cart_items: cartItems }),
                    });
                    if (!response.ok) throw new Error("Error al crear el pedido");
                    await getActions().getOrders(userId); // Refrescar los pedidos
                } catch (error) {
                    console.error("Error al crear el pedido:", error);
                }
            },
            getOrders: async (userId) => {
                try {
                    const response = await fetch(`/api/orders?user_id=${userId}`);
                    if (!response.ok) throw new Error("Error al obtener los pedidos");
                    const orders = await response.json();
                    setStore({ orders });
                } catch (error) {
                    console.error("Error al cargar los pedidos:", error);
                }
            },

            // Notificaciones
            getNotifications: async (userId) => {
                try {
                    const response = await fetch(`/api/notifications?user_id=${userId}`);
                    if (!response.ok) throw new Error("Error al obtener notificaciones");
                    const notifications = await response.json();
                    setStore({ notifications });
                } catch (error) {
                    console.error("Error al cargar las notificaciones:", error);
                }
            },
            createNotification: async (userId, message) => {
                try {
                    const response = await fetch('/api/notifications', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ user_id: userId, message }),
                    });
                    if (!response.ok) throw new Error("Error al crear la notificación");
                    await getActions().getNotifications(userId); // Refrescar las notificaciones
                } catch (error) {
                    console.error("Error al crear notificación:", error);
                }
            },
        },
    };
};

export default getState;
