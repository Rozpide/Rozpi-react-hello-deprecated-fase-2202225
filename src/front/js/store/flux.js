const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			user: '',
			isLogged: false
		},
		actions: {
			// Use getActions to call a function within a function
			signup: async (dataToSend) => {
				const uri = `${process.env.BACKEND_URL}/api/signup`;
				const options = {
					method: 'POST',
					headers: {
						"Content-Type": 'application/json'
					},
					body: JSON.stringify(dataToSend)
				};
				const response = await fetch(uri, options);
				const data = await response.json();
				if (!response.ok) {
					console.log('Error', response.status, response.statusText);
					setStore({ message: data.message })
					return false;
				}
				await getActions().login(dataToSend);
				return true;
			},
			login: async (dataToSend) => {
				const uri = `${process.env.BACKEND_URL}/api/login`;
				const options = {
					method: 'POST',
					headers: {
						"Content-Type": 'application/json'
					},
					body: JSON.stringify(dataToSend)
				};
				const response = await fetch(uri, options);
				const data = await response.json();
				if (!response.ok) {
					console.log('Error', response.status, response.statusText);
					setStore({ message: data.message })
					return false;
				};
				localStorage.setItem('token', data.access_token);
				localStorage.setItem('user', JSON.stringify(data.results));
				setStore({ isLogged: true, user: data.results });
				return true;
			},
			isLogged: () => {
				const token = localStorage.getItem('token');
				if (token) {
					const userData = JSON.parse(localStorage.getItem('user'));
					setStore({ isLogged: true, user: userData })
				};
			},
			logout: () => {
				setStore({ isLogged: false, user: '' });
				localStorage.removeItem('token');
				localStorage.removeItem('user');
			},
			getData: async (id) => {
				const uri = `${process.env.BACKEND_URL}/api/users/${id}`;
				const options = {
					method: 'GET'
				};
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log('Error', response.status, response.statusText);
				};
				const data = await response.json();
				setStore({ user: data.results });
			},
			editData: async (id, dataToSend) => {
				const uri = `${process.env.BACKEND_URL}/api/users/${id}`;
				const options = {
					method: 'PUT',
					headers: {
						"Content-Type": 'application/json'
					},
					body: JSON.stringify(dataToSend)
				};
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log('Error', response.status, response.statusText);
					return false;
				};
				const data = await response.json();
				getActions().getData(id);
				return true;
			},
			removeAccount: async (id) => {
				const uri = `${process.env.BACKEND_URL}/api/users/${id}`;
				const options = {
					method: 'DELETE'
				};
				const response = await fetch(uri, options);
				if (!response.ok) {
					console.log('Error', response.status, response.statusText);
					return false;
				};
				const data = await response.json();
				getActions().logout();
				return true;
			}
		}
	};
};

export default getState;
