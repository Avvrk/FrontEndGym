<script setup>
import { ref, onMounted } from "vue";
import { useStorePlanes } from "../stores/planes.js";
import { useQuasar } from "quasar";

const $q = useQuasar();

// Variables que contienen la store
const usePlanes = useStorePlanes();

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
		name: "dias",
		sortable: true,
		label: "Días",
		field: "dias",
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
let codigoPlanes = ref("");
let descripcionPlanes = ref("");
let valorPlanes = ref("");
let diasPlanes = ref("");

// Variable que contiene los datos de la sede a editar
const datos = ref("");

// Variables para administrar lo que se ve en la pantalla
const mostrarFormularioPlan = ref(false);
const mostrarBotonEnviar = ref(true);
const loading = ref(true); // Agregar estado de carga

async function listarDatos() {
	await Promise.all([listarPlanes()]);
	loading.value = false; // Datos cargados
}

// Funcion que se encarga de traer todos los planes
async function listarPlanes() {
	try {
		const res = await usePlanes.getPlanes();
		rows.value = res.data.planes;
	} catch (error) {
		console.error("Error al listar planes:", error);
	}
}

// Funcion que se encarga de cambiar el estado de un plan
async function editarEstado(elemento) {
	try {
		if (elemento.estado == 1) {
			const res = await usePlanes.putPlanesInactivar(elemento._id);
		} else if (elemento.estado == 0) {
			const res = await usePlanes.putPlanesActivar(elemento._id);
		}
		listarPlanes();
	} catch (error) {
		console.error("Error al editar estado del plan:", error);
	}
}

// Funcion que se encarga de enviar los datos del registro
async function registrar() {
	if (await validarDatos()) {
		try {
			const info = {
				codigo: codigoPlanes.value,
				descripcion: descripcionPlanes.value,
				valor: valorPlanes.value,
				dias: diasPlanes.value,
			};
			const res = await usePlanes.log(info);
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
				listarPlanes();
			}
		} catch (error) {
			console.error("Error al registrar usuario:", error);
		}
	}
} // falta terminar

async function editar() {
	if (await validarDatos()) {
		try {
			const info = {
				codigo: codigoPlanes.value,
				descripcion: descripcionPlanes.value,
				valor: valorPlanes.value,
				dias: diasPlanes.value,
			};
			console.log(datos.value._id);
			const res = await usePlanes.putPlanes(datos.value._id, info);
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
				listarPlanes();
			}
		} catch (error) {
			console.error("Error al registrar usuario:", error);
		}
	}
}

// Funcion que se encarga de resetear los datos en el formulario
function resetear() {
	codigoPlanes.value = "";
	descripcionPlanes.value = "";
	valorPlanes.value = "";
	diasPlanes.value = "";
}

// Función que se encarga de validar los datos que se registrarán o editaran
async function validarDatos() {
	let verificado = true;

	if (
		!codigoPlanes.value ||
		!descripcionPlanes.value ||
		!valorPlanes.value ||
		!diasPlanes.value
	) {
		$q.notify({
			type: "negative",
			message: "Llenar todos los campos",
			position: "bottom-right",
		});
		verificado = false;
	} else {
		if (!codigoPlanes.value) {
			$q.notify({
				type: "negative",
				message: "El codigo esta vacio",
				position: "bottom-right",
			});
			verificado = false;
		}
		if (!descripcionPlanes.value) {
			$q.notify({
				type: "negative",
				message: "La descripcion esta vacia",
				position: "bottom-right",
			});
			verificado = false;
		}
		if (!valorPlanes.value) {
			$q.notify({
				type: "negative",
				message: "El valor esta vacio",
				position: "bottom-right",
			});
			verificado = false;
		} else if (isNaN(valorPlanes) || valorPlanes.value.length < 0) {
			$q.notify({
				type: "negative",
				message: "El valor debe ser un numero valido",
				position: "bottom-right",
			});
			verificado = false;
		}
		if (!diasPlanes.value) {
			$q.notify({
				type: "negative",
				message: "El dia esta vacio",
				position: "bottom-right",
			});
			verificado = false;
		} else if (valorPlanes.value.length < 0) {
			$q.notify({
				type: "negative",
				message: "El dia debe ser un numero valido",
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
		codigoPlanes.value = datos.value.codigo;
		descripcionPlanes.value = datos.value.descripcion;
		valorPlanes.value = datos.value.valor;
		diasPlanes.value = datos.value.dias;
	} else {
		codigoPlanes.value = "";
		descripcionPlanes.value = "";
		valorPlanes.value = "";
		diasPlanes.value = "";
	}
	
	mostrarBotonEnviar.value = boton;
	mostrarFormularioPlan.value = boolean;
}

onMounted(() => {
	listarDatos();
});
</script>

<template>
	<div>
		<div class="q-pa-md">
			<div>
				<q-btn v-if="!loading" @click="editarVistaFondo(true, null, true)"> agregar </q-btn>
			</div>
			<q-table v-if="!loading"
				flat 
				bordered
				title="Lista de Planes"
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

		<div id="formularioPlan" v-if="mostrarFormularioPlan == true">
			<q-form
				@submit="mostrarBotonEnviar ? registrar() : editar()"
				@reset="resetear()"
				class="q-gutter-md">
				<q-input
					standout="bg-green text-white"
					v-model="codigoPlanes"
					label="Código" />
				<q-input
					standout="bg-green text-white"
					v-model="descripcionPlanes"
					label="Descripción"
					color="black" />
				<q-input
					standout="bg-green text-white"
					v-model="valorPlanes"
					label="Valor"
					color="black" />
				<q-input
					standout="bg-green text-white"
					v-model="diasPlanes"
					label="Días"
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
			<button id="botonF" @click="editarVistaFondo(false, null, false)"></button>
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

#formularioPlan {
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


<!-- <script setup>
import { ref, onMounted } from "vue";
import { useStorePlanes } from "../stores/planes.js";
</script>

<template>

<div>

    <h2>Estás en Planes</h2>

    <div id="q-app" style="min-height: 100vh;">
    <div class="q-pa-md row items-start q-gutter-md">

    <q-card class="my-card">
      <q-img src="../img/basico.jpg">
        <div class="absolute-bottom text-h6">
          Plan Básico
        </div>
      </q-img>

      <q-card-section>
        <p>Este es el plan nfgdmg cuesta $000000 y tiene tantos días.</p>
      </q-card-section>
    </q-card>


    <q-card class="my-card">
      <q-img src="../img/intermedio.jpg">
        <div class="absolute-bottom text-h6">
          Plan Intermedio
        </div>
      </q-img>

      <q-card-section>
        <p>Este es el plan nfgdmg cuesta $000000 y tiene tantos días.</p>
      </q-card-section>
    </q-card>


    <q-card class="my-card">
      <q-img src="../img/avanzado.jpg">
        <div class="absolute-bottom text-h6">
          Plan Avanzado
        </div>
      </q-img>

      <q-card-section>
        <p>Este es el plan nfgdmg cuesta $000000 y tiene tantos días.</p>
      </q-card-section>
    </q-card>


    </div>
    </div>

</div>



</template>



<style scoped>
.my-card {
  width: 100%;
  max-width: 450px;
  border-radius: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 20px;
}

.my-card:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.q-img {
  height: 150px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
}

.absolute-bottom {
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
}

.q-card-section {
  padding: 20px;
}

.q-card-section p {
  color: #333;
  font-size: 16px;
  margin-bottom: 20px;
}

.q-card-section p:last-child {
  margin-bottom: 0;
}

.q-pa-md {
  padding: 40px;
}

.row {
  flex-wrap: wrap;
}

.q-gutter-md {
  margin: -20px;
}

.q-gutter-md > .q-card {
  margin: 20px;
}

@media (max-width: 768px) {
  .my-card {
    max-width: 300px;
  }
}
</style> -->
