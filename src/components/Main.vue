<script setup>
import { ref } from "vue";
import { useStoreUsuarios } from "../stores/usuarios.js";

const useUsuarios = useStoreUsuarios();
const rol = useUsuarios.user.rol;
const leftDrawerOpen = ref(false);
const rightDrawerOpen = ref(false);

const ROLES = {
	ADMINISTRADOR: "administrador",
	RECEPCIONISTA: "recepcionista",
	INSTRUCTOR: "instructor",
};

function toggleLeftDrawer() {
	leftDrawerOpen.value = !leftDrawerOpen.value;
}

function toggleRightDrawer() {
	rightDrawerOpen.value = !rightDrawerOpen.value;
}

function cerrar() {
	const hola = useUsuarios.cerrarSecion();
}

function hasAccess(...roles) {
	return roles.includes(rol);
}
</script>
<template>
	<q-layout view="hHh lpR fFf">
		<q-header class="bg-dark text-white">
			<q-toolbar>
				<q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
				<q-toolbar-title>
					<q-avatar>
						<img src="../img/logo.png" />
					</q-avatar>
					FORZA GYM
				</q-toolbar-title>
				<q-item clickable tag="router-link" to="/" @click="cerrar()">
					<q-item-section>
						<q-item-label>Cerrar Sesión</q-item-label>
					</q-item-section>
					<q-item-section avatar>
						<q-icon name="login" />
					</q-item-section>
				</q-item>
			</q-toolbar>
		</q-header>

		<q-drawer
			v-model="leftDrawerOpen"
			side="left"
			overlay
			class="bg-dark text-white">
			<q-list>
				<q-item clickable tag="router-link" to="/main/hogar">
					<q-item-section>
						<q-item-label>Home</q-item-label>
					</q-item-section>
					<q-item-section avatar>
						<q-icon name="home" />
					</q-item-section>
				</q-item>

				<q-item
					v-if="
						hasAccess(
							ROLES.ADMINISTRADOR,
							ROLES.RECEPCIONISTA,
							ROLES.INSTRUCTOR
						)
					"
					clickable
					tag="router-link"
					to="/main/clientes">
					<q-item-section>
						<q-item-label>Clientes</q-item-label>
					</q-item-section>
					<q-item-section avatar>
						<q-icon name="groups" />
					</q-item-section>
				</q-item>

				<q-item
					v-if="hasAccess(ROLES.ADMINISTRADOR, ROLES.RECEPCIONISTA)"
					clickable
					tag="router-link"
					to="/main/ingresos">
					<q-item-section>
						<q-item-label>Ingresos</q-item-label>
					</q-item-section>
					<q-item-section avatar>
						<q-icon name="how_to_reg" />
					</q-item-section>
				</q-item>

				<q-item
					v-if="hasAccess(ROLES.ADMINISTRADOR, ROLES.RECEPCIONISTA)"
					clickable
					tag="router-link"
					to="/main/inventario">
					<q-item-section>
						<q-item-label>Inventario</q-item-label>
					</q-item-section>
					<q-item-section avatar>
						<q-icon name="inventory_2" />
					</q-item-section>
				</q-item>

				<q-item
					v-if="
						hasAccess(
							ROLES.ADMINISTRADOR,
							ROLES.RECEPCIONISTA,
							ROLES.INSTRUCTOR
						)
					"
					clickable
					tag="router-link"
					to="/main/maquinas">
					<q-item-section>
						<q-item-label>Máquinas</q-item-label>
					</q-item-section>
					<q-item-section avatar>
						<q-icon name="fitness_center" />
					</q-item-section>
				</q-item>

				<q-item
					v-if="hasAccess(ROLES.ADMINISTRADOR, ROLES.RECEPCIONISTA)"
					clickable
					tag="router-link"
					to="/main/mantenimiento">
					<q-item-section>
						<q-item-label>Mantenimiento</q-item-label>
					</q-item-section>
					<q-item-section avatar>
						<q-icon name="build" />
					</q-item-section>
				</q-item>

				<q-item
					v-if="hasAccess(ROLES.ADMINISTRADOR, ROLES.RECEPCIONISTA)"
					clickable
					tag="router-link"
					to="/main/pagos">
					<q-item-section>
						<q-item-label>Pagos</q-item-label>
					</q-item-section>
					<q-item-section avatar>
						<q-icon name="credit_card" />
					</q-item-section>
				</q-item>

				<q-item
					v-if="
						hasAccess(
							ROLES.ADMINISTRADOR,
							ROLES.RECEPCIONISTA,
							ROLES.INSTRUCTOR
						)
					"
					clickable
					tag="router-link"
					to="/main/planes">
					<q-item-section>
						<q-item-label>Planes</q-item-label>
					</q-item-section>
					<q-item-section avatar>
						<q-icon name="assignment" />
					</q-item-section>
				</q-item>

				<q-item
					v-if="hasAccess(ROLES.ADMINISTRADOR, ROLES.RECEPCIONISTA)"
					clickable
					tag="router-link"
					to="/main/proveedores">
					<q-item-section>
						<q-item-label>Proveedores</q-item-label>
					</q-item-section>
					<q-item-section avatar>
						<q-icon name="local_shipping" />
					</q-item-section>
				</q-item>

				<q-item
					v-if="hasAccess(ROLES.ADMINISTRADOR, ROLES.RECEPCIONISTA)"
					clickable
					tag="router-link"
					to="/main/sedes">
					<q-item-section>
						<q-item-label>Sedes</q-item-label>
					</q-item-section>
					<q-item-section avatar>
						<q-icon name="apartment" />
					</q-item-section>
				</q-item>

				<q-item
					v-if="hasAccess(ROLES.ADMINISTRADOR)"
					clickable
					tag="router-link"
					to="/main/usuarios">
					<q-item-section>
						<q-item-label>Usuarios</q-item-label>
					</q-item-section>
					<q-item-section avatar>
						<q-icon name="assignment_ind" />
					</q-item-section>
				</q-item>

				<q-item
					v-if="hasAccess(ROLES.ADMINISTRADOR, ROLES.RECEPCIONISTA)"
					clickable
					tag="router-link"
					to="/main/ventas">
					<q-item-section>
						<q-item-label>Ventas</q-item-label>
					</q-item-section>
					<q-item-section avatar>
						<q-icon name="attach_money" />
					</q-item-section>
				</q-item>
			</q-list>
		</q-drawer>

		<q-drawer v-model="rightDrawerOpen" side="right" overlay>
			<!-- drawer content -->
		</q-drawer>

		<q-page-container>
			<router-view />
		</q-page-container>
	</q-layout>
</template>

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
	position: absolute;
	width: 100%;
	height: 100vh;
}
</style>
