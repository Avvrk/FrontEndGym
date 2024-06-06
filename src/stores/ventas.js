import { defineStore } from "pinia";
import { ref } from "vue";
import { useStoreUsuarios } from "./usuarios";
import axios from "axios";

export const useStoreVenta = defineStore("Venta", () => {
    const useUsuarios = useStoreUsuarios()
    const url = "https://avvrk-vyktor23-backendgym.onrender.com"

    const getVentas = async () => {
        try {
            const res = await axios.get(`${url}/ventas`, {
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

    const postVentas = async () => {
        try {
            const res = await axios.post(`${url}/ventas`,{
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

    const putVentasActivar = async (codigo) => {
        try {
            const res = await axios.put(`${url}/ventas/activar/${codigo}`, null, {
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
    
    const putVentasInactivar = async (codigo) => {
        try {
            const res = await axios.put(`${url}/ventas/inactivar/${codigo}`, null, {
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
        getVentas, putVentasInactivar, putVentasActivar
    };
});