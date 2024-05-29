import { defineStore } from "pinia";
import axios from "axios";
import { ref } from "vue";

export const useStoreUsuarios = defineStore("Usuario", () => {
    let token = ref("");
    let user = ref({});
    const url = "https://avvrk-vyktor23-backendgym.onrender.com"

    const getUsuarios = async () => {
        try {
            console.log(token.value);
            const res = await axios.get(`${url}/usuarios`, {
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
    };

    const getUsuariosActivos = async () => {
        try {
            const res = await axios.get(`${url}/usuarios/activos`, {
                headers: {
                    token: token.value
                }
            }
            );
            console.log(res);
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    };

    const getUsuariosInactivos = async () => {
        try {
            const res = await axios.get(`${url}/usuarios/inactivos`, {
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
    };

    const login = async (email, password) => {
        try {
            const res = await axios.post(`${url}/usuarios/login`, {email, password});
            console.log(res);
            token.value = res.data.token
            user.value = res.data.usuario
            console.log(token.value);
            return res;
        } catch (error) {
            console.log(error);
            console.log(email, "hola");
            return error;
        }
    };

    const log = async (info) => {
        try {
            const res = await axios.post(`${url}/usuarios/log`, info)
            console.log(res.data);
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    }
    
    const putUsuarios = async (id, info) => {
        try {
            const res = await axios.put(`${url}/usuarios/${id}`, info, {
                headers: {
                    token: token.value
                }
            });
            console.log(res.data);
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    }

    const putUsuariosActivar = async (id) => {
        try {
            const res = await axios.put(`${url}/usuarios/activar/${id}`, {}, {
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
    
    const putUsuariosInactivar = async (id) => {
        try {
            const res = await axios.put(`${url}/usuarios/inactivar/${id}`, {}, {
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
        getUsuarios, getUsuariosActivos, getUsuariosInactivos, login, putUsuarios, putUsuariosActivar, putUsuariosInactivar, log, token, user
    };
});