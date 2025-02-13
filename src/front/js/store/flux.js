const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			videogames: [{
				"name": "Kingdom Come: Deliverance II",
				"appId": 1771300,
				"release": "2025-02-04T12:00:00.000Z",
				"imageID": "93e28946c46f09d761bbfab1e17e8c1c4a8323a0",
				"tags": [
					74,
					153,
					37,
					58,
					59,
					68,
					34,
					177,
					36,
					93,
					271,
					96,
					217,
					272,
					101,
					72,
					15,
					39,
					60
				],
				"score": 87.94,
				"g2aPrice": 57,
				"g2aUrl": "/kingdom-come-deliverance-ii-pc-steam-key-global-i10000505220001",
				"steamPrice": 59.99
			},
			{
				"name": "Project Zomboid",
				"appId": 108600,
				"release": "2013-11-08T12:00:00.000Z",
				"imageID": "",
				"tags": [
					0,
					234,
					37,
					330,
					22,
					174,
					6,
					1,
					25,
					5,
					74,
					259,
					58,
					23,
					21,
					34
				],
				"score": 93.14,
				"g2aPrice": 22.73,
				"g2aUrl": "/project-zomboid-steam-key-global-i10000004077005",
				"steamPrice": 13.06
			}, 				
			],
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

			fetchGames: async (appId) => {
				try {
					const response = await fetch(`https://upgraded-space-happiness-q79wp6xqv77q34g67-3001.app.github.dev/api/steam/${appId}`);
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
			}
		}
	};
};

export default getState;
