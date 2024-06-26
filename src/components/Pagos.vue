<script setup>
import { ref, onMounted, watch } from "vue";
import { useStorePagos } from "../stores/pagos.js";
import { useStorePlanes } from "../stores/planes.js";
import { useStoreClientes } from "../stores/clientes.js";
import { useQuasar } from "quasar";
import { format } from "date-fns";

const $q = useQuasar();

// Variables que contienen la store
const usePago = useStorePagos();
const usePlanes = useStorePlanes();
const useCliente = useStoreClientes();

// Variables para el funcionamiento de la tabla
let rows = ref([]);
let columns = ref([
	{
		name: "_idCliente",
		sortable: true,
		label: "Cliente",
		field: "_idCliente",
		align: "center",
	},
	{
		name: "_idPlan",
		label: "Plan",
		field: "_idPlan",
		align: "center",
	},
	{
		name: "fecha",
		label: "Fecha",
		field: "fecha",
		align: "center",
	},
	{
		name: "valor",
		label: "Valor",
		field: "valor",
		align: "center",
	},
	{
		name: "estado",
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

// Variables que contienen los datos ingresados en el formulario
let clientePago = ref("");
let planPago = ref("");
let fechaPago = ref("");
let valorPago = ref("");

const planesTodo = ref([]);
const clientesTodo = ref([]);

const codigoValor = ref([]);
const documentoNombre = ref([]);

// Variable que contiene los datos de la sede a editar
const datos = ref("");

// Variables para administrar lo que se ve en la pantalla
const mostrarFormularioPago = ref(false);
const mostrarBotonEnviar = ref(true);
const loading = ref(true); // Agregar estado de carga

const opcionBusqueda = ref("todos");
const estadoBuscar = ref("ninguno");
const botonBuscar = ref(false);
const botonEstado = ref("ninguno");

const fecha1Abuscar = ref("");
const fecha2Abuscar = ref("");
const planAbuscar = ref("");

const planC = () => {
	estadoBuscar.value = "plan";
	botonBuscar.value = true;
	botonEstado.value = "plan";
};

const fecC = () => {
	estadoBuscar.value = "fecha";
	botonBuscar.value = true;
	botonEstado.value = "fecha";
};

const estadoTabla = () => {
	switch (opcionBusqueda.value) {
		case "activas":
			listarPagosActivos();
			break;
		case "inactivos":
			listarPagosInactivos();
			break;
		case "fecha":
			fecC();
			break;
		case "plan":
			planC();
			break;
		default:
			listarPagos();
			break;
	}
};

const tipoBoton = () => {
	switch (botonEstado.value) {
		case "plan":
			listarPagosPlan();
			break;
		case "fecha":
			listarPagosFecha();
			break;
		default:
			console.log("sali");
			break;
	}
};

watch(opcionBusqueda, estadoTabla);

const organizarPlanes = () => {
	codigoValor.value = planesTodo.value.map((element) => ({
		label: `${element.codigo} / ${element.valor}`,
		valor: `${element._id}`,
		nombre: `${element.descripcion}`,
	}));
	return codigoValor.value;
};

const organizarClientes = () => {
	documentoNombre.value = clientesTodo.value.map((element) => ({
		label: `${element.documento} / ${element.nombre}`,
		valor: `${element._id}`,
		nombre: `${element.nombre}`,
	}));
	return documentoNombre.value;
};

const buscarPlan = (id) => {
	const plan = planesTodo.value.find((p) => p._id === id);
	return plan ? plan.descripcion : "Desconocido"; // Agregar valor predeterminado
};

const buscarNombre = (idCliente) => {
	const cliente = clientesTodo.value.find((c) => c._id === idCliente);
	if (!cliente) {
		console.error(`Cliente con ID ${idCliente} no encontrado`);
		return "Desconocido"; // O algún valor predeterminado
	}
	console.log("Cliente encontrado: ", cliente);
	return cliente.nombre;
};

const fechaBonita = (info) => {
	const nuevoFormato = format(new Date(info), "dd/MM/yyyy");
	return nuevoFormato;
};

function formatoNumerico(numero) {
    if (typeof numero === 'number') {
        numero = numero.toString();
    }

    if (numero.length >= 4 && numero.length <= 9){
        const formatoActualizado = numero.split("");
        formatoActualizado.splice(-3, 0, ".");
        if (numero.length == 7 || numero.length == 8 || numero.length == 9){
            formatoActualizado.splice(-7, 0, ".");
        }
        return formatoActualizado.join("");
    }
	return numero;
}

async function listarDatos() {
	await Promise.all([listarPagos(), listarPlanes(), listarClientes()]);
	loading.value = false; // Datos cargados
}

// Funcion que se encarga de traer todas las sedes
async function listarPagos() {
	try {
		estadoBuscar.value = "ninguno";
        botonBuscar.value = false;
        botonEstado.value = "ninguno";
		const res = await usePago.getPagos();
		rows.value = res.data.pagos;
	} catch (error) {
		console.log("Error al listar pagos:", error);
	}
}

async function listarPlanes() {
	try {
		const res = await usePlanes.getPlanes();
		planesTodo.value = res.data.planes;
		organizarPlanes();
	} catch (error) {
		console.log("Error al listar planes:", error);
	}
}

async function listarClientes() {
	try {
		const res = await useCliente.getClientes();
		clientesTodo.value = res.data.clientes;
		organizarClientes();
	} catch (error) {
		console.error("Error al listar los clientes:", error);
	}
}

async function listarPagosActivos() {
	try {
		estadoBuscar.value = "ninguno";
        botonBuscar.value = false;
        botonEstado.value = "ninguno";
		const res = await usePago.getPagosActivos();
		rows.value = res.data.pagos;
	} catch (error) {
		console.log("Error al listar pagos activos:", error);
	}
}

async function listarPagosInactivos() {
	try {
		estadoBuscar.value = "ninguno";
        botonBuscar.value = false;
        botonEstado.value = "ninguno";
		const res = await usePago.getPagosInactivos();
		rows.value = res.data.pagos;
	} catch (error) {
		console.log("Error al listar pagos inactivos:", error);
	}
}

async function listarPagosPlan() {
	try {
		const res = await usePago.getPagosPlan(planAbuscar.value.valor);
		rows.value = res.data.pagos;
	} catch (error) {
		console.error("Error al listar los pagos por plan:", error);
	}
}

async function listarPagosFecha() {
	try {
		const res = await usePago.getPagosFechas(fecha1Abuscar.value, fecha2Abuscar.value);
		rows.value = res.data.pagos;
	} catch (error) {
		console.error("Error al listar los pagos por fecha:", error);
	}
}

// Funcion que se encarga de cambiar el estado de una sede
async function editarEstado(elemento) {
	try {
		if (elemento.estado === 1) {
			const res = await usePago.putPagosInactivar(elemento._id);
		} else if (elemento.estado === 0) {
			const res = await usePago.putPagosActivar(elemento._id);
		}
		listarPagos();
	} catch (error) {
		console.log("Error al editar estado del pago:", error);
	}
}

// Funcion que se encarga de enviar los datos del registro
async function registrar() {
	if (await validarDatos()) {
		try {
			const info = {
				_idCliente: clientePago.value.valor,
				_idPlan: planPago.value.valor,
				fecha: fechaPago.value,
				valor: valorPago.value,
			};
			const res = await usePago.postPagos(info);
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
				listarPagos();
			}
		} catch (error) {
			console.error("Error al registrar el pago:", error);
		}
	}
}

// Funcion que se encarga de enviar los datos para la edicion
async function editar() {
	if (await validarDatos()) {
		try {
			const info = {
				_idCliente: clientePago.value.valor,
				_idPlan: planPago.value.valor,
				fecha: fechaPago.value,
				valor: valorPago.value,
			};
			const res = await usePago.putPagos(datos.value._id, info);
			if (res.status !== 200) {
				$q.notify({
					type: "negative",
					message: "Parece que hubo un error al editar el pago",
					position: "bottom-right",
				});
			} else {
				$q.notify({
					type: "positive",
					message: "El pago se ha editado correctamente",
					position: "bottom-right",
				});
				listarPagos();
			}
		} catch (error) {
			console.error("Error al editar el pago:", error);
		}
	}
}

// Funcion que se encarga de resetear los datos en el formulario
function resetear() {
	clientePago.value = "";
	planPago.value = "";
	fechaPago.value = "";
	valorPago.value = "";
}

// Función que se encarga de validar los datos que se registrarán o editaran
async function validarDatos() {
	let verificado = true;

	if (
		!clientePago.value &&
		!planPago.value &&
		!fechaPago.value &&
		!valorPago.value
	) {
		$q.notify({
			type: "negative",
			message: "Llena todos los campos",
			position: "bottom-right",
		});
		verificado = false;
	} else {
		if (!clientePago.value) {
			$q.notify({
				type: "negative",
				message: "El cliente está vacío",
				position: "bottom-right",
			});
			verificado = false;
		}
		if (!planPago.value) {
			$q.notify({
				type: "negative",
				message: "El plan está vacío",
				position: "bottom-right",
			});
			verificado = false;
		}
		if (!fechaPago.value) {
			$q.notify({
				type: "negative",
				message: "La fecha está vacía",
				position: "bottom-right",
			});
			verificado = false;
		}
		if (!valorPago.value) {
			$q.notify({
				type: "negative",
				message: "El valor del pago está vacío",
				position: "bottom-right",
			});
			verificado = false;
		}
	}

	return verificado;
}

// Funcion que se encarga de mostrar el formulario y configurar datos extras para el
// boolean: para saber si se muestra o no el formulario, extra: contiene los datos de la persona que se editara, boton: contiene un dato booleano para saber si aparece el boton de registar o actualizar
function editarVistaFondo(boolean, extra, boton) {
	datos.value = extra;
	if (boton == false && extra != null) {
		const plan = codigoValor.value.find(
			(element) => element.valor === datos.value.idPlan
		);
		const formatoISO = datos.value.fecha;
		const formatoDate = formatoISO.substring(0, 10);

		clientePago.value = datos.value._idCliente;
		planPago.value = plan;
		fechaPago.value = formatoDate;
		valorPago.value = datos.value.valorPago;
	} else {
		clientePago.value = "";
		planPago.value = "";
		fechaPago.value = "";
		valorPago.value = "";
	}

	mostrarBotonEnviar.value = boton;
	mostrarFormularioPago.value = boolean;
}

onMounted(() => {
	listarDatos();
});
</script>

<template>
	<div>
		<div class="q-pa-md">
			<div>
				<q-btn
					v-if="!loading"
					@click="editarVistaFondo(true, null, true)">
					agregar
				</q-btn>
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
					{ label: 'Por fecha', value: 'fecha' },
					{ label: 'Por plan', value: 'plan' },
				]" />

			<div class="row">
				<q-select
					v-if="estadoBuscar == 'plan'"
					standout="bg-green text-white"
					:options="organizarPlanes()"
					option-value="valor"
					option-label="label"
					label="Plan"
					v-model="planAbuscar"
					style="width: 200px" />
				<q-input
					v-if="estadoBuscar == 'fecha'"
					standout="bg-green text-white"
					type="date"
					label="Fecha de Inicio"
					v-model="fecha1Abuscar"
					style="width: 200px" />
				<q-input
					v-if="estadoBuscar == 'fecha'"
					standout="bg-green text-white"
					type="date"
					label="Fecha Final"
					v-model="fecha2Abuscar"
					style="width: 200px" />
				<q-btn v-if="botonBuscar" @click="tipoBoton"> 🔎 </q-btn>
			</div>
			<q-table
				v-if="!loading"
				flat
				bordered
				title="Lista de Pagos"
				:rows="rows"
				:columns="columns"
				row-key="id">
				<template v-slot:body-cell-opciones="props">
					<q-td :props="props">
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
				<template v-slot:body-cell-_idCliente="props">
					<q-td :props="props">
						<p>{{ buscarNombre(props.row._idCliente) }}</p>
					</q-td>
				</template>
				<template v-slot:body-cell-_idPlan="props">
					<q-td :props="props">
						<p>{{ buscarPlan(props.row._idPlan) }}</p>
					</q-td>
				</template>
				<template v-slot:body-cell-fecha="props">
					<q-td :props="props">
						<p>{{ fechaBonita(props.row.fecha) }}</p>
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
				<template v-slot:body-cell-valor="props">
                    <q-td :props="props">
                        <p>$ {{ formatoNumerico(props.row.valor) }}</p>
                    </q-td>
                </template>
			</q-table>
			<q-inner-loading
				:showing="loading"
				label="Please wait..."
				label-class="text-teal"
				label-style="font-size: 1.1em" />
		</div>
		<div id="formularioPago" v-if="mostrarFormularioPago">
			<q-form
				@submit="mostrarBotonEnviar ? registrar() : editar()"
				@reset="resetear"
				class="q-gutter-md">
				<q-select
					standout="bg-green text-white"
					v-model="clientePago"
					:options="organizarClientes()"
					label="Clientes"
					color="black" />
				<q-select
					standout="bg-green text-white"
					v-model="planPago"
					:options="organizarPlanes()"
					option-value="valor"
					option-label="label"
					label="Plan" />
				<q-input
					standout="bg-green text-white"
					v-model="fechaPago"
					type="date"
					label="Fecha"
					color="black" />
				<q-input
					standout="bg-green text-white"
					v-model="valorPago"
					label="Valor"
					color="black" />
				<div>
					<q-btn
						v-if="mostrarBotonEnviar"
						label="Enviar"
						type="submit"
						color="primary" />
					<q-btn
						v-else
						label="Actualizar"
						type="submit"
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
				@click="editarVistaFondo(false, null, false)"></button>
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

#formularioPago {
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
