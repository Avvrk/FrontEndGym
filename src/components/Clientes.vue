<script setup>
import { ref, onMounted, watch } from "vue";
import { useStoreClientes } from "../stores/clientes.js";
import { useStorePlanes } from "../stores/planes.js";
import { useQuasar } from "quasar";
import { format } from "date-fns";

const $q = useQuasar();

const useCliente = useStoreClientes();
const usePlan = useStorePlanes();

// Variables para el funcionamiento de la tabla
let rows = ref([]);
let columns = ref([
    {
        name: "nombre",
        sortable: true,
        label: "Nombre Usuario",
        field: "nombre",
        align: "center",
    },
    {
        name: "fechaIngreso",
        sortable: true,
        label: "Fecha de ingreso",
        field: "fechaIngreso",
        align: "center",
    },
    {
        name: "documento",
        label: "Documento",
        field: "documento",
        align: "center",
    },
    {
        name: "fechaNacimiento",
        sortable: true,
        label: "Fecha de nacimiento",
        field: "fechaNacimiento",
        align: "center",
    },
    {
        name: "edad",
        sortable: true,
        label: "Edad",
        field: "edad",
        align: "center",
    },
    {
        name: "direccion",
        label: "Direccion",
        field: "direccion",
        align: "center",
    },
    { name: "telefono", label: "Telefono", field: "telefono", align: "center" },
    { name: "objetivo", label: "Objetivo", field: "objetivo", align: "center" },
    {
        name: "observaciones",
        label: "Observaciones",
        field: "observaciones",
        align: "center",
    },
    { name: "plan", label: "Plan", field: "plan", align: "center" },
    {
        name: "estado",
        sortable: true,
        label: "Estado",
        field: "estado",
        align: "center",
    },
    {
        name: "seguimiento",
        label: "Seguimiento",
        field: "seguimiento",
        align: "center",
    },
    { name: "opciones", label: "Opciones", field: "opciones", align: "center" },
]);

let planesTodo = ref([]);

// Variable que contendra el id del cliente a editar, se actualiza cada vez que le den al boton de actualizar en la tabla
const datos = ref("");

const segui = ref([]);
const mostrarSeguimientoCliente = ref(false);

// Variables que contiene los datos ingresados en el formulario
let nombreCliente = ref("");
let tipoDocumento = ref("");
let documentoCliente = ref("");
let ingresoCliente = ref("");
let nacimientoCliente = ref("");
let residenciaCliente = ref("");
let telefonoCliente = ref("");
let objetivoCliente = ref("");
let planCliente = ref("");
/* let observacionesCliente = ref(""); */

// Variable para controlar el dato que se mostrara en la tabla
const opcionBusqueda = ref("todos");

//Variables para administrar lo que se ve en la pantalla
const mostrarFormularioCliente = ref(false);
const mostrarBotonEnviar = ref(false);
const loading = ref(true); // Agregar estado de carga

// Variables que se usan en el formulario
// CC = Cedula de Ciudadania, TI = Tarjeta de Identidad, CE = Cedula Extranjera, PS = Pasaporte, TE = Tarjeta Estudiantil, Otro = Documento que no este en la lista
const tipoD = ["CC", "TI", "CE", "PS", "TE", "Otro"];
const codigoValor = ref([]);

const estadoBuscar = ref("ninguno");

const planAbuscar = ref("");
const cumpleanioAbuscar = ref("");
const ingresoAbuscar = ref("");

const botonBuscar = ref(false);
const botonEstado = ref("ninguno");

const organizarPlanes = () => {
    codigoValor.value = planesTodo.value.map((element) => ({
        label: `${element.codigo} / ${element.valor}`,
        valor: `${element._id}`,
        nombre: `${element.descripcion}`,
    }));
    return codigoValor.value;
};

const fechaBonita = (info) => {
    const nuevoFormato = format(new Date(info), "dd/MM/yyyy");
    return nuevoFormato;
};

const planC = () => {
    estadoBuscar.value = "plan";
    botonBuscar.value = true;
    botonEstado.value = "plan";
};

const cumC = () => {
    estadoBuscar.value = "cumpleanios";
    botonBuscar.value = true;
    botonEstado.value = "cumpleanios";
};

const ingC = () => {
    estadoBuscar.value = "ingresos";
    botonBuscar.value = true;
    botonEstado.value = "ingresos";
};

// Funcion para manejar los datos mostrados en la tabla
const estadoTabla = () => {
    switch (opcionBusqueda.value) {
        case "activas":
            listarClientesActivos();
            break;
        case "inactivos":
            listarClientesInactivos();
            break;
        case "plan":
            planC();
            break;
        case "cumpleanios":
            cumC();
            break;
        case "ingresos":
            ingC();
            break;
        default:
            listarClientes();
            break;
    }
};

// Funcion para dependiendo de la busqueda el boton llame la funcion que es
const tipoBoton = () => {
    switch (botonEstado.value) {
        case "plan":
            listarClientesPlan();
            break;
        case "cumpleanios":
            listarClientesCumpleanios();
            break;
        case "ingresos":
            listarClientesIngresaron();
            break;
        default:
            console.log("sali");
            break;
    }
};

function formatoNumerico(numero) {
    if (typeof numero === 'number') {
        numero = numero.toString();
    }

    if (numero.length >= 4) {
        const partes = [];
        let contadorPuntos = 0;

        for (let i = numero.length - 1; i >= 0; i--) {
            partes.unshift(numero.charAt(i));
            contadorPuntos++;

            if (contadorPuntos === 3 && i !== 0) {
                partes.unshift('.');
                contadorPuntos = 0;
            }
        }

        return partes.join('');
    }

    return numero;
}

async function listarDatos() {
    await Promise.all([listarClientes(), listarPlanes()]);
    loading.value = false; // Datos cargados
}

//Funcion que se encarga de traer todos los clientes
async function listarClientes() {
    try {
        estadoBuscar.value = "ninguno";
        botonBuscar.value = false;
        botonEstado.value = "ninguno";
        const res = await useCliente.getClientes();
        rows.value = res.data.clientes;
    } catch (error) {
        console.error("Error al listar los clientes:", error);
    }
}

//Funcion que se encarga de traer todos los clientes activos
async function listarClientesActivos() {
    try {
        estadoBuscar.value = "ninguno";
        botonBuscar.value = false;
        botonEstado.value = "ninguno";
        const res = await useCliente.getClientesActivos();
        rows.value = res.data.clientes;
    } catch (error) {
        console.error("Error al listar los clientes activos:", error);
    }
}

//Funcion que se encarga de traer todos los clientes inactivos
async function listarClientesInactivos() {
    try {
        estadoBuscar.value = "ninguno";
        botonBuscar.value = false;
        botonEstado.value = "ninguno";
        const res = await useCliente.getClientesInactivos();
        rows.value = res.data.clientes;
    } catch (error) {
        console.error("Error al listar los clientes inactivos:", error);
    }
}

async function listarClientesPlan() {
    try {
        const res = await useCliente.getClientesPlan(planAbuscar.value.valor);
        rows.value = res.data.clientes;
    } catch (error) {
        console.error("Error al listar los clientes por plan:", error);
    }
}

//Funcion que se encarga de traer todos los clientes por su fecha de cumpleaños
async function listarClientesCumpleanios() {
    try {
        const res = await useCliente.getClientesCumpleanios(cumpleanioAbuscar.value);
        console.log(cumpleanioAbuscar.value);
        rows.value = res.data.clientes;
    } catch (error) {
        console.error("Error al listar los clientes por cumpleaños:", error);
    }
}

//Funcion que se encarga de traer todos los clientes por su fecha de ingreso
async function listarClientesIngresaron() {
    try {
        const res = await useCliente.getClientesIngresaron(ingresoAbuscar.value);
        rows.value = res.data.clientes;
    } catch (error) {
        console.error("Error al listar los clientes por ingreso:", error);
    }
}

//Funcion que se encarga de traer todos los clientes
async function listarPlanes() {
    try {
        const res = await usePlan.getPlanes();
        planesTodo.value = res.data.planes;
        organizarPlanes()
    } catch (error) {
        console.error("Error al listar los planes:", error);
    }
}

//Funcion que se encarga de cambiar el estado de un cliente
async function editarEstado(elemento) {
    try {
        if (elemento.estado === 1) {
            const res = await useCliente.putClientesInactivar(elemento._id);
        } else if (elemento.estado === 0) {
            const res = await useCliente.putClientesActivar(elemento._id);
        }
        listarClientes();
    } catch (error) {
        console.error("Error al editar el estado del cliente:", error);
    }
}

//Funcion que se encarga de enviar los datos del registro
async function registrar() {
    if (await validarDatos()) {
        try {
            let hoy = new Date();
            hoy.setHours(0, 0, 0, 0);
            const fNacimiento = new Date(nacimientoCliente.value);
            const diferenciaEnMilisegundos = hoy - fNacimiento; // Cambiado de fNacimiento - hoy a hoy - fNacimiento

            const msPorAño = 1000 * 60 * 60 * 24 * 365.25;
            const edad = Math.floor(diferenciaEnMilisegundos / msPorAño);

            const info = {
                nombre: nombreCliente.value,
                tipoDocumento: tipoDocumento.value,
                documento: documentoCliente.value,
                fechaNacimiento: nacimientoCliente.value,
                fechaIngreso: ingresoCliente.value,
                edad: edad,
                direccion: residenciaCliente.value,
                telefono: telefonoCliente.value,
                objetivo: objetivoCliente.value,
                plan: planCliente.value.nombre,
                _idPlan: planCliente.value.valor,
                /* observaciones: observacionesCliente.value, */
            };
            const res = await useCliente.postClientes(info);
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
                listarClientes();
            }
        } catch (error) {
            console.error("Error al registrar cliente:", error);
        }
    }
}

async function editar() {
    if (await validarDatos()) {
        try {
            let hoy = new Date();
            hoy.setHours(0, 0, 0, 0);
            const fNacimiento = new Date(nacimientoCliente.value);
            const diferenciaEnMilisegundos = hoy - fNacimiento; // Cambiado de fNacimiento - hoy a hoy - fNacimiento

            const msPorAño = 1000 * 60 * 60 * 24 * 365.25;
            const edad = Math.floor(diferenciaEnMilisegundos / msPorAño);

            const info = {
                nombre: nombreCliente.value,
                tipoDocumento: tipoDocumento.value,
                documento: documentoCliente.value,
                fechaNacimiento: nacimientoCliente.value,
                fechaIngreso: ingresoCliente.value,
                edad: edad,
                direccion: residenciaCliente.value,
                telefono: telefonoCliente.value,
                objetivo: objetivoCliente.value,
                plan: planCliente.value.nombre,
                _idPlan: planCliente.value.valor,
/*                 observaciones: observacionesCliente.value, */
            };
            const res = await useCliente.putClientes(datos.value._id, info);
            if (res.status !== 200) {
                $q.notify({
                    type: "negative",
                    message: "Parece que hubo un error en la edición",
                    position: "bottom-right",
                });
            } else {
                $q.notify({
                    type: "positive",
                    message: "El cliente se ha editado correctamente",
                    position: "bottom-right",
                });
                listarClientes();
            }
        } catch (error) {
            console.error("Error al editar cliente:", error);
        }
    }
}

//Funcion que se encarga de resetear
function resetear() {
    nombreCliente.value = "";
    tipoDocumento.value = "";
    documentoCliente.value = "";
    ingresoCliente.value = "";
    nacimientoCliente.value = "";
    residenciaCliente.value = "";
    telefonoCliente.value = "";
    objetivoCliente.value = "";
    planCliente.value = "";
}

//Funcion que se encarga de validar los datos que se resgistrarán.
async function validarDatos() {
    let verificado = true;
    let ncDate = new Date(nacimientoCliente.value + "T00:00:00");
    let icDate = new Date(ingresoCliente.value + "T00:00:00");

    let hoy = new Date();
    hoy.setHours(0, 0, 0, 0);

    if (!nombreCliente.value && !tipoDocumento.value && !documentoCliente.value & !edadCliente.value && !residenciaCliente.value && !telefonoCliente.value && !objetivoCliente.value && !planCliente.value/*  && !objetivoCliente */) {
        $q.notify({
            type: "negative",
            message: "LLena todos los campos",
            position: "bottom-right",
        }); 
        verificado = false;
    } else {
        if (!nombreCliente.value) {
            $q.notify({
                type: "negative",
                message: "El nombre está vacío",
                position: "bottom-right",
            });
            verificado = false;
        }
        if (!tipoDocumento.value) {
            $q.notify({
                type: "negative",
                message: "El tipo de documento está vacío",
                position: "bottom-right",
            });
            verificado = false;
        }
        if (!documentoCliente.value) {
            $q.notify({
                type: "negative",
                message: "El documento está vacío",
                position: "bottom-right",
            });
            verificado = false;
        } else if (isNaN(documentoCliente.value) || documentoCliente.value < 0) {
            $q.notify({
                type: "negative",
                message: "El documento debe ser un numero valido",
                position: "bottom-right",
            });
            verificado = false;
        }
        if (!ingresoCliente.value) {
            $q.notify({
                type: "negative",
                message: "La edad está vacía",
                position: "bottom-right",
            });
            verificado = false;
        } else if (icDate > hoy) {
            $q.notify({
                type: "negative",
                message: "Ingrese una fecha de valida valida",
                position: "bottom-right",
            });
            verificado = false;
        }
        if (!nacimientoCliente.value) {
            $q.notify({
                type: "negative",
                message: "La edad está vacía",
                position: "bottom-right",
            });
            verificado = false;
        } else if (ncDate > hoy) {
            $q.notify({
                type: "negative",
                message: "Ingrese una fecha de nacimiento valida",
                position: "bottom-right",
            });
            verificado = false;
        }
        if (!residenciaCliente.value) {
            $q.notify({
                type: "negative",
                message: "La residencia está vacía",
                position: "bottom-right",
            });
            verificado = false;
        }
        if (!telefonoCliente.value) {
            $q.notify({
                type: "negative",
                message: "El telefono está vacía",
                position: "bottom-right",
            });
            verificado = false;
        } else if (isNaN(telefonoCliente.value) || telefonoCliente.value < 0) {
            $q.notify({
                type: "negative",
                message: "El telefono debe ser un numero valido",
                position: "bottom-right",
            });
            verificado = false;
        } else if (telefonoCliente.value < 10) {
            $q.notify({
                type: "negative",
                message: "El telefono debe tener minimo 10 caracteres",
                position: "bottom-right",
            });
            verificado = false;
        }
        if (!objetivoCliente.value) {
            $q.notify({
                type: "negative",
                message: "El objetivo está vacío",
                position: "bottom-right",
            });
            verificado = false;
        }
        if (!planCliente.value) {
            $q.notify({
                type: "negative",
                message: "El plan está vacío",
                position: "bottom-right",
            });
            verificado = false;
        } else {
            const res = await usePlan.getPlanesId(planCliente.value.valor);
            if (res.status != 200) {
                $q.notify({
                    type: "negative",
                    message: `Hubo un error con el plan con codigo ${planCliente.value.codigo}`,
                    position: "bottom-right",
                });
            }
        }
    }
    return verificado;
}

function editarVistaFondo(boolean, extra, boton) {
    datos.value = extra;
    console.log(datos.value);
    if (boton == false && extra != null) {
        const formatoISOfn = datos.value.fechaNacimiento;
        const formatoDatefn = formatoISOfn.substring(0, 10);
        const formatoISOfi = datos.value.fechaIngreso;
        const formatoDatefi = formatoISOfi.substring(0, 10);

        const plan = codigoValor.value.find((element) => element.valor === datos.value._idPlan);
        const tipoDoc = tipoD.find((element) => element == datos.value.tipoDocumento);

        nombreCliente.value = datos.value.nombre;
        tipoDocumento.value = tipoDoc;
        documentoCliente.value = datos.value.documento;
        nacimientoCliente.value = formatoDatefn;
        ingresoCliente.value = formatoDatefi;
        residenciaCliente.value = datos.value.direccion;
        telefonoCliente.value = datos.value.telefono;
        objetivoCliente.value = datos.value.objetivo;
        planCliente.value = plan;
    } else {
        nombreCliente.value = "";
        tipoDocumento.value = "";
        documentoCliente.value = "";
        ingresoCliente.value = "";
        nacimientoCliente.value = "";
        residenciaCliente.value = "";
        telefonoCliente.value = "";
        objetivoCliente.value = "";
        planCliente.value = "";
    }

    mostrarBotonEnviar.value = boton;
    console.log(mostrarBotonEnviar.value);
    mostrarFormularioCliente.value = boolean;
}

function verSeguimiento(seguimiento) {
    seguimiento.forEach(item => {
        const estaturaMetros = item.estatura / 100;
        item.imc = item.peso / (estaturaMetros * estaturaMetros);
    });
    segui.value = seguimiento;
    mostrarSeguimientoCliente.value = true;
};


function cerrarSeguimiento() {
    mostrarSeguimientoCliente.value = false;
};

function cerrarFc() {
    
}

function calcularEstadoIMC(imc) {
    if (imc < 18.5) {
        return "Bajo peso";
    } else if (imc >= 18.5 && imc < 24.9) {
        return "Peso Normal";
    } else if (imc >= 25 && imc < 29.9) {
        return "Sobrepeso";
    } else if (imc >= 30 && imc < 34.9) {
        return "Obesidad I";
    } else if (imc >= 35 && imc < 39.9) {
        return "Obesidad II";
    } else if (imc >= 40) {
        return "Obesidad III";
    }
};

// const configuracionTabla =
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
            <q-option-group
                v-if="!loading"
                v-model="opcionBusqueda"
                inline
                class="q-mb-md"
                :options="[
                    { label: 'Todos (predeterminado)', value: 'todos' },
                    { label: 'Activos', value: 'activas' },
                    { label: 'Inactivos', value: 'inactivos' },
                    { label: 'Por plan', value: 'plan' },
                    { label: 'Por cumpleaños', value: 'cumpleanios' },
                    { label: 'Por ingreso', value: 'ingresos' },
                ]" />
            <div class="row">
                <q-select v-if="estadoBuscar == 'plan'" standout="bg-green text-white" :options="organizarPlanes()" option-value="valor" option-label="label" label="Plan" v-model="planAbuscar" style="width: 200px" />
                <q-input v-if="estadoBuscar == 'cumpleanios'" standout="bg-green text-white" type="date" label="Cumpleaños" v-model="cumpleanioAbuscar" style="width: 200px" />
                <q-input v-if="estadoBuscar == 'ingresos'" standout="bg-green text-white" type="date" label="Ingresaron" v-model="ingresoAbuscar" style="width: 200px" />
                <q-btn v-if="botonBuscar" @click="tipoBoton"> 🔎 </q-btn>
            </div>
            <q-table v-if="!loading" flat bordered title="Clientes" :rows="rows" :columns="columns" row-key="id">
                <template v-slot:body-cell-fechaIngreso="props">
                    <q-td :props="props">
                        <p>{{ fechaBonita(props.row.fechaIngreso) }}</p>
                    </q-td>
                </template>
                <template v-slot:body-cell-fechaNacimiento="props">
                    <q-td :props="props">
                        <p>{{ fechaBonita(props.row.fechaNacimiento) }}</p>
                    </q-td>
                </template>
                <template v-slot:body-cell-documento="props">
                    <q-td :props="props">
                        <p>{{ formatoNumerico(props.row.documento) }}</p>
                    </q-td>
                </template>
                <template v-slot:body-cell-opciones="props">
                    <q-td :props="props">
                        <q-btn @click="editarVistaFondo(true, props.row, false)"> ✏️ </q-btn>
                        <q-btn v-if="props.row.estado == 1" @click="editarEstado(props.row)" :loading="useCliente.loading">
                            ❌
                            <template v-slot:loading>
                                <q-spinner color="secondary" size="1em" />
                            </template>
                        </q-btn>
                        <q-btn v-else @click="editarEstado(props.row)" :loading="useCliente.loading">
                            ✅
                            <template v-slot:loading>
                                <q-spinner color="secondary" size="1em" />
                            </template>
                        </q-btn>
                    </q-td>
                </template>
                <template v-slot:body-cell-seguimiento="props"> <!--Linea añadida-->
                    <q-td :props="props">
                        <q-btn @click="verSeguimiento(props.row.seguimiento)">
                            📋
                        </q-btn>
                    </q-td>
                </template>
                <template v-slot:body-cell-estado="props">
                    <q-td :props="props">
                        <p v-if="props.row.estado == 1" style="color: green">Activo</p>
                        <p v-else style="color: red">Inactivo</p>
                    </q-td>
                </template>
            </q-table>
            <q-inner-loading :showing="loading" label="Please wait..." label-class="text-teal" label-style="font-size: 1.1em" />
        </div>
        <div id="seguimientoCliente" v-if="mostrarSeguimientoCliente == true">
            <section v-for="item in segui" :key="item._id">
                <q-card class="my-card" flat bordered>
                    <q-card-section>
                        <div class="text-h4" style="text-align: center;">Seguimiento </div>
                    </q-card-section>

                    <q-markup-table>
                        <thead>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td class="text-center">Fecha:</td>
                                <td class="text-center">{{ fechaBonita(item.fecha) }}</td>
                            </tr>
                            <tr>
                                <td class="text-center">Brazo:</td>
                                <td class="text-center">{{ item.brazo }} cm</td>
                            </tr>
                            <tr>
                                <td class="text-center">Cintura:</td>
                                <td class="text-center">{{ item.cintura }} cm</td>
                            </tr>
                            <tr>
                                <td class="text-center">Pierna:</td>
                                <td class="text-center">{{ item.pierna }} cm</td>
                            </tr>
                            <tr>
                                <td class="text-center">Estatura:</td>
                                <td class="text-center">{{ item.estatura }} cm</td>
                            </tr>
                            <tr>
                                <td class="text-center">IMC:</td>
                                <td class="text-center"> {{ item.imc.toFixed(2) }} </td>
                            </tr>
                            <tr>
                                <td class="text-center">Estado:</td>
                                <td class="text-center">{{ calcularEstadoIMC(item.imc) }}</td>
                            </tr>
                            <tr>
                                <td class="text-center">Peso:</td>
                                <td class="text-center">{{ item.peso }} kg</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </q-markup-table>
                    <button class="botonSeguimiento">Editar</button>
                    <button @click="cerrarSeguimiento()" class="botonSeguimiento">Cerrar</button>
                </q-card>
            </section>
        </div>
        <div id="formularioCliente" v-if="mostrarFormularioCliente == true">
            <q-form @submit="mostrarBotonEnviar ? registrar() : editar()" @button="actualizar()" @reset="editarVistaFondo(false, null, true)" class="q-gutter-md">
                <q-input standout="bg-green text-white" type="text" label="Nombre" v-model="nombreCliente" />
                <q-select standout="bg-green text-white" :options="tipoD" label="Tipo de Documento" v-model="tipoDocumento" />
                <q-input standout="bg-green text-white" type="text" label="Documento" v-model="documentoCliente" />
                <q-input standout="bg-green text-white" type="date" label="Fecha de ingreso" v-model="ingresoCliente" />
                <q-input standout="bg-green text-white" type="date" label="Fecha de Nacimiento" v-model="nacimientoCliente" />
                <q-input standout="bg-green text-white" type="text" label="Direccion" v-model="residenciaCliente" />
                <q-input standout="bg-green text-white" type="tel" label="Telefono" v-model="telefonoCliente" />
                <q-input standout="bg-green text-white" type="text" label="Objetivo" v-model="objetivoCliente" />
                <!-- <q-input standout="bg-green text-white" type="text" label="Observaciones" v-model="observacionesCliente" /> -->
                <q-select standout="bg-green text-white" :options="organizarPlanes()" option-value="valor" option-label="label" label="Plan" v-model="planCliente" />
                <div>
                    <q-btn v-if="mostrarBotonEnviar" label="Enviar" type="submit" color="primary" />
                    <q-btn v-else label="Actualizar" type="submit" color="primary" />
                    <q-btn label="Cerrar" type="reset" color="primary" flat class="q-ml-sm" />
                </div>
            </q-form>
            <button id="botonF" @click="editarVistaFondo(false, null, true)"></button>
        </div>
    </div>
</template>

<style scoped>
#seguimientoCliente {
    width: 100%;
    height: 100vh;
    position: absolute;
    box-sizing: inherit;
    top: 0;
    background-color: rgba(8, 8, 8, 0.305);
    font-size: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 0;
    z-index: 1;
}

.botonSeguimiento {
    height: 50px;
    width: 100px;
    margin: 40px 40px;
    padding: 10px;
    background-color: #4caf50;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.my-card{
    border-radius: 15px;
}

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
