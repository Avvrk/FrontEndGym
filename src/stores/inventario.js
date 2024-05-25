import { defineStore } from "pinia";
import { ref } from "vue";
import { useStoreUsuarios } from "./usuarios";
import axios from "axios";

export const useStoreInventario = defineStore("Inventario", () => {
    const useUsuarios = useStoreUsuarios()
    let token = ref("");
    const url = "https://avvrk-vyktor23-backendgym.onrender.com"

    const getInventario = async () => {
        try {
            const res = await axios.get(`${url}/inventarios`, {
                headers: {
                    token: useUsuarios.token
                }
            });
            console.log(res.data);
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    };

    const postInventario = async () => {
        try {
            const res = await axios.post(`${url}/inventario`,{
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

    const putInventarioActivar = async (codigo) => {
        try {
            const res = await axios.put(`${url}/inventario/activar/${codigo}`, null, {
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
    
    const putInventarioInactivar = async (codigo) => {
        try {
            const res = await axios.put(`${url}/inventario/inactivar/${codigo}`, null, {
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
        getInventario, putInventarioInactivar, putInventarioActivar
    };
});