import { defineStore } from "pinia";
import { useStoreUsuarios } from "./usuarios";
import axios from "axios";

export const useStoreInventario = defineStore("Inventario", () => {
    const useUsuario = useStoreUsuarios()
    const url = "https://avvrk-vyktor23-backendgym.onrender.com"

    const getInventario = async () => {
        try {
            const res = await axios.get(`${url}/inventarios`, {
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

    return {
        getInventario,
    };
});