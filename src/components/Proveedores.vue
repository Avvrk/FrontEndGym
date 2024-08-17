<script setup>
import { ref, onMounted, watch } from "vue";
import { useStoreProveedores } from "../stores/proveedores";
import { useQuasar } from "quasar";
import { format } from "date-fns";

const $q = useQuasar();

const useProveedores = useStoreProveedores();

const rows = ref([]);
const columns = ref([
    {
        name: "nombre",
        sortable: true,
        label: "Nombre",
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
        name: "correo",
        sortable: true,
        label: "Correo",
        field: "correo",
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
        sortable: true,
        label: "Opciones",
        field: "opciones",
        align: "center",
    },
]);

let nombreProveedor = ref("");
let telefonoProveedor = ref("");
let correoProveedor = ref("");

const datos = ref([]);
const loading = ref(true);

const mostrarBotonEnviar = ref(false);
const mostrarFormularioProveedor = ref(false);

const opcionBusqueda = ref("todos");

const estadoTabla = () => {
	switch (opcionBusqueda.value) {
		case "activas":
			listarProveedoresActivos();
			break;
		case "inactivos":
			listarProveedoresInactivos();
			break;
		default:
			listarProveedores();
			break;
	}
};

watch(opcionBusqueda, estadoTabla);

async function listarDatos() {
    await Promise.all([listarProveedores()]);
    loading.value = false; // Datos cargados
}

async function listarProveedores() {
    try {
        loading.value = true;
        const res = await useProveedores.getProveedores();
        rows.value = res.data.proveedores;
    } catch (error) {
        console.error("Error al listar proveedores: ", error);
    } finally {
        loading.value = false;
    }
}

async function listarProveedoresActivos() {
    try {
        loading.value = true;
        const res = await useProveedores.getProveedoresActivos();
        rows.value = res.data.proveedores;
    } catch (error) {
        console.error("Error al listar proveedores activos:", error);
    } finally {
        loading.value = false;
    }
}

async function listarProveedoresInactivos() {
    try {
        loading.value = true;
        const res = await useProveedores.getProveedoresInactivos();
        rows.value = res.data.proveedores;
    } catch (error) {
        console.error("Error al listar proveedores inactivos:", error);
    } finally {
        loading.value = false;
    }
}

async function editarEstado(elemento) {
    try {
        loading.value = true;
        if (elemento.estado === 1) {
            const res = await useProveedores.putProveedoresInactivar(
                elemento._id
            );
        } else if (elemento.estado === 0) {
            const res = await useProveedores.putProveedoresActivar(
                elemento._id
            );
        }
        listarProveedores();
    } catch (error) {
        console.error("Error al editar estado del proveedor:", error);
    } finally {
        loading.value = false;
    }
}

async function registrar() {
    if (validarDatos()) {
        try {
            loading.value = true;
            const info = {
                nombre: nombreProveedor.value,
                telefono: telefonoProveedor.value,
                correo: correoProveedor.value,
            };

            const res = await useProveedores.postProveedores(info);
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
                listarProveedores();
                mostrarFormularioProveedor.value = false;
            }
        } catch (error) {
            console.error(error);
        } finally {
            loading.value = false;
        }
    }
}

async function editar() {
    if (validarDatos()) {
        try {
            loading.value = true;
            const info = {
                nombre: nombreProveedor.value,
                telefono: telefonoProveedor.value,
                correo: correoProveedor.value,
            };

            const res = await useProveedores.putProveedores(
                datos.value._id,
                info
            );
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
                listarProveedores();
                mostrarFormularioProveedor.value = false;
            }
        } catch (error) {
            console.error(error);
        } finally {
            loading.value = false;
        }
    }
}

function validarDatos() {
    let verificado = true;

    if (
        !nombreProveedor.value.trim() &&
        !telefonoProveedor.value.trim() &&
        !correoProveedor.value.trim()
    ) {
        $q.notify({
            type: "negative",
            message: "Llena todos los campos",
            position: "bottom-right",
        });
        verificado = false;
    } else {
        if (!nombreProveedor.value.trim()) {
            $q.notify({
                type: "negative",
                message: "El nombre no puede estar vacio",
                position: "bottom-right",
            });
            verificado = false;
        }
        if (!telefonoProveedor.value.trim()) {
            $q.notify({
                type: "negative",
                message: "El telefono no puede estar vacio",
                position: "bottom-right",
            });
            verificado = false;
        }
        if (!correoProveedor.value.trim()) {
            $q.notify({
                type: "negative",
                message: "El correo no puede estar vacio",
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
        nombreProveedor.value = datos.value.nombre;
        telefonoProveedor.value = String(datos.value.telefono);
        correoProveedor.value = datos.value.correo;
    } else {
        nombreProveedor.value = "";
        telefonoProveedor.value = "";
        correoProveedor.value = "";
    }

    mostrarBotonEnviar.value = boton;
    mostrarFormularioProveedor.value = boolean;
}

onMounted(() => {
    listarDatos();
});
</script>

<template>
    <div>
        <q-inner-loading
            :showing="loading"
            label="Please wait..."
            label-class="text-teal"
            label-style="font-size: 1.1em" />
        <div class="q-pa-md">
            <div>
                <q-btn
                    v-if="!loading"
                    @click="editarVistaFondo(true, null, true)">
                    agregar
                </q-btn>
            </div>
            <div v-if="!loading" class="text-h2 text-center">Proveedores</div>
            <hr
                v-if="!loading"
                class="bg-primary no-border"
                style="height: 4px" />
            <q-option-group
                v-if="!loading"
                v-model="opcionBusqueda"
                inline
                class="q-mb-md"
                :options="[
                    { label: 'Todos (predeterminado)', value: 'todos' },
                    { label: 'Activos', value: 'activas' },
                    { label: 'Inactivos', value: 'inactivos' },
                ]" />
                <q-table
				v-if="!loading"
				flat
				bordered
				title="Lista de proveedores"
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
            <div id="formularioProveedor" v-if="mostrarFormularioProveedor">
                <q-form
                    @submit="mostrarBotonEnviar ? registrar() : editar()"
                    @reset="editarVistaFondo(false, null, true)"
                    class="q-gutter-md">
                    <q-input
                        standout="bg-green text-white"
                        v-model="nombreProveedor"
                        label="Nombre" />
                    <q-input
                        standout="bg-green text-white"
                        v-model="telefonoProveedor"
                        type="tel"
                        label="Telefono"
                        color="black" />
                    <q-input
                        standout="bg-green text-white"
                        v-model="correoProveedor"
                        type="email"
                        label="Correo"
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

#formularioProveedor {
	position: absolute;
	top: 0;
    left: 0;
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
</style>
