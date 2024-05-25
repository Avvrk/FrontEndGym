<script setup>
import { ref, onMounted } from "vue";
import { useStoreSedes } from "../stores/sedes.js";

const useSede = useStoreSedes();

let rows = ref([]);

let columns = ref([
    { name: "nombre", sortable: true, label: "Nombre", field: "nombre", align: "center" },
    { name: "direccion", label: "Direccion", field: "direccion", align: "center" },
    { name: "codigo", label: "Código", field: "codigo", align: "center" },
    { name: "horario", label: "Horario", field: "horario", align: "center" },
    { name: "ciudad", label: "Ciudad", field: "ciudad", align: "center" },
    { name: "telefono", label: "Teléfono", field: "telefono", align: "center" },
    { name: "estado", label: "Estado", field: "estado", align: "center" },
    { name: "opciones", label: "Opciones", field: "opciones", align: "center" },
]);

async function listarSedes() {
    const res = await useSede.getSedes();
    console.log(res.data);

    rows.value = res.data.sedes;
}

onMounted(() => {
    listarSedes();
});
</script>

<template>
    <div>
        <div class="q-pa-md">
            <q-table flat bordered title="Sedes" :rows="rows" :columns="columns" row-key="id">
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

.q-btn[aria-label="✏️"] {
  color: #0000ff;
}

.q-btn[aria-label="❌"] {
  color: #ff0000;
}

.q-btn[aria-label="✅"] {
  color: #00ff00;
}
</style>
