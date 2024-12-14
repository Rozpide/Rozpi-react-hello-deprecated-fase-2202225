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

			addNewPet: (newPet) => {
				const token = sessionStorage.getItem('token');
				console.log(token)
				fetch("https://literate-spoon-qx67x69j55jh67rj-3001.app.github.dev/create_pet", {
					method: 'POST',
					body: JSON.stringify(newPet),
					headers: {
						"Content-Type": "application/json",
						"Authorization": `Bearer ${token}`
					},
				})
					.then((response) => {
						console.log(response);
						return response.json()
					})
					.then((data) => {
						console.log(data);
						console.log("mascota y post creado");

					})
					.catch((error) => { console.log(error) })
			},



		}
	};

};
export default getState;
