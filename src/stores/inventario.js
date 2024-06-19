import { defineStore } from "pinia";
import { ref } from "vue";
import { useStoreUsuarios } from "./usuarios";
import axios from "axios";

export const useStoreInventario = defineStore("Inventario", () => {
	const useUsuarios = useStoreUsuarios();
	const url = "https://avvrk-vyktor23-backendgym.onrender.com";

	const getInventario = async () => {
		try {
			const res = await axios.get(`${url}/inventarios`, {
				headers: {
					token: useUsuarios.token,
				},
			});
			console.log(res.data);
			return res;
		} catch (error) {
			console.log(error);
			return error;
		}
	};

	const getInventariosId = async (id) => {
		try {
			const res = await axios.get(`${url}/inventarios/id/${id}`, {
				headers: {
					token: useUsuarios.token,
				},
			});
			console.log(res.data);
			return res;
		} catch (error) {
			console.log(error);
			return error;
		}
	};

	const getInventariosTotal = async () => {
		try {
			const res = await axios.get(`${url}/inventarios/total`, {
				headers: {
					token: useUsuarios.token,
				},
			});
			console.log(res.data);
			return res;
		} catch (error) {
			console.log(error);
			return error;
		}
	};

	const postInventario = async (info) => {
		try {
			const res = await axios.post(`${url}/inventarios`, info, {
				headers: {
					token: useUsuarios.token,
				},
			});
			console.log(res.data);
			return res;
		} catch (error) {
			console.log(error);
			return error;
		}
	};

	const putInventarios = async (id, info) => {
		try {
			const res = await axios.put(`${url}/inventarios/${id}`, info, {
				headers: {
					token: useUsuarios.token,
				},
			});
			console.log(res.data);
			return res;
		} catch (error) {
			console.log(error);
			return error;
		}
	};

	return {
		getInventario,
		getInventariosId,
		getInventariosTotal,
		postInventario,
		putInventarios,
		// putInventarioInactivar,
		// putInventarioActivar,
	};
});

//Todas las peticiones
/*
getInventario
getInventariosId
getInventariosTotal
postInventarios
putInventarios
putInventarioActivar
putInventarioInactivar
*/
