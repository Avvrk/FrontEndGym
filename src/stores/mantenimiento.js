import { defineStore } from "pinia";
import { ref } from "vue";
import { useStoreUsuarios } from "./usuarios";
import axios from "axios";

export const useStoreMantenimiento = defineStore("Mantenimiento", () => {
    const useUsuario = useStoreUsuarios()
    let token = ref("");
    const url = "https://avvrk-vyktor23-backendgym.onrender.com"

    const getMantenimientos = async () => {
        try {
            const res = await axios.get(`${url}/mantenimientos`, {
                headers: {
                    token: useUsuario.token
                }
            });
            console.log(res.data);
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    };

    const postMantenimientos = async () => {
        try {
            const res = await axios.post(`${url}/mantenimientos`,{
                headers:{
                    token: useUsuario.token
                }
            });
            console.log(res.data);
            return res;
        } catch (error) {
            console.log(r);
            return error;
        }
    }

    const putMantenimientosActivar = async (codigo) => {
        try {
            const res = await axios.put(`${url}/mantenimientos/activar/${codigo}`, null, {
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
    
    const putMantenimientosInactivar = async (codigo) => {
        try {
            const res = await axios.put(`${url}/mantenimientos/inactivar/${codigo}`, null, {
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

    return {
        getMantenimientos, putMantenimientosInactivar, putMantenimientosActivar, postMantenimientos
    };
});