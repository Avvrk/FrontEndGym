import { defineStore } from "pinia";
import { popScopeId, ref } from "vue";
import { useStoreUsuarios } from "../stores/usuarios.js";
import axios from "axios";

export const useStoreIngresos = defineStore("Ingresos", () => {
	const useUsuarios = useStoreUsuarios();
	const url = "https://avvrk-vyktor23-backendgym.onrender.com";

	const getIngresos = async () => {
		try {
			const res = await axios.get(`${url}/ingresos`, {
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

	const getIngresosId = async (id) => {
		try {
			const res = await axios.get(`${url}/ingresos/id/${id}`, {
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

	const postIngresos = async (info) => {
		try {
			const res = await axios.post(`${url}/ingresos`, info, {
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

	const putIngresos = async (id, info) => {
		try {
			const res = await axios.put(`${url}/ingresos/${id}`, info, {
				headers: {
					token: useUsuarios.token,
				},
			});
			console.log(res.data);
			return res;
		} catch (error) {
			console.log(error);
		}
	};

	return {
		getIngresos,
		getIngresosId,
		postIngresos,
		putIngresos,
	};
});

//Todas las peticiones
/*
getIngresos
getIngresosId
postIngresos
putIngresos
*/
