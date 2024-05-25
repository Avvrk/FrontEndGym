import { defineStore } from "pinia";
import {useStoreUsuarios} from "./usuarios.js"
import axios from "axios";

export const useStoreMaquinas = defineStore("Maquinas", () => {
    const useUsuario = useStoreUsuarios()
    const url = "https://avvrk-vyktor23-backendgym.onrender.com"

    const getMaquinas = async () => {
        try {
            const res = await axios.get(`${url}/maquinas`,{
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

    const postMaquinas = async () => {
        try {
            const res = await axios.post(`${url}/maquinas`,{
                headers: useUsuario.token
            });
            console.log(res.data);
            return res;
        } catch (error) {
            console.log(res.data);
            return error;
        }
    }

    return {
        getMaquinas,
    };
});