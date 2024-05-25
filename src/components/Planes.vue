<script setup>
import { ref, onMounted } from "vue";
import { useStorePlanes } from "../stores/planes.js";







</script>

<template>

<div>

    <h2>Estás en Planes</h2>

    <div id="q-app" style="min-height: 100vh;">
    <div class="q-pa-md row items-start q-gutter-md">

    <q-card class="my-card">
      <q-img src="../img/basico.jpg">
        <div class="absolute-bottom text-h6">
          Plan Básico
        </div>
      </q-img>

      <q-card-section>
        <p>Este es el plan nfgdmg cuesta $000000 y tiene tantos días.</p>
      </q-card-section>
    </q-card>


    <q-card class="my-card">
      <q-img src="../img/intermedio.jpg">
        <div class="absolute-bottom text-h6">
          Plan Intermedio
        </div>
      </q-img>

      <q-card-section>
        <p>Este es el plan nfgdmg cuesta $000000 y tiene tantos días.</p>
      </q-card-section>
    </q-card>


    <q-card class="my-card">
      <q-img src="../img/avanzado.jpg">
        <div class="absolute-bottom text-h6">
          Plan Avanzado
        </div>
      </q-img>

      <q-card-section>
        <p>Este es el plan nfgdmg cuesta $000000 y tiene tantos días.</p>
      </q-card-section>
    </q-card>


    </div>
    </div>

</div>



</template>



<style scoped>

.my-card{
    width: 100%;
    max-width: 450px;
    border-radius: 30px;
}


p{
    color: black;
    font-size: 16px;
}
</style>