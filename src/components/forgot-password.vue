<script setup>
import { ref } from "vue";
import { useStoreUsuarios } from "../stores/usuarios";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

const $q = useQuasar();

const router = useRouter();
const useUsuario = useStoreUsuarios();

let email = ref("");
let contrasenia = ref("");

const passwordFieldType = ref("password");


</script>

<template>
<h1>Estás en la sección de olvidaste contraseña</h1>
</template>

<style scoped>

</style>
