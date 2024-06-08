<script setup>
import { ref, onMounted, computed } from "vue";
import { useStoreIngresos } from "../stores/ingresos.js";
import { useStoreSedes } from "../stores/sedes";
import { useStoreClientes } from "../stores/clientes.js";
import { format } from "date-fns";

const useIngreso = useStoreIngresos();
const useSede = useStoreSedes();
const useCliente = useStoreClientes();

let rows = ref([]);
let columns = ref([
	{
		name: "fecha",
		sortable: true,
		label: "Fecha",
		field: "fecha",
		align: "center",
	},
	{
		name: "sede",
		sortable: true,
		label: "Sede",
		field: "sede",
		align: "center",
	},
	{
		name: "cliente",
		sortable: true,
		label: "Cliente",
		field: "cliente",
		align: "center",
	},
	{
		name: "opciones",
		label: "Opciones",
		field: "opciones",
		align: "center",
	},
]);

const sedesTodo = ref([]);
const clientesTodo = ref([]);

// Variables que contienen los datos ingresados en el formulario
let fechaIngreso = ref("");
let sedeIngreso = ref("");
let clienteIngreso = ref("");

let fsDate;

let hoy = new Date();
hoy.setHours(0, 0, 0, 0);

// Variables que se usan en el formulario
const nombreCodigo = ref(null);
const documentoNombre = ref(null);

const datos = ref("");

// Variables para administrar lo que se ve en la pantalla
const mostrarFormularioIngreso = ref(false);
const mostrarBotonEnviar = ref(true);
const loading = ref(true); // Agregar estado de carga

const organizarSedes = () => {
	nombreCodigo.value = sedesTodo.value.map((element) => ({
		label: `${element.ciudad} / ${element.nombre}`,
		valor: `${element._id}`,
		nombre: `${element.nombre}`,
	}));
	return nombreCodigo.value;
};

const organizarClientes = () => {
	documentoNombre.value = clientesTodo.value.map((element) => ({
		label: `${element.documento} / ${element.nombre}`,
		valor: `${element._id}`,
		nombre: `${element.nombre}`,
	}));
	return documentoNombre.value;
};

const buscarNombre = (id) => {
	const cliente = clientesTodo.value.find((c) => c._id === id);
	return cliente.nombre;
};

const clienteBuscar = (id) => {
	const cliente = documentoNombre.value.find(
		(element) => element.valor === id
	);
	return cliente;
};

const fechaBonita = (info) => {
	const nuevoFormato = format(new Date(info), "dd/MM/yyyy");
	return nuevoFormato;
};

async function listarIngresos() {
	try {
		const res = await useIngreso.getIngresos();
		rows.value = res.data.ingresos;
	} catch (error) {
		console.error("Error al listar los ingresos:", error);
	}
}

async function listarSedes() {
	try {
		const res = await useSede.getSedes();
		sedesTodo.value = res.data.sedes;
	} catch (error) {
		console.error("Error al listar las sedes:", error);
	}
}

async function listarClientes() {
	try {
		const res = await useCliente.getClientes();
		clientesTodo.value = res.data.clientes;
	} catch (error) {
		console.error("Error al listar los clientes:", error);
	}
}

async function listarDatos() {
	await Promise.all([listarIngresos(), listarSedes(), listarClientes()]);
	loading.value = false; // Datos cargados
}

// Función que se encarga de enviar los datos del registro
async function registrar() {
	if (await validarDatos()) {
		try {
			const info = {
				fecha: fechaIngreso.value,
				sede: sedeIngreso.value.nombre,
				cliente: clienteIngreso.value.valor,
			};
			const res = await useIngreso.log(info);
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
			console.error("Error al registrar el ingreso:", error);
		}
	}
}

async function editar() {
	if (await validarDatos()) {
		try {
			const info = {
				fecha: fechaIngreso.value,
				sede: sedeIngreso.value.nombre,
				cliente: clienteIngreso.value.valor,
			};
			const res = await useIngreso.log(datos.value._id, info);
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
			console.error("Error al actualizar el ingreso:", error);
		}
	}
}

function resetear() {
	fechaIngreso.value = "";
	sedeIngreso.value = "";
	clienteIngreso.value = "";
}

async function validarDatos() {
	let verificado = true;
	fsDate = new Date(fechaIngreso.value + "T00:00:00");

	if (
		!fechaIngreso.value &&
		!sedeIngreso.value &&
		!clienteIngreso.value
	) {
		$q.notify({
			type: "negative",
			message: "Llenar todos los campos",
			position: "bottom-right",
		});
		verificado = false;
	} else {
		if (!fechaIngreso.value) {
			$q.notify({
				type: "negative",
				message: "La fecha de ingreso no puede estar vacía",
				position: "bottom-right",
			});
			verificado = false;
		} else if (fsDate < hoy) {
			$q.notify({
				type: "negative",
				message: "Ingrese una fecha válida",
				position: "bottom-right",
			});
			verificado = false;
		}
		if (!sedeIngreso.value) {
			$q.notify({
				type: "negative",
				message: "La sede no puede estar vacía",
				position: "bottom-right",
			});
			verificado = false;
		}
		if (!clienteIngreso.value) {
			$q.notify({
				type: "negative",
				message: "El cliente no puede estar vacío",
				position: "bottom-right",
			});
			verificado = false;
		}
	}
	return verificado;
}

function editarVistaFondo(boolean, extra, boton) {
	datos.value = extra;
	mostrarBotonEnviar.value = boton;
	mostrarFormularioIngreso.value = boolean;
	if (boton === false && extra != null) {
		const formatoISO = datos.value.fecha;
		const formatoDate = formatoISO.substring(0, 10);

		fechaIngreso.value = formatoDate;
		sedeIngreso.value = datos.value.sede;
		clienteIngreso.value = clienteBuscar(datos.value.cliente);
	} else {
		fechaIngreso.value = "";
		sedeIngreso.value = "";
		clienteIngreso.value = "";
	}
	
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
			<q-table
				v-if="!loading"
				flat
				bordered
				title="Lista de Ingresos"
				:rows="rows"
				:columns="columns"
				row-key="id">
				<template v-slot:body-cell-fecha="props">
					<q-td :props="props">
						<p>{{ fechaBonita(props.row.fecha) }}</p>
					</q-td>
				</template>
				<template v-slot:body-cell-cliente="props">
					<q-td :props="props">
						<p>{{ buscarNombre(props.row.cliente) }}</p>
					</q-td>
				</template>
				<template v-slot:body-cell-sede="props">
					<q-td :props="props">
						<p>{{ props.row.sede }}</p>
					</q-td>
				</template>
				<template v-slot:body-cell-opciones="props">
					<q-td :props="props">
						<q-btn
							@click="editarVistaFondo(true, props.row, false)">
							✏️
						</q-btn>
					</q-td>
				</template>
			</q-table>
			<q-inner-loading :showing="loading" label="Please wait..." label-class="text-teal" label-style="font-size: 1.1em"/>
			<!-- Indicador de carga -->
		</div>

		<div id="formularioIngreso" v-if="mostrarFormularioIngreso">
			<q-form
				@submit="mostrarBotonEnviar ? registrar() : editar()"
				@reset="resetear()"
				class="q-gutter-md">
				<q-input
					standout="bg-green text-white"
					v-model="fechaIngreso"
					type="date"
					label="Fecha" />
				<q-select
					standout="bg-green text-white"
					v-model="sedeIngreso"
					:options="organizarSedes"
					label="Sedes"
					color="black" />
				<q-select
					standout="bg-green text-white"
					v-model="clienteIngreso"
					:options="organizarClientes"
					label="Clientes"
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
