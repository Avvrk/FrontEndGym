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

	const getInventariosActivos = async () => {
        loading.value = true;
        try {
            const res = await axios.get(`${url}/inventarios/activos`, {
                headers: {
                    token: useUsuarios.token,
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

    const getInventariosInactivos = async () => {
        loading.value = true;
        try {
            const res = await axios.get(`${url}/inventarios/inactivos`, {
                headers: {
                    token: useUsuarios.token,
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

	const putInventariosActivar = async (id) => {
        loading.value = true;
        try {
            const res = await axios.put(
                `${url}/inventarios/activar/${id}`,
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
        } finally {
            loading.value = false;
        }
    };

    const putInventariosInactivar = async (id) => {
        loading.value = true;
        try {
            const res = await axios.put(
                `${url}/inventarios/inactivar/${id}`,
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
        } finally {
            loading.value = false;
        }
    };

	return {
		getInventario,
		getInventariosId,
		getInventariosTotal,
		getInventariosActivos,
		getInventariosInactivos,
		postInventario,
		putInventarios,
		putInventariosInactivar,
		putInventariosActivar,
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
