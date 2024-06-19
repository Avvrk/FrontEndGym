const hoy = new Date(); // Fecha actual
const cumpleaños = new Date("2004-12-19"); // Fecha de cumpleaños

// Calculamos la diferencia en milisegundos
const diferenciaEnMilisegundos = hoy - cumpleaños;

// Convertimos la diferencia de milisegundos a años
// 1 año = 365.25 días (para tener en cuenta años bisiestos)
const msPorAño = 1000 * 60 * 60 * 24 * 365.25;
const edad = Math.floor(diferenciaEnMilisegundos / msPorAño);

console.log("Edad:", edad);