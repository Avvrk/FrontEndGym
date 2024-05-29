<script setup>
import { ref, onMounted, computed } from "vue";
import { useStoreMaquinas } from "../stores/maquinas.js";
import { useQuasar } from "quasar";
import { format } from "date-fns";

const $q = useQuasar();

// Variables que contienen la store
const useMaquina = useStoreMaquinas();

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
		name: "sede",
        sortable: true,
		label: "Sede",
		field: "sede",
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

// Variables que contienen los datos ingresados en el formulario
let codigoMaquinas = ref("");
let sedeMaquinas = ref("");
let descripcionMaquinas = ref("");
let fechaIngresoMaquinas = ref("");
let fechaUltMantMaquinas = ref("");

// Variable que contiene los datos de la sede a editar
const datos = ref("");

// Variables para administrar lo que se ve en la pantalla
const mostrarFormularioMaquina = ref(false);
const mostrarBotonEnviar = ref(true);

async function listarMaquinas() {
	try {
		const res = await useMaquina.getMaquinas();
		console.log(res.data);
		rows.value = res.data.maquinas;
	} catch (error) {
		console.error("Error al listar maquinas:", error);
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
	if (validarDatos()) {
		const info = {
			codigo: codigoMaquinas.value,
			sede: sedeMaquinas.value,
			descripcion: descripcionMaquinas.value,
			fechaIngreso: fechaIngresoMaquinas.value,
			fechaUltMan: fechaUltMantMaquinas.value,
		};
		const res = await useMaquina.log(info);
		console.log(res);
	}
} // falta terminar

function resetear() {
	codigoM.value = "";
	sedeM.value = "";
	descripcionM.value = "";
	fechaIngresoM.value = "";
	fechaUltMantM.value = "";
}

async function validarDatos() {
	let verificado = true;

	if (
		codigoMaquinas.value == "" ||
		sedeMaquinas.value == "" ||
		descripcionMaquinas.value == "" ||
		fechaIngresoMaquinas.value == "" ||
		fechaUltMantMaquinas.value == ""
	) {
		$q.notify({
			type: "negative",
			message: "Llenar todos los campos",
			position: "bottom-right",
		});
		verificado = false;
	}
	return verificado;
}

function editarVistaFondo(boolean) {
	mostrarFormularioMaquina.value = boolean;
}

const fechaBonita = (info) => {
    console.log(info);
    const nuevoFormato = format(new Date(info), 'dd/MM/yyyy');
    return nuevoFormato
};

onMounted(() => {
	listarMaquinas();
});
</script>

<template>
	<div>
		<div class="q-pa-md">
			<div>
				<q-btn @click="editarVistaFondo(true)"> agregar </q-btn>
			</div>
			<q-table
				flat
				bordered
				title="Lista de Maquinas"
				:rows="rows"
				:columns="columns"
				row-key="id">
				<template v-slot:body-cell-opciones="props">
					<q-td :props="props">
						<q-btn> ✏️ </q-btn>
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
                <template v-slot:body-cell-fechaIngreso="props">
                    <q-td :props="props">
                        <p>{{ fechaBonita(props.row.fechaIngreso) }}</p>
                    </q-td>
                </template>
                <template v-slot:body-cell-fechaUltMan="props">
                    <q-td :props="props">
                        <p>{{ props.row.fechaUltMant ? fechaBonita(props.row.fechaUltMant) : 'N/A' }}</p>
                    </q-td>
                </template>
			</q-table>
		</div>

		<div id="formularioMaquina" v-if="mostrarFormularioMaquina == true">
			<q-form
				@submit="registrar()"
				@reset="resetear()"
				class="q-gutter-md">
				<q-input
					standout="bg-green text-white"
					v-model="codigoMaquinas"
					label="Código" />
				<q-input
					standout="bg-green text-white"
					v-model="sedeMaquinas"
					label="Sede"
					color="black" />
				<q-input
					standout="bg-green text-white"
					v-model="descripcionMaquinas"
					label="Descripción"
					color="black" />
				<q-input
					standout="bg-green text-white"
					v-model="fechaIngresoMaquinas"
					label="Fecha de Ingreso Máquina"
					color="black" />
				<q-input
					standout="bg-green text-white"
					v-model="fechaUltMantMaquinas"
					type="tel"
					label="Fecha Último Mantenimiento"
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
			<button id="botonF" @click="editarVistaFondo(false)"></button>
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
