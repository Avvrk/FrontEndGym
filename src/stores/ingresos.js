import { defineStore } from "pinia";
import { ref } from 'vue';
import { useStoreUsuarios } from "../stores/usuarios.js";
import axios from "axios";

export const useStoreIngresos= defineStore("Ingresos", () => {
    const useUsuarios = useStoreUsuarios()
    let token = ref("");
    const url = "https://avvrk-vyktor23-backendgym.onrender.com"

    const getIngresos = async () => {
        try {
            const res = await axios.get(`${url}/ingresos`, {
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

    const getIngresosId = async (id) => {
        try {
            const res = await axios.get(`${url}/ingresos/ingreso/${id}`, {
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

    const postIngresos = async () => {
        try {
            const r = await axios.post("http://localhost:4000/api/sedes")
        } catch (error) {
            console.log(r);
            return error;
        }
    }

    return {
        getIngresos,
    };
});
