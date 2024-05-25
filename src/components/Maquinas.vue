<script setup>
import { ref, onMounted } from "vue";
import { useStoreMaquinas } from "../stores/maquinas.js";

const useMaquina = useStoreMaquinas();

let rows = ref([]);


let columns = ref([
    { name: "codigo", sortable: true, label: "Código", field: "codigo", align: "center" },
    { name: "sede", label: "Sede", field: "sede", align: "center" },
    { name: "descripcion", label: "Descripción", field: "descripcion", align: "center" },
    { name: "fechaIngreso", label: "Fecha de Ingreso", field: "fechaIngreso", align: "center" },
    { name: "fechaUltMan", label: "Fecha de Último Mantenimiento", field: "fechaUltMan", align: "center" },
    { name: "estado", label: "Estado", field: "estado", align: "center" },

]);

async function listarMaquinas() {
    const res = await useMaquina.getMaquinas();
    console.log(res.data);

    rows.value = res.data.maquinas
}

onMounted(() => {
    listarMaquinas();
});
</script>

<template>
    <div>
        <div class="q-pa-md">
            <q-table flat bordered title="Máquinas" :rows="rows" :columns="columns" row-key="id">
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