	<script setup>
	import { ref } from 'vue';
	import { useQuasar } from 'quasar';
	import { useStoreUsuarios } from '../stores/usuarios';

	const $q = useQuasar();
	const useUsuario = useStoreUsuarios();

	let email = ref('');

	async function solicitarRestablecimiento() {
		try {
			if (email.value === '') {
				$q.notify({
					type: 'negative',
					message: 'El correo no puede estar vacío',
					position: 'bottom-right',
				});
				return;
			}

			const res = await useUsuario.putUsuariosPassword(email);

			if (res.status == 200) {
				$q.notify({
					type: 'positive',
					message: 'Correo de restablecimiento enviado',
					position: 'bottom-right',
				});
				router.push('/');
				// vifRecontrasena.value = false;
			} else {
				$q.notify({
					type: 'negative',
					message: 'Correo no encontrado',
					position: 'bottom-right',
				});
			}
		} catch (error) {
			$q.notify({
				type: 'negative',
				message: 'Error en el servidor',
				position: 'bottom-right',
			});
			console.log(error);
		}
	}
</script>
<template>
	<div class="login-container">
		<div class="login-card">
			<div class="login-header">
				<h2>Solicitar Restablecimiento</h2>
				<p>Ingresa tu correo electrónico</p>
			</div>
			<form @submit.prevent="solicitarRestablecimiento">
				<div class="input-field">
					<input type="text" class="input" placeholder="Correo electrónico" v-model="email" />
				</div>
				<q-btn class="submit bg-primary" type="submit" :loading="useUsuario.loading">
					Enviar Código
					<template v-slot:loading>
						<q-spinner color="secondary" size="1em" />
					</template>
				</q-btn>
			</form>
		</div>
	</div>
</template>


<style scoped>
.login-container {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	background-image: url('../img/gym.jpg');
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
	background-attachment: fixed;
}

.login-card {
	width: 400px;
	background-color: rgba(255, 255, 255, 0.8);
	padding: 20px;
	border-radius: 10px;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.login-header {
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 20px;
}

.login-header h2 {
	font-size: 24px;
	color: #333;
	margin-top: 10px;
}

.login-header p {
	font-size: 16px;
	color: #666;
	margin-top: 10px;
}

.input-field {
	display: flex;
	align-items: center;
	margin-bottom: 20px;
}

.input-field input {
	width: 100%;
	height: 45px;
	padding: 10px;
	border: none;
	border-radius: 10px;
	font-size: 16px;
	color: #333;
}

.submit {
	width: 100%;
	height: 45px;
	padding: 10px;
	border: none;
	border-radius: 10px;
	font-size: 16px;
	color: #fff;
	background-color: var(--q-color-primary);
	cursor: pointer;
}

.submit:hover {
	background-color: #3e8e41;
}
</style>