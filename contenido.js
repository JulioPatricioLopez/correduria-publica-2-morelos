// =====================================================
// CONTENIDO - CORREDURÍA PÚBLICA NÚMERO 2 DE MORELOS
// Aquí registraremos las nuevas infografías y videos.
// Las publicaciones más recientes deben colocarse arriba.
// =====================================================

const publicaciones = [

 {
    tipo: "infografia",
    titulo: "¿Vas a iniciar un negocio?",
    archivo: "assets/WhatsApp Image 2026-08-18 at 13.41.15 (7).jpeg",
    fecha: "2026-08-18"
  },

  {
    tipo: "infografia",
    titulo: "Constituye tu S.A. de C.V.",
    archivo: "assets/WhatsApp Image 2026-08-18 at 13.41.15 (6).jpeg",
    fecha: "2026-08-18"
  },

  {
    tipo: "infografia",
    titulo: "Servicios profesionales",
    archivo: "assets/WhatsApp Image 2026-08-18 at 13.41.15 (2).jpeg",
    fecha: "2026-08-18"
  }
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

// =====================================================
// VISOR AMPLIADO DE INFOGRAFÍAS
// =====================================================

const visorInfografia = document.getElementById("visor-infografia");
const imagenAmpliada = document.getElementById("imagen-ampliada");
const cerrarVisor = document.getElementById("cerrar-visor");

if (visorInfografia && imagenAmpliada && cerrarVisor) {

  document.addEventListener("click", (evento) => {

    const imagen = evento.target.closest(".contenido-media img");

    if (imagen) {
      imagenAmpliada.src = imagen.src;
      imagenAmpliada.alt = imagen.alt;
      visorInfografia.classList.add("activo");
      document.body.style.overflow = "hidden";
    }

  });

  function cerrarInfografia() {
    visorInfografia.classList.remove("activo");
    imagenAmpliada.src = "";
    document.body.style.overflow = "";
  }

  cerrarVisor.addEventListener("click", cerrarInfografia);

  visorInfografia.addEventListener("click", (evento) => {
    if (evento.target === visorInfografia) {
      cerrarInfografia();
    }
  });

  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape") {
      cerrarInfografia();
    }
  });

}
