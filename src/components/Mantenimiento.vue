<script setup>
import { ref, onMounted, computed } from "vue";
import { useStoreMantenimiento } from "../stores/mantenimiento.js";
import { useStoreMaquinas } from "../stores/maquinas.js";

const useMantenimiento = useStoreMantenimiento();
const useMaquina = useStoreMaquinas();

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
		name: "descripcion",
		label: "Descripción",
		field: "descripcion",
		align: "center",
	},
	{
		name: "responsable",
		sortable: true,
		label: "Responsable",
		field: "responsable",
		align: "center",
	},
	{
		name: "precio",
		sortable: true,
		label: "Precio",
		field: "precio",
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

const maquinasTodo = ref([]);

const codigoSede = ref([]);

// Variables que contienen los datos ingresados en el formulario
let idMaquinaMantenimiento = ref("");
let fechaMantenimiento = ref("");
let descripcionMantenimiento = ref("");
let responsableMantenimiento = ref("");
let precioMantenimiento = ref("");

// Variables para administrar lo que se ve en la pantalla
const mostrarFormularioMantenimiento = ref(false);
const mostrarBotonEnviar = ref(true);

const organizarMaquinas = computed(() => {
	codigoSede.value = maquinasTodo.value.map((element) => ({
		label: `${element.codigo} / ${element.sede}`,
		valor: `${element._id}`,
		nombre: `${element.codigo}`,
	}));
	return codigoSede.value;
});

const buscarMaquina = (id) => {
	const maquina = maquinasTodo.find((m) => m._id == id);
	return maquina;
};

async function listarMantenimientos() {
	try {
		const res = await useMantenimiento.getMantenimientos();
		console.log(res.data);
		rows.value = res.data.mantenimientos;
	} catch (error) {
		console.log("Error al listar mantenimientos:", error);
	}
}

async function listarMaquinas() {
	try {
		const res = await useMaquina.getMaquinas();
		console.log(res.data);
		maquinasTodo.value = res.data.maquinas;
	} catch (error) {
		console.log("Error al listar maquinas:", error);
	}
}

// Funcion que se encarga de cambiar el estado de una sede
async function editarEstado(elemento) {
	try {
		if (elemento.estado == "1") {
			const res = await useMantenimiento.putMantenimientosInactivar(
				elemento.id
			);
		} else if (elemento.estado == "0") {
			const res = await useMantenimiento.putMantenimientosActivar(
				elemento.id
			);
		}
		listarMantenimientos();
	} catch (error) {
		console.log("Error al editar el estado del mantenimiento:", error);
	}
}

// Funcion que se encarga de enviar los datos del registro
async function registrar() {
	if (await validarDatos()) {
		try {
			const info = {
				idMaquinaantenimiento: idMaquinaM.value,
				fechaMantenimiento: fechaM.value,
				descripcionMantenimiento: descripcionM.value,
				responsableMantenimiento: responsableM.value,
				precioMantenimiento: precioM.value,
			};
			const res = await useMantenimiento.postMantenimientos(info);
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
			console.error("Error al registrar el mantenimiento:", error);
		}
	}
}

async function editar() {
	if (await validarDatos()) {
		try {
			const info = {
				idMaquinaantenimiento: idMaquinaM.value,
				fechaMantenimiento: fechaM.value,
				descripcionMantenimiento: descripcionM.value,
				responsableMantenimiento: responsableM.value,
				precioMantenimiento: precioM.value,
			};
			const res = await useMantenimiento.putMantenimientos(
				datos.value._id,
				info
			);
			if (res.status !== 200) {
				$q.notify({
					type: "negative",
					message: "Parece que hubo un error al editar",
					position: "bottom-right",
				});
			} else {
				$q.notify({
					type: "positive",
					message: "El mantenimiento se ha actualizado correctamente",
					position: "bottom-right",
				});
				listarUsuarios();
			}
		} catch (error) {
			console.error("Error al editar el mantenimiento:", error);
		}
	}
}

function resetear() {
	idMaquinaMantenimiento.value = "";
	fechaMantenimiento.value = "";
	descripcionMantenimiento.value = "";
	responsableMantenimiento.value = "";
	precioMantenimiento.value = "";
}

async function validarDatos() {
	let verificado = true;

	if (
		idMaquinaM.value == "" ||
		fechaM.value == "" ||
		descripcionM.value == "" ||
		responsableM.value == "" ||
		precioM.value == ""
	) {
		$q.notify({
			type: "negative",
			message: "Llenar todos los campos",
			position: "bottom-right",
		});
		verificado = false;
	} else {
		if (idMaquinaMantenimiento.value == "") {
		}
	}
	return verificado;
}

function editarVistaFondo(boolean) {
	mostrarFormularioMantenimiento.value = boolean;
}

onMounted(() => {
	listarMantenimientos();
	listarMaquinas();
});
</script>

<template>
	<div>
		<div class="q-pa-md">
			<div>
				<q-btn @click="editarVistaFondo(true, null, true)">
					agregar
				</q-btn>
			</div>
			<q-table
				flat
				bordered
				title="Lista de Mantenimientos"
				:rows="rows"
				:columns="columns"
				row-key="id">
				<template v-slot:body-cell-opciones="props">
					<q-td :props="props">
						<q-btn @click="editarVistaFondo(true, props.row, true)">
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
		</div>
		<div
			id="formularioMantenimiento"
			v-if="mostrarFormularioMantenimiento == true">
			<q-form
			@submit="mostrarBotonEnviar ? registrar() : editar()"
				@reset="resetear()"
				class="q-gutter-md">
				<q-select
					standout="bg-green text-white"
					v-model="idMaquinaMantenimiento"
					:options="organizarMaquinas"
					option-value="valor"
					option-label="label"
					label="Maquina"
					color="black" />
				<q-input
					standout="bg-green text-white"
					v-model="fechaMantenimiento"
					type="date"
					label="Fecha Mantenimiento"
					color="black" />
				<q-input
					standout="bg-green text-white"
					v-model="descripcionMantenimiento"
					label="Descripción"
					color="black" />
				<q-input
					standout="bg-green text-white"
					v-model="responsableMantenimiento"
					label="Responsable"
					color="black" />
				<q-input
					standout="bg-green text-white"
					v-model="precioMantenimiento"
					label="Precio"
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

#formularioMantenimiento {
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
