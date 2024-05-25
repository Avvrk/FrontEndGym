<script setup>
import { ref, onMounted } from "vue";
import { useStoreInventario } from "../stores/inventario.js";

const useInventario = useStoreInventario();

let rows = ref([]);

let columns = ref([
    { name: "código", sortable: true, label: "Código", field: "codigo", align: "center" },
    { name: "descripcion", label: "Descripción", field: "descripcion", align: "center" },
    { name: "valor", label: "Valor", field: "valor", align: "center" },
    { name: "cantidad", label: "Cantidad", field: "cantidad", align: "center" },
    { name: "opciones", label: "Opciones", field: "opciones", align: "center" }
]);

async function listarInventario() {
    const res = await useInventario.getInventario();
    console.log(res.data);
    rows.value = res.data.inventarios;
}

onMounted(() => {
    listarInventario();
});
</script>



<template>
<div>
        <div class="q-pa-md">
            <q-table flat bordered title="Inventario" :rows="rows" :columns="columns" row-key="id">
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