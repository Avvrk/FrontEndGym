import { createWebHashHistory, createRouter } from "vue-router";

import Login from "../components/Login.vue";
import Main from "../components/Main.vue";
import Home from "../components/Home.vue";
import Cliente from "../components/Clientes.vue";
import Sedes from "../components/Sedes.vue";
import Ingresos from "../components/Ingresos.vue";
import Inventario from "../components/Inventario.vue";
import Mantenimiento from "../components/Mantenimiento.vue";
import Usuario from "../components/Usuarios.vue";
import Maquina from "../components/Maquinas.vue";
import Pago from "../components/Pagos.vue";
import Plan from "../components/Planes.vue";
import Venta from "../components/Ventas.vue";
import { useStoreUsuarios } from "../stores/usuarios.js";

const auth = (to, from, next) => {
    const userUsuario = useStoreUsuarios();
    if (checkAuth()) {
        const rol = userUsuario.user.rol;
        console.log(rol);
        if (!to.meta.rol.includes(rol)) {
            return next({ name: "login" });
        }
        next();
    } else {
        return next({ name: "login" });
    }
};

const checkAuth = () => {
    const userUsuario = useStoreUsuarios();
    const token = userUsuario.token;
    console.log(token);
    if (!token) return false;
    return true;
};

const routes = [
    { path: "/", component: Login },
    {
        path: "/main",
        component: Main,
        children: [
            { path: "hogar", component: Home, beforeEnter: auth, meta: { rol: ["administrador", "recepcionista", "instructor"] } },
            { path: "clientes", component: Cliente, beforeEnter: auth, meta: { rol: ["administrador", "recepcionista", "instructor"] } },
            { path: "sedes", component: Sedes, beforeEnter: auth, meta: { rol: ["administrador", "recepcionista"] } },
            { path: "ingresos", component: Ingresos, beforeEnter: auth, meta: { rol: ["administrador", "recepcionista"] } },
            { path: "inventario", component: Inventario, beforeEnter: auth, meta: { rol: ["administrador", "recepcionista"] } },
            { path: "mantenimiento", component: Mantenimiento, beforeEnter: auth, meta: { rol: ["administrador", "recepcionista"] } },
            { path: "usuarios", component: Usuario, beforeEnter: auth, meta: { rol: ["administrador"] } },
            { path: "maquinas", component: Maquina, beforeEnter: auth, meta: { rol: ["administrador", "recepcionista", "instructor"] } },
            { path: "pagos", component: Pago, beforeEnter: auth, meta: { rol: ["administrador", "recepcionista"] } },
            { path: "planes", component: Plan, beforeEnter: auth, meta: { rol: ["administrador", "recepcionista", "instructor"] } },
            { path: "ventas", component: Venta, beforeEnter: auth, meta: { rol: ["administrador", "recepcionista"] } },
        ],
    },
];

export const router = createRouter({
    history: createWebHashHistory(),
    routes,
});
