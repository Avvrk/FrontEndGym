<script>
export default {
  name: 'InicioClubFitness'
}


</script>

<template>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />

<!-- Parte de inicio -->
<header class="seccion__contenedor contenedor__encabezado">
    <div class="contenido__encabezado">
        <span class="desenfoque__fondo"></span>
        <span class="desenfoque__fondo desenfoque__encabezado"></span>
        <h4>Expertos en calidad Fitness</h4>
        <br>
        <h1>Todo el <span>ESFUERZO</span> de hoy, será el <span>ÉXITO</span> de mañana.</h1>
        <br>
        <p>
            Libera tu potencial y comienza un viaje hacia tu nueva versión más fuerte.
        </p>
    </div>
</header>

<!-- SECCION SOBRE NOSOTROS -->
<section id="seccionSobreNosotros">
    <div class="contenedor-imagen">
        <img src="../img/logo.png" alt="Fitness Club">
    </div>
    <div class="descripcion">
        <div class="titulo-seccion">
            <p class="encabezado-seccion">Sobre Nosotros</p>
        </div>
        <h2>Conoce <span>FORZA GYM</span></h2>
        <h3>Tu camino al éxito</h3>
        <div class="detalles">
            <p><strong>Ubicación:</strong> Santander, Colombia.</p>
            <p><strong>Horario:</strong> Lunes a Viernes, 6:00 AM - 10:00 PM.</p>
            <p><strong>Contacto:</strong> (123) 456-7890.</p>
        </div>
        <p>En Forza Gym estamos dedicados a ayudarte a alcanzar tus objetivos de fitness. Ofrecemos una amplia gama de servicios y programas de entrenamiento diseñados para todos los niveles de condición física.</p>
        <br>
        <p>Únete a nosotros y descubre un ambiente motivador y de apoyo donde puedes lograr el éxito en tu viaje de fitness.</p>
        <div class="imagen-adicional">
            <img src="../img/chica.jpg" alt="Imagen Adicional">
        </div>
    </div>
</section>

<!-- SECCION MISION, VISIÓN Y VALORES -->
<section id="seccionMisionVisionValores">
    <div class="mision-vision">
        <div class="mision">
            <div class="titulo-seccion">
                <h4>Nuestra Misión</h4>
            </div>
            <p>Ayudar a nuestros miembros a alcanzar sus objetivos de salud y bienestar a través de un ambiente de apoyo y motivación.</p>
            <br>
            <img src="../img/mision.jpg" alt="Nuestra Misión" class="imagen-seccion">
        </div>
        <div class="vision">
            <div class="titulo-seccion">
                <h4>Nuestra Visión</h4>
            </div>
            <p>Ser el gimnasio líder en Colombia, conocido por nuestra excelencia en servicios y programas de entrenamiento.</p>
            <br>
            <img src="../img/vision.jpg" alt="Nuestra Visión" class="imagen-seccion">
        </div>
    </div>
    <div class="valores">
        <div class="titulo-seccion">
            <h4>Valores</h4>
        </div>
        <img src="../img/valores.jpg" alt="Nuestros Valores" class="imagen-valores">
        <p>Nuestros valores fundamentales reflejan nuestra filosofía y compromiso con nuestros miembros y la comunidad.</p>
        <div class="valores-lista">
            <div class="valor-item">
                <h5>Salud y bienestar</h5>
                <p>Nos dedicamos a promover un estilo de vida saludable y equilibrado.</p>
            </div>
            <div class="valor-item">
                <h5>Integridad</h5>
                <p>Actuamos con honestidad y transparencia en todo lo que hacemos.</p>
            </div>
            <div class="valor-item">
                <h5>Comunidad</h5>
                <p>Fomentamos un ambiente inclusivo y solidario para todos.</p>
            </div>
            <div class="valor-item">
                <h5>Innovación</h5>
                <p>Buscamos continuamente nuevas formas de mejorar nuestros servicios.</p>
            </div>
        </div>
    </div>
</section>

<!-- SECCIÓN SERVICIOS -->
<section class="servicios" id="servicios">
    <div class="titulo-seccion">
        <h3>Nuestros Servicios</h3>
    </div>
    <div class="resaltar-servicios">
        <div class="cards-container">
            <div class="card servicio-1">
                <i class="fa-solid fa-person-walking"></i>
                <h4><span class="txtRojo">Clases </span> de Fitness</h4>
                <p>Entrenamientos diseñados para mejorar tu condición física general.</p>
            </div>
            <div class="card servicio-2">
                <i class="fa-solid fa-dumbbell"></i>
                <h4><span class="txtRojo">Clases </span> de Crossfit</h4>
                <p>Desafíos intensos para llevar tu resistencia y fuerza al siguiente nivel.</p>
            </div>
            <div class="card servicio-3">
                <i class="fa-solid fa-mitten"></i>
                <h4><span class="txtRojo">Clases </span> de Boxeo</h4>
                <p>Entrenamientos dinámicos que combinan técnicas de boxeo y fitness.</p>
            </div>
            <div class="card servicio-4">
                <i class="fa-solid fa-clock"></i>
                <h4><span class="txtRojo">Clases </span> de Enduro</h4>
                <p>Sesiones largas para aumentar tu resistencia y fortaleza.</p>
            </div>
            <div class="card servicio-5">
                <i class="fa-solid fa-heart-circle-bolt"></i>
                <h4><span class="txtRojo">Clases </span> de Cardio</h4>
                <p>Ejercicios que mejoran tu salud cardiovascular y resistencia.</p>
            </div>
            <div class="card servicio-6">
                <i class="fa-solid fa-bicycle"></i>
                <h4><span class="txtRojo">Clases </span> de Ciclismo</h4>
                <p>Rutas y sesiones de ciclismo para todos los niveles.</p>
            </div>
        </div>
    </div>
</section>


<!-- SECCIÓN GALERÍA -->
<section id="seccionGaleria">
    <div class="titulo-seccion">
        <h4>Galería</h4>
    </div>
    <div class="galeria-imagenes">
        <div class="imagen-item">
            <img src="../img/galeria1.jpg" alt="Galería 1">
        </div>
        <div class="imagen-item">
            <img src="../img/galeria2.jpg" alt="Galería 2">
        </div>
        <div class="imagen-item">
            <img src="../img/galeria3.jpg" alt="Galería 3">
        </div>
        <div class="imagen-item">
            <img src="../img/galeria4.jpg" alt="Galería 1">
        </div>
        <div class="imagen-item">
            <img src="../img/galeria5.jpg" alt="Galería 2">
        </div>
        <div class="imagen-item">
            <img src="../img/galeria6.jpg" alt="Galería 3">
        </div>
        

    </div>
</section>



<!-- SECCIÓN CONTACTO -->
<section id="seccionContacto">
    <div class="contenedor-contacto">
        <div class="titulo-contacto">
            <h2>Contacto</h2>
        </div>
        <br>
        <p>Nos encantaría saber de ti. Completa el formulario a continuación para enviarnos un mensaje.</p>
        <br>
        <form action="https://formspree.io/f/xjkbgvqe" method="POST">
            <div class="form-group">
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" name="nombre" required placeholder="Tu nombre">
            </div>
            <div class="form-group">
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required placeholder="Tu email">
            </div>
            <div class="form-group">
                <label for="mensaje">Mensaje:</label>
                <textarea id="mensaje" name="mensaje" rows="5" required placeholder="Tu mensaje"></textarea>
            </div>
            <button type="submit" class="btn">Enviar</button>
        </form>
    </div>
</section>

<footer>
    <div class="footer-container">
        <div class="footer-info">
            <p>2024 © <span class="highlight">FORZA GYM</span> Todos los derechos reservados</p>
        </div>
        <div class="footer-social">
            <a href="#" aria-label="Facebook" class="social-icon">
                <i class="fa-brands fa-facebook-f"></i>
            </a>
            <a href="#" aria-label="Twitter" class="social-icon">
                <i class="fa-brands fa-twitter"></i>
            </a>
            <a href="#" aria-label="Instagram" class="social-icon">
                <i class="fa-brands fa-instagram"></i>
            </a>
            <a href="#" aria-label="YouTube" class="social-icon">
                <i class="fa-brands fa-youtube"></i>
            </a>
        </div>
    </div>
</footer>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@200;300;400;500;600&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Montserrat";
}

html {
  scroll-behavior: smooth;
}

/* SECCION HOME */
.seccion__contenedor {
    background: url('../img/Rock.jpg') no-repeat center center/cover;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
}

.contenido__encabezado p {
    color: #fff;
}

.contenido__encabezado {
    text-align: center;
    color: #fff;
    position: relative;
    z-index: 1;
    max-width: 80%;
    padding: 20px;
}

.desenfoque__fondo {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 1);
    filter: blur(100px);
    border-radius: 15px;
    z-index: 0;
}

.desenfoque__encabezado {
    background: rgba(0, 0, 0, 1);
}

.contenido__encabezado h4 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    z-index: 1;
    position: relative;
}

.contenido__encabezado h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    z-index: 1;
    position: relative;
    line-height: 1.2;
}

.contenido__encabezado h1 span {
    color: #f0a500;
}

.contenido__encabezado p {
    font-size: 1.125rem;
    margin-bottom: 2rem;
    z-index: 1;
    position: relative;
}



/* Ajustes responsivos */
@media (max-width: 768px) {
    .contenido__encabezado h4 {
        font-size: 1.25rem;
    }

    .contenido__encabezado h1 {
        font-size: 2rem;
    }

    .contenido__encabezado p {
        font-size: 1rem;
    }
}

@media (max-width: 480px) {
    .contenido__encabezado h4 {
        font-size: 1rem;
    }

    .contenido__encabezado h1 {
        font-size: 1.5rem;
    }

    .contenido__encabezado p {
        font-size: 0.875rem;
    }
}



/* SECCION SOBRE NOSOTROS */
#seccionSobreNosotros {
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    padding: 4rem 2rem;
    background-color: white;
    align-items: center;
}

#seccionSobreNosotros .contenedor-imagen {
    flex: 1;
    max-width: 500px;
}

#seccionSobreNosotros .contenedor-imagen img {
    width: 100%;
    height: auto;
    border-radius: 10px;
    object-fit: cover;
}

#seccionSobreNosotros .descripcion {
    flex: 2;
    padding-left: 2rem;
    max-width: 700px;
}

#seccionSobreNosotros .descripcion .encabezado-seccion {
    font-size: 2rem;
    margin-bottom: 1rem;
}

#seccionSobreNosotros .encabezado-seccion{
    color: #fff;
}

#seccionSobreNosotros .descripcion h2 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
}

#seccionSobreNosotros .descripcion h2 span {
    color: #f0a500;
}

#seccionSobreNosotros .descripcion h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
}

#seccionSobreNosotros .descripcion .detalles {
    margin-bottom: 2rem;
}

#seccionSobreNosotros .descripcion .detalles p {
    margin-bottom: 0.5rem;
}

#seccionSobreNosotros .descripcion p {
    line-height: 1.6;
}


#seccionSobreNosotros .imagen-adicional {
    margin-top: 2rem;
    text-align: center;
}

#seccionSobreNosotros .imagen-adicional img {
    max-width: 100%;
    height: auto;
    border-radius: 10px;
}

/* Ajustes responsivos */
@media (max-width: 768px) {
    #seccionSobreNosotros {
        flex-direction: column;
        padding: 2rem 1rem;
    }

    #seccionSobreNosotros .descripcion {
        padding-left: 0;
    }

    #seccionSobreNosotros .descripcion .encabezado-seccion {
        font-size: 1.5rem;
    }

    #seccionSobreNosotros .descripcion h2 {
        font-size: 2rem;
    }

    #seccionSobreNosotros .descripcion h3 {
        font-size: 1.25rem;
    }
}


/* SECCION MISION, VISIÓN Y VALORES */
#seccionMisionVisionValores {
    padding: 4rem 2rem;
    background-color: #f4f4f4;
    background-image: url('../img/fondo2.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
    justify-content: center;
}

#seccionMisionVisionValores .mision-vision,
#seccionMisionVisionValores .valores {
    flex: 1 1 300px;
    max-width: 400px;
    background: rgba(255, 255, 255, 0.9);
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

#seccionMisionVisionValores .mision-vision {
    display: flex;
    flex-direction: column;
    gap: 2rem;
}

#seccionMisionVisionValores .mision, 
#seccionMisionVisionValores .vision {
    margin-bottom: 2rem;
}

#seccionMisionVisionValores .mision img,
#seccionMisionVisionValores .vision img,
#seccionMisionVisionValores .valores .imagen-valores {
    width: 100%;
    height: auto;
    border-radius: 10px;
    margin-bottom: 1rem;
}

#seccionMisionVisionValores .titulo-seccion {
    background: #f0a500;
    color: white;
    padding: 1rem;
    border-radius: 10px;
    margin-bottom: 1rem;
    text-align: center;
}

#seccionMisionVisionValores .titulo-seccion h4 {
    margin: 0;
    font-size: 1.6rem;
}

#seccionMisionVisionValores h4 {
    font-size: 1.5rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    color: #fff;
    text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
}

#seccionMisionVisionValores .valores p {
    margin-top: 1rem;
    margin-bottom: 1rem;
}

#seccionMisionVisionValores .valores-lista {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

#seccionMisionVisionValores .valor-item {
    background: #e0f7fa;
    padding: 1rem;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    transition: background-color 0.3s, transform 0.3s;
}


#seccionMisionVisionValores .valor-item:hover {
    background-color: #b2ebf2;
}

#seccionMisionVisionValores .valor-item h5 {
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    color: #00796b;
}

#seccionMisionVisionValores .valor-item p {
    margin: 0;
    color: #004d40;
}

#seccionMisionVisionValores .valor-item:hover {
    transform: scale(1.05);
}

/* Ajustes responsivos */
@media (max-width: 768px) {
    #seccionMisionVisionValores {
        flex-direction: column;
        padding: 2rem 1rem;
    }

    #seccionMisionVisionValores .mision-vision,
    #seccionMisionVisionValores .valores {
        max-width: 100%;
        margin-bottom: 2rem;
    }
}

/* SECCIÓN SERVICIOS */
.servicios {
  padding: 0;
  background-color: #fff;
}

.titulo-seccion {
  background-color: #f0a500;
  padding: 1rem;
  color: #ffffff;
  margin-bottom: 2rem;
  text-align: center;
}

.titulo-seccion h3 {
  margin: 0;
  font-size: 2rem;
}

.resaltar-servicios {
  background-color: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.card {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  padding: 1.5rem;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
}

.card i {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #d18c00;
  transition: color 0.3s;
}

.card h4 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.card p {
  font-size: 1rem;
  color: #555;
}


.servicio-1 {
  background-color: #fff;
}

.servicio-2 {
  background-color: #fff;
}

.servicio-3 {
  background-color: #fff;
}

.servicio-4 {
  background-color: #fff;
}

.servicio-5 {
  background-color: #fff;
}

.servicio-6 {
  background-color: #fff;
}


.card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
}

.card:hover i {
  color: #ff5722;
}

/* Diseño Responsivo */
@media (max-width: 768px) {
  .cards-container {
    grid-template-columns: 1fr;
  }

  .card {
    padding: 1rem;
  }
}


/* Section Galeria */
#seccionGaleria {
    padding: 4rem 2rem;
    background-color: #f4f4f4;
    display: flex;
    flex-direction: column;
    align-items: center;
}

#seccionGaleria .titulo-seccion {
    background: #f0a500;
    color: white;
    padding: 1rem;
    border-radius: 10px;
    margin-bottom: 2rem;
    text-align: center;
}

#seccionGaleria .titulo-seccion h4 {
    margin: 0;
    font-size: 1.6rem;
}

#seccionGaleria .galeria-imagenes {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1rem;
    max-width: 1000px;
    width: 100%;
}

#seccionGaleria .imagen-item {
    overflow: hidden;
}

#seccionGaleria .imagen-item img {
    width: 100%;
    height: auto;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    transition: transform 0.3s;
}

#seccionGaleria .imagen-item img:hover {
    transform: scale(1.05);
}

/* Ajustes responsivos */
@media (max-width: 768px) {
    #seccionGaleria .galeria-imagenes {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 480px) {
    #seccionGaleria .galeria-imagenes {
        grid-template-columns: 1fr;
    }
}

/* SECCIÓN CONTACTO */
#seccionContacto {
    background-image: url('../img/contacto.jpg');
    background-size: cover;
    background-position: center;
    padding: 4rem 2rem;
    background-color: rgba(255, 255, 255, 0.5);
}

.contenedor-contacto {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
    background-color: rgba(255, 255, 255, 0.9);
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.titulo-contacto {
    background-color: #f0a500;
    padding: 1rem;
    border-radius: 5px;
    color: #fff;
    text-align: center;
}

.titulo-contacto h2 {
    margin: 0;
    font-size: 2rem;
}

p {
    font-size: 1.125rem;
    margin-bottom: 2rem;
    color: #666;
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-group label {
    display: block;
    font-weight: 500;
    margin-bottom: 0.5rem;
    color: #333;
}

.form-group input,
.form-group textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 1rem;
    box-sizing: border-box;
    transition: border-color 0.3s;
}

.form-group input:focus,
.form-group textarea:focus {
    border-color: #f0a500;
    outline: none;
}

textarea {
    resize: vertical;
}

.btn {
    padding: 0.75rem 1.5rem;
    background-color: #f0a500;
    color: #fff;
    text-decoration: none;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s, transform 0.3s;
    display: inline-block;
}

.btn:hover {
    background-color: #d18c00;
    transform: scale(1.05);
}


@media (max-width: 768px) {
    .contenedor-contacto {
        padding: 1.5rem;
    }

    .titulo-contacto h2 {
        font-size: 1.5rem;
    }

    .btn {
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
    }
}

/* FOOTER */
footer {
    background-color: #151623;
    padding: 20px 0;
    color: #fff;
    font-family: Arial, sans-serif;
}

.footer-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.footer-info {
    margin-bottom: 10px;
}

.footer-info p {
    margin: 0;
    font-size: 0.875rem;
    color: #fff;
}

.highlight {
    color: #f0a500;
    font-weight: bold;
}

.footer-social {
    display: flex;
    justify-content: center;
    gap: 20px;
}

.social-icon {
    color: #f0a500;
    font-size: 1.5rem;
    transition: color 0.3s, transform 0.3s;
}

.social-icon:hover {
    color: #fff;
    transform: scale(1.1);
}

@media (max-width: 768px) {
    .footer-info {
        font-size: 0.75rem;
    }

    .social-icon {
        font-size: 1.2rem;
    }
}
</style>