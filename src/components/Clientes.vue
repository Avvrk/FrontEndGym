<script setup>
import { ref, onMounted, computed } from "vue";
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
	{ name: "opciones", label: "Opciones", field: "opciones", align: "center" },
]);

let planesTodo = ref([]);

// Variable que contendra el id del cliente a editar, se actualiza cada vez que le den al boton de actualizar en la tabla
const datos = ref("");

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
const mostrarBotonEnviar = ref(false);
const loading = ref(true); // Agregar estado de carga

// Variables que se usan en el formulario
// CC = Cedula de Ciudadania, TI = Tarjeta de Identidad, CE = Cedula Extranjera, PS = Pasaporte, TE = Tarjeta Estudiantil, Otro = Documento que no este en la lista
const tipoD = ["CC", "TI", "CE", "PS", "TE", "Otro"];
const codigoValor = ref([]);

const organizarPlanes = () => {
	codigoValor.value = planesTodo.value.map((element) => ({
		label: `${element.codigo} / ${element.valor}`,
		valor: `${element._id}`,
		nombre: `${element.codigo}`,
	}));
	return codigoValor.value;
};

const fechaBonita = (info) => {
	const nuevoFormato = format(new Date(info), "dd/MM/yyyy");
	return nuevoFormato;
};

async function listarDatos() {
	await Promise.all([listarClientes()]);
	loading.value = false; // Datos cargados
}

//Funcion que se encarga de traer todos los clientes
async function listarClientes() {
	try {
		const res = await useCliente.getClientes();
		rows.value = res.data.clientes;
	} catch (error) {
		console.error("Error al listar los clientes:", error);
	}
}

//Funcion que se encarga de traer todos los clientes activos
async function listarClientesActivos() {
	try {
		const res = await useCliente.getClientesActivos();
		rows.value = res.data.clientes;
	} catch (error) {
		console.error("Error al listar los clientes activos:", error);
	}
}

//Funcion que se encarga de traer todos los clientes inactivos
async function listarClientesInactivos() {
	try {
		const res = await useCliente.getClientesInactivos();
		rows.value = res.data.clientes;
	} catch (error) {
		console.error("Error al listar los clientes inactivos:", error);
	}
}

//Funcion que se encarga de traer todos los clientes por su fecha de cumpleaños
async function listarClientesCumpleanios() {
	try {
		const res = await useCliente.getClientesCumpleanios();
		rows.value = res.data.clientes;
	} catch (error) {
		console.error("Error al listar los clientes por cumpleaños:", error);
	}
}

//Funcion que se encarga de traer todos los clientes por su fecha de ingreso
async function listarClientesIngresaron() {
	try {
		const res = await useCliente.getClientesIngresaron();
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
	} catch (error) {
		console.error("Error al listar los planes:", error);
	}
}

//Funcion que se encarga de cambiar el estado de un cliente
async function editarEstado(elemento) {
	try {
		if (elemento.estado === 1) {
			const res = await useCliente.putClientesActivar(elemento._id);
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
				listarUsuarios();
			}
		} catch (error) {
			console.error("Error al registrar cliente:", error);
		}
	}
}

async function editar() {
	if (await validarDatos()) {
		try {
			const info = {
				nombre: nombreCliente.value,
				documento: documentoCliente.value,
				edad: edadCliente.value,
				direccion: residenciaCliente.value,
				telefono: telefonoCliente.value,
				objetivo: objetivoCliente.value,
				plan: planCliente.value,
			};
			const res = await useCliente.putClientes(datos.value._id, info);
			if (res.status !== 200) {
				$q.notify({
					type: "negative",
					message: "Parece que hubo un error en la edicion",
					position: "bottom-right",
				});
			} else {
				$q.notify({
					type: "positive",
					message: "El cliente se ah editado correctamente",
					position: "bottom-right",
				});
				listarUsuarios();
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
	edadCliente.value = "";
	residenciaCliente.value = "";
	telefonoCliente.value = "";
	objetivoCliente.value = "";
	planCliente.value = "";
}

//Funcion que se encarga de validar los datos que se resgistrarán.
async function validarDatos() {
	let verificado = true;

	if (
		!nombreCliente.value &&
		!tipoDocumento.value &&
		!documentoCliente.value & !edadCliente.value &&
		!residenciaCliente.value &&
		!telefonoCliente.value &&
		!objetivoCliente.value &&
		!planCliente.value
	) {
		$q.notify({
			type: "negative",
			message: "hola",
			position: "bottom-right",
		});
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
		} else if (
			!isNaN(documentoCliente.value) ||
			documentoCliente.value < 0
		) {
			$q.notify({
				type: "negative",
				message: "El documento debe ser un numero valido",
				position: "bottom-right",
			});
			verificado = false;
		}
		if (!edadCliente.value) {
			$q.notify({
				type: "negative",
				message: "La edad está vacía",
				position: "bottom-right",
			});
			verificado = false;
		} else if (!isNaN(edadCliente.value) || edadCliente.value < 0) {
			$q.notify({
				type: "negative",
				message: "La edad debe ser un numero valido",
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
		} else if (!isNaN(telefonoCliente.value) || telefonoCliente.value < 0) {
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
	if (boton == false && extra != null) {
		const plan = codigoValor.value.find(
			(element) => element.valor === datos.value.idPlan
		);
		const tipoDoc = tipoD.find(
			(element) => element.valor === datos.value.tipoDocumento
		);
		nombreCliente.value = datos.value.nombre;
		tipoDocumento.value = tipoDoc;
		documentoCliente.value = datos.value.documento;
		edadCliente.value = datos.value.edad;
		residenciaCliente.value = datos.value.residencia;
		telefonoCliente.value = datos.value.telefono;
		objetivoCliente.value = datos.value.objetivo;
		planCliente.value = plan;
	} else {
		nombreCliente.value = "";
		tipoDocumento.value = "";
		documentoCliente.value = "";
		edadCliente.value = "";
		residenciaCliente.value = "";
		telefonoCliente.value = "";
		objetivoCliente.value = "";
		planCliente.value = "";
	}
    
	mostrarBotonEnviar.value = boton;
    mostrarFormularioCliente.value = boolean;
}

// const configuracionTabla =

onMounted(() => {
	listarDatos();
});
</script>

<template>
	<div>
		<div class="q-pa-md">
			<div>
				<q-btn v-if="!loading" @click="editarVistaFondo(true, null, true)">
					agregar
				</q-btn>
			</div>
			<q-option-group v-if="!loading"
				v-model="opcionBusqueda"
				inline
				class="q-mb-md"
				:options="[
					{ label: 'Todos (predeterminado)', value: 'activas' },
					{ label: 'Activos', value: 'activas' },
					{ label: 'Inactivos', value: 'inactivos' },
					{ label: 'Por plan', value: 'plan' },
					{ label: 'Por cumpleaños', value: 'cumpleanios' },
					{ label: 'Por ingreso', value: 'ingresos' },
				]" />
			<q-table v-if="!loading"
				flat
				bordered
				title="Clientes"
				:rows="rows"
				:columns="columns"
				row-key="id">
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
						<q-btn
							@click="verSeguimiento(true, true, props.row._id)">
							📋
						</q-btn>
						<q-btn
							@click="editarVistaFondo(true, props.row, false)">
							✏️
						</q-btn>
						<q-btn
							v-if="props.row.estado == 1"
							@click="editarEstado(props.row)">
							❌
						</q-btn>
						<q-btn v-else @click="editarEstado(props.row)">
							✅
						</q-btn>
					</q-td>
				</template>
				<template v-slot:body-cell-estado="props">
					<q-td :props="props">
						<p v-if="props.row.estado == 1" style="color: green">
							Activo
						</p>
						<p v-else style="color: red">Inactivo</p>
					</q-td>
				</template>
			</q-table>
			<q-inner-loading :showing="loading" label="Please wait..." label-class="text-teal" label-style="font-size: 1.1em"/>
		</div>
		<div id="formularioCliente" v-if="mostrarFormularioCliente == true">
			<q-form
				@submit="mostrarBotonEnviar ? registrar() : editar()"
				@button="actualizar()"
				@reset="resetear()"
				class="q-gutter-md">
				<q-input
					standout="bg-green text-white"
					type="text"
					label="Nombre"
					v-model="nombreCliente" />
				<q-select
					standout="bg-green text-white"
					:options="tipoD"
					label="Tipo de Documento"
					v-model="tipoDocumento" />
				<q-input
					standout="bg-green text-white"
					type="text"
					label="Documento"
					v-model="documentoCliente" />
				<q-input
					standout="bg-green text-white"
					type="text"
					label="Edad"
					v-model="edadCliente" />
				<q-input
					standout="bg-green text-white"
					type="text"
					label="Direccion"
					v-model="residenciaCliente" />
				<q-input
					standout="bg-green text-white"
					type="tel"
					label="Telefono"
					v-model="telefonoCliente" />
				<q-input
					standout="bg-green text-white"
					type="text"
					label="Objetivo"
					v-model="objetivoCliente" />
				<q-select
					standout="bg-green text-white"
					:options="organizarPlanes()"
					option-value="valor"
					option-label="label"
					label="Plan"
					v-model="planCliente" />
				<div>
					<q-btn
						v-if="mostrarBotonEnviar"
						label="Enviar"
						type="submit"
						color="primary" />
					<q-btn
						v-else
						label="Actualizar"
						type="button"
						color="primary" />
					<q-btn
						label="Limpiar"
						type="reset"
						color="primary"
						flat
						class="q-ml-sm" />
				</div>
			</q-form>
			<button
				id="botonF"
				@click="editarVistaFondo(false, null, true)"></button>
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
