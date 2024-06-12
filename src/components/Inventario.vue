<script setup>
import { ref, onMounted } from "vue";
import { useStoreInventario } from "../stores/inventario.js";
import { useQuasar } from "quasar";


const $q = useQuasar();

const useInventario = useStoreInventario();

let rows = ref([]);
let columns = ref([
	{
		name: "código",
		sortable: true,
		label: "Código",
		field: "codigo",
		align: "center",
	},
	{
		name: "descripcion",
		label: "Descripción",
		field: "descripcion",
		align: "center",
	},
	{
		name: "valor",
		sortable: true,
		label: "Valor",
		field: "valor",
		align: "center",
	},
	{
		name: "cantidad",
		sortable: true,
		label: "Cantidad",
		field: "cantidad",
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

// Variables que contienen los datos ingresados en el formulario
let codigoProducto = ref("");
let descripcionProducto = ref("");
let valorProducto = ref("");
let cantidadProducto = ref("");

const datos = ref("");

// Variables para administrar lo que se ve en la pantalla
const mostrarFormularioInventario = ref(false);
const mostrarBotonEnviar = ref(true);
const loading = ref(true); // Agregar estado de carga

async function listarDatos() {
	await Promise.all([listarInventario()]);
	loading.value = false; // Datos cargados
}

async function listarInventario() {
	try {
		const res = await useInventario.getInventario();
		rows.value = res.data.inventarios;
	} catch (error) {
		console.log("Error al listar el inventario:", error);
	}
}

// Funcion que se encarga de enviar los datos del registro
async function registrar() {
	if (await validarDatos()) {
		try {
			const info = {
				codigo: codigoProducto.value,
				descripcion: descripcionProducto.value,
				valorP: valorProducto.value,
				cantidad: cantidadProducto.value,
			};
			const res = await useInventario.postInventario(info);
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
				listarInventario();
			}
		} catch (error) {
			console.error("Error al registrar el inventario:", error);
		}
	}
}

async function editar() {
	if (await validarDatos()) {
		try {
			const info = {
				codigo: codigoProducto.value,
				descripcion: descripcionProducto.value,
				valorP: valorProducto.value,
				cantidad: cantidadProducto.value,
			};
			const res = await useInventario.putInventarios(
				datos.value._id,
				info
			);
			if (res.status !== 200) {
				$q.notify({
					type: "negative",
					message:
						"Parece que hubo un error al editar el inventario ",
					position: "bottom-right",
				});
			} else {
				$q.notify({
					type: "positive",
					message: "El inventario se ha actualizado correctamente",
					position: "bottom-right",
				});
				listarInventario();
			}
		} catch (error) {
			console.error("Error al actualizar el inventario:", error);
		}
	}
}

function resetear() {
	codigoProducto.value = "";
	descripcionProducto.value = "";
	valorProducto.value = "";
	cantidadProducto.value = "";
}

async function validarDatos() {
	let verificado = true;

	if (
		!codigoProducto.value &&
		!descripcionProducto.value &&
		!valorProducto.value &&
		!cantidadProducto.value
	) {
		$q.notify({
			type: "negative",
			message: "Llenar todos los campos",
			position: "bottom-right",
		});
		verificado = false;
	} else {
		if (!codigoProducto.value) {
			$q.notify({
				type: "negative",
				message: "El codigo no puede estar vacio",
				position: "bottom-right",
			});
			verificado = false;
		}
		if (!descripcionProducto) {
			$q.notify({
				type: "negative",
				message: "La descripcion no puede estar vacia",
				position: "bottom-right",
			});
			verificado = false;
		}
		if (!valorProducto) {
			$q.notify({
				type: "negative",
				message: "El valor no puede estar vacia",
				position: "bottom-right",
			});
			verificado = false;
		}
		if (!cantidadProducto) {
			$q.notify({
				type: "negative",
				message: "La cantidad no puede estar vacia",
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
		codigoProducto.value = datos.value.codigo;
		descripcionProducto.value = datos.value.descripcion;
		valorProducto.value = datos.value.valor;
		cantidadProducto.value = datos.value.cantidad;
	} else {
		codigoProducto.value = "";
		descripcionProducto.value = "";
		valorProducto.value = "";
		cantidadProducto.value = "";
	}

	mostrarBotonEnviar.value = boton;
	mostrarFormularioInventario.value = boolean;
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
				title="Lista de Inventario"
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
		<div
			id="formularioInventario"
			v-if="mostrarFormularioInventario == true">
			<q-form
				@submit="mostrarBotonEnviar ? registrar() : editar()"
				@reset="resetear()"
				class="q-gutter-md">
				<q-input
					standout="bg-green text-white"
					v-model="codigoProducto"
					label="Código" />
				<q-input
					standout="bg-green text-white"
					v-model="descripcionProducto"
					label="Descripción"
					color="black" />
				<q-input
					standout="bg-green text-white"
					v-model="valorProducto"
					label="Valor"
					color="black" />
				<q-input
					standout="bg-green text-white"
					v-model="cantidadProducto"
					label="Cantidad"
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

#formularioInventario {
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
