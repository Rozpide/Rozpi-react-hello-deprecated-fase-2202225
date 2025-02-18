const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			user: null,
			token: localStorage.getItem("token") || null,
			videogames: [],
			tags: [],
			videogamesSearch: [],
			currentSearchPage: 1,
			message: null,
			specificVideogameSteamId: 0,
			selectedGame: {}
		},
		actions: {
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try {
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
					const data = await resp.json();
					setStore({ message: data.message });

					return data;
				} catch (error) {
					console.log("Error loading message from backend", error);
				}
			},

			changeColor: (index, color) => {
				const store = getStore();
				const demo = store.demo.map((elm, i) => {
					if (i === index) return { ...elm, background: color };
					return elm;
				});

				setStore({ demo: demo });
			},
			setSpecificVideogameSteamId: (game) => {
				const store = getStore();
				setStore({ ...store, selectedGame: game });
			},
			fetchGameDetails: async (appId) => {
				const store = getStore();
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/steam/${appId}`);
					// console.log(response);
					if (!response.ok) throw new Error("Error en la respuesta de la API");
					const data = await response.json();
					// console.log(data);
					console.log(data[appId].data.name);
					let resultSteam = data[appId].data
					setStore({
						...store,
						selectedGame: {
							...store.selectedGame,
							shortDescription: resultSteam.short_description,
							screenshots: resultSteam.screenshots,
							movies: resultSteam.movies,
							image: resultSteam.header_image
						}
					})
					console.log("AQUI", store.selectedGame);

					return data[appId].data





					// if (data) {
					// 	const gameData = data["730"].data;
					// 	setStore({
					// 		videogames: [{
					// 			id: gameData.steam_appid,
					// 			name: gameData.name,
					// 			image: gameData.header_image,
					// 			price: gameData.price_overview ? gameData.price_overview.final_formatted : "Gratis",
					// 		}]
					// 	});
					// } else {
					// 	console.error("La API no devolvió datos válidos.");
					// }
				} catch (error) {
					console.error("Error al obtener los juegos:", error);
				}
			},

			fetchGames: async (page) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/games?page=${page}`);
					const data = await response.json()
					console.log(data);

					setStore({ videogames: data.result })

				} catch (error) {
					console.log(error)
				}
			},
			fetchTags: async () => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/tags`);
					const data = await response.json()
					// console.log(data);
					let tagNames = data.results.map((tag) => tag.tag_name)
					setStore({ tags: tagNames })
					// console.log(getStore().tags);

				} catch (error) {
					console.log(error)
				}
			},

			fetchSearchGames: async (page) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/games?page=${page}`);
					const data = await response.json()
					console.log(data);

					setStore({ videogamesSearch: data.result })

				} catch (error) {
					console.log(error)
				}
			},
			handlePagination: async (page) => {
				getStore().currentSearchPage = page
				await getActions().fetchSearchGames(page)

			},

			login: async (email, password) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/login`, {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ email, password })
					});

					if (!response.ok) throw new Error("Error en las credenciales");

					const data = await response.json();
					localStorage.setItem("token", data.token);
					setStore({ user: data.user, token: data.token });

					return true;
				} catch (error) {
					console.error(error);
					return false;
				}
			},
			logout: () => {
				localStorage.removeItem("token");
				setStore({ user: null, token: null });//borra token cierra sesion
			},
			signup: async (email, password) => {
				try {
					const response = await fetch(process.env.BACKEND_URL + "/api/signup", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ email, password }),
					});

					const data = await response.json();
					// if (response.ok) {
					// 	return true;  // Registro exitoso
					// } else {
					// 	console.error("Error en el registro:", data.msg);
					// 	return false;  // Registro fallido
					//}
				} catch (error) {
					console.error("Error en la solicitud:", error);
					return false;
				}
			}
		}
	};
};

export default getState;
