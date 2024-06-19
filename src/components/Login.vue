<script setup>
import { ref } from "vue";
import { useStoreUsuarios } from "../stores/usuarios";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

const $q = useQuasar();

const router = useRouter();
const useUsuario = useStoreUsuarios();

let email = ref("");
let password = ref("");

async function login() {
    if (validarDatos()) {
        const res = await useUsuario.login(email.value, password.value);
        if (res.code === "ERR_BAD_REQUEST") {
            if (res.response.data.msg === "Usuario / Password no son correctos.") {
                $q.notify({
                    type: "negative",
                    message: "El usuario no existe",
                    position: "bottom-right",
                });
            } else if (res.response.data.msg === "Usuario / Password no son correctos") {
                $q.notify({
                    type: "negative",
                    message: "Correo o contraseña no son correctos",
                    position: "bottom-right",
                });
            } else {
                $q.notify({
                    type: "negative",
                    message: "Error inesperado",
                    position: "bottom-right",
                });
            }
        } else {
            if (res.data.status != 200) {
                router.push("/main/hogar");
            }
        }
    }
}

function validarDatos() {
    let verificado = true;
    if (!email.value && !password.value) {
        $q.notify({
            type: "negative",
            message: "Llenar todos los campos",
            position: "bottom-right",
        });
        verificado = false;
    } else {
        if (!email.value) {
            $q.notify({
                type: "negative",
                message: "El correo no puede estar vacio",
                position: "bottom-right",
            });
            verificado = false;
        }
        if (!password.value) {
            $q.notify({
                type: "negative",
                message: "la contraseña no puede estar vacia",
                position: "bottom-right",
            });
            verificado = false;
        }
    }

    return verificado;
}
</script>

<template>
    <div>
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
                    <q-btn class="submit bg-primary" type="submit" :loading="useUsuario.loading"
                        >Iniciar
                        <template v-slot:loading>
                            <q-spinner color="secondary" size="1em" /> </template
                    ></q-btn>
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
    background-color: primary;
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
