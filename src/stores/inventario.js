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
			const res = await axios.post(`${url}/inventario`, info, {
				headers: {
					token: useUsuarios.token,
				},
			});
			console.log(res.data);
			return res;
		} catch (error) {
			console.log(r);
			return error;
		}
	};

	const putInventarios = async (id, info) => {
		try {
			const res = await axios.put(`${url}/inventario/${id}`, info, {
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

	// const putInventarioActivar = async (id) => {
	// 	try {
	// 		const res = await axios.put(
	// 			`${url}/inventario/activar/${id}`,
	// 			{},
	// 			{
	// 				headers: {
	// 					token: token.value,
	// 				},
	// 			}
	// 		);
	// 		console.log(res);
	// 		return res;
	// 	} catch (error) {
	// 		console.log(error);
	// 		return error;
	// 	}
	// };

	// const putInventarioInactivar = async (id) => {
	// 	try {
	// 		const res = await axios.put(
	// 			`${url}/inventario/inactivar/${id}`,
	// 			{},
	// 			{
	// 				headers: {
	// 					token: token.value,
	// 				},
	// 			}
	// 		);
	// 		console.log(res);
	// 		return res;
	// 	} catch (error) {
	// 		console.log(error);
	// 		return error;
	// 	}
	// };

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
