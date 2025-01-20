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
			]
		},
		actions: {
			register: async (formData) => {
                try {
                    const resp = await fetch("https://miniature-space-cod-wr99gvxjrvr539pg4-3001.app.github.dev/api/signup", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(formData),
                    });

                    if (!resp.ok) {
                        const errorData = await resp.json(); // Obtener los detalles de la respuesta de error
                        console.error("Error en el registro:", errorData); // Imprimir la respuesta de error
                        throw new Error("Error al registrar el usuario");
                    }

                    const data = await resp.json();
                    console.log("Usuario registrado:", data);
                    localStorage.setItem ('token', data.token)
                } catch (error) {
                    console.error("Error en register:", error);
                }
            },

            login: async (formData) => {
                try {
                    const resp = await fetch("https://miniature-space-cod-wr99gvxjrvr539pg4-3001.app.github.dev/api/login", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(formData),
                    });

                    if (!resp.ok) {
                        throw new Error("Error al iniciar sesión");
                    }

                    const data = await resp.json();
                    console.log("Usuario logeado:", data);

                    setStore({ user: data });
                } catch (error) {
                    console.error("Error en login:", error);
                }
            },
			getMessage: () => {
                console.log("Mensaje inicial cargado");
			},
        },
    };
};

export default getState;
