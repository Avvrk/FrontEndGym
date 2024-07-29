<script setup>
import { ref, onMounted } from "vue";
import { useStoreSedes } from "../stores/sedes.js";
import { useQuasar } from "quasar";

const $q = useQuasar();

// Variables que contienen la store
const useSede = useStoreSedes();

// Variables para el funcionamiento de la tabla
let rows = ref([]);
let columns = ref([
	{
		name: "nombre",
		sortable: true,
		label: "Nombre",
		field: "nombre",
		align: "center",
	},
	{
		name: "direccion",
		label: "Direccion",
		field: "direccion",
		align: "center",
	},
	{
		name: "codigo",
		label: "Código",
		field: "codigo",
		align: "center",
	},
	{
		name: "horario",
		label: "Horario",
		field: "horario",
		align: "center",
	},
	{
		name: "ciudad",
		label: "Ciudad",
		field: "ciudad",
		align: "center",
	},
	{
		name: "telefono",
		label: "Teléfono",
		field: "telefono",
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
let ciudadSede = ref("");
let codigoSede = ref("");
let direccionSede = ref("");
let estadoSede = ref("");
let horarioSede = ref("");
let nombreSede = ref("");
let telefonoSede = ref("");

// Variable que contiene los datos de la sede a editar
const datos = ref("");

// Variables para administrar lo que se ve en la pantalla
const mostrarFormularioSede = ref(false);
const mostrarBotonEnviar = ref(true);
const loading = ref(true); // Agregar estado de carga

async function listarDatos() {
	await Promise.all([listarSedes()]);
	loading.value = false; // Datos cargados
}

// Funcion que se encarga de traer todas las sedes
async function listarSedes() {
	try {
		const res = await useSede.getSedes();
		rows.value = res.data.sedes;
	} catch (error) {
		console.log("Error al listar sedes:", error);
	}
}

// Funcion que se encarga de cambiar el estado de una sede
async function editarEstado(elemento) {
	try {
		if (elemento.estado === 1) {
			const res = await useSede.putSedeInactivar(elemento._id);
		} else if (elemento.estado === 0) {
			const res = await useSede.putSedesActivar(elemento._id);
		}
		listarSedes();
	} catch (error) {
		console.log("Error al editar estado de la sede:", error);
	}
}

// Funcion que se encarga de enviar los datos del registro
async function registrar() {
	if (await validarDatos()) {
		try {
			const info = {
				ciudad: ciudadSede.value,
				codigo: codigoSede.value,
				direccion: direccionSede.value,
				estado: estadoSede.value,
				horario: horarioSede.value,
				nombre: nombreSede.value,
				telefono: telefonoSede.value,
			};
			const res = await useSede.postSedes(info);
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
				listarSedes();
				mostrarFormularioSede.value = false;
			}
		} catch (error) {
			console.error("Error al registrar usuario:", error);
		}
	}
}

// Funcion que se encarga de enviar los datos para la edicion
async function editar() {
	if (await validarDatos()) {
		try {
			const info = {
				ciudad: ciudadSede.value,
				codigo: codigoSede.value,
				direccion: direccionSede.value,
				estado: estadoSede.value,
				horario: horarioSede.value,
				nombre: nombreSede.value,
				telefono: telefonoSede.value,
			};
			const res = await useSede.putSedes(datos.value._id, info);
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
				listarSedes();
				mostrarFormularioSede.value = false;
			}
		} catch (error) {
			console.error("Error al editar usuario:", error);
		}
	}
}

// Funcion que se encarga de resetear los datos en el formulario
function resetear() {
	ciudadSede.value = "";
	codigoSede.value = "";
	direccionSede.value = "";
	estadoSede.value = "";
	horarioSede.value = "";
	nombreSede.value = "";
	telefonoSede.value = "";
}

// Función que se encarga de validar los datos que se registrarán o editaran
async function validarDatos() {
	let verificado = true;

	if (
		!ciudadSede.value.trim() &&
		!codigoSede.value.trim() &&
		!direccionSede.value.trim() &&
		!horarioSede.value.trim() &&
		!nombreSede.value.trim() &&
		!telefonoSede.value.trim()
	) {
		$q.notify({
			type: "negative",
			message: "Llena todos los campos",
			position: "bottom-right",
		});
		verificado = false;
	} else {
		if (!nombreSede.value) {
			$q.notify({
				type: "negative",
				message: "El nombre está vacío",
				position: "bottom-right",
			});
			verificado = false;
		}
		if (!ciudadSede.value) {
			$q.notify({
				type: "negative",
				message: "La ciudad está vacía",
				position: "bottom-right",
			});
			verificado = false;
		}
		if (!direccionSede.value) {
			$q.notify({
				type: "negative",
				message: "La direccion está vacía",
				position: "bottom-right",
			});
			verificado = false;
		}
		if (!horarioSede.value.trim()) {
			$q.notify({
				type: "negative",
				message: "El horario está vacío",
				position: "bottom-right",
			});
			verificado = false;
		}
		if (!telefonoSede.value.trim()) {
			$q.notify({
				type: "negative",
				message: "El telefono está vacío",
				position: "bottom-right",
			});
			verificado = false;
		} else if (isNaN(Number(telefonoSede.value))) {
			$q.notify({
				type: "negative",
				message: "El telefono debe ser un numero",
				position: "bottom-right",
			});
			verificado = false;
		}
		if (!codigoSede.value.trim()) {
			$q.notify({
				type: "negative",
				message: "El codigo está vacío",
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
		nombreSede.value = datos.value.nombre;
		ciudadSede.value = datos.value.ciudad;
		direccionSede.value = datos.value.direccion;
		horarioSede.value = datos.value.horario;
		telefonoSede.value = String(datos.value.telefono);
		codigoSede.value = String(datos.value.codigo);
	} else {
		ciudadSede.value = "";
		codigoSede.value = "";
		direccionSede.value = "";
		horarioSede.value = "";
		nombreSede.value = "";
		telefonoSede.value = "";
	}	
	
	mostrarBotonEnviar.value = boton;
	mostrarFormularioSede.value = boolean;
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
			<div v-if="!loading" class="text-h2 text-center">
                Sedes
            </div>
            <hr v-if="!loading" class="bg-primary no-border" style="height: 4px;">
			<q-table v-if="!loading"
				flat
				bordered
				title="Lista de Sedes"
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
		<div id="formularioSede" v-if="mostrarFormularioSede">
			<q-form
				@submit="mostrarBotonEnviar ? registrar() : editar()"
				@reset="editarVistaFondo(false, null, true)"
				class="q-gutter-md">
				<q-input
					standout="bg-green text-white"
					v-model="nombreSede"
					label="Nombre" />
				<q-input
					standout="bg-green text-white"
					v-model="ciudadSede"
					label="Ciudad"
					color="black" />
				<q-input
					standout="bg-green text-white"
					v-model="direccionSede"
					label="Dirección"
					color="black" />
				<q-input
					standout="bg-green text-white"
					v-model="horarioSede"
					hide= "(hora inicio) / (hora cierre)"
					label="Horario"
					color="black" />
				<q-input
					standout="bg-green text-white"
					v-model="telefonoSede"
					type="tel"
					label="Teléfono"
					color="black" />
				<q-input
					standout="bg-green text-white"
					v-model="codigoSede"
					label="Código"
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
						label="Cerrar"
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

#formularioSede {
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
