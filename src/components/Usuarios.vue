<script setup>
import { ref, onMounted, computed } from "vue";
import { useStoreUsuarios } from "../stores/usuarios.js";
import { useStoreSedes } from "../stores/sedes.js";
import { useQuasar } from "quasar";

const $q = useQuasar();

// Variables que contienen la store¿
let useUsuario = useStoreUsuarios();
let useSede = useStoreSedes();

// Variables para el funcionamiento de la tabla
let rows = ref([]);
let columns = ref([
    { name: "nombre", sortable: true, label: "Nombre Usuario", field: "nombre", align: "center" },
    { name: "telefono", label: "Telefono", field: "telefono", align: "center" },
    { name: "sede", sortable: true, label: "Sede", field: "sede", align: "center" },
    { name: "email", sortable: true, label: "Correo", field: "email", align: "center" },
    { name: "rol", sortable: true, label: "Rol", field: "rol", align: "center" },
    { name: "estado", sortable: true, label: "Estado", field: "estado", align: "center" },
    { name: "opciones", label: "Opciones", field: "opciones", align: "center" },
]);

let sedesTodo = ref([]);

// Variables que se usan en el formulario
const roles = ["administrador", "recepcionista", "instructor"];
const nombreCodigo = ref([]);

// Variables que contienen los datos ingresados en el formulario
let nombreUsuario = ref("");
let correoUsuario = ref("");
let telefonoUsuario = ref("");
let contraseñaUsuario = ref("");
let sedeUsuario = ref("");
let rolUsuario = ref("");

// Variables para administrar lo que se ve en la pantalla
const mostrarFormularioUsuario = ref(false);

// Funcion que se encarga de traer todos los usuarios
async function listarUsuarios() {
    const res = await useUsuario.getUsuarios();
    console.log(res.data);
    rows.value = res.data.usuarios;
}

// Funcion que se encarga de cambiar el estado de un usuario
async function editarEstado(elemento) {
    if (elemento.estado == "1") {
        const res = await useUsuario.putUsuariosInactivar(elemento._id);
        console.log(res.data, elemento._id);
        listarUsuarios();
    } else if (elemento.estado == "0") {
        const res = await useUsuario.putUsuariosActivar(elemento._id);
        console.log(res.data);
        listarUsuarios();
    }
}

// Funcion que se encarga de traer todos las sedes
async function sedes() {
    const res = await useSede.getSedes();
    console.log(res.data);
    sedesTodo.value = res.data.sedes;
}

// Funcion que se encarga de enviar los datos del registro
async function registrar() {
    if (validarDatos()) {
        const info = {
            nombre: nombreUsuario.value,
            email: correoUsuario.value,
            telefono: telefonoUsuario.value,
            password: contraseñaUsuario.value,
            sede: sedeUsuario.value.nombre,
            idSede: sedeUsuario.value.valor,
        };
        const res = await useUsuario.log(info);
        console.log(res);
    }
} // falta terminar

function resetear() {
    nombreUsuario = ref("");
    correoUsuario = ref("");
    telefonoUsuario = ref("");
    contraseñaUsuario = ref("");
    sedeUsuario = ref("");
    rolUsuario = ref("");
}

// Funcion que se encarga de validar los datos que se registrarán
async function validarDatos() {
    let verificado = true;
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (nombreUsuario.value == "") {
        $q.notify({
            type: "negative",
            message: "El nombre está vacío",
            position: "bottom-right",
        });
        verificado = false;
    }
    if (correoUsuario.value == "") {
        $q.notify({
            type: "negative",
            message: "El correo no puede estar vacio",
            position: "bottom-right",
        });
        verificado = false;
    }
    if (!regex.test(correoUsuario.value)) {
        $q.notify({
            type: "negative",
            message: "Ingrese un correo válido",
            position: "bottom-right",
        });
        verificado = false;
    }
    if (telefonoUsuario.value == "") {
        $q.notify({
            type: "negative",
            message: "El telefono no puede estar vacio",
            position: "bottom-right",
        });
        verificado = false;
    } else if (telefonoUsuario.value.length < 10) {
        $q.notify({
            type: "negative",
            message: "El telefono no puede tener menos de 10 caracteres",
            position: "bottom-right",
        });
        verificado = false;
    }
    if (contraseñaUsuario.value == "") {
        $q.notify({
            type: "negative",
            message: "La contraseña no puede estar vacia",
            position: "bottom-right",
        });
        verificado = false;
    }
    if (rolUsuario.value == "") {
        $q.notify({
            type: "negative",
            message: "Debe seleccionar un rol",
            position: "bottom-right",
        });
        verificado = false;
    }
    if (sedeUsuario.value == "") {
        $q.notify({
            type: "negative",
            message: "Debe seleccionar una sede",
            position: "bottom-right",
        });
        verificado = false;
    } else {
        const res = await useSede.getSedesId(sedeUsuario.value.valor);
        if (res.status != 200) {
            $q.notify({
                type: "negative",
                message: `Hubo un error con la sede ${sedeUsuario.value.label}`,
                position: "bottom-right",
            });
        }
    }

    return verificado;
}

// Funcion que se encarga de arreglar la informacion de sedes para mostrarse en la tabla
const organizarSedes = computed(() => {
    sedesTodo.value.forEach((element) => {
        nombreCodigo.value.push({
            label: `${element.ciudad} / ${element.nombre}`,
            valor: `${element._id}`,
            nombre: `${element.nombre}`,
        });
    });
    console.log(nombreCodigo.value);
    return nombreCodigo.value;
});

// Falta el editar

function editarVistaFondo(boolean) {
    mostrarFormularioUsuario.value = boolean;
}

onMounted(() => {
    listarUsuarios(), sedes();
});
</script>

<template>
    <div>
        <div class="q-pa-md">
            <div>
                <q-btn @click="editarVistaFondo(true)"> agregar </q-btn>
            </div>
            <q-table flat bordered title="Lista de usuarios" :rows="rows" :columns="columns" row-key="id">
                <template v-slot:body-cell-opciones="props">
                    <q-td :props="props">
                        <q-btn> ✏️ </q-btn>
                        <q-btn v-if="props.row.estado == 1" @click="editarEstado(props.row)"> ❌ </q-btn>
                        <q-btn v-else @click="editarEstado(props.row)"> ✅ </q-btn>
                    </q-td>
                </template>
                <template v-slot:body-cell-estado="props">
                    <q-td :props="props">
                        <p v-if="props.row.estado == 1" style="color: green">Activo</p>
                        <p v-else style="color: red">Inactivo</p>
                    </q-td>
                </template>
            </q-table>
        </div>
        <div id="formularioUsuario" v-if="mostrarFormularioUsuario == true">
            <q-form @submit="registrar()" @reset="resetear()" class="q-gutter-md">
                <q-input standout="bg-green text-white" v-model="nombreUsuario" label="Nombre" />
                <q-input standout="bg-green text-white" v-model="correoUsuario" type="email" label="Correo" color="black" />
                <q-input standout="bg-green text-white" v-model="telefonoUsuario" type="tel" label="Telefono" color="black" />
                <q-input standout="bg-green text-white" v-model="contraseñaUsuario" type="password" label="Contraseña" color="black" />
                <q-select standout="bg-green text-white" v-model="rolUsuario" :options="roles" label="Rol" color="black" />
                <q-select standout="bg-green text-white" v-model="sedeUsuario" :options="organizarSedes" label="Sedes" color="black" />
                <div>
                    <q-btn label="Enviar" type="submit" color="primary" />
                    <q-btn label="Limpiar" type="reset" color="primary" flat class="q-ml-sm" />
                </div>
            </q-form>
            <button id="botonF"  @click="editarVistaFondo(false)"></button>
        </div>
    </div>
</template>

<style scoped>
.q-pa-md {
    padding: 40px;
}

.q-table {
    margin-top: 20px;
}

.q-btn {
    margin: 10px;
}

.q-form {
    background-color: rgb(255, 255, 255);
    padding: 10px 25px 20px 10px;
    border-radius: 1pc;
    width: 30rem;
    z-index: 3;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.q-input {
    margin-bottom: 20px;
}

.q-select {
    margin-bottom: 20px;
}

.q-btn[type="submit"] {
    background-color: #4caf50;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.q-btn[type="reset"] {
    background-color: #fff;
    color: #4caf50;
    padding: 10px 20px;
    border: 1px solid #4caf50;
    border-radius: 5px;
    cursor: pointer;
}

.q-btn[type="submit"]:hover {
    background-color: #3e8e41;
}

.q-btn[type="reset"]:hover {
    background-color: #f0f0f0;
}

#formularioUsuario {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0;
}

#botonF {
    position: absolute;
    top: 0;
    background-color: rgba(128, 128, 128, 0.205);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0;
    z-index: 1;
}

.q-table__title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
}

.q-table__row {
    border-bottom: 1px solid #ddd;
}

.q-table__cell {
    padding: 10px;
}

.q-table__cell:last-child {
    text-align: right;
}

.q-btn[aria-label="❌"] {
    color: #ff0000;
}

.q-btn[aria-label="✅"] {
    color: #00ff00;
}
</style>