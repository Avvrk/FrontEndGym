<script setup>
import { ref, onMounted } from "vue";
import { useStoreClientes } from "../stores/clientes.js";

const useCliente = useStoreClientes();

let rows = ref([]);


let columns = ref([
    { name: "nombre", sortable: true, label: "Nombre Usuario", field: "nombre", align: "center" },
    { name: "fechaIngreso", sortable: true, label: "Fecha de ingreso", field: "fechaIngreso", align: "center" },
    { name: "documento", label: "Documento", field: "documento", align: "center" },
    { name: "fechaNacimiento", sortable: true, label: "Fecha de nacimiento", field: "fechaNacimiento", align: "center" },
    { name: "edad", sortable: true, label: "Edad", field: "edad", align: "center" },
    { name: "direccion", label: "Direccion", field: "direccion", align: "center" },
    { name: "telefono", label: "Telefono", field: "telefono", align: "center" },
    { name: "objetivo", label: "Objetivo", field: "objetivo", align: "center" },
    { name: "observaciones", label: "Observaciones", field: "Observaciones", align: "center" },
    { name: "estado", sortable: true, label: "Estado", field: "estado", align: "center" },
    { name: "plan", label: "Plan", field: "plan", align: "center" },
    { name: "seguimiento", label: "Seguimiento", field: "seguimiento", align: "center" },
    { name: "opciones", label: "Opciones", field: "opciones", align: "center" },
]);

async function listarClientes() {
    const res = await useCliente.getClientes();
    console.log(res.data);

    rows.value = res.data.clientes
}

// async function agregarCliente() {
//     const res = await useCliente.postClientes();
//     console.log(res.data);
    
//     rows.value = res.data.clientes
// }

onMounted(() => {
    listarClientes();
});
</script>

<template>
    <div>
        <div class="q-pa-md">
            <q-table flat bordered title="Clientes" :rows="rows" :columns="columns" row-key="id">
                <template v-slot:body-cell-opciones="props">
                    <q-td :props="props">
                        <q-btn @click="editar(props.row)"> ✏️ </q-btn>
                        <q-btn v-if="props.row.estado == 1"> ❌ </q-btn>
                        <q-btn v-else> ✅ </q-btn>
                    </q-td>
                </template>
                <template v-slot:body-cell-estado="props">
                    <q-td :props="props">
                        <p v-if="props.row.estado == 1" style="color: green">Activo</p>
                        <p v-else style="color: red">Inactivo</p>
                    </q-td>
                </template>
            </q-table>
        </div>
        <div id="formularioCliente" v-if="mostrarFormularioCliente == true" >
            <q-form @submit="registrar()" @reset="resetear()" class="q-gutter-md">
                <q-input standout="bg-green text-white" type="text" placeholder="Nombre" v-model="nombre" />
                <q-input standout="bg-green text-white" type="text" placeholder="Documento" v-model="documento" />
                <q-input standout="bg-green text-white" type="text" placeholder="Edad" v-model="edad" />
                <q-input standout="bg-green text-white" type="text" placeholder="Direccion" v-model="direccion" />
                <q-input standout="bg-green text-white" type="text" placeholder="Telefono" v-model="telefono" />
                <q-input standout="bg-green text-white" type="text" placeholder="Objetivo" v-model="objetivo" />
                <q-input standout="bg-green text-white" type="text" placeholder="Plan" v-model="Plan" />
                <div>
                    <q-btn label="Enviar" type="submit" color="primary" />
                    <q-btn label="Limpiar" type="reset" color="primary" flat class="q-ml-sm" />
                </div>
            </q-form>
            <button id="botonF" @click="editarVistaFondo(false)"></button>
        </div>
    </div>
</template>

<style scoped>

</style>
