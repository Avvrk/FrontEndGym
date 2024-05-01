import { createWebHashHistory, createRouter } from 'vue-router'

import Iniciar from '../components/Login.vue'
import Cliente from '../components/Clientes.vue'
import Sedes from '../components/Sedes.vue'
import Ingresos from '../components/Ingresos.vue'
import Inventario from '../components/Inventario.vue'
import Mantenimiento from '../components/Mantenimiento.vue'
import Usuario from '../components/Usuarios.vue'
import Maquina from '../components/Maquinas.vue'

const routes = [
    { path: '/', component: Iniciar },
    { path: '/clientes', component: Cliente },
    {path: '/sedes', component: Sedes},
    {path: '/ingresos', component: Ingresos},
    {path: '/inventario', component: Inventario},
    {path: '/mantenimiento', component: Mantenimiento},
    {path: '/usuarios', component: Usuario},
    {path: '/maquinas', component: Maquina},
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
})