<script setup>
import { ref, onMounted } from "vue";
import { useStoreVenta } from "../stores/ventas.js";
import { useStoreInventario } from "../stores/inventario.js";
import { useQuasar } from "quasar";


const $q = useQuasar();

const useVentas = useStoreVenta();
const useInventario = useStoreInventario();

let rows = ref([]);
let columns = ref([
	{
		name: "idInventario",
		sortable: true,
		label: "Código Producto",
		field: "idInventario",
		align: "center",
	},
	{
		name: "valorUnitario",
		sortable: true,
		label: "Valor Unitario",
		field: "valorUnitario",
		align: "center",
	},
	{
		name: "fecha",
		sortable: true,
		label: "Fecha",
		field: "fecha",
		align: "center",
	},
	{
		name: "valorTotal",
		sortable: true,
		label: "Valor Total",
		field: "valorTotal",
		align: "center",
	},
]);

// Variables que contienen los datos ingresados en el formulario
let codigoVentas = ref("");
let valorUnitarioVentas = ref("");
let fechaVentas = ref("");
let valorTotalVentas = ref("");

const inventarioTodo = ref([]);

const codigoValor = ref([]);

// Variables para administrar lo que se ve en la pantalla
const mostrarFormularioVenta = ref(false);
const mostrarBotonEnviar = ref(true);
const loading = ref(true); // Agregar estado de carga

const orgranizarInvetario = () => {
	codigoValor.value = inventarioTodo.value.map((element) => ({
		label: `${element.codigo} / ${element.valor}`,
		valor: `${element._id}`,
	}));
};

// const buscarInvetario = (id) => {
// 	console.log(inventarioTodo.value, id);
// 	const codigoI = inventarioTodo.value.find((element) => element._id == id);
// 	console.log(codigoI);
// 	return codigoI.codigo;
// };

async function listarDatos() {
	await Promise.all([listarVentas(), listarInventario()]);
	loading.value = false; // Datos cargados
}

async function listarVentas() {
	try {
		const res = await useVentas.getVentas();
		rows.value = res.data.ventas;
	} catch (error) {
		console.error("Error al listar ventas:", error);
	}
}

async function listarInventario() {
	try {
		const res = await useInventario.getInventario();
		inventarioTodo.value = res.data.inventarios;
		orgranizarInvetario();
	} catch (error) {
		console.log("Error al listar el inventario:", error);
	}
}

// Funcion que se encarga de enviar los datos del registro
async function registrar() {
	if (await validarDatos()) {
		try {
			const info = {
				codigoProducto: codigo.value,
				valorUnitario: valorUnitario.value,
				fecha: fecha.value,
				valorTotal: valorTotal.value,
			};
			const res = await useVentas.log(info);
			if (res.status !== 200) {
				$q.notify({
					type: "negative",
					message: "Parece que hubo un error en el registro",
					position: "bottom-right",
				});
			} else {
				$q.notify({
					type: "positive",
					message: "El registro se ah realizado correctamente",
					position: "bottom-right",
				});
				listarVentas();
			}
		} catch (error) {
			console.error("Error al registrar ventas:", error);
		}
	}
}

async function editar() {
	if (await validarDatos()) {
		try {
			const info = {
				codigoProducto: codigo.value,
				valorUnitario: valorUnitario.value,
				fecha: fecha.value,
				valorTotal: valorTotal.value,
			};
			const res = await useVentas.log(datos.value._id, info);
			if (res.status !== 200) {
				$q.notify({
					type: "negative",
					message: "Parece que hubo un error al editar el usuario",
					position: "bottom-right",
				});
			} else {
				$q.notify({
					type: "positive",
					message: "El usuario se ha editado correctamente",
					position: "bottom-right",
				});
				listarVentas();
			}
		} catch (error) {
			console.error("Error al editar ventas:", error);
		}
	}
}

function resetear() {
	codigoVentas.value = "";
	valorUnitarioVentas.value = "";
	fechaVentas.value = "";
	valorTotalVentas.value = "";
}

async function validarDatos() {
	let verificado = true;

	if (
		!codigoVentas.value ||
		!valorUnitarioVentas.value ||
		!fechaVentas.value ||
		!valorTotalVentas.value
	) {
		$q.notify({
			type: "negative",
			message: "Llenar todos los campos",
			position: "bottom-right",
		});
		verificado = false;
	} else {
		if (!codigoVentas.value) {
			$q.notify({
				type: "negative",
				message: "El codigo no puede estar vacio",
				position: "bottom-right",
			});
			verificado = false;
		}
		if (!valorUnitarioVentas.value) {
			$q.notify({
				type: "negative",
				message: "El valor unitario no puede estar vacio",
				position: "bottom-right",
			});
			verificado = false;
		}
		if (!fechaVentas.value) {
			$q.notify({
				type: "negative",
				message: "La fecha no puede estar vacia",
				position: "bottom-right",
			});
			verificado = false;
		}
		if (!valorTotalVentas.value) {
			$q.notify({
				type: "negative",
				message: "El valor total no puede estar vacio",
				position: "bottom-right",
			});
			verificado = false;
		}
	}
	return verificado;
}

function editarVistaFondo(boolean, extra, boton) {
	datos.value = extra;
	if (boton == false && extra != null) {
		const inventario = codigoValor.value.find(
			(element) => element.valor === datos.value.idInventario
		);
		const formatoISO = datos.value.fecha;
		const formatoDate = formatoISO.substring(0, 10);

		codigoVentas.value = inventario;
		valorUnitarioVentas.value = datos.value.valorUnitario;
		fechaVentas.value = formatoDate;
		valorTotalVentas.value = datos.value.valorTotal;
	} else {
		codigoVentas.value = "";
		valorUnitarioVentas.value = "";
		fechaVentas.value = "";
		valorTotalVentas.value = "";
	}
	mostrarBotonEnviar.value = boton;
	mostrarFormularioVenta.value = boolean;
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
			<q-table
				v-if="!loading"
				flat
				bordered
				title="Lista de Ventas"
				:rows="rows"
				:columns="columns"
				row-key="id">
				<template v-slot:body-cell-opciones="props">
					<q-td :props="props">
						<q-btn
							@click="editarVistaFondo(true, props.row, false)">
							✏️
						</q-btn>
					</q-td>
				</template>
				<!-- <template v-slot:body-cell-idInventario="props">
					<q-td :props="props">
						<p>{{ buscarInvetario(props.row._id) }}</p>
					</q-td>
				</template> -->
			</q-table>
			<q-inner-loading
				:showing="loading"
				label="Please wait..."
				label-class="text-teal"
				label-style="font-size: 1.1em" />
		</div>
		<div id="formularioVentas" v-if="mostrarFormularioVenta == true">
			<q-form
				@submit="mostrarBotonEnviar ? registrar() : editar()"
				@reset="resetear()"
				class="q-gutter-md">
				<q-input
					standout="bg-green text-white"
					v-model="codigoVentas"
					label="Código" />
				<q-input
					standout="bg-green text-white"
					v-model="valorUnitarioVentas"
					label="Valor Unitario"
					color="black" />
				<q-input
					standout="bg-green text-white"
					v-model="fechaVentas"
					label="Fecha"
					color="black" />
				<q-input
					standout="bg-green text-white"
					v-model="valorTotalVentas"
					label="Valor Total"
					color="black" />
				<div>
					<q-btn label="Enviar" type="submit" color="primary" />
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

#formularioVentas {
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
