import { defineStore } from "pinia";
import { useStoreUsuarios } from "./usuarios.js";
import axios from "axios";

export const useStoreMaquinas = defineStore("Maquina", () => {
	const useUsuario = useStoreUsuarios();
	const url = "https://avvrk-vyktor23-backendgym.onrender.com";

	const getMaquinas = async () => {
		try {
			const res = await axios.get(`${url}/maquinas`, {
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

	const postMaquinas = async () => {
		try {
			const res = await axios.post(`${url}/maquinas`, null, {
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

	const putMaquinas = async (id, info) => {
		try {
			const res = await axios.put(
				`${url}/maquinas/${id}`,
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

	const putMaquinasInactivar = async (id) => {
		try {
			const res = await axios.put(
				`${url}/maquinas/inactivar/${id}`,
				null,
				{
					headers: {
						token: useUsuario.token,
					},
				}
			);
			console.log(res);
			return res;
		} catch (error) {
			console.log(error);
			return error;
		}
	};

	const putMaquinasActivar = async (id) => {
		try {
			const res = await axios.put(`${url}/maquinas/activar/${id}`, null, {
				headers: {
					token: useUsuario.token,
				},
			});
			console.log(res);
			return res;
		} catch (error) {
			console.log(error);
			return error;
		}
	};

	return {
		getMaquinas,
		postMaquinas,
        putMaquinas,
		putMaquinasInactivar,
		putMaquinasActivar,
	};
});
