<template>
	<q-layout view="hHh lpR fFf">
		<q-header class="bg-primary text-white">
			<q-toolbar>
				<q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

				<q-toolbar-title>
					<q-avatar>
						<img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
					</q-avatar>
					Forza Gym
				</q-toolbar-title>

				<!-- <q-btn dense flat round icon="menu" @click="toggleRightDrawer" /> -->
			</q-toolbar>
		</q-header>

		<q-drawer v-model="leftDrawerOpen" side="left" overlay>
			<router-link to="/">Login</router-link>
        	<br>
        	<router-link to="/clientes">Clientes</router-link>
			<br>
			<router-link to="/ingresos">Ingresos</router-link>
			<br>
			<router-link to="/inventario">Inventario</router-link>
			<br>
			<router-link to="/mantenimiento">Mantenimiento</router-link>
			<br>
			<router-link to="/sedes">Sedes</router-link>
			<br>
			<router-link to="/usuarios">Usuarios</router-link>
			<br>
			<router-link to="/maquinas">Maquinas</router-link>
			<br>
			<router-link to="/planes">Planes</router-link>
		</q-drawer>

		<q-drawer v-model="rightDrawerOpen" side="right" overlay>
			<!-- drawer content -->
		</q-drawer>

		<q-page-container>
			<router-view />
		</q-page-container>
	</q-layout>
</template>

<script setup>
import { ref } from "vue";
const leftDrawerOpen = ref(false);
const rightDrawerOpen = ref(false);

function toggleLeftDrawer() {
	leftDrawerOpen.value = !leftDrawerOpen.value;
}

function toggleRightDrawer() {
	rightDrawerOpen.value = !rightDrawerOpen.value;
}
</script>

<style scoped>
.logo {
	height: 6em;
	padding: 1.5em;
	will-change: filter;
	transition: filter 300ms;
}

.logo:hover {
	filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
	filter: drop-shadow(0 0 2em #42b883aa);
}

.q-page-container {
  height: 100vh;
}
</style>
