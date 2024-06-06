import { defineStore } from "pinia";
import axios from "axios";

export const useStoreUsuarios = defineStore("Usuario", {
    state: () => ({
        token: "",
        user: {},
        url: "https://avvrk-vyktor23-backendgym.onrender.com",
    }),
    actions: {
        async login(email, password) {
            try {
                const res = await axios.post(`${this.url}/usuarios/login`, { email, password });
                this.token = res.data.token;
                this.user = res.data.usuario;
                return res;
            } catch (error) {
                console.error(error);
                console.log(email, "hola");
                return error;
            }
        },
        async getUsuarios() {
            try {
                const res = await axios.get(`${this.url}/usuarios`, {
                    headers: {
                        token: this.token,
                    },
                });
                console.log(res);
                return res;
            } catch (error) {
                console.error(error);
                return error;
            }
        },
        async getUsuariosActivos() {
            try {
                const res = await axios.get(`${this.url}/usuarios/activos`, {
                    headers: {
                        token: this.token,
                    },
                });
                console.log(res);
                return res;
            } catch (error) {
                console.error(error);
                return error;
            }
        },
        async getUsuariosInactivos() {
            try {
                const res = await axios.get(`${this.url}/usuarios/inactivos`, {
                    headers: {
                        token: this.token,
                    },
                });
                console.log(res);
                return res;
            } catch (error) {
                console.error(error);
                return error;
            }
        },
        async log(info) {
            try {
                const res = await axios.post(`${this.url}/usuarios/log`, info);
                console.log(res.data);
                return res;
            } catch (error) {
                console.error(error);
                return error;
            }
        },
        async putUsuarios(id, info) {
            try {
                const res = await axios.put(`${this.url}/usuarios/${id}`, info, {
                    headers: {
                        token: this.token,
                    },
                });
                console.log(res.data);
                return res;
            } catch (error) {
                console.error(error);
                return error;
            }
        },
        async putUsuariosActivar(id) {
            try {
                const res = await axios.put(
                    `${this.url}/usuarios/activar/${id}`,
                    {},
                    {
                        headers: {
                            token: this.token,
                        },
                    }
                );
                console.log(res);
                return res;
            } catch (error) {
                console.error(error);
                return error;
            }
        },
        async putUsuariosInactivar(id) {
            try {
                const res = await axios.put(
                    `${this.url}/usuarios/inactivar/${id}`,
                    {},
                    {
                        headers: {
                            token: this.token,
                        },
                    }
                );
                console.log(res);
                return res;
            } catch (error) {
                console.error(error);
                return error;
            }
        },
    },
    persist: true,
});
