<script setup>
import { ref, onMounted } from "vue";
import { useStoreIngresos } from "../stores/ingresos.js";

const useIngreso = useStoreIngresos();

let rows = ref([]);

let columns = ref([
    { name: "fecha", sortable: true, label: "Fecha", field: "fecha", align: "center" },
    { name: "sede", label: "Sede", field: "sede", align: "center" },
    { name: "cliente ", label: "Cliente", field: "cliente ", align: "center" },
]);

async function listarIngresos() {
    const res = await useIngreso.getIngresos();
    console.log(res.data);
    rows.value = res.data.ingresos;
}

// Variables que contienen los datos ingresados en el formulario
let fechaI = ref("");
let sedeI = ref("");
let clienteI = ref("");

// Variables para administrar lo que se ve en la pantalla
const mostrarFormularioIngreso = ref(false);

// Funcion que se encarga de enviar los datos del registro
async function registrar() {
    if (validarDatos()) {
        const info = {
            fecha: fechaI.value,
            sede: sedeI.value,
            cliente: clienteI.value,
        };
        const res = await useIngreso.log(info);
        console.log(res);
    }
} // falta terminar

function resetear() {
    fechaI.value = "";
    sedeI.value = "";
    clienteI.value = "";
}

async function validarDatos() {
    let verificado = true;

    if (fechaI.value == "" || sedeI.value == "" || clienteI.value == "") {
        $q.notify({
            type: "negative",
            message: "Llenar todos los campos",
            position: "bottom-right"
        });
        verificado = false;
    }
    return verificado;
}

function editarVistaFondo(boolean) {
    mostrarFormularioIngreso.value = boolean;
}

onMounted(() => {
    listarIngresos();
});
</script>

<template>
    <div>
        <div class="q-pa-md">
            <div>
                <q-btn @click="editarVistaFondo(true)"> agregar </q-btn>
            </div>
            <q-table flat bordered title="Lista de Ingresos" :rows="rows" :columns="columns" row-key="id">
                <!-- <template v-slot:body-cell-opciones="props">
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
                </template> -->
            </q-table>
        </div>

        <div id="formularioIngreso" v-if="mostrarFormularioIngreso == true">
            <q-form @submit="registrar()" @reset="resetear()" class="q-gutter-md">
                <q-input standout="bg-green text-white" v-model="fechaI" label="Fecha" />
                <q-input standout="bg-green text-white" v-model="sedeI" label="Sede" color="black" />
                <q-input standout="bg-green text-white" v-model="clienteI" label="Cliente" color="black" />
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

#formularioIngreso {
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