<script setup>
import { ref, onMounted } from "vue";
import { useStoreSedes } from "../stores/sedes.js";

const useSede = useStoreSedes();

let rows = ref([]);


let columns = ref([
    { name: "nombre", sortable: true, label: "Nombre", field: "nombre", align: "center" },
    { name: "direccion", label: "Direccion", field: "direccion", align: "center" },
    {name: "codigo", label: "Código", field: "codigo", align: "center"},
    {name: "horario", label: "Horario", field: "horario", align: "center"},
    {name: "ciudad", label: "Ciudad", field: "ciudad", align: "center"},
    {name: "telefono", label: "Teléfono", field: "telefono", align: "center"},
    {name: "estado", label: "Estado" , field: "estado", align: "center"}
]);

async function listarSedes() {
    const res = await useSede.getSedes();
    console.log(res.data);

    rows.value = res.data.sedes
}

onMounted(() => {
    listarSedes();
});
</script>

<template>
    <div>
        <div class="q-pa-md">
            <q-table flat bordered title="Sedes" :rows="rows" :columns="columns" row-key="id">
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