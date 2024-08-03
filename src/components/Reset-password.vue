<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useStoreUsuarios } from "../stores/usuarios.js";
import { useQuasar } from "quasar";

const $q = useQuasar();

const useUsuarios = useStoreUsuarios();
const route = useRoute();
const token = ref("");
const aviso = ref("");
const nuevaContrasenia = ref("");
const confirmarContrasenia = ref("");
const passwordFieldType = ref("password");

function togglePasswordVisibility() {
    passwordFieldType.value =
        passwordFieldType.value === "password" ? "text" : "password";
}

async function avisoo() {
    try {
        const res = await useUsuarios.putAviso(token.value);
        if (res.data.code == "ERR_BAD_REQUEST") {
            aviso.value = false;
        }
        aviso.value = true;
        console.log(res);
    } catch (error) {
        console.log(error);
    }
}
async function restablecerContrasenia() {
    if (validarDatos()) {
        try {
            let info = {
                nuevaContrasenia: nuevaContrasenia.value,
            };

            const res = await useUsuarios.putUsuariosPassword(
                token.value,
                info
            );
            if (res.status !== 200) {
                $q.notify({
                    type: "negative",
                    message: "La contraseña no se ah podido actualizar",
                    position: "bottom-right",
                });
            } else {
                $q.notify({
                    type: "positive",
                    message: "La contraseña se ah actualizado correctamente",
                    position: "bottom-right",
                });
            }
        } catch (error) {
            console.error("Error al actualizar la contraseña:", error);
        }
    }
}

function validarDatos() {
    let verificado = true;
    if (!nuevaContrasenia.value.trim() && !confirmarContrasenia.value.trim()) {
        $q.notify({
            type: "negative",
            message: "Llena todo los campos",
            position: "bottom-right",
        });
        verificado = false;
    } else {
        if (!nuevaContrasenia.value.trim()) {
            $q.notify({
                type: "negative",
                message: "La nueva contraseña esta vacia",
                position: "bottom-right",
            });
            verificado = false;
        }
        if (!confirmarContrasenia.value.trim()) {
            $q.notify({
                type: "negative",
                message: "Cofirmar contraseña esta vacia",
                position: "bottom-right",
            });
            verificado = false;
        }
    }
    if (verificado == true) {
        if (nuevaContrasenia.value !== confirmarContrasenia.value) {
            $q.notify({
                type: "negative",
                message: "Las contraseñas deben ser iguales",
                position: "bottom-right",
            });
            verificado = false;
        }
    }
    return verificado;
}

onMounted(() => {
    token.value = route.query.tokenP || "";
    avisoo();
});
</script>

<template>
    <div class="login-container">
        <div id="no" v-if="aviso == false">
            <p>Token No Valido</p>
        </div>
        <div class="login-card" v-else>
            <div class="login-header">
                <h2>Restablecer Contraseña</h2>
                <p>Ingresa tu nueva contraseña</p>
            </div>
            <form>
                <div class="input-field">
                    <input
                        :type="passwordFieldType"
                        class="input"
                        placeholder="Nueva contraseña"
                        v-model="nuevaContrasenia" />
                    <button type="button" @click="togglePasswordVisibility">
                        <q-icon
                            :name="
                                passwordFieldType === 'password'
                                    ? 'visibility_off'
                                    : 'visibility'
                            " />
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
                            :name="
                                passwordFieldType === 'password'
                                    ? 'visibility_off'
                                    : 'visibility'
                            " />
                    </button>
                </div>
                <q-btn
                    class="submit bg-primary"
                    type="submit"
                    :loading="useUsuarios.loading"
                    @click="restablecerContrasenia()">
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
#no {
    width: 80%;
    height: 80%;
    background-color: #ffffff7e;
    filter: blur(0px);
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 80px;
}

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