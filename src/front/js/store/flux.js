const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			demo: [{title: "FIRST", background: "white", initial: "white"},
				{title: "SECOND", background: "white", initial: "white"}],
			message: null,
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {getActions().changeColor(0, "green");},
			getMessage: async () => {
				const uri = `${process.env.BACKEND_URL}/api/hello`;
				const options = {
					method: 'GET'
				};
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log("Error loading message from backend", response.status);
					return
				}
				const data = await response.json();
				setStore({ message: data.message });
				return data;
			},
			changeColor: (index, color) => {
				const store = getStore();
				const demo = store.demo.map((element, i) => {
					if (i === index) element.background = color;
					return element;
				});
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
