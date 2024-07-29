<script setup>
import { ref, onMounted, watch } from "vue";
import { useStoreMaquinas } from "../stores/maquinas.js";
import { useStoreSedes } from "../stores/sedes.js";
import { useQuasar } from "quasar";
import { format } from "date-fns";

const $q = useQuasar();

// Variables que contienen la store
const useMaquina = useStoreMaquinas();
const useSede = useStoreSedes();

// Variables para el funcionamiento de la tabla
let rows = ref([]);
let columns = ref([
    {
        name: "codigo",
        sortable: true,
        label: "Código",
        field: "codigo",
        align: "center",
    },
    {
        name: "idSede",
        sortable: true,
        label: "Sede",
        field: "idSede",
        align: "center",
    },
    {
        name: "descripcion",
        label: "Descripción",
        field: "descripcion",
        align: "center",
    },
    {
        name: "fechaIngreso",
        sortable: true,
        label: "Fecha de Ingreso",
        field: "fechaIngreso",
        align: "center",
    },
    {
        name: "fechaUltMan",
        sortable: true,
        label: "Fecha de Último Mantenimiento",
        field: "fechaUltMan",
        align: "center",
    },
    {
        name: "estado",
        sortable: true,
        label: "Estado",
        field: "estado",
        align: "center",
    },
    {
        name: "opciones",
        label: "Opciones",
        field: "opciones",
        align: "center",
    },
]);

const nombreCodigo = ref([]);

let fsDateI;
let fsDateUM;

let hoy = new Date();
hoy.setHours(0, 0, 0, 0);

// Variables que contienen los datos ingresados en el formulario
let codigoMaquinas = ref("");
let sedeMaquinas = ref("");
let descripcionMaquinas = ref("");
let fechaIngresoMaquinas = ref("");
let fechaUltMantMaquinas = ref("");

const opcionBusqueda = ref("todos");

const sedesTodo = ref([]);

// Variable que contiene los datos de la sede a editar
const datos = ref("");

// Variables para administrar lo que se ve en la pantalla
const mostrarFormularioMaquina = ref(false);
const mostrarBotonEnviar = ref(true);
const loading = ref(true); // Agregar estado de carga

const fechaBonita = (info) => {
	const fecha = new Date(info);
    
    // Obtener la parte de la fecha antes de la 'T'
    const fechaSolo = fecha.toISOString().split('T')[0];
    
    // Reemplazar los guiones por barras
    const fechaFormateada = fechaSolo.replace(/-/g, '/');
    
    return fechaFormateada;
};

const organizarSedes = () => {
    nombreCodigo.value = sedesTodo.value.map((element) => ({
        label: `${element.ciudad} / ${element.nombre}`,
        valor: `${element._id}`,
        nombre: `${element.nombre}`,
    }));
    return nombreCodigo.value;
};

const buscarSede = (id) => {
    console.log(id, sedesTodo.value);
    return sedesTodo.value.find((element) => element._id === id).nombre;
};

const estadoTabla = () => {
    switch (opcionBusqueda.value) {
        case "activas":
            listarMaquinasActivos();
            break;
        case "inactivos":
            listarMaquinasInactivos();
            break;
        default:
            listarMaquinas();
            break;
    }
};

async function listarDatos() {
    await Promise.all([listarMaquinas(), sedes()]);
    loading.value = false; // Datos cargados
}

async function listarMaquinas() {
    try {
        const res = await useMaquina.getMaquinas();
        rows.value = res.data.maquinas;
    } catch (error) {
        console.error("Error al listar maquinas:", error);
    }
}

async function listarMaquinasActivos() {
    try {
        const res = await useMaquina.getMaquinasActivos();
        rows.value = res.data.maquinas;
    } catch (error) {
        console.error("Error al listar maquinas activas:", error);
    }
}

async function listarMaquinasInactivos() {
    try {
        const res = await useMaquina.getMaquinasInactivos();
        rows.value = res.data.maquinas;
    } catch (error) {
        console.error("Error al listar maquinas inactivas:", error);
    }
}

async function sedes() {
    try {
        const res = await useSede.getSedes();
        sedesTodo.value = res.data.sedes;
        organizarSedes()
    } catch (error) {
        console.error("Error al listar sedes:", error);
    }
}

// Funcion que se encarga de cambiar el estado de una Maquina
async function editarEstado(elemento) {
    try {
        if (elemento.estado === 1) {
            const res = await useMaquina.putMaquinasInactivar(elemento._id);
        } else if (elemento.estado === 0) {
            const res = await useMaquina.putMaquinasActivar(elemento._id);
        }
        listarMaquinas();
    } catch (error) {
        console.error("Error al editar estado de la maquina:", error);
    }
}

// Funcion que se encarga de enviar los datos del registro
async function registrar() {
    if (await validarDatos()) {
        try {
            const info = {
                codigo: codigoMaquinas.value,
                sede: sedeMaquinas.value.nombre,
                idSede: sedeMaquinas.value.valor,
                descripcion: descripcionMaquinas.value,
                fechaIngreso: fechaIngresoMaquinas.value,
                fechaUltMan: fechaUltMantMaquinas.value,
            };
            console.log(info);
            const res = await useMaquina.postMaquinas(info);
            if (res.status !== 200) {
                $q.notify({
                    type: "negative",
                    message: "Parece que hubo un error en el registro",
                    position: "bottom-right",
                });
            } else {
                $q.notify({
                    type: "positive",
                    message: "El registro se ha realizado correctamente",
                    position: "bottom-right",
                });
                listarMaquinas();
                mostrarFormularioMaquina.value = false;
            }
        } catch (error) {
            console.error("Error al registrar la maquina:", error);
        }
    }
}

async function editar() {
    if (await validarDatos()) {
        try {
            const info = {
                codigo: codigoMaquinas.value,
                sede: sedeMaquinas.value.nombre,
                idSede: sedeMaquinas.value.valor,
                descripcion: descripcionMaquinas.value,
                fechaIngreso: fechaIngresoMaquinas.value,
                fechaUltMan: fechaUltMantMaquinas.value,
            };
            const res = await useMaquina.putMaquinas(datos.value._id, info);
            if (res.status !== 200) {
                $q.notify({
                    type: "negative",
                    message: "Parece que hubo un error al editar la maquina",
                    position: "bottom-right",
                });
            } else {
                $q.notify({
                    type: "positive",
                    message: "La maquina se ah actualizado correctamente",
                    position: "bottom-right",
                });
                listarMaquinas();
                mostrarFormularioMaquina.value = false;
            }
        } catch (error) {
            console.error("Error al editar la maquina:", error);
        }
    }
}

function resetear() {
    codigoMaquinas.value = "";
    sedeMaquinas.value = "";
    descripcionMaquinas.value = "";
    fechaIngresoMaquinas.value = "";
    fechaUltMantMaquinas.value = "";
}

async function validarDatos() {
    let verificado = true;
    fsDateI = new Date(fechaIngresoMaquinas.value + "T00:00:00");
    fsDateUM = new Date(fechaUltMantMaquinas.value + "T00:00:00");

    if (!codigoMaquinas.value.trim() && !sedeMaquinas.value && !descripcionMaquinas.value.trim() && !fechaIngresoMaquinas.value && !fechaUltMantMaquinas.value) {
        $q.notify({
            type: "negative",
            message: "Llenar todos los campos",
            position: "bottom-right",
        });
        verificado = false;
    } else {
        if (!codigoMaquinas.value.trim()) {
            $q.notify({
                type: "negative",
                message: "El codigo no puede estar vacio",
                position: "bottom-right",
            });
            verificado = false;
        }
        if (!sedeMaquinas.value) {
            $q.notify({
                type: "negative",
                message: "La sede no puede estar vacio",
                position: "bottom-right",
            });
            verificado = false;
        }
        if (!descripcionMaquinas.value.trim()) {
            $q.notify({
                type: "negative",
                message: "la descripcion no puede estar vacio",
                position: "bottom-right",
            });
            verificado = false;
        }
        if (!fechaIngresoMaquinas.value) {
            $q.notify({
                type: "negative",
                message: "La fecha de ingreso no puede estar vacio",
                position: "bottom-right",
            });
            verificado = false;
        } else if (fsDateI > hoy) {
            $q.notify({
                type: "negative",
                message: "Ingrese una fecha de ingreso valida",
                position: "bottom-right",
            });
            verificado = false;
        }
        if (!fechaUltMantMaquinas.value) {
            $q.notify({
                type: "negative",
                message: "La fecha de ultimo mantenimiento no puede estar vacio",
                position: "bottom-right",
            });
            verificado = false;
        } else if (fsDateUM > hoy) {
            $q.notify({
                type: "negative",
                message: "Ingrese una fecha de ultimo mantenimiento valida",
                position: "bottom-right",
            });
            verificado = false;
        }
    }
    return verificado;
}

// hay que separa lo de ultima fecha
function editarVistaFondo(boolean, extra, boton) {
    datos.value = extra;
    if (boton == false && extra != null) {
        const sede = nombreCodigo.value.find((element) => element.valor === datos.value.idSede);
        const formatoISOi = datos.value.fechaIngreso;
        const formatoDatei = formatoISOi.substring(0, 10);
        if (datos.value.fechaUltMant) {
            const formatoISOum = datos.value.fechaUltMant;
            const formatoDateum = formatoISOum.substring(0, 10);
            fechaUltMantMaquinas.value = formatoDateum;
        }

        codigoMaquinas.value = datos.value.codigo;
        sedeMaquinas.value = sede;
        descripcionMaquinas.value = datos.value.descripcion;
        fechaIngresoMaquinas.value = formatoDatei;
    } else {
        codigoMaquinas.value = "";
        sedeMaquinas.value = "";
        descripcionMaquinas.value = "";
        fechaIngresoMaquinas.value = "";
        fechaUltMantMaquinas.value = "";
    }

    mostrarBotonEnviar.value = boton;
    mostrarFormularioMaquina.value = boolean;
}

watch(opcionBusqueda, estadoTabla);

onMounted(() => {
    listarDatos();
});
</script>

<template>
    <div>
        <div class="q-pa-md">
            <div>
                <q-btn v-if="!loading" @click="editarVistaFondo(true, null, true)"> agregar </q-btn>
            </div>
            <div v-if="!loading" class="text-h2 text-center">
                Maquinas
            </div>
            <hr v-if="!loading" class="bg-primary no-border" style="height: 4px;">
            <q-option-group
                v-if="!loading"
                v-model="opcionBusqueda"
                inline
                class="q-mb-md"
                :options="[
                    { label: 'Todos (predeterminado)', value: 'todos' },
                    { label: 'Activos', value: 'activas' },
                    { label: 'Inactivos', value: 'inactivos' },
                ]" />
            <q-table v-if="!loading" flat bordered title="Lista de Maquinas" :rows="rows" :columns="columns" row-key="id">
                <template v-slot:body-cell-opciones="props">
                    <q-td :props="props">
                        <q-btn @click="editarVistaFondo(true, props.row, false)"> ✏️ </q-btn>
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
                <template v-slot:body-cell-sede="props">
                    <q-td :props="props">
                        <p>{{ buscarSede(props.row.idSede) }}</p>
                    </q-td>
                </template>
                <template v-slot:body-cell-fechaIngreso="props">
                    <q-td :props="props">
                        <p>{{ fechaBonita(props.row.fechaIngreso) }}</p>
                    </q-td>
                </template>
                <template v-slot:body-cell-fechaUltMan="props">
                    <q-td :props="props">
                        <p>
                            {{ props.row.fechaUltMan ? fechaBonita(props.row.fechaUltMan) : "N/A" }}
                        </p>
                    </q-td>
                </template>
                <template v-slot:body-cell-idSede="props">
                    <q-td :props="props">
                        <p>
                            {{ buscarSede(props.row.idSede) }}
                        </p>
                    </q-td>
                </template>
            </q-table>
            <q-inner-loading :showing="loading" label="Please wait..." label-class="text-teal" label-style="font-size: 1.1em" />
        </div>

        <div id="formularioMaquina" v-if="mostrarFormularioMaquina == true">
            <q-form @submit="mostrarBotonEnviar ? registrar() : editar()" @reset="editarVistaFondo(false, null, true)" class="q-gutter-md">
                <q-input standout="bg-green text-white" v-model="codigoMaquinas" label="Código" />
                <q-select standout="bg-green text-white" v-model="sedeMaquinas" :options="organizarSedes()" option-value="valor" option-label="label" label="Sede" color="black" />
                <q-input standout="bg-green text-white" v-model="descripcionMaquinas" label="Descripción" color="black" />
                <q-input standout="bg-green text-white" v-model="fechaIngresoMaquinas" type="date" label="Fecha de Ingreso Máquina" color="black" />
                <q-input standout="bg-green text-white" v-model="fechaUltMantMaquinas" type="date" label="Fecha Último Mantenimiento" color="black" />
                <div>
                    <q-btn v-if="mostrarBotonEnviar" label="Enviar" type="submit" color="primary" />
                    <q-btn v-else label="Actualizar" type="submit" color="primary" />
                    <q-btn label="Cerrar" type="reset" color="primary" flat class="q-ml-sm" />
                </div>
            </q-form>
            <button id="botonF" @click="editarVistaFondo(false, null, false)"></button>
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
