const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			videogames: [],
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

			fetchGameDetails: async (appId) => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/steam/${appId}`);
					if (!response.ok) throw new Error("Error en la respuesta de la API");

					const data = await response.json();
					console.log(data);


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

			fetchGames: async () => {
				try {
					const response = await fetch(`${process.env.BACKEND_URL}/api/games`);
					const data = await response.json()
					console.log(data);
					
					setStore({ videogames: data.result })
					
				} catch (error) {
					console.log(error)
				}
			}
		}
	};
};

export default getState;
