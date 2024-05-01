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

    </div>
</template>

<style scoped>

</style>
