import { defineStore } from "pinia";
import { ref } from "vue";
import { useStoreUsuarios } from "./usuarios";
import axios from "axios";

export const useStoreInventario = defineStore("Inventario", () => {
    const useUsuarios = useStoreUsuarios()
    const url = "https://avvrk-vyktor23-backendgym.onrender.com"

    const getInventario = async () => {
        try {
            const res = await axios.get(`${url}/inventarios`, {
                headers: {
                    token: useUsuarios.token
                }
            });
            console.log(res.data);
            return res;
        } catch (error) {
            console.log(error);
            return error;
        }
    };

    const getInventariosId = async () =>{
        try{
            const { id } = req.params;
            const inventarios = await Inventario.findById(id);
            res.json({ inventarios });
        } catch (error){
            console.log(error);
            return error;
        }
    };

    const getInventariosTotal = async () =>{
        try{
            const inventariosTotal = await Inventario.find();
            const total = inventariosTotal.reduce((acc, item) => { return acc + item.valor; }, 0);
            res.json({ total: total });
        }catch (error){
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

    const putInventarios = async () =>{
        try{
            const { id } = req.params;
            const { ...info } = req.body;
            const inventarios = await Inventario.findByIdAndUpdate(id, info, { new: true });
            res.json({ inventarios });
        }catch{
            console.log(r);
            return error;
        }
    }
    const putInventarioActivar = async (codigo) => {
        try {
            const res = await axios.put(`${url}/inventario/activar/${codigo}`, null, {
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
    
    const putInventarioInactivar = async (codigo) => {
        try {
            const res = await axios.put(`${url}/inventario/inactivar/${codigo}`, null, {
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
        getInventario, getInventariosId, getInventariosTotal, postInventario, putInventarios, putInventarioInactivar, putInventarioActivar
    };
});

//Todas las peticiones
/*
getInventario
getInventariosId
getInventariosTotal
postInventarios
putInventarios
putInventarioActivar
putInventarioInactivar
*/