<!-- <script setup>
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
</style> -->

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
    <div class="login-container">
        <div class="login-card">
            <div class="login-header">
                <h2>Iniciar Sesión</h2>
                <p>Bienvenido</p>
            </div>
            <form @submit.prevent="login">
                <div class="input-field">
                    <input type="email" class="input" placeholder="Correo electrónico" v-model="email" />
                    <i class="fas fa-envelope"></i>
                </div>
                <div class="input-field">
                    <input type="password" class="input" placeholder="Contraseña" v-model="password" />
                    <i class="fas fa-lock"></i>
                </div>
                <button class="submit" type="submit">Iniciar</button>
                <div class="remember-me">
                    <input type="checkbox" id="remember" />
                    <label for="remember">Recordarme</label>
                </div>
                <div class="forgot-password">
                    <a href="#">¿Olvidaste la contraseña?</a>
                </div>
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
    background-image: url("../img/gym.jpg");
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

.input-field i {
    position: absolute;
    top: 12px;
    left: 15px;
    font-size: 18px;
    color: #666;
}

.submit {
    width: 100%;
    height: 45px;
    padding: 10px;
    border: none;
    border-radius: 10px;
    font-size: 16px;
    color: #fff;
    background-color: #4caf50;
    cursor: pointer;
}

.submit:hover {
    background-color: #3e8e41;
}

.remember-me {
    display: flex;
    align-items: center;
    margin-top: 10px;
}

.remember-me input[type="checkbox"] {
    width: 20px;
    height: 20px;
    margin-right: 10px;
}

.remember-me label {
    font-size: 16px;
    color: #666;
}

.forgot-password {
    margin-top: 10px;
    text-align: right;
}

.forgot-password a {
    font-size: 16px;
    color: #666;
    text-decoration: none;
}
</style>
