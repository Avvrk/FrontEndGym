import { defineStore } from "pinia";
import { ref } from 'vue';
import { useStoreUsuarios } from "../stores/usuarios.js";
import axios from "axios";

export const useStoreSedes = defineStore("Sedes", () => {
    const useUsuarios = useStoreUsuarios()
    let token = ref("");
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
            const res = await axios.get(`${url}/sedes/sede/${id}`, {
                headers: {
                    token: useUsuarios.token
                }
            })
            console.log(res);
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    const putSedeInactivar = async (id) => {
        try {
            token.value = useUsuarios.token;
            const res = await axios.put(`${url}/sedes/inactivar/${id}`, null, {
                headers: {
                    token: token.value
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
            token.value = useUsuarios.token;
            const res = await axios.put(`${url}/sedes/activar/${id}`, null, {
                headers: {
                    token: token.value
                }
            });
            console.log(res);
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    const postSedes = async () => {
        try {
            const r = await axios.post("http://localhost:4000/api/sedes")
        } catch (error) {
            console.log(r);
            return error;
        }
    }

    return {
        getSedes, getSedesId, putSedeInactivar, putSedesActivar
    };
});
