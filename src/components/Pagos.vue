<script setup>
import { ref, onMounted } from "vue";
import { useStorePagos } from "../stores/pagos.js";
import { useQuasar } from "quasar";

const $q = useQuasar();

// Variables que contienen la store
const usePago = useStorePagos();

// Variables para el funcionamiento de la tabla
let rows = ref([]);
let columns = ref([
	{
		name: "cliente",
		sortable: true,
		label: "Cliente",
		field: "cliente",
		align: "center",
	},
	{
		name: "plan",
		label: "Plan",
		field: "plan",
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

// Variable que contiene los datos de la sede a editar
const datos = ref("");

// Variables para administrar lo que se ve en la pantalla
const mostrarFormularioPago = ref(false);
const mostrarBotonEnviar = ref(true);
const loading = ref(true); // Agregar estado de carga

const organizarPlanes = () => {
	codigoValor.value = planesTodo.value.map((element) => ({
		label: `${element.codigo} / ${element.valor}`,
		valor: `${element._id}`,
		nombre: `${element.codigo}`,
	}));
	return codigoValor.value;
};

async function listarDatos() {
	await Promise.all([listarPagos(), listarPlanes()]);
	loading.value = false; // Datos cargados
}

// Funcion que se encarga de traer todas las sedes
async function listarPagos() {
	try {
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
				cliente: clientePago.value,
				plan: planPago.value,
				fecha: fechaPago.value,
				valor: valorPago.value,
			};
			const res = await usePago.log(info);
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
				cliente: clientePago.value,
				plan: planPago.value,
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
				listarUsuarios();
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
		const formatoISO = datos.value.fechaPago;
		const formatoDate = formatoISO.substring(0, 10);

		clientePago.value = datos.value.cliente;
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
				<q-btn v-if="!loading" @click="editarVistaFondo(true, null, true)">
					agregar
				</q-btn>
			</div>
			<q-table v-if="!loading"
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
		<div id="formularioPago" v-if="mostrarFormularioPago">
			<q-form
				@submit="mostrarBotonEnviar ? registrar() : editar()"
				@reset="resetear"
				class="q-gutter-md">
				<q-input
					standout="bg-green text-white"
					v-model="clientePago"
					label="Cliente" />
				<q-select 
					standout="bg-green text-white"
					v-model="planPago"
					:options="organizarPlanes()"
					option-value="valor"
					option-label="label"
					label="Plan"/>
				<q-input
					standout="bg-green text-white"
					v-model="fechaPago"
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
