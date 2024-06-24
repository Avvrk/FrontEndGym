import { defineStore } from "pinia";
import { ref } from 'vue';
import { useStoreUsuarios } from "../stores/usuarios.js";
import axios from "axios";

export const useStoreSedes = defineStore("Sedes", () => {
    const useUsuarios = useStoreUsuarios()
    const url = "https://avvrk-vyktor23-backendgym.onrender.com"

    const getSedes = async () => {
        try {
            const res = await axios.get(`${url}/sedes`, {
                headers: {
                    token: useUsuarios.token
                }
            });
            console.log(res);
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    };

    const getSedesId = async (id) => {
        try {
            const res = await axios.get(`${url}/sedes/id/${id}`, {
                headers: {
                    token: useUsuarios.token
                }
            });
            console.log(res);
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    const getSedesActivos = async (id) => {
        try {
            const res = await axios.get(`${url}/sedes/activos`, {
                headers: {
                    token: useUsuarios.token
                }
            });
            console.log(res);
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    const getSedesInactivos = async (id) => {
        try {
            const res = await axios.get(`${url}/sedes/inactivos`, {
                headers: {
                    token: useUsuarios.token
                }
            });
            console.log(res);
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    const postSedes = async (info) => {
        try {
            const res = await axios.post(`${url}/sedes`, info, {
                headers: {
                    token: useUsuarios.token
                }
            });
            console.log(res);
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    const putSedes = async (id, info) => {
        try {
            const res = await axios.put(`${url}/sedes/${id}`, info, {
                headers: {
                    token: useUsuarios.token
                }
            });
            console.log(res);
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    const putSedeInactivar = async (id) => {
        try {
            const res = await axios.put(`${url}/sedes/inactivar/${id}`, {}, {
                headers: {
                    token: useUsuarios.token
                }
            });
            console.log(res);
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    }   

    const putSedesActivar = async (id) => {
        try {
            const res = await axios.put(`${url}/sedes/activar/${id}`, {}, {
                headers: {
                    token: useUsuarios.token
                }
            });
            console.log(res);
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    return {
        getSedes, getSedesId, getSedesActivos, getSedesInactivos, postSedes, putSedes, putSedeInactivar, putSedesActivar
    };
});


//Todas las peticiones
/*
getSedes 
getSedesId
getSedesActivos
getSedesInactivos
postSedes
putSedes
putSedesActivar
putSedesInactivar
*/