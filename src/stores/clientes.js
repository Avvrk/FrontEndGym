import { defineStore } from "pinia";
import { useStoreUsuarios } from "../stores/usuarios";
import axios from "axios";
// import { ref } from "vue";

export const useStoreClientes = defineStore("Clientes", () => {
    const useUsuario = useStoreUsuarios();
    const url = "https://avvrk-vyktor23-backendgym.onrender.com";

    const getClientes = async () => {
        try {
            const res = await axios.get(`${url}/clientes`, {
                headers: {
                    token: useUsuario.token
                },
            });
            console.log(res);
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    };

    const getClientesId = async (id) => {
        try {
            const res = await axios.get(`${url}/clientes/id/${id}`, {
                headers: {
                    token: useUsuario.token
                }
            });
            console.log(res);
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    const getClientesActivos = async () => {
        try {
            const res = await axios.get(`${url}/clientes/activos`, {
                headers: {
                    token: useUsuario.token
                }
            });
            console.log(res);
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    const getClientesInactivos = async () => {
        try {
            const res = await axios.get(`${url}/clientes/inactivos`, {
                headers: {
                    token: useUsuario.token
                }
            });
            console.log(res);
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    const getClientesSeguimiento = async (id) => {
        try {
            const res = await axios.get(`${url}/clientes/seguimiento/${id}`, {
                headers: {
                    token: useUsuario.token
                }
            });
            console.log(res);
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    const getClientesPlan = async (plan) => {
        try {
            const res = await axios.get(`${url}/clientes/plan/${plan}`, {
                headers: {
                    token: useUsuario.token
                }
            })
            console.log(res);
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    const getClientesCumpleanios = async (fecha) => {
        try {
            const res = await axios.get(`${url}/clientes/cumpleanios/${fecha}`, {
                headers: {
                    token: useUsuario.token
                }
            });
            console.log(res);
            return res;
        } catch (error) {
            console.log(error);
            return error
        }
    }

    const getClientesIngresos = async (fecha) => {
        try {
            const res = await axios.get(`${url}/clientes/ingresos/${fecha}`, {
                headers: {
                    token: useUsuario.token
                }
            })
        } catch (error) {
            console.log(res);
            return res
        }
    }

    const postClientes = async (info) => {
        try {
            const res = await axios.post(`${url}/clientes`, {
                headers: {
                    token: useUsuario.token
                }
            })
            console.log(res);
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    /* const postClientes = async () => {
        try {
            const r = await axios.post("http://localhost:4000/api/clientes");
        } catch (error) {
            console.log(r);
            return error;
        }
    }; */

    return {
        getClientes, postClientes
    };
});
