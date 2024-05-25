<script setup>
import { ref, onMounted } from "vue";
import { useStoreClientes } from "../stores/clientes.js";

const useCliente = useStoreClientes();

let rows = ref([]);
let columns = ref([
    { name: "nombre", sortable: true, label: "Nombre Usuario", field: "nombre", align: "center" },
    { name: "fechaIngreso", sortable: true, label: "Fecha de ingreso", field: "fechaIngreso", align: "center" },
    { name: "documento", label: "Documento", field: "documento", align: "center" },
    { name: "fechaNacimiento", sortable: true, label: "Fecha de nacimiento", field: "fechaNacimiento", align: "center" },
    { name: "edad", sortable: true, label: "Edad", field: "edad", align: "center" },
    { name: "direccion", label: "Direccion", field: "direccion", align: "center" },
    { name: "telefono", label: "Telefono", field: "telefono", align: "center" },
    { name: "objetivo", label: "Objetivo", field: "objetivo", align: "center" },
    { name: "observaciones", label: "Observaciones", field: "Observaciones", align: "center" },
    { name: "estado", sortable: true, label: "Estado", field: "estado", align: "center" },
    { name: "plan", label: "Plan", field: "plan", align: "center" },
    { name: "seguimiento", label: "Seguimiento", field: "seguimiento", align: "center" },
    { name: "opciones", label: "Opciones", field: "opciones", align: "center" },
]);

// async function agregarCliente() {
//     const res = await useCliente.postClientes();
//     console.log(res.data);

//     rows.value = res.data.clientes
// }

//Variables que contiene los datos ingresados en el formulario

let nombreCliente = ref("");
let documentoCliente = ref("");
let edadCliente = ref("");
let resi = ref("");
let nTelefono = ref("");
let objective = ref("");
let plan = ref("");

//Variables para administrar lo que se ve en la pantalla
const mostrarFormularioCliente = ref(false);

//Funcion que se encarga de traer todos los clientes
async function listarClientes() {
    const res = await useCliente.getClientes();
    console.log(res.data);
    rows.value = res.data.clientes;
}

//Funcion que se encarga de cambiar el estado de un cliente
async function editarEstado(elemento) {
    if (elemento.estado == "1") {
        const res = await useCliente.putClienteInactivar(elemento._id);
        console.log(res.data, elemento._id);
        listarClientes();
    } else if (elemento.estado == "0") {
        const res = await useCliente.putClienteActivar(elemento._id);
        console.log(res.data);
        listarClientes();
    }
}

//Funcion que se encarga de enviar los datos del registro
async function registrar() {
    if (validarDatos()) {
        const info = {
            nombre: nombreU.value,
            documento: nDocumento.value,
            edad: age.value,
            direccion: residencia.value,
            telefono: nTelefono.value,
            objetivo: objective.value,
            plan: plan.value,
        };
    }
}

//Funcion que se encarga de resetear
function resetear() {
    console.log("Hola");
    nombreU = ref("");
    nDocumento = ref("");
    age = ref("");
    residencia = ref("");
    nTelefono = ref("");
    objective = ref("");
    plan = ref("");
}

//Funcion que se encarga de validar los datos que se resgistrarán.
async function validarDatos() {
    let verificado = true;

    if (nombreU.value == "") {
        $q.notify({
            type: "negative",
            message: "El nombre está vacío",
            position: "bottom-right",
        });
        verificado = false;
    }
    if (nDocumento == "") {
        $q.notify({
            type: "negative",
            message: "El documento está vacío",
            position: "bottom-right",
        });
        verificado = false;
    } else {
        if (!isNaN(nDocumento) || nDocumento < 0) {
            $q.notify({
                type: "negative",
                message: "El documento debe ser un numero valido",
                position: "bottom-right",
            });
            verificado = false;
        }
    }
    if (age == "") {
        $q.notify({
            type: "negative",
            message: "La edad está vacío",
            position: "bottom-right",
        });
        verificado = false;
    } else {
        if (!isNaN(age) || age < 0) {
            $q.notify({
                type: "negative",
                message: "La edad debe ser un numero valido",
                position: "bottom-right",
            });
            verificado = false;
        }
    }
    if (residencia == "") {
        $q.notify({
            type: "negative",
            message: "La dirección está vacía",
            position: "bottom-right",
        });
        verificado = false;
    }
    return verificado;
}

function editarVistaFondo(boolean) {
    mostrarFormularioCliente.value = boolean;
}

onMounted(() => {
    listarClientes();
});
</script>

<template>
    <div>
        <div class="q-pa-md">
          <div>
            <q-btn @click="editarVistaFondo(true)"> agregar </q-btn>
        </div>
            <q-table flat bordered title="Clientes" :rows="rows" :columns="columns" row-key="id">
                <template v-slot:body-cell-opciones="props">
                    <q-td :props="props">
                        <q-btn @click="editar(props.row)"> ✏️ </q-btn>
                        <q-btn v-if="props.row.estado == 1"> ❌ </q-btn>
                        <q-btn v-else> ✅ </q-btn>
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
        <div id="formularioCliente" v-if="mostrarFormularioCliente == true" >
            <q-form @submit="registrar()" @reset="resetear()" class="q-gutter-md">
                <q-input standout="bg-green text-white" type="text" placeholder="Nombre" v-model="nombreCliente" />
                <q-input standout="bg-green text-white" type="text" placeholder="Documento" v-model="documentoCliente" />
                <q-input standout="bg-green text-white" type="text" placeholder="Edad" v-model="edadCliente" />
                <q-input standout="bg-green text-white" type="text" placeholder="Direccion" v-model="direccionCliente" />
                <q-input standout="bg-green text-white" type="text" placeholder="Telefono" v-model="telefonoCliente" />
                <q-input standout="bg-green text-white" type="text" placeholder="Objetivo" v-model="objetivoCliente" />
                <q-input standout="bg-green text-white" type="text" placeholder="Plan" v-model="planCliente" />
                <div>
                    <q-btn label="Enviar" type="submit" color="primary" />
                    <q-btn label="Limpiar" type="reset" color="primary" flat class="q-ml-sm" />
                </div>
            </q-form>
            <button id="botonF" @click="editarVistaFondo(false)"></button>
        </div>
    </div>
</template>

<style scoped>
.q-form {
  background-color: rgb(255, 255, 255);
  padding: 10px 25px 20px 10px;
  border-radius: 1pc;
  width: 30rem;
  z-index: 3;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

#formularioCliente {
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

.q-pa-md {
    padding: 40px;
}

.q-table {
    margin-top: 20px;
}

.q-btn {
    margin: 10px;
}

input[type="text"] {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
}

input[type="submit"] {
    margin-left: 46%;
    background-color: #4caf50;
    margin-top: 2%;
    margin-bottom: 2%;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

input[type="submit"]:hover {
    background-color: #3e8e41;
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

.q-btn[aria-label="✏️"] {
    color: #0000ff;
}
</style>
