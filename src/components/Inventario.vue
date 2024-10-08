<script setup>
import { ref, onMounted, watch } from "vue";
import { useStoreInventario } from "../stores/inventario.js";
import { useStoreProveedores } from "../stores/proveedores.js"
import { useQuasar } from "quasar";

const $q = useQuasar();

const useInventario = useStoreInventario();
const useProveedor = useStoreProveedores();

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
        name: "_idProveedor",
        label: "Proveedor",
        field: "_idProveedor",
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

const proveedoresTodo = ref([]);

// Variables que contienen los datos ingresados en el formulario
let codigoProducto = ref("");
let descripcionProducto = ref("");
let valorProducto = ref("");
let cantidadProducto = ref("");
let proveedorProducto = ref("");

const datos = ref("");

const iTotal = ref(0);

// Variables para administrar lo que se ve en la pantalla
const mostrarFormularioInventario = ref(false);
const mostrarBotonEnviar = ref(true);
const loading = ref(true); // Agregar estado de carga

const opcionBusqueda = ref("todos");

const nombreTelefono = ref([]);

const organizarProveedores = () => {
	nombreTelefono.value = proveedoresTodo.value.map((element) => ({
		label: `${element.nombre} / ${element.telefono}`,
		valor: `${element._id}`,
		nombre: `${element.nombre}`,
	}));
	return nombreTelefono.value;
};

const buscarProveedor = (id) => {
	const proveedor = proveedoresTodo.value.find((m) => m._id == id);
	console.log(proveedor, id, proveedoresTodo.value);
    if (proveedor == undefined) {
        return 'N/A';
    }
	return proveedor.nombre;
};

const estadoTabla = () => {
    switch (opcionBusqueda.value) {
        case "activas":
            listarInventarioActivos();
            break;
        case "inactivos":
            listarInventarioInactivos();
            break;
        default:
            listarInventario();
            break;
    }
};

watch(opcionBusqueda, estadoTabla);

function formatoNumerico(numero) {
    if (typeof numero === "number") {
        numero = numero.toString();
    }

    if (numero.length >= 4 && numero.length <= 9) {
        const formatoActualizado = numero.split("");
        formatoActualizado.splice(-3, 0, ".");
        if (numero.length == 7 || numero.length == 8 || numero.length == 9) {
            formatoActualizado.splice(-7, 0, ".");
        }
        return formatoActualizado.join("");
    }
    return numero;
}

async function listarDatos() {
    await Promise.all([listarProveedores(), listarInventario()]);
    loading.value = false; // Datos cargados
}

async function listarInventario() {
    try {
        loading.value = true; 
        const res = await useInventario.getInventario();
        rows.value = res.data.inventarios;
    } catch (error) {
        console.log("Error al listar el inventario:", error);
    } finally {
        loading.value = false; 
    }
}

async function listarProveedores() {
    try {
        loading.value = true;
        const res = await useProveedor.getProveedores();
        proveedoresTodo.value = res.data.proveedores;
        organizarProveedores()
    } catch (error) {
        console.error("Error al listar proveedores:", error);
    } finally {
        loading.value = false;
    }
}

async function listarInventarioActivos() {
	try {
        loading.value = true;
		const res = await useInventario.getInventariosActivos();
		rows.value = res.data.inventarios;
	} catch (error) {
		console.log("Error al listar el inventario activos:", error);
	} finally {
        loading.value = false;
    }
}

async function listarInventarioInactivos() {
	try {
        loading.value = true;
		const res = await useInventario.getInventariosInactivos();
		rows.value = res.data.inventarios;
	} catch (error) {
		console.log("Error al listar el inventario inactivos:", error);
	} finally {
        loading.value = false;
    }
}

// async function listarTotal() {
//     try {
//         const res = await useInventario.getInventariosTotal();
//         iTotal.value = res.data.total;
//     } catch (error) {
//         console.error("Error al listar el total de inventario:", error);
//     }
// }

async function editarEstado(elemento) {
    try {
        loading.value = true;
        if (elemento.estado === 1) {
            const res = await useCliente.putInventariosInactivar(elemento._id);
        } else if (elemento.estado === 0) {
            const res = await useCliente.putInventariosActivar(elemento._id);
        }
        listarInventario();
    } catch (error) {
        console.error("Error al editar el estado del cliente:", error);
    } finally {
        loading.value = false;
    }
}

// Funcion que se encarga de enviar los datos del registro
async function registrar() {
    if (await validarDatos()) {
        try {
            loading.value = true;
            const info = {
                codigo: codigoProducto.value,
                descripcion: descripcionProducto.value,
                valor: valorProducto.value,
                cantidad: cantidadProducto.value,
                _idProveedor: proveedorProducto.value.valor,
            };
            const res = await useInventario.postInventario(info);
            if (res.status !== 200) {
                if (res.response.data.errors[0].msg == "El código está repetido"){
                    $q.notify({
                        type: "negative",
                        message: "El codigo del producto no puede estar repetido",
                        position: "bottom-right",
                    });
                } else {
                    $q.notify({
                        type: "negative",
                        message: "Parece que hubo un error en el registro",
                        position: "bottom-right",
                    });
                }
            } else {
                $q.notify({
                    type: "positive",
                    message: "El registro se ha realizado correctamente",
                    position: "bottom-right",
                });
                listarInventario();
                mostrarFormularioInventario.value = false;
            }
        } catch (error) {
            console.error("Error al registrar el inventario:", error);
        } finally {
            loading.value = false;
        }
    }
}

async function editar() {
    if (await validarDatos()) {
        try {
            loading.value = true;
            const info = {
                codigo: codigoProducto.value,
                descripcion: descripcionProducto.value,
                valor: valorProducto.value,
                cantidad: cantidadProducto.value,
                _idProveedor: proveedorProducto.value.valor,
            };
            const res = await useInventario.putInventarios(datos.value._id, info);
            if (res.status !== 200) {
                if (res.response.data.errors[0].msg == "El código está repetido"){
                    $q.notify({
                        type: "negative",
                        message: "El codigo del producto no puede estar repetido",
                        position: "bottom-right",
                    });
                } else {
                    $q.notify({
                        type: "negative",
                        message: "Parece que hubo un error al editar el inventario ",
                        position: "bottom-right",
                    });
                }
            } else {
                $q.notify({
                    type: "positive",
                    message: "El inventario se ha actualizado correctamente",
                    position: "bottom-right",
                });
                listarInventario();
                mostrarFormularioInventario.value = false;
            }
        } catch (error) {
            console.error("Error al actualizar el inventario:", error);
        } finally {
            loading.value = false;
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

    if (!codigoProducto.value.trim() && !descripcionProducto.value.trim() && !valorProducto.value.trim() && !cantidadProducto.value.trim() && !proveedorProducto.value) {
        $q.notify({
            type: "negative",
            message: "Llenar todos los campos",
            position: "bottom-right",
        });
        verificado = false;
    } else {
        if (!codigoProducto.value.trim()) {
            $q.notify({
                type: "negative",
                message: "El codigo no puede estar vacio",
                position: "bottom-right",
            });
            verificado = false;
        }
        if (!descripcionProducto.value.trim()) {
            $q.notify({
                type: "negative",
                message: "La descripcion no puede estar vacia",
                position: "bottom-right",
            });
            verificado = false;
        }
        if (!valorProducto.value.trim()) {
            $q.notify({
                type: "negative",
                message: "El valor no puede estar vacia",
                position: "bottom-right",
            });
            verificado = false;
        } else if (isNaN(Number(valorProducto.value))) {
            $q.notify({
                type: "negative",
                message: "El valor debe ser un numero",
                position: "bottom-right",
            });
            verificado = false;
        }
        if (!cantidadProducto.value.trim()) {
            $q.notify({
                type: "negative",
                message: "La cantidad no puede estar vacia",
                position: "bottom-right",
            });
            verificado = false;
        }else if (isNaN(Number(cantidadProducto.value))) {
            $q.notify({
                type: "negative",
                message: "La cantidad debe ser un numero",
                position: "bottom-right",
            });
            verificado = false;
        }
        if (!proveedorProducto.value) {
            $q.notify({
                type: "negative",
                message: "El proveedor no puede estar vacio",
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
        const proveedor = nombreTelefono.value.find(
            (element) => element.valor == datos.value._idProveedor
        )
        codigoProducto.value = String(datos.value.codigo);
        descripcionProducto.value = String(datos.value.descripcion);
        valorProducto.value = String(datos.value.valor);
        cantidadProducto.value = String(datos.value.cantidad);
        proveedorProducto.value = proveedor;
    } else {
        codigoProducto.value = "";
        descripcionProducto.value = "";
        valorProducto.value = "";
        cantidadProducto.value = "";
        proveedorProducto.value = "";
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
        <q-inner-loading :showing="loading" label="Please wait..." label-class="text-teal" label-style="font-size: 1.1em" />
        <div class="q-pa-md">
            <div>
                <q-btn v-if="!loading" @click="editarVistaFondo(true, null, true)"> agregar </q-btn>
            </div>
            <div v-if="!loading"  class="text-h2 text-center">
                Inventarios
            </div>
            <hr v-if="!loading"  class="bg-primary no-border" style="height: 4px;">
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
            <q-table v-if="!loading" flat bordered title="Lista de Inventario" :rows="rows" :columns="columns" row-key="id">
                <template v-slot:body-cell-opciones="props">
                    <q-td :props="props">
                        <q-btn @click="editarVistaFondo(true, props.row, false)"> ✏️ </q-btn>
                        <q-btn v-if="props.row.estado == 1" @click="editarEstado(props.row)" >
                            ❌
                        </q-btn>
                        <q-btn v-else @click="editarEstado(props.row)" >
                            ✅
                        </q-btn>
                    </q-td>
                </template>
                <template v-slot:body-cell-valor="props">
                    <q-td :props="props">
                        <p>$ {{ formatoNumerico(props.row.valor) }}</p>
                    </q-td>
                </template>
                <template v-slot:body-cell-_idProveedor="props">
                    <q-td :props="props">
                        <p>{{ buscarProveedor(props.row._idProveedor) }}</p>
                    </q-td>
                </template>
                <template v-slot:body-cell-estado="props">
                    <q-td :props="props">
                        <p v-if="props.row.estado == 1" style="color: green">Activo</p>
                        <p v-else style="color: red">Inactivo</p>
                    </q-td>
                </template>
            </q-table>
            <!-- <div>
				<q-card flat bordered>
					<q-card-section v-html="iTotal" />
				</q-card>
			</div> -->
        </div>
        <div id="formularioInventario" v-if="mostrarFormularioInventario == true">
            <q-form @submit="mostrarBotonEnviar ? registrar() : editar()" @reset="editarVistaFondo(false, null, true)" class="q-gutter-md">
                <q-input standout="bg-green text-white" v-model="codigoProducto" label="Código" />
                <q-input standout="bg-green text-white" v-model="descripcionProducto" label="Descripción" color="black" />
                <q-input standout="bg-green text-white" v-model="valorProducto" label="Valor" color="black" />
                <q-input standout="bg-green text-white" v-model="cantidadProducto" label="Cantidad" color="black" />
				<q-select
					standout="bg-green text-white"
					v-model="proveedorProducto"
					:options="organizarProveedores()"
					label="Proveedor"
					color="black" />
                <div>
                    <q-btn label="Enviar" type="submit" color="primary" />
                    <q-btn label="Cerrar" type="reset" color="primary" flat class="q-ml-sm" />
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
