import { defineStore } from "pinia";
import axios from "axios";
// import { ref } from "vue";

export const useStoreClientes = defineStore("Clientes", () => {
    const getClientes = async () => {
        try {
            const r = await axios.get("http://localhost:4000/api/clientes");
            console.log(r);
            return r;
        } catch (error) {
            console.log(error);
            return error;
        }
    };

    const postClientes = async () => {
        try {
            const r = await axios.post("http://localhost:4000/api/clientes")
        } catch (error) {
            console.log(r);
            return error;
        }
    }

    return {
        getClientes,
    };
});
