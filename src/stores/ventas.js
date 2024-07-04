import { defineStore } from "pinia";
import { ref } from "vue";
import { useStoreUsuarios } from "./usuarios";
import axios from "axios";

export const useStoreVenta = defineStore("Venta", () => {
	const useUsuarios = useStoreUsuarios();
	const url = "https://avvrk-vyktor23-backendgym.onrender.com";

	const getVentas = async () => {
		try {
			const res = await axios.get(`${url}/ventas`, {
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

	const getVentasID = async (id) => {
		try {
			const res = await axios.get(`${url}/ventas/id/${id}`, {
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

	const getVentasFechas = async (fechainicio, fechafin) => {
		try {
			const res = await axios.get(
				`${url}/ventas/fechainicio/${fechainicio}/fechafin/${fechafin}`,
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

	const postVentas = async (info) => {
		try {
			const res = await axios.post(`${url}/ventas`, info, {
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

	const putVentas = async (id, info) => {
		//Nueva peticion agregada
		try {
			const res = await axios.put(`${url}/ventas/${id}`, info, {
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
		getVentas,
		getVentasID,
		getVentasFechas,
		postVentas,
		putVentas,
	};
});

//Todas las peticiones
/*
getVentas 
getVentasId
postVentas
putVentas
*/
