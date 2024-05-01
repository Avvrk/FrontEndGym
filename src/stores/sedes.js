import { defineStore } from "pinia";
import axios from "axios";

export const useStoreSedes = defineStore("Sedes", () => {
    const getSedes = async () => {
        try {
            const r = await axios.get("http://localhost:4000/api/sedes");
            console.log(r);
            return r;
        } catch (error) {
            console.log(error);
            return error;
        }
    };

    const postSedes = async () => {
        try {
            const r = await axios.post("http://localhost:4000/api/sedes")
        } catch (error) {
            console.log(r);
            return error;
        }
    }

    return {
        getSedes,
    };
});
