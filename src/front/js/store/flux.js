const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			user: null,
			product: [],
			cart: [],
			orders: [],
			notification: [],
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},

			// Autenticación
			ogin: async (email, password) => {
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

            // Carrito
            getCart: async () => {
                try {
                    const response = await fetch('/api/cart', {
                        headers: {
                            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                        }
                    });
                    if (!response.ok) throw new Error("Error al obtener el carrito");
                    const cart = await response.json();
                    setStore({ cart });
                } catch (error) {
                    console.error("Error al cargar el carrito:", error);
                }
            },
            addToCart: async (productId, quantity) => {
                try {
                    const response = await fetch('/api/cart', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                        },
                        body: JSON.stringify({ product_id: productId, quantity }),
                    });
                    if (!response.ok) throw new Error("Error al agregar al carrito");
                    await getActions().getCart();
                } catch (error) {
                    console.error("Error al agregar al carrito:", error);
                }
            },

            // Notificaciones
            getNotifications: async () => {
                try {
                    const response = await fetch('/api/notifications', {
                        headers: {
                            'Authorization': `Bearer ${sessionStorage.getItem('token')}`
                        }
                    });
                    if (!response.ok) throw new Error("Error al obtener notificaciones");
                    const notifications = await response.json();
                    setStore({ notifications });
                } catch (error) {
                    console.error("Error al cargar las notificaciones:", error);
                }
            }
        }
    };
};

export default getState;