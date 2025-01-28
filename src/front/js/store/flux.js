const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
            auth: localStorage.getItem('token') || false,
            user: null,
            token: null,
            player_info: null,
            host_info: null,
            url: process.env.BACKEND_URL,
		},
		actions: {

            /////////////////////////////////////////USER/////////////////////////////////////////

            getUserData: async () => {  //GET USER
                try {
                    const resp = await fetch(url +"/api/protected", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                        },
                    });

                    if (!resp.ok) {
                        throw new Error("Error al obtener los datos del usuario");
                    }

                    const data = await resp.json();
                    console.log("Datos del usuario:", data);

                    setStore({ user: data.users});
                } catch (error) {
                    console.error("Error en getUserData:", error);
                }
            },

			register: async (formData) => { //POST USER SIGNUP
                try {
                    const resp = await fetch(url + "/api/signup", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(formData)
                    });

                    if (!resp.ok) {
                        const errorData = await resp.json(); // Obtener los detalles de la respuesta de error
                        console.error("Error en el registro:", errorData); // Imprimir la respuesta de error
                        throw new Error("Error al registrar el usuario");
                    }

                    const data = await resp.json();
                    console.log("Usuario registrado:", data);
                    localStorage.setItem ('token', data.token)
                    setStore({ auth: true, token: data.token, user: data?.user_info, player_info: data?.player_info, host_info: data?.host_info});

                } catch (error) {
                    console.error("Error en register:", error);
                }
            },

            login: async (formData) => {    //POST USER LOGIN
                try {
                    const resp = await fetch(url + "/api/login", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(formData),
                    });

                    if (!resp.ok) {
                        throw new Error("Error al iniciar sesión");
                    }

                    const data = await resp.json();
                    console.log("Usuario logeado:", data);
                    localStorage.setItem ('token', data.token)
                    setStore({ auth: true, token: data.token, user: data?.user_info, player_info: data?.player_info, host_info: data?.host_info});
                } catch (error) {
                    console.error("Error en login:", error);
                }
            },
			getMessage: () => {
                console.log("Mensaje inicial cargado");
			},


            /////////////////////////////////////////USER/////////////////////////////////////////

            getAllHostsData: async () => {  //GET HOST
                try {
                    const store = getStore();
                    const resp = await fetch(store.url +"/api/host/profile", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json"
                        },
                    });

                    if (!resp.ok) {
                        throw new Error("Error al obtener los datos del host");
                    }

                    const data = await resp.json();
                    console.log("Datos del host:", data);

                } catch (error) {
                    console.error("Error en getUserHost:", error);
                }
            },

            getAllHostsData: async () => {  //GET ONE HOST
                try {
                    const store = getStore();
                    const resp = await fetch(store.url +"/api/host/profile", {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json"
                        },
                    });

                    if (!resp.ok) {
                        throw new Error("Error al obtener los datos del host");
                    }

                    const data = await resp.json();
                    console.log("Datos del host:", data);

                } catch (error) {
                    console.error("Error en getUserHost:", error);
                }
            },

            EditHostData: async () => {  //PUT ONE HOST
                try {
                    const store = getStore();
                    const resp = await fetch(store.url +"/api/host/profile/", {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                    });

                    if (!resp.ok) {
                        throw new Error("Error al obtener los datos del host");
                    }

                    const data = await resp.json();
                    console.log("Datos del host:", data);
                    
                } catch (error) {
                    console.error("Error en getUserHost:", error);
                }
            },

        },
    };
};

export default getState;
