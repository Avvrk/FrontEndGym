<script setup>
import { ref, onMounted, computed } from "vue";
import { useStoreClientes } from "../stores/clientes.js";
import { useStorePlanes } from "../stores/planes.js";
import { useQuasar } from "quasar"
import { format } from "date-fns";

const $q = useQuasar();

const useCliente = useStoreClientes();
const usePlan = useStorePlanes();

// Variables para el funcionamiento de la tabla
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
    { name: "observaciones", label: "Observaciones", field: "observaciones", align: "center" },
    { name: "plan", label: "Plan", field: "plan", align: "center" },
    { name: "estado", sortable: true, label: "Estado", field: "estado", align: "center" },
    { name: "opciones", label: "Opciones", field: "opciones", align: "center" },
]);

let planesTodo = ref([]);

// Variable que contendra el id del cliente a editar, se actualiza cada vez que le den al boton de actualizar en la tabla
const idCliente = ref("");

// Variables que contiene los datos ingresados en el formulario
let nombreCliente = ref("");
let tipoDocumento = ref("");
let documentoCliente = ref("");
let edadCliente = ref("");
let residenciaCliente = ref("");
let telefonoCliente = ref("");
let objetivoCliente = ref("");
let planCliente = ref("");


// Variable para controlar el dato que se mostrara en la tabla
const opcionBusqueda = ref("");

//Variables para administrar lo que se ve en la pantalla
const mostrarFormularioCliente = ref(false);
const actualizarBoton = ref(false);

// Variables que se usan en el formulario
// CC = Cedula de Ciudadania, TI = Tarjeta de Identidad, CE = Cedula Extranjera, PS = Pasaporte, TE = Tarjeta Estudiantil, Otro = Documento que no este en la lista
const tipoD = ["CC", "TI", "CE", "PS", "TE", "Otro"];
const codigoValor = ref([]);

const organizarPlanes = computed(() => {
    planesTodo.value.forEach((element) => {
        codigoValor.value.push({
            label: `${element.codigo} / ${element.valor}`,
            valor: `${element._id}`,
            nombre: `${element.codigo}`,
        });
    });
    console.log(codigoValor.value);
    return codigoValor.value;
});

//Funcion que se encarga de traer todos los clientes
async function listarClientes() {
    const res = await useCliente.getClientes();
    console.log(res.data);
    rows.value = res.data.clientes;
}

//Funcion que se encarga de traer todos los clientes activos
async function listarClientesActivos() {
    const res = await useCliente.getClientesActivos();
    console.log(res.data);
    rows.value = res.data.clientes;
}

//Funcion que se encarga de traer todos los clientes inactivos
async function listarClientesInactivos() {
    const res = await useCliente.getClientesInactivos();
    console.log(res.data);
    rows.value = res.data.clientes;
}

//Funcion que se encarga de traer todos los clientes por su fecha de cumpleaños
async function listarClientesCumpleanios() {
    const res = await useCliente.getClientesCumpleanios();;
    console.log(res.data);
    rows.value = res.data.clientes;
}

//Funcion que se encarga de traer todos los clientes por su fecha de ingreso
async function listarClientesIngresaron() {
    const res = await useCliente.getClientesIngresaron();
    console.log(res.data);
    rows.value = res.data.clientes;
}

//Funcion que se encarga de traer todos los clientes
async function listarPlanes() {
    const res = await usePlan.getPlanes();
    console.log(res.data);
    planesTodo.value = res.data.planes;
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
    const resultado = await validarDatos();
    console.log(resultado);
    if (resultado != false) {
        const info = {
            nombre: nombreCliente.value,
            documento: documentoCliente.value,
            edad: edadCliente.value,
            direccion: residenciaCliente.value,
            telefono: telefonoCliente.value,
            objetivo: objetivoCliente.value,
            plan: planCliente.value,
        };
        const res = await useCliente.postClientes(info);
        console.log(res.data);
    }
}

async function actualizar(id) {
    actualizarBoton.value = true;
    const resultado = await validarDatos();
    if (resultado) {
        const info = {
            nombre: nombreCliente.value,
            documento: documentoCliente.value,
            edad: edadCliente.value,
            direccion: residenciaCliente.value,
            telefono: telefonoCliente.value,
            objetivo: objetivoCliente.value,
            plan: planCliente.value,
        };
        const res = await useCliente.putClientes(id, info);
        console.log(res.data);
    }
}

//Funcion que se encarga de resetear
function resetear() {
    nombreCliente = ref("");
    tipoDocumento = ref("");
    documentoCliente = ref("");
    edadCliente = ref("");
    residenciaCliente = ref("");
    telefonoCliente = ref("");
    objetivoCliente = ref("");
    planCliente = ref("");
}

//Funcion que se encarga de validar los datos que se resgistrarán.
async function validarDatos() {
    let verificado = true;

    if (nombreCliente.value == "") {
        $q.notify({
            type: "negative",
            message: "El nombre está vacío",
            position: "bottom-right",
        });
        verificado = false;
    }
    if (tipoDocumento.value == "") {
        $q.notify({
            type: "negative",
            message: "El tipo de documento está vacío",
            position: "bottom-right",
        });
        verificado = false;
    }
    if (documentoCliente.value == "") {
        $q.notify({
            type: "negative",
            message: "El documento está vacío",
            position: "bottom-right",
        });
        verificado = false;
    } else {
        if (!isNaN(documentoCliente.value) || documentoCliente.value < 0) {
            $q.notify({
                type: "negative",
                message: "El documento debe ser un numero valido",
                position: "bottom-right",
            });
            verificado = false;
        }
    }
    if (edadCliente.value == "") {
        $q.notify({
            type: "negative",
            message: "La edad está vacía",
            position: "bottom-right",
        });
        verificado = false;
    } else {
        if (!isNaN(edadCliente.value) || edadCliente.value < 0) {
            $q.notify({
                type: "negative",
                message: "La edad debe ser un numero valido",
                position: "bottom-right",
            });
            verificado = false;
        }
    }
    if (residenciaCliente.value == "") {
        $q.notify({
            type: "negative",
            message: "La residencia está vacía",
            position: "bottom-right",
        });
        verificado = false;
    }
    if (telefonoCliente.value == "") {
        $q.notify({
            type: "negative",
            message: "El telefono está vacía",
            position: "bottom-right",
        });
        verificado = false;
    } else {
        if (!isNaN(telefonoCliente.value) || telefonoCliente.value < 0) {
            $q.notify({
                type: "negative",
                message: "El telefono debe ser un numero valido",
                position: "bottom-right",
            });
            verificado = false;
        }
        if (telefonoCliente.value < 10) {
            $q.notify({
                type: "negative",
                message: "El telefono debe tener minimo 10 caracteres",
                position: "bottom-right",
            });
            verificado = false;
        }
    }
    if (objetivoCliente.value == "") {
        $q.notify({
            type: "negative",
            message: "El objetivo está vacío",
            position: "bottom-right",
        });
        verificado = false;
    }
    if (planCliente.value == "") {
        $q.notify({
            type: "negative",
            message: "El plan está vacío",
            position: "bottom-right",
        });
        verificado = false;
    } else {
        console.log(planCliente.value.valor);
        const res = await usePlan.getPlanesId(planCliente.value.valor);
        if (res.status != 200) {
            $q.notify({
                type: "negative",
                message: `Hubo un error con el plan con codigo ${planCliente.value.codigo}`,
                position: "bottom-right",
            });
        }
    }
    return verificado;
}

function editarVistaFondo(boolean, booleanA, id) {
    mostrarFormularioCliente.value = boolean;
    actualizarBoton.value == booleanA;
    if (booleanA) {
        idCliente.value = id;
        console.log("hola");
    }
}

const fechaBonita = (info) => {
    console.log(info);
    const nuevoFormato = format(new Date(info), 'dd/MM/yyyy');
    return nuevoFormato
};

const configuracionTabla = 

onMounted(() => {
    listarClientes(), listarPlanes();
});
</script>

<template>
    <div>
        <div class="q-pa-md">
            <div>
                <q-btn @click="editarVistaFondo(true, false, null)"> agregar </q-btn>
            </div>
            <q-option-group v-model="opcionBusqueda" inline class="q-mb-md"
                :options="[
                    { label: 'Todos (predeterminado)', value: 'activas' },
                    { label: 'Activos', value: 'activas' },
                    { label: 'Inactivos', value: 'inactivos' },
                    { label: 'Por plan', value: 'plan' },
                    { label: 'Por cumpleaños', value: 'cumpleanios' },
                    { label: 'Por ingreso', value: 'ingresos' },
                ]" />
            <q-table flat bordered title="Clientes" :rows="rows" :columns="columns" row-key="id">
                <template v-slot:body-cell-fechaIngreso="props">
                    <q-td :props="props">
                        <p>{{ fechaBonita(props.row.fechaIngreso) }}</p>
                    </q-td>
                </template>
                <template v-slot:body-cell-fechaNacimiento="props">
                    <q-td :props="props">
                        <p>{{ fechaBonita(props.row.fechaIngreso) }}</p>
                    </q-td>
                </template>
                <template v-slot:body-cell-opciones="props">
                    <q-td :props="props">
                        <q-btn @click="verSeguimiento(true, true, props.row._id)"> 📋 </q-btn>
                        <q-btn @click="editarVistaFondo(true, true, props.row._id)"> ✏️ </q-btn>
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
        <div id="formularioCliente" v-if="mostrarFormularioCliente == true">
            <q-form @submit="registrar()" @button="actualizar()" @reset="resetear()" class="q-gutter-md">
                <q-input standout="bg-green text-white" type="text" label="Nombre" v-model="nombreCliente" />
                <q-select standout="bg-green text-white" :options="tipoD" label="Tipo de Documento" v-model="tipoDocumento" />
                <q-input standout="bg-green text-white" type="text" label="Documento" v-model="documentoCliente" />
                <q-input standout="bg-green text-white" type="text" label="Edad" v-model="edadCliente" />
                <q-input standout="bg-green text-white" type="text" label="Direccion" v-model="residenciaCliente" />
                <q-input standout="bg-green text-white" type="tel" label="Telefono" v-model="telefonoCliente" />
                <q-input standout="bg-green text-white" type="text" label="Objetivo" v-model="objetivoCliente" />
                <q-select standout="bg-green text-white" :options="organizarPlanes" label="Plan" v-model="planCliente" />
                <div>
                    <q-btn v-if="actualizarBoton == false" label="Enviar" type="submit" color="primary" />
                    <q-btn v-else label="Actualizar" type="button" color="primary" />
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
