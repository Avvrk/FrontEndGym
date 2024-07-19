import { defineStore } from "pinia";
import { useStoreUsuarios } from "../stores/usuarios";
import axios from "axios";
import { ref } from "vue";

export const useStoreClientes = defineStore("Clientes", () => {
	const useUsuario = useStoreUsuarios();
	const url = "https://avvrk-vyktor23-backendgym.onrender.com";
	const loading = ref(false);

	const getClientes = async () => {
		loading.value = true;
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
		} finally {
			loading.value = false;
		}
	};

	const getClientesId = async (id) => {
		loading.value = true;
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
		} finally {
			loading.value = false;
		}
	};

	const getClientesActivos = async () => {
		loading.value = true;
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
		} finally {
			loading.value = false;
		}
	};

	const getClientesInactivos = async () => {
		loading.value = true;
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
		} finally {
			loading.value = false;
		}
	};

	const getClientesSeguimiento = async (id) => {
		loading.value = true;
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
		} finally {
			loading.value = false;
		}
	};

	const getClientesPlan = async (idPlan) => {
		loading.value = true;
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
		} finally {
			loading.value = false;
		}
	};

	const getClientesCumpleanios = async (fecha) => {
		loading.value = true;
		console.log("holaaaaaaaaaaaaaaaaaaaaa");
		try {
			console.log("holaaaaaaaaaaaaaaaaaaaaa");
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
		} finally {
			loading.value = false;
		}
	};

	const getClientesIngresaron = async (fecha) => {
		loading.value = true;
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
		} finally {
			loading.value = false;
		}
	};

	const postClientes = async (info) => {
		loading.value = true;
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
		} finally {
			loading.value = false;
		}
	};

	const postClientesSeguimiento = async (id, info) => {
		loading.value = true;
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
		} finally {
			loading.value = false;
		}
	};

	const putClientes = async (id, info) => {
		loading.value = true;
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
		} finally {
			loading.value = true;
		}
	};

	const putClientesSeguimiento = async (id, info) => {
		loading.value = true;
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
		} finally {
			loading.value = false;
		}
	};

	const putClientesActivar = async (id) => {
		loading.value = true;
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
		} finally {
			loading.value = false;
		}
	};

	const putClientesInactivar = async (id) => {
		loading.value = true;
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
		} finally {
			loading.value = false;
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
		loading,
	};
});
