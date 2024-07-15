					<script setup>
					import { ref } from 'vue';
					import { useRoute, useRouter } from 'vue-router';
					import { useQuasar } from 'quasar';
					import { useStoreUsuarios } from '../stores/usuarios';
					
					const $q = useQuasar();
					const router = useRouter();
					const route = useRoute();
					const useUsuario = useStoreUsuarios();
					
					let nuevaContrasenia = ref('');
					let confirmarContrasenia = ref('');
					
					const passwordFieldType = ref('password');
					
					function togglePasswordVisibility() {
						passwordFieldType.value =
							passwordFieldType.value === 'password' ? 'text' : 'password';
					}
					
					async function restablecerContrasenia() {
						if (!nuevaContrasenia.value.trim() || !confirmarContrasenia.value.trim()) {
							$q.notify({
								type: 'negative',
								message: 'Llenar todos los campos',
								position: 'bottom-right',
							});
							return;
						}
					
						if (nuevaContrasenia.value !== confirmarContrasenia.value) {
							$q.notify({
								type: 'negative',
								message: 'Las contraseñas no coinciden',
								position: 'bottom-right',
							});
							return;
						}
					
						const token = route.query.token;
						const res = await useUsuario.restablecerContrasenia(token, nuevaContrasenia.value);
						if (res.code === 'ERR_BAD_REQUEST') {
							$q.notify({
								type: 'negative',
								message: 'Error al restablecer la contraseña',
								position: 'bottom-right',
							});
						} else {
							$q.notify({
								type: 'positive',
								message: 'Contraseña restablecida con éxito',
								position: 'bottom-right',
							});
							router.push('/login');
						}
					}
					</script>
<template>
	<div class="login-container">
		<div class="login-card">
			<div class="login-header">
				<h2>Restablecer Contraseña</h2>
				<p>Ingresa tu nueva contraseña</p>
			</div>
			<form @submit.prevent="restablecerContrasenia">
				<div class="input-field">
					<input
						:type="passwordFieldType"
						class="input"
						placeholder="Nueva contraseña"
						v-model="nuevaContrasenia" />
					<button type="button" @click="togglePasswordVisibility">
						<q-icon
							:name="passwordFieldType === 'password' ? 'visibility_off' : 'visibility'"
						/>
					</button>
				</div>
				<div class="input-field">
					<input
						:type="passwordFieldType"
						class="input"
						placeholder="Confirmar contraseña"
						v-model="confirmarContrasenia" />
					<button type="button" @click="togglePasswordVisibility">
						<q-icon
							:name="passwordFieldType === 'password' ? 'visibility_off' : 'visibility'"
						/>
					</button>
				</div>
				<q-btn
					class="submit bg-primary"
					type="submit"
					:loading="useUsuario.loading">
					Restablecer
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

.input-field button {
	margin-left: 10px;
	background: none;
	border: none;
	color: #666;
	cursor: pointer;
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