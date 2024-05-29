import { defineStore } from "pinia";
import { useStoreUsuarios } from "./usuarios.js";
import axios from "axios";

export const useStorePlanes = defineStore("Planes", () => {
	const useUsuarios = useStoreUsuarios();
	const url = "https://avvrk-vyktor23-backendgym.onrender.com";

	const getPlanes = async () => {
		try {
			const res = await axios.get(`${url}/planes`, {
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

	const getPlanesId = async (id) => {
		try {
			const res = await axios.get(`${url}/planes/id/${id}`, {
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

	const getPlanesActivos = async () => {
		try {
			const res = await axios.get(`${url}/planes/activos`, {
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

	const getPlanesInactivos = async () => {
		try {
			const res = await axios.get(`${url}/planes/inactivos`, {
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

	const postPlanes = async (info) => {
		try {
			const res = await axios.post(`${url}/planes`, info, {
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

	const putPlanes = async (id, info) => {
		try {
			const res = await axios.put(`${url}/planes/${id}`, info, {
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

	const putPlanesActivar = async (id) => {
        try {
            const res = await axios.put(`${url}/planes/activar/${id}`, {}, {
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

    const putPlanesInactivar = async (id) => {
        try {
            const res = await axios.put(`${url}/planes/inactivar/${id}`, {}, {
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
		getPlanes,
		getPlanesId,
		getPlanesActivos,
		getPlanesInactivos,
		postPlanes,
		putPlanes,
		putPlanesActivar,
		putPlanesInactivar,
	};
});
