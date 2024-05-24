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
.q-pa-md {
  padding: 40px;
}

.q-table {
  margin-top: 20px;
}

.q-btn {
  margin: 10px;
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

.q-td {
  font-size: 16px;
}

.q-td p {
  margin-bottom: 0;
}

.q-td p:first-child {
  color: green;
}

.q-td p:last-child {
  color: red;
}
</style>