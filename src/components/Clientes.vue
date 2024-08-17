<script setup>
import { ref, onMounted, watch } from "vue";
import { useStoreClientes } from "../stores/clientes.js";
import { useStorePlanes } from "../stores/planes.js";
import { useQuasar } from "quasar";
import { format } from "date-fns";
import Chart from "chart.js/auto";

const $q = useQuasar();

const useCliente = useStoreClientes();
const usePlan = useStorePlanes();

// Variables para el funcionamiento de la tabla
let rows = ref([]);
let columns = ref([
  {
    name: "nombre",
    sortable: true,
    label: "Nombre Usuario",
    field: "nombre",
    align: "center",
  },
  {
    name: "correo",
    sortable: true,
    label: "Correo",
    field: "correo",
    align: "center",
  },
  {
    name: "fechaIngreso",
    sortable: true,
    label: "Fecha de ingreso",
    field: "fechaIngreso",
    align: "center",
  },
  {
    name: "documento",
    label: "Documento",
    field: "documento",
    align: "center",
  },
  {
    name: "fechaNacimiento",
    sortable: true,
    label: "Fecha de nacimiento",
    field: "fechaNacimiento",
    align: "center",
  },
  {
    name: "edad",
    sortable: true,
    label: "Edad",
    field: "edad",
    align: "center",
  },
  {
    name: "direccion",
    label: "Direccion",
    field: "direccion",
    align: "center",
  },
  { name: "telefono", label: "Telefono", field: "telefono", align: "center" },
  { name: "objetivo", label: "Objetivo", field: "objetivo", align: "center" },
  {
    name: "observaciones",
    label: "Observaciones",
    field: "observaciones",
    align: "center",
  },
  { name: "plan", label: "Plan", field: "plan", align: "center" },
  {
    name: "estado",
    sortable: true,
    label: "Estado",
    field: "estado",
    align: "center",
  },
  {
    name: "seguimiento",
    label: "Seguimiento",
    field: "seguimiento",
    align: "center",
  },
  { name: "opciones", label: "Opciones", field: "opciones", align: "center" },
]);

let planesTodo = ref([]);

// Variable que contendra el id del cliente a editar, se actualiza cada vez que le den al boton de actualizar en la tabla
const datos = ref("");
const datosSeguimiento = ref("");

const segui = ref([]);
const idSegui = ref("");
const mostrarSeguimientoCliente = ref(false);

// Variables que contiene los datos ingresados en el formulario cliente
let nombreCliente = ref("");
let tipoDocumento = ref("");
let documentoCliente = ref("");
let ingresoCliente = ref("");
let nacimientoCliente = ref("");
let residenciaCliente = ref("");
let telefonoCliente = ref("");
let objetivoCliente = ref("");
let planCliente = ref("");
let observacionesCliente = ref("");
let correoCliente = ref("");

// Variables que contiene los datos ingresados en el formulario seguimiento
let fechaSeguimiento = ref("");
let pesoSeguimiento = ref("");
let brazoSeguimiento = ref("");
let piernaSeguimiento = ref("");
let cinturaSeguimiento = ref("");
let estaturaSeguimiento = ref("");
let clienteSeguimiento = ref("");

// Variable para controlar el dato que se mostrara en la tabla
const opcionBusqueda = ref("todos");

//Variables para administrar lo que se ve en la pantalla
const mostrarGrafico = ref(true);
const mostrarFormularioCliente = ref(false);
const mostrarFormularioSeguimiento = ref(false);
const mostrarBotonEnviar = ref(false);
const mostrarBotonEnviarSeguimiento = ref(false);
const loading = ref(true); // Agregar estado de carga

// Variables que se usan en el formulario
// CC = Cedula de Ciudadania, TI = Tarjeta de Identidad, CE = Cedula Extranjera, PS = Pasaporte, TE = Tarjeta Estudiantil, Otro = Documento que no este en la lista
const tipoD = ["CC", "TI", "CE", "PS", "TE", "Otro"];
const codigoValor = ref([]);
const documentoNombre = ref([]);

const estadoBuscar = ref("ninguno");

const planAbuscar = ref("");
const cumpleanioAbuscar = ref("");
const ingresoAbuscar = ref("");

const botonBuscar = ref(false);
const botonEstado = ref("ninguno");

const today = new Date();
const formattedToday = today.toISOString().split("T")[0];
const maxDate = ref(formattedToday);

// const notificacionL = computed(() => {
//     let cosoL = useCliente.loading

//     if (cosoL == true) {
//         return $q.notify({
// 					type: "negative",
// 					message: "Parece que hubo un error en el registro",
// 					position: "bottom-right",
// 				});
//     }
// })

const organizarPlanes = () => {
  codigoValor.value = planesTodo.value.map((element) => ({
    label: `${element.descripcion} / ${element.valor}`,
    valor: `${element._id}`,
    nombre: `${element.descripcion}`,
  }));
  return codigoValor.value;
};

const organizarClientes = () => {
  documentoNombre.value = rows.value.map((element) => ({
    label: `${element.documento} / ${element.nombre}`,
    valor: `${element._id}`,
    nombre: `${element.nombre}`,
  }));
  return documentoNombre.value;
};

const fechaBonita = (info) => {
  const fecha = new Date(info);

  // Obtener la parte de la fecha antes de la 'T'
  const fechaSolo = fecha.toISOString().split("T")[0];

  // Reemplazar los guiones por barras
  const fechaFormateada = fechaSolo.replace(/-/g, "/");

  return fechaFormateada;
};

const planC = () => {
  estadoBuscar.value = "plan";
  botonBuscar.value = true;
  botonEstado.value = "plan";
};

const cumC = () => {
  estadoBuscar.value = "cumpleanios";
  botonBuscar.value = true;
  botonEstado.value = "cumpleanios";
};

const ingC = () => {
  estadoBuscar.value = "ingresos";
  botonBuscar.value = true;
  botonEstado.value = "ingresos";
};

// Funcion para manejar los datos mostrados en la tabla
const estadoTabla = () => {
  switch (opcionBusqueda.value) {
    case "activas":
      listarClientesActivos();
      break;
    case "inactivos":
      listarClientesInactivos();
      break;
    case "plan":
      planC();
      break;
    case "cumpleanios":
      cumC();
      break;
    case "ingresos":
      ingC();
      break;
    default:
      listarClientes();
      break;
  }
};

// Funcion para dependiendo de la busqueda el boton llame la funcion que es
const tipoBoton = () => {
  switch (botonEstado.value) {
    case "plan":
      listarClientesPlan();
      break;
    case "cumpleanios":
      listarClientesCumpleanios();
      break;
    case "ingresos":
      listarClientesIngresaron();
      break;
    default:
      console.log("sali");
      break;
  }
};

function formatoNumerico(numero) {
  if (typeof numero === "number") {
    numero = numero.toString();
  }

  if (numero.length >= 4) {
    const partes = [];
    let contadorPuntos = 0;

    for (let i = numero.length - 1; i >= 0; i--) {
      partes.unshift(numero.charAt(i));
      contadorPuntos++;

      if (contadorPuntos === 3 && i !== 0) {
        partes.unshift(".");
        contadorPuntos = 0;
      }
    }

    return partes.join("");
  }

  return numero;
}

async function listarDatos() {
  await Promise.all([listarPlanes(), listarClientes()]);
  loading.value = false; // Datos cargados
}

//Funcion que se encarga de traer todos los clientes
async function listarClientes() {
  try {
    loading.value = true;
    estadoBuscar.value = "ninguno";
    botonBuscar.value = false;
    botonEstado.value = "ninguno";
    const res = await useCliente.getClientes();
    rows.value = res.data.clientes;
    organizarClientes();
  } catch (error) {
    console.error("Error al listar los clientes:", error);
  } finally {
    loading.value = false;
  }
}

//Funcion que se encarga de traer todos los clientes activos
async function listarClientesActivos() {
  try {
    loading.value = true;
    estadoBuscar.value = "ninguno";
    botonBuscar.value = false;
    botonEstado.value = "ninguno";
    const res = await useCliente.getClientesActivos();
    rows.value = res.data.clientes;
  } catch (error) {
    console.error("Error al listar los clientes activos:", error);
  } finally {
    loading.value = false;
  }
}

//Funcion que se encarga de traer todos los clientes inactivos
async function listarClientesInactivos() {
  try {
    loading.value = true;
    estadoBuscar.value = "ninguno";
    botonBuscar.value = false;
    botonEstado.value = "ninguno";
    const res = await useCliente.getClientesInactivos();
    rows.value = res.data.clientes;
  } catch (error) {
    console.error("Error al listar los clientes inactivos:", error);
  } finally {
    loading.value = false;
  }
}

async function listarClientesPlan() {
  try {
    loading.value = true;
    const res = await useCliente.getClientesPlan(planAbuscar.value.valor);
    rows.value = res.data.clientes;
  } catch (error) {
    console.error("Error al listar los clientes por plan:", error);
  } finally {
    loading.value = false;
  }
}

//Funcion que se encarga de traer todos los clientes por su fecha de cumpleaños
async function listarClientesCumpleanios() {
  try {
    loading.value = true;
    const res = await useCliente.getClientesCumpleanios(
      cumpleanioAbuscar.value
    );
    console.log(cumpleanioAbuscar.value);
    rows.value = res.data.clientes;
  } catch (error) {
    console.error("Error al listar los clientes por cumpleaños:", error);
  } finally {
    loading.value = false;
  }
}

//Funcion que se encarga de traer todos los clientes por su fecha de ingreso
async function listarClientesIngresaron() {
  try {
    loading.value = true;
    const res = await useCliente.getClientesIngresaron(ingresoAbuscar.value);
    rows.value = res.data.clientes;
  } catch (error) {
    console.error("Error al listar los clientes por ingreso:", error);
  } finally {
    loading.value = false;
  }
}

async function listarClientesSeguimiento(id) {
  try {
    loading.value = true;
    const res = await useCliente.getClientesSeguimiento(id);
    console.log(res.data.clientes.seguimiento);
    segui.value = res.data.clientes.seguimiento;
    idSegui.value = id;
    mostrarSeguimientoCliente.value = true;
  } catch (error) {
    console.error("Error al listar el seguimiento:", error);
  } finally {
    loading.value = false;
  }
}

//Funcion que se encarga de traer todos los clientes
async function listarPlanes() {
  try {
    const res = await usePlan.getPlanes();
    planesTodo.value = res.data.planes;
    organizarPlanes();
  } catch (error) {
    console.error("Error al listar los planes:", error);
  }
}

//Funcion que se encarga de cambiar el estado de un cliente
async function editarEstado(elemento) {
  try {
    loading.value = true;
    if (elemento.estado === 1) {
      const res = await useCliente.putClientesInactivar(elemento._id);
    } else if (elemento.estado === 0) {
      const res = await useCliente.putClientesActivar(elemento._id);
    }
    listarClientes();
  } catch (error) {
    console.error("Error al editar el estado del cliente:", error);
  } finally {
    loading.value = false;
  }
}

//Funcion que se encarga de enviar los datos del registro
async function registrar() {
  if (await validarDatos()) {
    try {
      loading.value = true;
      let hoy = new Date();
      hoy.setHours(0, 0, 0, 0);
      const fNacimiento = new Date(nacimientoCliente.value);
      const diferenciaEnMilisegundos = hoy - fNacimiento; // Cambiado de fNacimiento - hoy a hoy - fNacimiento

      const msPorAño = 1000 * 60 * 60 * 24 * 365.25;
      const edad = Math.floor(diferenciaEnMilisegundos / msPorAño);

      const info = {
        nombre: nombreCliente.value,
        tipoDocumento: tipoDocumento.value,
        documento: documentoCliente.value,
        fechaNacimiento: nacimientoCliente.value,
        fechaIngreso: ingresoCliente.value,
        edad: edad,
        direccion: residenciaCliente.value,
        telefono: telefonoCliente.value,
        objetivo: objetivoCliente.value,
        plan: planCliente.value.nombre,
        _idPlan: planCliente.value.valor,
        observaciones: observacionesCliente.value,
        correo: correoCliente.value,
      };
      const res = await useCliente.postClientes(info);
      if (res.status !== 200) {
        $q.notify({
          type: "negative",
          message: "Parece que hubo un error en el registro",
          position: "bottom-right",
        });
      } else {
        $q.notify({
          type: "positive",
          message: "El registro se ha realizado correctamente",
          position: "bottom-right",
        });
        listarClientes();
        mostrarFormularioCliente.value = false;
      }
    } catch (error) {
      console.error("Error al registrar cliente:", error);
    } finally {
      loading.value = false;
    }
  }
}

async function registrarSeguimiento() {
  if (await validarDatosSeguimiento()) {
    try {
      loading.value = true;
      const a = estaturaSeguimiento.value / 100;
      let imcCalculado = pesoSeguimiento.value / (a * a);

      console.log(imcCalculado);

      const info = {
        fecha: fechaSeguimiento.value,
        peso: pesoSeguimiento.value,
        brazo: brazoSeguimiento.value,
        pierna: piernaSeguimiento.value,
        cintura: cinturaSeguimiento.value,
        estatura: estaturaSeguimiento.value,
        imc: imcCalculado,
      };

      const res = await useCliente.postClientesSeguimiento(
        clienteSeguimiento.value.valor,
        info
      );
      if (res.status !== 200) {
        $q.notify({
          type: "negative",
          message: "Parece que hubo un error en el registro",
          position: "bottom-right",
        });
      } else {
        $q.notify({
          type: "positive",
          message: "El registro se ha realizado correctamente",
          position: "bottom-right",
        });
        listarClientes();
        mostrarFormularioSeguimiento.value = false;
      }
    } catch (error) {
      console.error("Error al registrar seguimiento:", error);
    } finally {
      loading.value = false;
    }
  }
}

async function editar() {
  if (await validarDatos()) {
    try {
      loading.value = true;
      let hoy = new Date();
      hoy.setHours(0, 0, 0, 0);
      const fNacimiento = new Date(nacimientoCliente.value);
      const diferenciaEnMilisegundos = hoy - fNacimiento; // Cambiado de fNacimiento - hoy a hoy - fNacimiento

      const msPorAño = 1000 * 60 * 60 * 24 * 365.25;
      const edad = Math.floor(diferenciaEnMilisegundos / msPorAño);

      const info = {
        nombre: nombreCliente.value,
        tipoDocumento: tipoDocumento.value,
        documento: documentoCliente.value,
        fechaNacimiento: nacimientoCliente.value,
        fechaIngreso: ingresoCliente.value,
        edad: edad,
        direccion: residenciaCliente.value,
        telefono: telefonoCliente.value,
        objetivo: objetivoCliente.value,
        plan: planCliente.value.nombre,
        _idPlan: planCliente.value.valor,
        observaciones: observacionesCliente.value,
        correo: correoCliente.value,
      };
      const res = await useCliente.putClientes(datos.value._id, info);
      if (res.status !== 200) {
        $q.notify({
          type: "negative",
          message: "Parece que hubo un error en la edición",
          position: "bottom-right",
        });
      } else {
        $q.notify({
          type: "positive",
          message: "El cliente se ha editado correctamente",
          position: "bottom-right",
        });
        listarClientes();
        mostrarFormularioCliente.value = false;
      }
    } catch (error) {
      console.error("Error al editar cliente:", error);
    } finally {
      loading.value = false;
    }
  }
}

async function editarSeguimiento() {
  if (await validarDatosSeguimiento()) {
    try {
      loading.value = true;
      const a = estaturaSeguimiento.value / 100;
      let imcCalculado = pesoSeguimiento.value / (a * a);

      const info = {
        index: datosSeguimiento.value._id,
        fecha: fechaSeguimiento.value,
        peso: pesoSeguimiento.value,
        brazo: brazoSeguimiento.value,
        pierna: piernaSeguimiento.value,
        cintura: cinturaSeguimiento.value,
        estatura: estaturaSeguimiento.value,
        imc: imcCalculado,
      };

      console.log("info", info);
      console.log("extra", idSegui.value);
      const res = await useCliente.putClientesSeguimiento(idSegui.value, info);
      if (res.status !== 200) {
        $q.notify({
          type: "negative",
          message: "Parece que hubo un error en la edicion",
          position: "bottom-right",
        });
      } else {
        $q.notify({
          type: "positive",
          message: "El seguimiento se a editado correctamente",
          position: "bottom-right",
        });
        listarClientes();
        mostrarFormularioSeguimiento.value = false;
      }
    } catch (error) {
      console.error("Error al editar seguimiento:", error);
    } finally {
      loading.value = false;
    }
  }
}

//Funcion que se encarga de resetear
function resetear() {
  nombreCliente.value = "";
  tipoDocumento.value = "";
  documentoCliente.value = "";
  ingresoCliente.value = "";
  nacimientoCliente.value = "";
  residenciaCliente.value = "";
  telefonoCliente.value = "";
  objetivoCliente.value = "";
  planCliente.value = "";
}

//Funcion que se encarga de validar los datos que se resgistrarán.
async function validarDatos() {
  let verificado = true;
  let hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  let nacimientoDate = new Date(nacimientoCliente.value + "T00:00:00");
  let edad = hoy.getFullYear() - nacimientoDate.getFullYear();
  let mes = hoy.getMonth() - nacimientoDate.getMonth();

  // Ajuste por si el mes actual es antes del mes de nacimiento
  if (mes < 0 || (mes === 0 && hoy.getDate() < nacimientoDate.getDate())) {
    edad--;
  }

  if (
    !nombreCliente.value.trim() &&
    !tipoDocumento.value &&
    !documentoCliente.value.trim() &&
    !residenciaCliente.value.trim() &&
    !telefonoCliente.value.trim() &&
    !nacimientoCliente.value &&
    !ingresoCliente.value &&
    !objetivoCliente.value.trim() &&
    !planCliente.value &&
    !observacionesCliente.value.trim() &&
    !correoCliente.value.trim()
  ) {
    $q.notify({
      type: "negative",
      message: "Llena todos los campos",
      position: "bottom-right",
    });
    verificado = false;
  } else {
    if (!nombreCliente.value.trim()) {
      $q.notify({
        type: "negative",
        message: "El nombre está vacío",
        position: "bottom-right",
      });
      verificado = false;
    }
    if (!correoCliente.value.trim()) {
      $q.notify({
        type: "negative",
        message: "El correo está vacío",
        position: "bottom-right",
      });
      verificado = false;
    }
    if (!tipoDocumento.value) {
      $q.notify({
        type: "negative",
        message: "El tipo de documento está vacío",
        position: "bottom-right",
      });
      verificado = false;
    }
    if (!documentoCliente.value.trim()) {
      $q.notify({
        type: "negative",
        message: "El documento está vacío",
        position: "bottom-right",
      });
      verificado = false;
    } else if (isNaN(documentoCliente.value) || documentoCliente.value < 0) {
      $q.notify({
        type: "negative",
        message: "El documento debe ser un numero valido",
        position: "bottom-right",
      });
      verificado = false;
    }
    if (!ingresoCliente.value) {
      $q.notify({
        type: "negative",
        message: "El ingreso está vacío",
        position: "bottom-right",
      });
      verificado = false;
    }
    if (!nacimientoCliente.value) {
      $q.notify({
        type: "negative",
        message: "La fecha de nacimiento está vacía",
        position: "bottom-right",
      });
      verificado = false;
    } else if (edad < 15) {
      $q.notify({
        type: "negative",
        message: "La edad mínima para registro es 15 años.",
        position: "bottom-right",
      });
      verificado = false;
    }
    if (!residenciaCliente.value.trim()) {
      $q.notify({
        type: "negative",
        message: "La residencia está vacía",
        position: "bottom-right",
      });
      verificado = false;
    }
    if (!telefonoCliente.value.trim()) {
      $q.notify({
        type: "negative",
        message: "El teléfono está vacío",
        position: "bottom-right",
      });
      verificado = false;
    } else if (isNaN(telefonoCliente.value) || telefonoCliente.value < 0) {
      $q.notify({
        type: "negative",
        message: "El teléfono debe ser un número válido",
        position: "bottom-right",
      });
      verificado = false;
    } else if (telefonoCliente.value.length < 8) {
      $q.notify({
        type: "negative",
        message: "El teléfono debe tener mínimo 8 caracteres",
        position: "bottom-right",
      });
      verificado = false;
    }
    if (!objetivoCliente.value.trim()) {
      $q.notify({
        type: "negative",
        message: "El objetivo está vacío",
        position: "bottom-right",
      });
      verificado = false;
    }
    if (!observacionesCliente.value.trim()) {
      $q.notify({
        type: "negative",
        message: "La observación está vacía",
        position: "bottom-right",
      });
      verificado = false;
    }
    if (!planCliente.value) {
      $q.notify({
        type: "negative",
        message: "El plan está vacío",
        position: "bottom-right",
      });
      verificado = false;
    }
  }
  return verificado;
}

async function validarDatosSeguimiento() {
  let verificado = true;

  // Verifica si todos los campos están vacíos
  if (
    !fechaSeguimiento.value &&
    !pesoSeguimiento.value.trim() &&
    !brazoSeguimiento.value.trim() &&
    !piernaSeguimiento.value.trim() &&
    !cinturaSeguimiento.value.trim() &&
    !estaturaSeguimiento.value.trim()
  ) {
    $q.notify({
      type: "negative",
      message: "LLena todos los campos",
      position: "bottom-right",
    });
    verificado = false;
  } else {
    // Validación de fecha
    if (!fechaSeguimiento.value) {
      $q.notify({
        type: "negative",
        message: "La fecha está vacía",
        position: "bottom-right",
      });
      verificado = false;
    }

    // Validación de peso
    if (!pesoSeguimiento.value.trim()) {
      $q.notify({
        type: "negative",
        message: "El peso está vacío",
        position: "bottom-right",
      });
      verificado = false;
    } else if (isNaN(Number(pesoSeguimiento.value))) {
      $q.notify({
        type: "negative",
        message: "El peso debe ser un número",
        position: "bottom-right",
      });
      verificado = false;
    }

    // Validación de brazo
    if (!brazoSeguimiento.value.trim()) {
      $q.notify({
        type: "negative",
        message: "El brazo está vacío",
        position: "bottom-right",
      });
      verificado = false;
    } else if (isNaN(Number(brazoSeguimiento.value))) {
      $q.notify({
        type: "negative",
        message: "El brazo debe ser un número",
        position: "bottom-right",
      });
      verificado = false;
    }

    // Validación de pierna
    if (!piernaSeguimiento.value.trim()) {
      $q.notify({
        type: "negative",
        message: "La pierna está vacía",
        position: "bottom-right",
      });
      verificado = false;
    } else if (isNaN(Number(piernaSeguimiento.value))) {
      $q.notify({
        type: "negative",
        message: "La pierna debe ser un número",
        position: "bottom-right",
      });
      verificado = false;
    }

    // Validación de cintura
    if (!cinturaSeguimiento.value.trim()) {
      $q.notify({
        type: "negative",
        message: "La cintura está vacía",
        position: "bottom-right",
      });
      verificado = false;
    } else if (isNaN(Number(cinturaSeguimiento.value))) {
      $q.notify({
        type: "negative",
        message: "La cintura debe ser un número",
        position: "bottom-right",
      });
      verificado = false;
    }

    // Validación de estatura
    if (!estaturaSeguimiento.value.trim()) {
      $q.notify({
        type: "negative",
        message: "La estatura está vacía",
        position: "bottom-right",
      });
      verificado = false;
    } else if (isNaN(Number(estaturaSeguimiento.value))) {
      $q.notify({
        type: "negative",
        message: "La estatura debe ser un número",
        position: "bottom-right",
      });
      verificado = false;
    }
  }
  return verificado;
}

function editarVistaFondo(boolean, extra, boton) {
  datos.value = extra;
  console.log(datos.value);
  if (boton == false && extra != null) {
    const formatoISOfn = datos.value.fechaNacimiento;
    const formatoDatefn = formatoISOfn.substring(0, 10);
    const formatoISOfi = datos.value.fechaIngreso;
    const formatoDatefi = formatoISOfi.substring(0, 10);

    const plan = codigoValor.value.find(
      (element) => element.valor === datos.value._idPlan
    );
    const tipoDoc = tipoD.find(
      (element) => element == datos.value.tipoDocumento
    );

    console.log(datos.value.documento);

    nombreCliente.value = String(datos.value.nombre);
    tipoDocumento.value = tipoDoc;
    documentoCliente.value = String(datos.value.documento);
    nacimientoCliente.value = formatoDatefn;
    ingresoCliente.value = formatoDatefi;
    residenciaCliente.value = String(datos.value.direccion);
    telefonoCliente.value = String(datos.value.telefono);
    objetivoCliente.value = String(datos.value.objetivo);
    planCliente.value = plan;
    observacionesCliente.value = String(datos.value.observaciones);
    correoCliente.value = String(datos.value.correo);
  } else {
    nombreCliente.value = "";
    tipoDocumento.value = "";
    documentoCliente.value = "";
    ingresoCliente.value = "";
    nacimientoCliente.value = "";
    residenciaCliente.value = "";
    telefonoCliente.value = "";
    objetivoCliente.value = "";
    planCliente.value = "";
    observacionesCliente.value = "";
    correoCliente.value = "";
  }

  mostrarBotonEnviar.value = boton;
  mostrarFormularioCliente.value = boolean;
}

function editarVistaFondoSeguimiento(boolean, extra, boton) {
  datosSeguimiento.value = extra;
  console.log(datosSeguimiento.value);
  if (boton == false && extra != null) {
    const formatoISOf = datosSeguimiento.value.fecha;
    const formatoDatef = formatoISOf.substring(0, 10);
    fechaSeguimiento.value = formatoDatef;
    pesoSeguimiento.value = String(datosSeguimiento.value.peso);
    brazoSeguimiento.value = String(datosSeguimiento.value.brazo);
    piernaSeguimiento.value = String(datosSeguimiento.value.pierna);
    cinturaSeguimiento.value = String(datosSeguimiento.value.cintura);
    estaturaSeguimiento.value = String(datosSeguimiento.value.estatura);
  } else {
    fechaSeguimiento.value = "";
    pesoSeguimiento.value = "";
    brazoSeguimiento.value = "";
    piernaSeguimiento.value = "";
    cinturaSeguimiento.value = "";
    estaturaSeguimiento.value = "";
  }

  mostrarBotonEnviarSeguimiento.value = boton;
  console.log(mostrarBotonEnviar.value);
  mostrarFormularioSeguimiento.value = boolean;
  mostrarSeguimientoCliente.value = false;
}

function verSeguimiento(seguimiento) {
  seguimiento.forEach((item) => {
    const estaturaMetros = item.estatura / 100;
    item.imc = item.peso / (estaturaMetros * estaturaMetros);
  });
  segui.value = seguimiento;
  mostrarSeguimientoCliente.value = true;
}

function cerrarSeguimiento() {
  mostrarSeguimientoCliente.value = false;
}

function calcularEstadoIMC(imc) {
  if (imc < 18.5) {
    return "Bajo peso";
  } else if (imc >= 18.5 && imc < 24.9) {
    return "Peso Normal";
  } else if (imc >= 25 && imc < 29.9) {
    return "Sobrepeso";
  } else if (imc >= 30 && imc < 34.9) {
    return "Obesidad I";
  } else if (imc >= 35 && imc < 39.9) {
    return "Obesidad II";
  } else if (imc >= 40) {
    return "Obesidad III";
  }
}

let myChart;

function generarGrafico(metrica) {
  if (myChart) {
    myChart.destroy();
  }

  mostrarGrafico.value = true;

  const etiquetas = segui.value.map((i) => i.fecha.split("T")[0]);
  const etiqueta = segui.value.map((i) => i[metrica]);

  console.log(etiquetas, etiqueta);

  const data = {
    labels: etiquetas,
    datasets: [
      {
        label: metrica,
        backgroundColor: "#fffa023f",
        borderColor: "black",
        data: etiqueta,
        fill: false,
      },
    ],
  };

  const config = {
    type: "line",
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Fecha'
          }
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: metrica
          }
        }
      },
      plugins: {
        legend: {
          display: true,
          position: 'top'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return context.dataset.label + ': ' + context.raw;
            }
          }
        }
      }
    },
  };

  myChart = new Chart(document.getElementById("myChart"), config);
}

let myChart = new Chart()

function generarGrafico(metrica) {
	myChart.destroy();
	mostrarGrafico.value = true;
	const etiquetas = segui.value.map(i => i.fecha.split("T")[0]);
	const etiqueta = segui.value.map(i => i[metrica]);

	console.log(etiquetas, etiqueta);
	const data = {
		labels: etiquetas,
		datasets: [{
			label: metrica,
			backgroundColor: "#fffa023f",
			borderColor: "black",
			data: etiqueta,
			fill: false,
		}]
	}

	const config = {
		type: 'line',
		data: data,
		options: {}
	}

	myChart = new Chart(
		document.getElementById("myChart"),
		config
	)

}

watch(opcionBusqueda, estadoTabla);

onMounted(() => {
  listarDatos();
});
</script>

<template>
  <div>
    <q-inner-loading
      :showing="loading"
      label="Please wait..."
      label-class="text-teal"
      label-style="font-size: 1.1em"
    />
    <div class="q-pa-md">
      <div>
        <q-btn v-if="!loading" @click="editarVistaFondo(true, null, true)">
          agregar
        </q-btn>
      </div>
      <div>
        <q-btn
          v-if="!loading"
          @click="editarVistaFondoSeguimiento(true, null, true)"
        >
          agregar seguimiento
        </q-btn>
      </div>
      <div v-if="!loading" class="text-h2 text-center">Clientes</div>
      <hr v-if="!loading" class="bg-primary no-border" style="height: 4px" />
      <q-option-group
        v-if="!loading"
        v-model="opcionBusqueda"
        inline
        class="q-mb-md"
        :options="[
          { label: 'Todos (predeterminado)', value: 'todos' },
          { label: 'Activos', value: 'activas' },
          { label: 'Inactivos', value: 'inactivos' },
          { label: 'Por plan', value: 'plan' },
          { label: 'Por cumpleaños', value: 'cumpleanios' },
          { label: 'Por ingreso', value: 'ingresos' },
        ]"
      />
      <div class="row">
        <q-select
          v-if="estadoBuscar == 'plan'"
          standout="bg-green text-white"
          :options="organizarPlanes()"
          option-value="valor"
          option-label="label"
          label="Plan"
          v-model="planAbuscar"
          style="width: 200px"
        />
        <q-input
          v-if="estadoBuscar == 'cumpleanios'"
          standout="bg-green text-white"
          type="date"
          label="Cumpleaños"
          v-model="cumpleanioAbuscar"
          style="width: 200px"
        />
        <q-input
          v-if="estadoBuscar == 'ingresos'"
          standout="bg-green text-white"
          type="date"
          label="Ingresaron"
          v-model="ingresoAbuscar"
          style="width: 200px"
        />
        <q-btn v-if="botonBuscar" @click="tipoBoton"> 🔎 </q-btn>
      </div>
      <q-table
        v-if="!loading"
        flat
        bordered
        title="Clientes"
        :rows="rows"
        :columns="columns"
        row-key="id"
      >
        <template v-slot:body-cell-fechaIngreso="props">
          <q-td :props="props">
            <p>{{ fechaBonita(props.row.fechaIngreso) }}</p>
          </q-td>
        </template>
        <template v-slot:body-cell-fechaNacimiento="props">
          <q-td :props="props">
            <p>{{ fechaBonita(props.row.fechaNacimiento) }}</p>
          </q-td>
        </template>
        <template v-slot:body-cell-documento="props">
          <q-td :props="props">
            <p>{{ formatoNumerico(props.row.documento) }}</p>
          </q-td>
        </template>
        <template v-slot:body-cell-opciones="props">
          <q-td :props="props">
            <q-btn @click="editarVistaFondo(true, props.row, false)">
              ✏️
            </q-btn>
            <q-btn
              v-if="props.row.estado == 1"
              @click="editarEstado(props.row)"
            >
              ❌
            </q-btn>
            <q-btn v-else @click="editarEstado(props.row)"> ✅ </q-btn>
          </q-td>
        </template>
        <template v-slot:body-cell-seguimiento="props">
          <!--Linea añadida-->
          <q-td :props="props">
            <q-btn @click="listarClientesSeguimiento(props.row._id)">
              📋
            </q-btn>
          </q-td>
        </template>
        <template v-slot:body-cell-estado="props">
          <q-td :props="props">
            <p v-if="props.row.estado == 1" style="color: green">Activo</p>
            <p v-else style="color: red">Inactivo</p>
          </q-td>
        </template>
      </q-table>
    </div>
    <div id="seguimientoCliente" v-if="mostrarSeguimientoCliente == true">
      <section>
        <div class="row text-h4" style="text-align: center; margin: 15px">
          Seguimiento
        </div>

        <button
          id="botonCerrarS"
          @click="cerrarSeguimiento()"
          class="botonSeguimiento"
        >
          Cerrar
        </button>

        <div id="aa" class="row">
          <q-markup-table v-for="item in segui" :key="item._id">
            <tbody>
              <tr>
                <td class="text-center">Fecha:</td>
                <td class="text-center">
                  {{ fechaBonita(item.fecha) }}
                </td>
              </tr>
              <tr>
                <td class="text-center">Brazo:</td>
                <td class="text-center">
                  <button @click="generarGrafico('brazo')">
                    {{ item.brazo }} cm
                  </button>
                </td>
              </tr>
              <tr>
                <td class="text-center">Cintura:</td>
                <td class="text-center">
                  <button @click="generarGrafico('cintura')">
                    {{ item.cintura }} cm
                  </button>
                </td>
              </tr>
              <tr>
                <td class="text-center">Pierna:</td>
                <td class="text-center">
                  <button @click="generarGrafico('pierna')">
                    {{ item.pierna }} cm
                  </button>
                </td>
              </tr>
              <tr>
                <td class="text-center">Estatura:</td>
                <td class="text-center">
                  <button @click="generarGrafico('estatura')">
                    {{ item.estatura }} cm
                  </button>
                </td>
              </tr>
              <tr>
                <td class="text-center">IMC:</td>
                <td class="text-center">
                  <button @click="generarGrafico('imc')">
                    {{ item.imc.toFixed(2) }}
                  </button>
                </td>
              </tr>
              <tr
                v-bind:style="{
                  backgroundColor:
                    calcularEstadoIMC(item.imc) === 'Bajo peso'
                      ? 'rgb(52, 152, 219)'
                      : calcularEstadoIMC(item.imc) === 'Peso Normal'
                      ? 'rgb(46, 204, 113)'
                      : calcularEstadoIMC(item.imc) === 'Sobrepeso'
                      ? 'rgb(241, 196, 15)'
                      : calcularEstadoIMC(item.imc) === 'Obesidad I'
                      ? 'rgb(230, 126, 34)'
                      : calcularEstadoIMC(item.imc) === 'Obesidad II'
                      ? 'rgb(231, 76, 60)'
                      : calcularEstadoIMC(item.imc) === 'Obesidad III'
                      ? 'rgb(192, 57, 43)'
                      : 'inherit',
                }"
              >
                <td class="text-center">Estado:</td>
                <td class="text-center">
                  {{ calcularEstadoIMC(item.imc) }}
                </td>
              </tr>
              <tr>
                <td class="text-center">Peso:</td>
                <td class="text-center">
                  <button @click="generarGrafico('peso')">
                    {{ item.peso }} kg
                  </button>
                </td>
              </tr>
            </tbody>
            <button
              class="botonSeguimiento"
              @click="editarVistaFondoSeguimiento(true, item, false)"
            >
              Editar
            </button>
          </q-markup-table>
        </div>
      </section>
    </div>
    <div id="formularioCliente" v-if="mostrarFormularioCliente == true">
      <q-form
        @submit="mostrarBotonEnviar ? registrar() : editar()"
        @reset="editarVistaFondo(false, null, true)"
        class="q-gutter-md"
      >
        <q-input
          standout="bg-green text-white"
          type="text"
          label="Nombre"
          v-model="nombreCliente"
        />
        <q-input
          standout="bg-green text-white"
          type="text"
          label="Correo"
          v-model="correoCliente"
        />
        <q-select
          standout="bg-green text-white"
          :options="tipoD"
          label="Tipo de Documento"
          v-model="tipoDocumento"
        />
        <q-input
          standout="bg-green text-white"
          type="text"
          label="Documento"
          v-model="documentoCliente"
        />
        <q-input
          standout="bg-green text-white"
          type="date"
          label="Fecha de ingreso"
          v-model="ingresoCliente"
          :max="maxDate"
        />
        <q-input
          standout="bg-green text-white"
          type="date"
          label="Fecha de Nacimiento"
          v-model="nacimientoCliente"
          :max="maxDate"
        />
        <q-input
          standout="bg-green text-white"
          type="text"
          label="Direccion"
          v-model="residenciaCliente"
        />
        <q-input
          standout="bg-green text-white"
          type="tel"
          label="Telefono"
          v-model="telefonoCliente"
        />
        <q-input
          standout="bg-green text-white"
          type="text"
          label="Objetivo"
          v-model="objetivoCliente"
        />
        <q-input
          standout="bg-green text-white"
          type="text"
          label="Observaciones"
          v-model="observacionesCliente"
        />
        <!-- <q-input standout="bg-green text-white" type="text" label="Observaciones" v-model="observacionesCliente" /> -->
        <q-select
          standout="bg-green text-white"
          :options="organizarPlanes()"
          option-value="valor"
          option-label="label"
          label="Plan"
          v-model="planCliente"
        />
        <div>
          <q-btn
            v-if="mostrarBotonEnviar"
            label="Enviar"
            type="submit"
            color="primary"
          />
          <q-btn v-else label="Actualizar" type="submit" color="primary" />
          <q-btn
            label="Cerrar"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form>
      <button id="botonF" @click="editarVistaFondo(false, null, true)"></button>
    </div>
    <div id="formularioSeguimiento" v-if="mostrarFormularioSeguimiento == true">
      <q-form
        @submit="
          mostrarBotonEnviarSeguimiento
            ? registrarSeguimiento()
            : editarSeguimiento()
        "
        @reset="editarVistaFondoSeguimiento(false, null, true)"
        class="q-gutter-md"
      >
        <q-select
          v-if="mostrarBotonEnviarSeguimiento"
          standout="bg-green text-white"
          :options="organizarClientes()"
          option-value="valor"
          option-label="label"
          label="Cliente"
          v-model="clienteSeguimiento"
        />
        <q-input
          standout="bg-green text-white"
          type="date"
          label="Fecha del seguimiento"
          v-model="fechaSeguimiento"
        />
        <q-input
          standout="bg-green text-white"
          type="text"
          label="Peso"
          v-model="pesoSeguimiento"
          hint="en Kilogramos"
        />
        <q-input
          standout="bg-green text-white"
          type="text"
          label="Brazo"
          v-model="brazoSeguimiento"
          hint="en Centimetros"
        />
        <q-input
          standout="bg-green text-white"
          type="text"
          label="Pierna"
          v-model="piernaSeguimiento"
          hint="en Centimetros"
        />
        <q-input
          standout="bg-green text-white"
          type="text"
          label="Cintura"
          v-model="cinturaSeguimiento"
          hint="en Centimetros"
        />
        <q-input
          standout="bg-green text-white"
          type="text"
          label="Estatura"
          v-model="estaturaSeguimiento"
          hint="en Centimetros"
        />
        <div>
          <q-btn
            v-if="mostrarBotonEnviarSeguimiento"
            label="Enviar"
            type="submit"
            color="primary"
          />
          <q-btn v-else label="Actualizar" type="submit" color="primary" />
          <q-btn
            label="Cerrar"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form>
      <button
        id="botonF"
        @click="editarVistaFondoSeguimiento(false, null, true)"
      ></button>
    </div>
    <div v-if="mostrarGrafico == true" id="grafica">
      <canvas id="myChart"
        >holaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</canvas
      >
    </div>
  </div>
</template>

<style scoped>
#grafica {
  width: 80%;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}


#myChart {
  width: 100% !important;
  height: 400px;
  border-radius: 4px;
  background-color: #fff;
}

#botonCerrarS {
  position: absolute;
  top: 0;
  right: 0;
}

td {
  text-align: left;
}

hr {
  height: 2px;
}

#seguimientoCliente section {
  width: 80%;
  position: absolute;
  top: 6rem;
  left: 50%;
  transform: translate(-50%);
  padding-bottom: 35px;
  background-color: #e7e7e7;
  border-radius: 6;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.botonSeguimiento {
  height: 50px;
  width: 100px;
  margin: 40px 40px;
  padding: 10px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.my-card {
  border-radius: 15px;
}

.q-form {
  background-color: rgb(255, 255, 255);
  padding: 10px 25px 20px 10px;
  border-radius: 1pc;
  width: 30rem;
  z-index: 3;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

#formularioCliente,
#formularioSeguimiento,
#seguimientoCliente {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  overflow: auto;
}

#seguimientoCliente section #aa {
  display: flex;
  flex-direction: row;
  gap: 40px;
  padding-top: 50px;
}

#botonF {
  position: absolute;
  top: 0;
  background-color: rgba(128, 128, 128, 0.205);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  z-index: 1;
}

.q-pa-md {
  padding: 40px;
}

.q-table {
  margin-top: 20px;
}

.q-btn {
  margin: 10px;
}

input[type="text"] {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
}

input[type="submit"] {
  margin-left: 46%;
  background-color: #4caf50;
  margin-top: 2%;
  margin-bottom: 2%;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

input[type="submit"]:hover {
  background-color: #3e8e41;
}

.q-table__title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.q-table__row {
  border-bottom: 1px solid #ddd;
}

.q-table__cell {
  padding: 10px;
}

.q-table__cell:last-child {
  text-align: right;
}

.q-btn[aria-label="❌"] {
  color: #ff0000;
}

.q-btn[aria-label="✅"] {
  color: #00ff00;
}

.q-btn[aria-label="✏️"] {
  color: #0000ff;
}

@media (max-width: 1550px) {
  #formularioCliente,
  #formularioSeguimiento {
    height: auto;
    padding: 50px;
    box-sizing: border-box;
    top: 50px; /* Ajusta la posición para asegurar visibilidad */
  }

  .q-form {
    width: 100%;
    max-width: 600px;
  }
}

@media (max-width: 768px) {
  #formularioCliente,
  #formularioSeguimiento {
    width: 95%;
    padding: 10px;
    top: 10px; /* Asegura que se vea bien en pantallas pequeñas */
  }

  .q-form {
    max-width: 100%;
  }
}
</style>
