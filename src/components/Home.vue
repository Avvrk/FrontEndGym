<template>
  <div>
    <header>
      <h1>Forza Gym</h1>
      <nav>
        <ul>
          <li><a href="#inicio">Inicio</a></li>
          <li><a href="#servicios">Servicios</a></li>
          <li><a href="#instalaciones">Sedes</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
      </nav>
    </header>

    <section id="inicio">
      <h2>¡Bienvenido a Forza Gym!</h2>
      <p>
        En Forza Gym, nos dedicamos a tu bienestar y éxito. Nuestro equipo de entrenadores altamente calificados está aquí para brindarte el apoyo y la orientación que necesitas en cada paso de tu viaje fitness. Desde entrenamientos personalizados hasta clases grupales emocionantes, estamos aquí para inspirarte, motivarte y desafiarte a superar tus límites. Únete a nuestra comunidad hoy mismo y descubre el poder de Forza Gym. ¡Estamos emocionados de ayudarte a alcanzar tu mejor versión!
      </p>
    </section>

    <section id="servicios">
      <h2>Servicios</h2>
      <ul>
        <li>Entrenamiento personalizado</li>
        <li>Clases de crossfit</li>
        <li>Entrenamiento de fuerza</li>
        <li>Clases grupales</li>
        <li>Entrenamiento de resistencia</li>
        <li>Seguimiento nutricional</li>
        <li>Variedad de planes</li>
        <li>Y mucho más...</li>
      </ul>
    </section>

    <section id="instalaciones">
      <h2>Sedes</h2>
      <div class="sede">
        <h3>Principal - Mallorca</h3>
        <p>
          Ubicada en el corazón de la ciudad Mallorca, nuestra sede Forza Gym Principal es el epicentro de la energía y la actividad fitness. Con equipos de vanguardia y un ambiente inspirador, es el lugar perfecto para aquellos que buscan un enfoque integral para su bienestar.
        </p>
        <img src="../img/sede1.jpg" alt="Instalaciones del gimnasio en Mallorca" />
      </div>

      <div class="sede">
        <h3>Oeste - Nashville</h3>
        <p>
          Nuestra sede se encuentra en la ciudad de Nashville, es más que un simple gimnasio; es un punto de encuentro para personas de todas las edades y niveles de condición física. Con un ambiente acogedor y programas diseñados para fomentar la inclusión y el compañerismo, es el lugar perfecto para comenzar tu viaje fitness. Nuestra sede Forza Gym Oeste es un lugar donde todos son bienvenidos a mejorar su salud y bienestar.
        </p>
        <img src="../img/sede2.jpg" alt="Instalaciones del gimnasio en Nashville" />
      </div>

      <div class="sede">
        <h3>Norte - Envigado</h3>
        <p>
          Sumérgete en el lujo y la comodidad en nuestra sede, Forza Gym Norte. Con instalaciones de primera clase y servicios exclusivos, es el destino ideal para aquellos que buscan una experiencia fitness de alto nivel. Desde entrenamiento personalizado hasta clases boutique, aquí encontrarás todo lo necesario para entrenar con estilo y alcanzar tus objetivos con la máxima comodidad.
        </p>
        <img src="../img/sede3.jpg" alt="Instalaciones del gimnasio en Envigado" />
      </div>
    </section>

    <section id="contacto">
      <h2>Contacto</h2>
      <div class="formulario">
        <h3>Envíanos un mensaje</h3>
        <form action="enviar.php" method="post">
          <div class="campo">
            <label for="nombre">Nombre:</label>
            <input type="text" id="nombre" name="nombre" required />
          </div>
          <div class="campo">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div class="campo">
            <label for="mensaje">Mensaje:</label>
            <textarea id="mensaje" name="mensaje" rows="4" required></textarea>
          </div>
          <button type="submit">Enviar mensaje</button>
        </form>
      </div>
    </section>

    <footer>
      <p>Derechos de autor &copy; 2024 Forza Gym</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'ForzaGym'
}
</script>

<style scoped>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f0f0f0;
}

header {
  background-color: #333;
  color: #fff;
  padding: 20px;
  text-align: center;
}

nav ul {
  list-style-type: none;
  padding: 0;
}

nav ul li {
  display: inline;
  margin-right: 10px;
}

nav ul li a {
  text-decoration: none;
  color: #fff;
}

section {
  padding: 20px;
}

h2 {
  color: #333;
}

p {
  line-height: 1.6;
}

ul {
  list-style-type: disc;
  padding-left: 20px;
}

li {
  margin-bottom: 8px;
}

img {
  max-width: 100%;
  height: auto;
}

.formulario {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.campo {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input[type="text"],
input[type="email"],
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  box-sizing: border-box;
}

button[type="submit"] {
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: #45a049;
}

footer {
  text-align: center;
  padding: 10px;
  background-color: #333;
  color: #fff;
}

#inicio {
  background-color: #f9f9f9;
  padding: 40px;
  text-align: center;
}

#servicios {
  background-color: #fff;
  padding: 40px;
}

#instalaciones .sede {
  margin-bottom: 40px;
}

#instalaciones img {
  margin-top: 20px;
}

#contacto {
  background-color: #f9f9f9;
  padding: 40px;
}
</style>