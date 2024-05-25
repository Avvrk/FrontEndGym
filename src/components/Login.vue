<script setup>
import { ref } from "vue";
import { useStoreUsuarios } from "../stores/usuarios";

const useUsuario = useStoreUsuarios();

let email = ref("");
let password = ref("");

async function login() {
	const res = await useUsuario.login(email.value, password.value);
	console.log(res);
}
</script>

<template>
	<body>
		<div class="container">
			<div class="top-header">
				<span>Bienvenido</span>
				<header>Iniciar Sesión</header>
			</div>

			<div class="input-field">
				<input type="text" class="input" placeholder="Email" v-model="email" />
			</div>

			<div class="input-field">
				<input type="password" class="input" placeholder="Contraseña" v-model="password" />
			</div>

			<div class="input-field">
				<input type="submit" class="submit" value="Inicio" @click="login()" />
			</div>

			<div class="bottom">
				<div class="left">
					<input type="checkbox" id="check" />
					<label for="check">Recordarme</label>
				</div>

				<div class="right">
					<label><a href="#">¿Olvidaste la contraseña?</a></label>
				</div>
			</div>
		</div>
	</body>
</template>

<style scoped>
* {
	font-family: "Poppins", sans-serif;
}

body {
	background-image: url("../img/gym.jpg");
	background-size: cover;
	background-repeat: no-repeat;
	background-position: center;
	background-attachment: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
}

.container {
	width: 400px;
	background-color: rgb(128, 128, 128);
	padding: 20px 15px 20px 15px;
	border-radius: 5px;
}

span {
	color: #fff;
	font-size:medium;
	display: flex;
	justify-content: center;
	padding: 10px 0 15px 0;
}

header {
	color: #fff;
	font-size: 30px;
	display: flex;
	justify-content: center;
	padding: 0 0 15px 0;
}

.input-field {
	display: flex;
	align-items: center;
	flex-direction: column;
	margin-bottom: 15px;
}

.submit {
	border: none;
	border-radius: 30px;
	font-size: 15px;
	height: 45px;
	outline: none;
	width: 30%;
	background: rgba(255, 255, 255, 0.7);
	cursor: pointer;
	transition: 0.3s;
}

.submit:hover {
	box-shadow: 1px 5px 7px 1px rgba(0, 0, 0, 0.2);
}

.bottom {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	font-size: small;
	color: #fff;
	margin-top: 10px;
}

.left {
	display: flex;
	gap: 10px;
}

label a {
	color: #fff;
	text-decoration: none;
}

.input-field .input {
	height: 45px;
	width: 87%;
	border: none;
	outline: none;
	border-radius: 30px;
	color: #fff;
	padding: 0 0 0 42px;
	background: rgba(255, 255, 255, 0.1);
}

i {
	position: relative;
	top: -31px;
	left: 17px;
	color: #fff;
}

::-webkit-input-placeholder {
	color: #fff;
}
</style>
