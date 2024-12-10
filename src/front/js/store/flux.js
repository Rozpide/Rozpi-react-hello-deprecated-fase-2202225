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

				fetch("https://literate-spoon-qx67x69j55jh67rj-3001.app.github.dev/create_pet", {
					method: 'POST',
					body: JSON.stringify(newPet),
					headers: {
						"Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTczMzc4MzkzNywianRpIjoiMTIwNzRkMzItOGZkNS00Mjg3LThlMWUtNmQzY2Y4NzM1OWY3IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6InJvc2FyaW9fYWxvbnNvQGhvdG1haWwuY29tIiwibmJmIjoxNzMzNzgzOTM3LCJjc3JmIjoiODMxMDA1NjgtNWZlNS00ZmQ4LTkwYjQtM2JkOGYzOTA5MTc1IiwiZXhwIjoxNzMzNzg0ODM3LCJ1c2VyX2lkIjoyfQ.BjX5c6y85yBx5OSXLRnPacshHEML2yRiVVaVtJCnu90",
						'Content-Type': 'application/json'
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
					.catch((error) => {console.log(error) })
			},

			
			
		}
	};

};
	export default getState;
