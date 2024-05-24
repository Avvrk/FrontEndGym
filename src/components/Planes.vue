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
.my-card {
  width: 100%;
  max-width: 450px;
  border-radius: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin: 20px;
}

.my-card:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

.q-img {
  height: 150px;
  border-top-left-radius: 30px;
  border-top-right-radius: 30px;
}

.absolute-bottom {
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
}

.q-card-section {
  padding: 20px;
}

.q-card-section p {
  color: #333;
  font-size: 16px;
  margin-bottom: 20px;
}

.q-card-section p:last-child {
  margin-bottom: 0;
}

.q-pa-md {
  padding: 40px;
}

.row {
  flex-wrap: wrap;
}

.q-gutter-md {
  margin: -20px;
}

.q-gutter-md > .q-card {
  margin: 20px;
}

@media (max-width: 768px) {
  .my-card {
    max-width: 300px;
  }
}
</style>