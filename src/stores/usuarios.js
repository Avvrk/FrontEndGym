import { defineStore } from "pinia";
import axios from "axios";
// import { ref } from "vue";

export const useStoreUsuarios = defineStore("Usuario", () => {
    const getUsuarios = async () => {
        try {
            const r = await axios.get("http://localhost:4000/api/usuarios");
            console.log(r);
            return r;
        } catch (error) {
            console.log(error);
            return error;
        }
    };

    /* const postClientes = async () => {
        try {
            const r = await axios.post("http://localhost:4500/api/clientes")
        } catch (error) {
            console.log(r);
            return error;
        }
    } */

    return {
        getUsuarios,
    };
});