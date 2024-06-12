import { defineStore } from "pinia";
import { ref } from "vue";
import { useStoreUsuarios } from "./usuarios";
import axios from "axios";

export const useStoreMantenimiento = defineStore("Mantenimiento", () => {
	const useUsuario = useStoreUsuarios();
	const url = "https://avvrk-vyktor23-backendgym.onrender.com";

	const getMantenimientos = async () => {
		try {
			const res = await axios.get(`${url}/mantenimientos`, {
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

	const getMantenimientosId = async (id) => {
		try {
			const res = await axios.get(`${url}/mantenimientos/id/${id}`, {
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

	const getMantenimientosFecha = async (fechaInicio, fechaFin) => {
		try {
			const res = await axios.get(`${url}/mantenimientos/fecha`, {fechaInicio, fechaFin}, {
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

	const postMantenimientos = async (info) => {
		try {
			const res = await axios.post(`${url}/mantenimientos`, info, {
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

	const putMantenimientos = async (id, info) => {
		try {
			const res = await axios.put(`${url}/mantenimientos/${id}`, info, {
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

	return {
		getMantenimientos,
		getMantenimientosId,
		getMantenimientosFecha,
		postMantenimientos,
		putMantenimientos,
	};
});

//Todas las peticiones
/*
getMantenimientos
getMantenimientosId
getMantenimientosFechas
postMantenimientos
putMantenimientos
*/