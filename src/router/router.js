import { createWebHashHistory, createRouter } from 'vue-router'

import Iniciar from '../components/Login.vue'
import Home from '../components/Home.vue'
import Cliente from '../components/Clientes.vue'
import Sedes from '../components/Sedes.vue'
import Ingresos from '../components/Ingresos.vue'
import Inventario from '../components/Inventario.vue'
import Mantenimiento from '../components/Mantenimiento.vue'
import Usuario from '../components/Usuarios.vue'
import Maquina from '../components/Maquinas.vue'
import Plan from '../components/Planes.vue'
import Venta from '../components/Ventas.vue'
import { useStoreUsuarios } from "../stores/usuarios.js";


const auth = (to, from, next) => {
    const userUsuario = useStoreUsuarios()
    if (checkAuth()) {
        
        const rol = userUsuario.user.rol
        console.log(rol);
        if (!to.meta.rol.includes(rol)) {
            return next({ name: 'login' })
        }
        next()
    } else {
        return next({ name: 'login' })
    }
}

const checkAuth = () => {
    const userUsuario = useStoreUsuarios()
    const token = userUsuario.token
    console.log(token);
    if (!token) return false
    return true
};

const routes = [
    {path: '/', component: Iniciar },
    {path: '/home', component: Home},
    {path: '/clientes', component: Cliente },
    {path: '/sedes', component: Sedes,beforeEnter: auth, meta: { rol: ['administrador', 'recepcionista'] }},
    {path: '/ingresos', component: Ingresos},
    {path: '/inventario', component: Inventario},
    {path: '/mantenimiento', component: Mantenimiento},
    {path: '/usuarios', component: Usuario},
    {path: '/maquinas', component: Maquina},
    {path: '/planes', component: Plan},
    {path: '/ventas', component: Venta}
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
})