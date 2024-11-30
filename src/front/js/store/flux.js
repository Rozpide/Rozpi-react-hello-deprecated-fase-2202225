import { clean_student_data } from "../functions/clean_parent_data";
const backendURL = process.env.BACKEND_URL || ""


const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			profesores: [],
			usuarios: [],
			grados: [],
			materias: [],
			personalInfo: null,
			contactos: null
		},
		actions: {
			// Use getActions to call a function within a fuction
			fetchRoute: async (endpoint, { method = 'GET', body = '', isPrivate = false, bluePrint = '' } = {}) => {
				if (isPrivate) getActions().loadSession();

				const headers = {
					'Content-Type': 'application/json',
					'Access-Control-Allow-Origin': '*',
				}
				const { token } = getStore()


				if (isPrivate && token) {
					headers['Authorization'] = `Bearer ${token}`
				}

				if (isPrivate && (!token || !bluePrint)) {
					throw new Error(`Missing: Token: ${!token}, bluePrint: ${!bluePrint} for private route`)
				}

				const URL = isPrivate ? `${backendURL}api/${bluePrint}/${endpoint}` : `${backendURL}api/${endpoint}`

				const params = {
					method,
					headers
				}

				if (body) {
					params.body = JSON.stringify(body);
				}

				try {
					const response = await fetch(URL, params)

					if (!response.ok) {
						let error = await response.json()
						if (error.msg?.includes("Token has expired")) {
							localStorage.removeItem("token")
							localStorage.removeItem("role")
							window.location.href = '/'
							return { "msg": "Session Expired" }
						}


						throw new Error(`Error con la solicitud: ${error.msg ?? error.error}`)
					}

					const data = await response.json()
					return data

				} catch (error) {
					console.error(error.message)
					throw error
				}

			}, loadSession: async () => {
				let token = localStorage.getItem('token')
				let role = localStorage.getItem('role')

				if (!token) {
					token = null
					console.info("No token found")
				}

				if (!role) {
					role = null

					console.info("No role found")
				}
				setStore({ 'token': token, 'role': role })

				console.info("Session Loaded")

			}, crudOperation: async (entity, method, { id = '', body = null, bluePrint = '' } = {}) => {
				const validMethods = ['GET', 'POST', 'PUT', 'DELETE']
				if (!validMethods.includes(method)) {
					throw new Error(`Invalid method "${method}". Allowed methods: ${validMethods.join(', ')}`);

				}

				if (['PUT', 'DELETE'].includes(method) && !id) {
					throw new Error(`Missing URL parameters for method "${method}".`);
				}
				try {
					let endpoint = id ? `${entity}/${id}` : entity
					const response = await getActions().fetchRoute(endpoint, {
						method,
						isPrivate: true,
						bluePrint: bluePrint,
						body: method !== 'GET' ? body : null
					})

					return response

				} catch (error) {
					console.error(`Error in CRUD operation for ${entity}: ${error.message}`);
					throw error
				}

			}, subjectsOperations: async (method, body = '', id = '') => {
				return getActions().crudOperation('materias', method, { id, body, bluePrint: 'admin' })
			},

			// CRUD para usuarios autorizados

			getUsers: async () => {
				const actions = getActions()
				const data = await actions.fetchRoute("user/auth", {
					method: "GET",
					isPrivate: true,
					bluePrint: 'admin'
				});
				setStore({ usuarios: data })
			},

			postUser: async (body) => {
				const actions = getActions()
				const data = await actions.fetchRoute("user/auth", {
					method: "POST",
					body: body,
					isPrivate: true,
					bluePrint: 'admin'
				});
				actions.getUsers()
			},

			deleteUser: async (id) => {
				const actions = getActions()
				const data = await actions.fetchRoute(`user/auth/${id}`, {
					method: "DELETE",
					isPrivate: true,
					bluePrint: 'admin'
				});
				actions.getUsers()
			},

			// CRUD para profesores

			postTeacher: async (body) => {
				const actions = getActions()
				const data = await actions.fetchRoute("teacher", {
					method: "POST",
					body: body,
					isPrivate: true,
					bluePrint: 'admin'
				});
				actions.getTeachers()
			},

			deleteTeacher: async (id) => {
				const actions = getActions()
				const data = await actions.fetchRoute(`teacher/${id}`, {
					method: "DELETE",
					isPrivate: true,
					bluePrint: 'admin'
				});
				actions.getTeachers()
			},

			getTeachers: async () => {
				const actions = getActions()
				const data = await actions.fetchRoute("teachers", {
					method: "GET",
					isPrivate: true,
					bluePrint: 'admin'
				});
				setStore({ profesores: data })
			}, postCourse: async (grado) => {
				const actions = getActions()
				const data = await actions.fetchRoute("grados", {
					method: "POST",
					body: grado,
					isPrivate: true,
					bluePrint: 'admin'
				});
				actions.getCourses()
			}, deleteCourse: async (id) => {
				const actions = getActions()
				const data = await actions.fetchRoute(`grados/${id}`, {
					method: "DELETE",
					isPrivate: true,
					bluePrint: 'admin'
				});
				await actions.getCourses()
			}, getCourses: async () => {
				const actions = getActions()

				console.log(getActions())
				const data = await actions.fetchRoute("grados", {
					method: "GET",
					isPrivate: true,
					bluePrint: 'admin'
				});
				setStore({ grados: data })

				return data
			}, handleRegister: async (body) => {
				try {
					const data = await actions.fetchRoute('signup', { method: 'POST', body });
					return true;
				} catch (error) {
					console.error("Error en handleRegister:", error);
					return 'Ocurrió un error al intentar registrarse';
				}
			}, handleLogin: async (body) => {
				try {
					const data = await getActions().fetchRoute("login", {
						method: "POST",
						body
					});


					if (data.token && data.role) {
						const rol = data.role.toLowerCase();
						localStorage.setItem("token", data.token);
						localStorage.setItem("role", rol);

						setStore({ token: data.token, role: rol });

						return { success: true, role: rol };
					}
					return { success: false, message: "Respuesta incompleta del backend" };

				} catch (error) {
					console.error("Error en handleLogin:", error.message);
					return { success: false, message: error.message || "Error desconocido" };
				}
			}, isAuthorized: (requiredRoles) => {
				const store = getStore();
				console.log("store.role:", store.role);
				console.log("requiredRoles:", requiredRoles);
				return requiredRoles.includes(store.role);
			}, handleLogout: async () => {
				const { fetchRoute } = getActions();
				try {
					const resp = await fetchRoute("/logout", {
						method: "POST",
						isPrivate: true,
						bluePrint: "session"
					});

					if (!resp) {
						console.error("No se pudo cerrar sesión");
						return;
					}

					setStore({ token: null, role: null });
					localStorage.removeItem("token");
					localStorage.removeItem("role");
				} catch (error) {
					console.error("Error al cerrar sesión:", error);
				}
			}, getParentInfo: async () => {

				try {
					let parentData = await getActions().fetchRoute("info", { isPrivate: true, bluePrint: "parent" })

					if (parentData["estudiantes"]) {
						parentData["statusResume"] = parentData["estudiantes"].map(clean_student_data)
					}

					setStore({ "personalInfo": parentData })

				}
				catch (error) {
					console.error(error.message)
					throw error
				}
			}, setParentResume: () => {
				const store = getStore()

				if (!store.personalInfo) {
					console.error("No hay informacion personal almacenada")
					return false
				}

				if (!store.personalInfo.estudiantes) {
					console.log("No se ha encontrado informacion de estudiantes")
					return false
				}

				let resume = estudiantes.map(clean_student_data)
				setStore({ "statusResume": resume })

				return true

			}, getContacts: async () => {
				try {
					let response = await getActions().fetchRoute("contacts", { isPrivate: true, bluePrint: "messages" })
					setStore({ "contactos": response })
				} catch (error) {
					console.error(error.message)
					return
				}
			}, getMessages: async () => {
				try {
					let response = await getActions().fetchRoute("get", { isPrivate: true, bluePrint: "messages" })
					setStore({ "mensajes": response })
				} catch (error) {
					console.error(error.message)
					return
				}
			}

		}
	}
};


export default getState;
