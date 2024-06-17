import { defineStore } from "pinia";
import { useStoreUsuarios } from "../stores/usuarios";
import axios from "axios";
// import { ref } from "vue";

export const useStoreClientes = defineStore("Clientes", () => {
	const useUsuario = useStoreUsuarios();
	const url = "https://avvrk-vyktor23-backendgym.onrender.com";

	const getClientes = async () => {
		try {
			const res = await axios.get(`${url}/clientes`, {
				headers: {
					token: useUsuario.token,
				},
			});
			console.log(res.data);
			return res;
		} catch (error) {
			console.log(error);
			return error;
		}
	};

	const getClientesId = async (id) => {
		try {
			const res = await axios.get(`${url}/clientes/id/${id}`, {
				headers: {
					token: useUsuario.token,
				},
			});
			console.log(res.data);
			return res;
		} catch (error) {
			console.log(error);
			return error;
		}
	};

	const getClientesActivos = async () => {
		try {
			const res = await axios.get(`${url}/clientes/activos`, {
				headers: {
					token: useUsuario.token,
				},
			});
			console.log(res.data);
			return res;
		} catch (error) {
			console.log(error);
			return error;
		}
	};

	const getClientesInactivos = async () => {
		try {
			const res = await axios.get(`${url}/clientes/inactivos`, {
				headers: {
					token: useUsuario.token,
				},
			});
			console.log(res.data);
			return res;
		} catch (error) {
			console.log(error);
			return error;
		}
	};

	const getClientesSeguimiento = async (id) => {
		try {
			const res = await axios.get(`${url}/clientes/seguimiento/${id}`, {
				headers: {
					token: useUsuario.token,
				},
			});
			console.log(res.data);
			return res;
		} catch (error) {
			console.log(error);
			return error;
		}
	};

	const getClientesPlan = async (idPlan) => {
		try {
			const res = await axios.get(`${url}/clientes/plan/${idPlan}`, {
				headers: {
					token: useUsuario.token,
				},
			});
			console.log(res.data);
			return res;
		} catch (error) {
			console.log(error);
			return error;
		}
	};

	const getClientesCumpleanios = async (fecha) => {
		try {
			const res = await axios.get(
				`${url}/clientes/cumpleanios/${fecha}`,
				{
					headers: {
						token: useUsuario.token,
					},
				}
			);
			console.log(res.data);
			return res;
		} catch (error) {
			console.log(error);
			return error;
		}
	};

	const getClientesIngresaron = async (fecha) => {
		try {
			const res = await axios.get(`${url}/clientes/ingresaron/${fecha}`, {
				headers: {
					token: useUsuario.token,
				},
			});
			console.log(res.data);
			return res;
		} catch (error) {
			console.log(error);
			return error;
		}
	};

	const postClientes = async (info) => {
		try {
			const res = await axios.post(`${url}/clientes`, info, {
				headers: {
					token: useUsuario.token,
				},
			});
			console.log(res.data);
			return res;
		} catch (error) {
			console.log(error);
			return error;
		}
	};

	const postClientesSeguimiento = async (id, info) => {
		try {
			const res = await axios.post(
				`${url}/clientes/seguimiento/${id}`,
				info,
				{
					headers: {
						token: useUsuario.token,
					},
				}
			);
			console.log(res.data);
			return res;
		} catch (error) {
			console.log(error);
			return error;
		}
	};

	const putClientes = async (id, info) => {
		try {
			const res = await axios.put(`${url}/clientes/${id}`, info, {
				headers: {
					token: useUsuario.token,
				},
			});
			console.log(res.data);
			return res;
		} catch (error) {
			console.log(error);
			return error;
		}
	};

	const putClientesSeguimiento = async (id, info) => {
		try {
			const res = await axios.put(
				`${url}/clientes/seguimiento/${id}`,
				info,
				{
					headers: {
						token: useUsuario.token,
					},
				}
			);
			console.log(res.data);
			return res;
		} catch (error) {
			console.log(error);
			return error;
		}
	};

	const putClientesActivar = async (id) => {
		try {
			const res = await axios.put(
				`${url}/clientes/activar/${id}`,
				{},
				{
					headers: {
						token: useUsuario.token,
					},
				}
			);
			console.log(res.data);
			return res;
		} catch (error) {
			console.log(error);
			return error;
		}
	};

	const putClientesInactivar = async (id) => {
		try {
			const res = await axios.put(
				`${url}/clientes/inactivar/${id}`,
				{},
				{
					headers: {
						token: useUsuario.token,
					},
				}
			);
			console.log(res.data);
			return res;
		} catch (error) {
			console.log(error);
			return error;
		}
	};

	return {
		getClientes,
		getClientesId,
		getClientesActivos,
		getClientesInactivos,
		getClientesCumpleanios,
		getClientesIngresaron,
		getClientesPlan,
		getClientesSeguimiento,
		postClientes,
		postClientesSeguimiento,
		putClientes,
		putClientesSeguimiento,
		putClientesActivar,
		putClientesInactivar,
	};
});
