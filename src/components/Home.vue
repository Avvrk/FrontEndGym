<script></script>

<template>
	<div>
		<section id="inicio">
			<h2>¡Bienvenido a Forza Gym!</h2>
			<p>
				En Forza Gym, nos dedicamos a tu bienestar y éxito. Nuestro
				equipo de entrenadores altamente calificados está aquí para
				brindarte el apoyo y la orientación que necesitas en cada paso
				de tu viaje fitness. Desde entrenamientos personalizados hasta
				clases grupales emocionantes, estamos aquí para inspirarte,
				motivarte y desafiarte a superar tus límites. Únete a nuestra
				comunidad hoy mismo y descubre el poder de Forza Gym. ¡Estamos
				emocionados de ayudarte a alcanzar tu mejor versión!
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
					Ubicada en el corazón de la ciudad Mallorca, nuestra sede
					Forza Gym Principal es el epicentro de la energía y la
					actividad fitness. Con equipos de vanguardia y un ambiente
					inspirador, es el lugar perfecto para aquellos que buscan un
					enfoque integral para su bienestar.
				</p>
				<img src="../img/sede1.jpg" alt="Instalaciones del gimnasio" />
			</div>

			<div class="sede">
				<h3>Oeste - Nashville</h3>
				<p>
					Nuestra sede se encuentra en la ciudad de Nashville, es más
					que un simple gimnasio; es un punto de encuentro para
					personas de todas las edades y niveles de condición física.
					Con un ambiente acogedor y programas diseñados para fomentar
					la inclusión y el compañerismo, es el lugar perfecto para
					comenzar tu viaje fitness. Nuestra sede Forza Gym Oeste es
					un lugar donde todos son bienvenidos a mejorar su salud y
					bienestar.
				</p>
				<img src="../img/sede2.jpg" alt="Instalaciones del gimnasio" />
			</div>

			<div class="sede">
				<h3>Norte - Envigado</h3>
				<p>
					Sumérgete en el lujo y la comodidad en nuestra sede, Forza
					Gym Norte. Con instalaciones de primera clase y servicios
					exclusivos, es el destino ideal para aquellos que buscan una
					experiencia fitness de alto nivel. Desde entrenamiento
					personalizado hasta clases boutique, aquí encontrarás todo
					lo necesario para entrenar con estilo y alcanzar tus
					objetivos con la máxima comodidad.
				</p>
				<img src="../img/sede3.jpg" alt="Instalaciones del gimnasio" />
			</div>

			<!-- Agrega más sedes si es necesario -->
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
						<textarea
							id="mensaje"
							name="mensaje"
							rows="4"
							cols="50"
							required></textarea>
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

<style scoped>

body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f0f0f0;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

section {
    margin-bottom: 30px;
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

footer {
    text-align: center;
    padding: 10px;
    background-color: #333;
    color: #fff;
}

/* Estilos para el header y la navegación */
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

/* Estilos para las secciones y las sedes */
section {
  padding: 20px;
}

.sede {
  margin-bottom: 40px;
}

.sede img {
  display: block;
  margin: 0 auto;
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
}

/* Estilos para el formulario de contacto */
.formulario {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
}

.formulario h3 {
  text-align: center;
  margin-bottom: 20px;
}

.campo {
  margin-bottom: 20px;
}

.campo label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.campo input[type="text"],
.campo input[type="email"],
.campo textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.campo textarea {
  height: 100px;
}

button[type="submit"] {
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button[type="submit"]:hover {
  background-color: #555;
}

/* Estilos para el footer */
footer {
  background-color: #333;
  color: #fff;
  padding: 20px;
  text-align: center;
}


.q-header{
  height: 75px;
  text-align: center;
  padding: 10px;
}
/* Estilos para el avatar */
.q-avatar img {
/* Hacer el avatar redondo */
  width: 60px; /* Aumento del tamaño del avatar */
  height: 60px;
}

/* Estilos para la barra de herramientas */
.q-toolbar-title {
  display: flex;
  align-items: center;
  color: #fff; /* Color del texto del título */
  font-weight: bold; /* Fuente en negrita */
}
/* Estilos para los enlaces en la barra lateral */
.q-list {
  padding: 25px;
}

.q-item {
  cursor: pointer;
}

.q-item:hover {
  background-color: #cfcfcf; /* Color de fondo al pasar el cursor */
}

.q-item-label {
  font-size: 18px; /* Tamaño del texto */
  margin-left: 10px; /* Espacio entre el icono y el texto */
}
</style>
