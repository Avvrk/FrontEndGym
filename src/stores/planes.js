import { defineStore } from "pinia";
import { useStoreUsuarios } from "./usuarios.js";
import axios from "axios";

export const useStorePlanes = defineStore("Planes", () => {
    const useUsuario = useStoreUsuarios()
    const url = "https://avvrk-vyktor23-backendgym.onrender.com"

    const getPlanes = async () => {
        try {
            const res = await axios.get(`${url}/planes`, {
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

    const postPlanes = async () => {
        try {
            const res = await axios.post(`${url}/planes`, {
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
    }

    return {
        getPlanes,
    };
});