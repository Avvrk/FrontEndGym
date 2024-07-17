import { defineStore } from "pinia";
import axios from "axios";

export const useStoreUsuarios = defineStore(
	"Usuario",
	{
		state: () => ({
			token: "",
			user: {},
			url: "https://avvrk-vyktor23-backendgym.onrender.com",
			loading: false,
		}),
		actions: {
			cerrarSecion() {
				this.token = "";
				this.user = {};
			},
			async login(email, password) {
				this.loading = true;
				try {
					const res = await axios.post(`${this.url}/usuarios/login`, {
						email,
						password,
					});
					this.token = res.data.token;
					this.user = res.data.usuario;
					return res;
				} catch (error) {
					console.error(error);
					console.log(email, "hola");
					return error;
				} finally {
					this.loading = false;
				}
			},
			async getUsuarios() {
				this.loading = true;
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
				} finally {
					this.loading = false;
				}
			},
			async getUsuariosActivos() {
				this.loading = true;
				try {
					const res = await axios.get(
						`${this.url}/usuarios/activos`,
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
				} finally {
					this.loading = false;
				}
			},
			async getUsuariosInactivos() {
				this.loading = true;
				try {
					const res = await axios.get(
						`${this.url}/usuarios/inactivos`,
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
				} finally {
					this.loading = false;
				}
			},
			async log(info) {
				this.loading = true;
				try {
					const res = await axios.post(
						`${this.url}/usuarios/log`,
						info
					);
					console.log(res.data);
					return res;
				} catch (error) {
					console.error(error);
					return error;
				} finally {
					this.loading = false;
				}
			},
			async putUsuarios(id, info) {
				this.loading = true;
				try {
					const res = await axios.put(
						`${this.url}/usuarios/${id}`,
						info,
						{
							headers: {
								token: this.token,
							},
						}
					);
					console.log(res.data);
					return res;
				} catch (error) {
					console.error(error);
					return error;
				} finally {
					this.loading = false;
				}
			},
			async putUsuariosPassword(email) {
				this.loading = true;
				try {
					const res = await axios.put(
						`${this.url}/usuarios/reset/password`,
						{email},
					);
					console.log(res);
					return res;
				} catch (error) {
					console.error(error);
					return error;
				} finally {
					this.loading = false;
				}
			},
			async putUsuariosActivar(id) {
				this.loading = true;
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
				} finally {
					this.loading = false;
				}
			},
			async putUsuariosInactivar(id) {
				this.loading = true;
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
				} finally {
					this.loading = false;
				}
			},
		},
	},
	{
		persist: true,
	}
);

//Todas las peticiones
/*
getUsuarios 
getUsuariosActivos
getUsuariosInactivos
getUsuariosLogin
postUsuariosLog
putUsuarios
putUsuariosContraseña
putUsuariosActivar
putUsuariosInactivar
*/
