// =====================================================
// CONTENIDO - CORREDURÍA PÚBLICA NÚMERO 2 DE MORELOS
// Aquí registraremos las nuevas infografías y videos.
// Las publicaciones más recientes deben colocarse arriba.
// =====================================================

const publicaciones = [

  // EJEMPLO DE INFOGRAFÍA:
  // {
  //   tipo: "infografia",
  //   titulo: "Título de la infografía",
  //   archivo: "assets/nombre-del-archivo.jpg",
  //   fecha: "2026-09-15"
  // },

  // EJEMPLO DE VIDEO:
  // {
  //   tipo: "video",
  //   titulo: "Título del video",
  //   archivo: "assets/nombre-del-video.mp4",
  //   fecha: "2026-09-15"
  // }

];


// Ordenar automáticamente de más reciente a más antiguo
const publicacionesOrdenadas = [...publicaciones].sort(
  (a, b) => new Date(b.fecha) - new Date(a.fecha)
);


// Crear cada publicación
function crearPublicacion(publicacion) {

  const article = document.createElement("article");
  article.className = "contenido-card";

  if (publicacion.tipo === "video") {

    article.innerHTML = `
      <div class="contenido-media">
        <video controls preload="metadata">
          <source src="${publicacion.archivo}" type="video/mp4">
          Tu navegador no puede reproducir este video.
        </video>
      </div>

      <div class="contenido-info">
        <span class="contenido-tipo">VIDEO</span>
        <h3>${publicacion.titulo}</h3>
      </div>
    `;

  } else {

    article.innerHTML = `
      <div class="contenido-media">
        <img
          src="${publicacion.archivo}"
          alt="${publicacion.titulo}"
          loading="lazy"
        >
      </div>

      <div class="contenido-info">
        <span class="contenido-tipo">INFOGRAFÍA</span>
        <h3>${publicacion.titulo}</h3>
      </div>
    `;

  }

  return article;
}


// Mostrar TODAS las publicaciones en contenido.html
const contenedorCompleto =
  document.getElementById("contenido-completo");

if (contenedorCompleto) {

  publicacionesOrdenadas.forEach(publicacion => {
    contenedorCompleto.appendChild(
      crearPublicacion(publicacion)
    );
  });

}


// Mostrar solamente las 3 publicaciones más recientes en Inicio
const contenedorRecientes =
  document.getElementById("contenido-reciente");

if (contenedorRecientes) {

  publicacionesOrdenadas
    .slice(0, 3)
    .forEach(publicacion => {
      contenedorRecientes.appendChild(
        crearPublicacion(publicacion)
      );
    });

}


// Año automático del pie de página
const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}
