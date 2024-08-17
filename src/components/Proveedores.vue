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
            <div id="formularioUsuario" v-if="mostrarFormularioUsuario">
                <q-form
                    @submit="mostrarBotonEnviar ? registrar() : editar()"
                    @reset="editarVistaFondo(false, null, true)"
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
                        v-if="mostrarBotonEnviar"
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
                        :options="organizarSedes()"
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

<style scoped></style>
