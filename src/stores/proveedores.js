import { defineStore } from "pinia";
import { useStoreUsuarios } from "./usuarios.js";
import axios from "axios";

export const useStoreProveedores = defineStore("Proveedores", () => {
	const useUsuarios = useStoreUsuarios();
	const url = "https://avvrk-vyktor23-backendgym.onrender.com";

	const getProveedores = async () => {
		try {
			const res = await axios.get(`${url}/proveedores`, {
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

	const getProveedoresId = async (id) => {
		try {
			const res = await axios.get(`${url}/proveedores/id/${id}`, {
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

	const getProveedoresActivos = async () => {
		try {
			const res = await axios.get(`${url}/proveedores/activos`, {
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

	const getProveedoresInactivos = async () => {
		try {
			const res = await axios.get(`${url}/proveedores/inactivos`, {
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

	const postProveedores = async (info) => {
		try {
			const res = await axios.post(`${url}/proveedores`, info, {
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

	const putProveedores = async (id, info) => {
		try {
			const res = await axios.put(`${url}/proveedores/${id}`, info, {
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

	const putProveedoresActivar = async (id) => {
		try {
			const res = await axios.put(
				`${url}/proveedores/activar/${id}`,
				{},
				{
					headers: {
						token: useUsuarios.token,
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

	const putProveedoresInactivar = async (id) => {
		try {
			const res = await axios.put(
				`${url}/proveedores/inactivar/${id}`,
				{},
				{
					headers: {
						token: useUsuarios.token,
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
		getProveedores,
		getProveedoresId,
		getProveedoresActivos,
		getProveedoresInactivos,
		postProveedores,
		putProveedores,
		putProveedoresActivar,
		putProveedoresInactivar,
	};
});


//Todas las peticiones
/*
getPlanes
getPlanesId
getPlanesActivos
getPlanesInactivos
postPlanes
putPlanes
putPlanesActivar
putPlanesInactivar
*/
