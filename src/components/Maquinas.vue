<script setup>
import { ref, onMounted } from "vue";
import { useStoreMaquinas } from "../stores/maquinas.js";

const useMaquina = useStoreMaquinas();

let rows = ref([]);

let columns = ref([
    { name: "codigo", sortable: true, label: "Código", field: "codigo", align: "center" },
    { name: "sede", label: "Sede", field: "sede", align: "center" },
    { name: "descripcion", label: "Descripción", field: "descripcion", align: "center" },
    { name: "fechaIngreso", label: "Fecha de Ingreso", field: "fechaIngreso", align: "center" },
    { name: "fechaUltMan", label: "Fecha de Último Mantenimiento", field: "fechaUltMan", align: "center" },
    { name: "estado", label: "Estado", field: "estado", align: "center" },
    { name: "opciones", label: "Opciones", field: "opciones", align: "center" }
]);

async function listarMaquinas() {
    const res = await useMaquina.getMaquinas();
    console.log(res.data);
    rows.value = res.data.maquinas;
}

// Variables que contienen los datos ingresados en el formulario
let codigoM = ref("");
let sedeM = ref("");
let descripcionM = ref("");
let fechaIngresoM = ref("");
let fechaUltMantM = ref("");

// Variables para administrar lo que se ve en la pantalla
const mostrarFormularioMaquina = ref(false);

// Funcion que se encarga de cambiar el estado de una Maquina
async function editarEstado(elemento) {
    if (elemento.estado == "1") {
        const res = await useMaquina.putMaquinasInactivar(elemento._id);
        console.log(res.data, elemento._id);
        listarMaquinas();
    } else if (elemento.estado == "0") {
        const res = await useMaquina.putMaquinasActivar(elemento._id);
        console.log(res.data);
        listarMaquinas();
    }
}

// Funcion que se encarga de enviar los datos del registro
async function registrar() {
    if (validarDatos()) {
        const info = {
            codigo: codigoM.value,
            sede: sedeM.value,
            descripcion: descripcionM.value,
            "fecha Ingreso": fechaIngresoM.value,
            "fecha Ult Mant": fechaUltMantM.value
        };
        const res = await useMaquina.log(info);
        console.log(res);
    }
} // falta terminar

function resetear() {
    codigoM.value = "";
    sedeM.value = "";
    descripcionM.value = "";
    fechaIngresoM.value = "";
    fechaUltMantM.value = "";
}

async function validarDatos() {
    let verificado = true;

    if (codigoM.value == "" || sedeM.value == "" || descripcionM.value == "" || fechaIngresoM.value == "" || fechaUltMantM.value == "") {
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
    mostrarFormularioMaquina.value = boolean;
}

onMounted(() => {
    listarMaquinas();
});
</script>

<template>
    <div>
        <div class="q-pa-md">
            <div>
                <q-btn @click="editarVistaFondo(true)"> agregar </q-btn>
            </div>
            <q-table flat bordered title="Lista de Maquinas" :rows="rows" :columns="columns" row-key="id">
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

        <div id="formularioMaquina" v-if="mostrarFormularioMaquina == true">
            <q-form @submit="registrar()" @reset="resetear()" class="q-gutter-md">
                <q-input standout="bg-green text-white" v-model="codigoM" label="Código" />
                <q-input standout="bg-green text-white" v-model="sedeM" label="Sede" color="black" />
                <q-input standout="bg-green text-white" v-model="descripcionM" label="Descripción" color="black" />
                <q-input standout="bg-green text-white" v-model="fechaIngresoM" label="Fecha de Ingreso Máquina" color="black" />
                <q-input standout="bg-green text-white" v-model="fechaUltMantM" type="tel" label="Fecha Último Mantenimiento" color="black" />
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

#formularioMaquina {
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