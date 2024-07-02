<script setup>
import { ref, onMounted, watch } from "vue";
import { useStoreMantenimiento } from "../stores/mantenimiento.js";
import { useStoreMaquinas } from "../stores/maquinas.js";
import { useQuasar } from "quasar";
import { format } from "date-fns";

const $q = useQuasar();

const useMantenimiento = useStoreMantenimiento();
const useMaquina = useStoreMaquinas();

let rows = ref([]);
let columns = ref([
	{
		name: "idMaquina",
		sortable: true,
		label: "Maquina",
		field: "idMaquina",
		aling: "center",
	},
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

const datos = ref("");

// Variables para administrar lo que se ve en la pantalla
const mostrarFormularioMantenimiento = ref(false);
const mostrarBotonEnviar = ref(true);
const loading = ref(true); // Agregar estado de carga

const estadoBuscar = ref("ninguno");

const opcionBusqueda = ref("todos");
const botonBuscar = ref(false);

const fecha1Abuscar = ref("");
const fecha2Abuscar = ref("");

const organizarMaquinas = () => {
	codigoSede.value = maquinasTodo.value.map((element) => ({
		label: `${element.codigo} / ${element.sede}`,
		valor: `${element._id}`,
		nombre: `${element.codigo}`,
	}));
	return codigoSede.value;
};

const fechaC = () => {
	estadoBuscar.value = "fecha";
	botonBuscar.value = true;
};

const estadoTabla = async () => {
	switch (opcionBusqueda.value) {
		case "activas":
			await listarMantenimientosActivos();
			break;
		case "inactivos":
			await listarMantenimientosInactivos();
			break;
		case "fecha":
			fechaC();
			break;
		default:
			await listarMantenimientos();
			break;
	}
};

const buscarMaquina = (id) => {
	const maquina = maquinasTodo.value.find((m) => m._id == id);
	console.log(maquina, id, maquinasTodo.value);
	return maquina.codigo;
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
	await Promise.all([listarMantenimientos(), listarMaquinas()]);
	loading.value = false; // Datos cargados
}

async function listarMantenimientos() {
	try {
		estadoBuscar.value = "ninguno";
        botonBuscar.value = false;
		const res = await useMantenimiento.getMantenimientos();
		rows.value = res.data.mantenimientos;
	} catch (error) {
		console.error("Error al listar mantenimientos:", error);
	}
}

async function listarMaquinas() {
	try {
		const res = await useMaquina.getMaquinas();
		maquinasTodo.value = res.data.maquinas;
		organizarMaquinas();
	} catch (error) {
		console.error("Error al listar maquinas:", error);
	}
}

async function listarMantenimientosFecha() {
	try {
		console.log(fecha1Abuscar.value, fecha2Abuscar.value);
		const res = await useMantenimiento.getMantenimientosFecha(fecha1Abuscar.value, fecha2Abuscar.value);
		rows.value = res.data.mantenimientos;
	} catch (error) {
		console.error("Error al listar mantenimientos entre fechas:", error);
	}
}

async function listarMantenimientosActivos() {
	try {
		estadoBuscar.value = "ninguno";
		botonBuscar.value = false;
		const res = await useMantenimiento.getMantenimientosActivos();
		rows.value = res.data.mantenimientos;
	} catch (error) {
		console.error("Error al listar maquinas activas:", error);
	}
}

async function listarMantenimientosInactivos() {
	try {
		estadoBuscar.value = "ninguno";
		botonBuscar.value = false;
		const res = await useMantenimiento.getMantenimientosInactivos();
		rows.value = res.data.mantenimientos;
	} catch (error) {
		console.error("Error al listar maquinas activas:", error);
	}
}

async function editarEstado(elemento) {
	try {
		if (elemento.estado === 1) {
			const res = await useMantenimiento.putMantenimientosInactivar(elemento._id);
		} else if (elemento.estado === 0) {
			const res = await useMantenimiento.putMantenimientosActivar(elemento._id);
		}
		listarMantenimientos();
	} catch (error) {
		console.error("Error al editar el estado del cliente:", error);
	}
}

// Funcion que se encarga de enviar los datos del registro
async function registrar() {
	if (await validarDatos()) {
		try {
			const info = {
				idMaquina: idMaquinaMantenimiento.value,
				fecha: fechaMantenimiento.value,
				descripcion: descripcionMantenimiento.value,
				responsable: responsableMantenimiento.value,
				precio: precioMantenimiento.value,
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
				listarMantenimientos();
				mostrarFormularioMantenimiento.value = false;
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
				idMaquina: idMaquinaMantenimiento.value,
				fecha: fechaMantenimiento.value,
				descripcion: descripcionMantenimiento.value,
				responsable: responsableMantenimiento.value,
				precio: precioMantenimiento.value,
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
				listarMantenimientos();
				mostrarFormularioMantenimiento.value = false;
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
		!idMaquinaMantenimiento.value &&
		!fechaMantenimiento.value &&
		!descripcionMantenimiento.value.trim() &&
		!responsableMantenimiento.value.trim() &&
		!precioMantenimiento.value.trim()
	) {
		$q.notify({
			type: "negative",
			message: "Llenar todos los campos",
			position: "bottom-right",
		});
		verificado = false;
	} else {
		if (!idMaquinaMantenimiento.value) {
			$q.notify({
				type: "negative",
				message: "La maquina no puede estar vacia",
				position: "bottom-right",
			});
			verificado = false;
		}
		if (!fechaMantenimiento.value) {
			$q.notify({
				type: "negative",
				message: "La fecha del mantenimiento no puede estar vacio",
				position: "bottom-right",
			});
			verificado = false;
		}
		if (!descripcionMantenimiento.value.trim()) {
			$q.notify({
				type: "negative",
				message: "La descripcion no puede estar vacia",
				position: "bottom-right",
			});
			verificado = false;
		}
		if (!responsableMantenimiento.value.trim()) {
			$q.notify({
				type: "negative",
				message: "El responsable no puede estar vacio",
				position: "bottom-right",
			});
			verificado = false;
		}
		if (!precioMantenimiento.value.trim()) {
			$q.notify({
				type: "negative",
				message: "El precio no puede estar vacio",
				position: "bottom-right",
			});
			verificado = false;
		} else if (isNaN(precioMantenimiento.value) || precioMantenimiento.value < 0) {
			$q.notify({
				type: "negative",
				message: "Ingrese un precio valido",
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
		const formatoISO = datos.value.fecha;
		const formatoDate = formatoISO.substring(0, 10);

		const maquina = codigoSede.value.find(
			(element) => element.valor === datos.value.idMaquina
		);
		idMaquinaMantenimiento.value = maquina;
		fechaMantenimiento.value = formatoDate;
		descripcionMantenimiento.value = datos.value.descripcion;
		responsableMantenimiento.value = datos.value.responsable;
		precioMantenimiento.value = datos.value.precio;
	} else {
		idMaquinaMantenimiento.value = "";
		fechaMantenimiento.value = "";
		descripcionMantenimiento.value = "";
		responsableMantenimiento.value = "";
		precioMantenimiento.value = "";
	}

	mostrarBotonEnviar.value = boton;
	mostrarFormularioMantenimiento.value = boolean;
}

watch(opcionBusqueda, estadoTabla);

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
			<div v-if="!loading" class="text-h2 text-center">
                Mantenimientos
            </div>
            <hr v-if="!loading" class="bg-primary no-border" style="height: 4px;">
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
				]" />
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
			<q-btn v-if="botonBuscar" @click="listarMantenimientosFecha()"> 🔎 </q-btn>
			<q-table
				v-if="!loading"
				flat
				bordered
				title="Lista de Mantenimientos"
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
				<template v-slot:body-cell-fecha="props">
					<q-td :props="props">
					   <p>{{ fechaBonita(props.row.fecha) }}</p>
					</q-td>
			   </template>
				<template v-slot:body-cell-idMaquina="props">
                     <q-td :props="props">
                        <p>{{ buscarMaquina(props.row.idMaquina) }}</p>
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
				<template v-slot:body-cell-precio="props">
                    <q-td :props="props">
                        <p>$ {{ formatoNumerico(props.row.precio) }}</p>
                    </q-td>
                </template>
			</q-table>
			<q-inner-loading
				:showing="loading"
				label="Please wait..."
				label-class="text-teal"
				label-style="font-size: 1.1em" />
		</div>
		<div
			id="formularioMantenimiento"
			v-if="mostrarFormularioMantenimiento == true">
			<q-form
				@submit="mostrarBotonEnviar ? registrar() : editar()"
				@reset="editarVistaFondo(false, null, true)"
				class="q-gutter-md">
				<q-select
					standout="bg-green text-white"
					v-model="idMaquinaMantenimiento"
					:options="organizarMaquinas()"
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
