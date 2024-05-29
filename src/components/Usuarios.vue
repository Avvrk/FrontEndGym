<script setup>
import { ref, onMounted, computed } from "vue";
import { useStoreUsuarios } from "../stores/usuarios.js";
import { useStoreSedes } from "../stores/sedes.js";
import { useQuasar } from "quasar";

const $q = useQuasar();

// Variables que contienen la store
const useUsuario = useStoreUsuarios();
const useSede = useStoreSedes();

// Variables para el funcionamiento de la tabla
const rows = ref([]);
const columns = ref([
	{
		name: "nombre",
		sortable: true,
		label: "Nombre Usuario",
		field: "nombre",
		align: "center",
	},
	{
		name: "telefono",
		label: "Telefono",
		field: "telefono",
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
		name: "email",
		sortable: true,
		label: "Correo",
		field: "email",
		align: "center",
	},
	{
		name: "rol",
		sortable: true,
		label: "Rol",
		field: "rol",
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

const sedesTodo = ref([]);

// Variables que se usan en el formulario
const roles = ["administrador", "recepcionista", "instructor"];
const nombreCodigo = ref([]);

// Variables que contienen los datos ingresados en el formulario
const nombreUsuario = ref("");
const correoUsuario = ref("");
const telefonoUsuario = ref("");
const contraseñaUsuario = ref("");
const sedeUsuario = ref("");
const rolUsuario = ref("");

// Variable que contiene los datos del usuario a editar
const datos = ref("");

// Variables para administrar lo que se ve en la pantalla
const mostrarFormularioUsuario = ref(false);
const mostrarBotonEnviar = ref(true);

// Función que se encarga de traer todos los usuarios
async function listarUsuarios() {
	try {
		const res = await useUsuario.getUsuarios();
		rows.value = res.data.usuarios;
	} catch (error) {
		console.error("Error al listar usuarios:", error);
	}
}

// Función que se encarga de traer todas las sedes
async function sedes() {
	try {
		const res = await useSede.getSedes();
		sedesTodo.value = res.data.sedes;
	} catch (error) {
		console.error("Error al listar sedes:", error);
	}
}

// Función que se encarga de cambiar el estado de un usuario
async function editarEstado(elemento) {
	
	try {
		if (elemento.estado === 1) {
			const res = await useUsuario.putUsuariosInactivar(elemento._id);
		} else if (elemento.estado === 0) {
			const res = await useUsuario.putUsuariosActivar(elemento._id);
		}
		listarUsuarios();
	} catch (error) {
		console.error("Error al editar estado del usuario:", error);
	}
}

// Función que se encarga de enviar los datos del registro
async function registrar() {
	if (await validarDatos()) {
		try {
			const info = {
				nombre: nombreUsuario.value,
				email: correoUsuario.value,
				telefono: telefonoUsuario.value,
				password: contraseñaUsuario.value,
				sede: sedeUsuario.value.nombre,
				idSede: sedeUsuario.value.valor,
				rol: rolUsuario.value,
			};
			const res = await useUsuario.log(info);
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
			console.error("Error al registrar usuario:", error);
		}
	}
}

// Funcion que se encarga de enviar los datos para la edicion
async function editar() {
	if (await validarDatos("noIndefinido")) {
		try {
			const info = {
				nombre: nombreUsuario.value,
				email: correoUsuario.value,
				telefono: telefonoUsuario.value,
				password: contraseñaUsuario.value,
				sede: sedeUsuario.value.nombre,
				idSede: sedeUsuario.value.valor,
				rol: rolUsuario.value,
			};
			const res = await useUsuario.putUsuarios(datos.value._id, info);
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
				listarUsuarios();
			}
		} catch (error) {
			console.error("Error al editar usuario:", error);
		}
	}
}

// Funcion que se encarga de resetear los datos en el formulario
function resetear() {
	nombreUsuario.value = "";
	correoUsuario.value = "";
	telefonoUsuario.value = "";
	contraseñaUsuario.value = "";
	sedeUsuario.value = "";
	rolUsuario.value = "";
}

// Función que se encarga de validar los datos que se registrarán o editaran
async function validarDatos(indicador) {
	let verificado = true;
	const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

	if (
		!nombreUsuario.value &&
		!correoUsuario.value &&
		!telefonoUsuario.value &&
		!contraseñaUsuario.value &&
		!rolUsuario.value &&
		!sedeUsuario.value
	) {
		$q.notify({
			type: "negative",
			message: "Llena todos los campos",
			position: "bottom-right",
		});
		verificado = false;
	} else {
		if (!nombreUsuario.value) {
			$q.notify({
				type: "negative",
				message: "El nombre está vacío",
				position: "bottom-right",
			});
			verificado = false;
		}
		if (!correoUsuario.value) {
			$q.notify({
				type: "negative",
				message: "El correo no puede estar vacío",
				position: "bottom-right",
			});
			verificado = false;
		} else if (!regex.test(correoUsuario.value)) {
			$q.notify({
				type: "negative",
				message: "Ingrese un correo válido",
				position: "bottom-right",
			});
			verificado = false;
		}
		if (!telefonoUsuario.value) {
			$q.notify({
				type: "negative",
				message: "El teléfono no puede estar vacío",
				position: "bottom-right",
			});
			verificado = false;
		} else if (telefonoUsuario.value.length < 10) {
			$q.notify({
				type: "negative",
				message: "El teléfono no puede tener menos de 10 caracteres",
				position: "bottom-right",
			});
			verificado = false;
		}
		if (indicador == undefined) {
			if (!contraseñaUsuario.value) {
				$q.notify({
					type: "negative",
					message: "La contraseña no puede estar vacía",
					position: "bottom-right",
				});
				verificado = false;
			}
		}
		if (!rolUsuario.value) {
			$q.notify({
				type: "negative",
				message: "Debe seleccionar un rol",
				position: "bottom-right",
			});
			verificado = false;
		}
		if (!sedeUsuario.value) {
			$q.notify({
				type: "negative",
				message: "Debe seleccionar una sede",
				position: "bottom-right",
			});
			verificado = false;
		} else {
			try {
				const res = await useSede.getSedesId(sedeUsuario.value.valor);
				if (res.status !== 200) {
					$q.notify({
						type: "negative",
						message: `Hubo un error con la sede ${sedeUsuario.value.nombre}`,
						position: "bottom-right",
					});
				}
			} catch (error) {
				console.error("Error al validar sede:", error);
			}
		}
	}

	return verificado;
}

// Función que se encarga de arreglar la información de sedes para mostrarse en la tabla
const organizarSedes = computed(() => {
	nombreCodigo.value = sedesTodo.value.map((element) => ({
		label: `${element.ciudad} / ${element.nombre}`,
		valor: `${element._id}`,
		nombre: `${element.nombre}`,
	}));
	return nombreCodigo.value;
});

// Funcion que se encarga de mostrar el formulario y configurar datos extras para el
// boolean: para saber si se muestra o no el formulario, extra: contiene los datos de la persona que se editara, boton: contiene un dato booleano para saber si aparece el boton de registar o actualizar
function editarVistaFondo(boolean, extra, boton) {
	mostrarFormularioUsuario.value = boolean;
	datos.value = extra;
	mostrarBotonEnviar.value = boton;
	if (boton == false && extra != null) {
		const sede = nombreCodigo.value.find(
			(element) => element.valor === datos.value.idSede
		);
		nombreUsuario.value = datos.value.nombre;
		correoUsuario.value = datos.value.email;
		telefonoUsuario.value = datos.value.telefono;
		sedeUsuario.value = sede;
		rolUsuario.value = datos.value.rol;
	} else {
		nombreUsuario.value = "";
		correoUsuario.value = "";
		telefonoUsuario.value = "";
		contraseñaUsuario.value = "";
		sedeUsuario.value = "";
		rolUsuario.value = "";
	}
}

onMounted(() => {
	listarUsuarios();
	sedes();
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
				title="Lista de usuarios"
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
		</div>
		<div id="formularioUsuario" v-if="mostrarFormularioUsuario">
			<q-form
				@submit="mostrarBotonEnviar ? registrar() : editar()"
				@reset="resetear"
				class="q-gutter-md">
				<q-input
					standout="bg-green text-white"
					v-model="nombreUsuario"
					label="Nombre" />
				<q-input
					standout="bg-green text-white"
					v-model="correoUsuario"
					type="email"
					label="Correo"
					color="black" />
				<q-input
					standout="bg-green text-white"
					v-model="telefonoUsuario"
					type="tel"
					label="Telefono"
					color="black" />
				<q-input
					standout="bg-green text-white"
					v-model="contraseñaUsuario"
					type="password"
					label="Contraseña"
					color="black" />
				<q-select
					standout="bg-green text-white"
					v-model="rolUsuario"
					:options="roles"
					label="Rol"
					color="black" />
				<q-select
					standout="bg-green text-white"
					v-model="sedeUsuario"
					:options="organizarSedes"
					option-value="valor"
					option-label="label"
					label="Sedes"
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

#formularioUsuario {
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
