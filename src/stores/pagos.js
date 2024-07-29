import { defineStore } from "pinia";
import { useStoreUsuarios } from "./usuarios.js";
import axios from "axios";

export const useStorePagos = defineStore("Pagos", () => {
	const useUsuarios = useStoreUsuarios();
	const url = "https://avvrk-vyktor23-backendgym.onrender.com";

	const getPagos = async () => {
		try {
			const res = await axios.get(`${url}/pagos`, {
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

	const getPagosFechas = async (fechainicio, fechafin) => {
		try {
			const res = await axios.get(
				`${url}/pagos/fechainicio/${fechainicio}/fechafin/${fechafin}`,
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

	const getPagosPlan = async (plan) => {
		try {
			const res = await axios.get(`${url}/pagos/pago/${plan}`, {
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

	const getPagosCliente = async () => {
		try {
			const { id } = req.params;
			const pagos = await Pago.findById(id);
			res.json({ pagos });
		} catch (error) {
			console.log(error);
			return error;
		}
	};

	const getPagosId = async (id) => {
		try {
			const res = await axios.get(`${url}/pagos/id/${id}`, {
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

	const getPagosActivos = async () => {
		try {
			const res = await axios.get(`${url}/pagos/activos`, {
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

	const getPagosInactivos = async () => {
		try {
			const res = await axios.get(`${url}/pagos/inactivos`, {
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

	const postPagos = async (info) => {
		try {
			const res = await axios.post(`${url}/pagos`, info, {
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

	const putPagos = async (id, info) => {
		try {
			const res = await axios.put(`${url}/pagos/${id}`, info, {
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

	const putPagosActivar = async (id) => {
		try {
			const res = await axios.put(
				`${url}/pagos/activar/${id}`,
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

	const putPagosInactivar = async (id) => {
		try {
			const res = await axios.put(
				`${url}/pagos/inactivar/${id}`,
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
		getPagos,
		getPagosFechas,
		getPagosPlan,
		getPagosCliente,
		getPagosId,
		getPagosActivos,
		getPagosInactivos,
		postPagos,
		putPagos,
		putPagosActivar,
		putPagosInactivar,
	};
});

//Todas las peticiones
/*
getPagos 
getPagosFechas
getPagosPlan
getPagosCliente
getPagosActivos
getPagosInactivos
postPagos
putPagos
putPagosActivar
putPagosInactivar
*/
