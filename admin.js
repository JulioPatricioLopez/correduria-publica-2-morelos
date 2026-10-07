const btnPublicar = document.getElementById("btn-publicar");
const listaPublicaciones = document.getElementById("lista-publicaciones");

async function cargarPublicaciones() {
  try {
    const respuesta = await fetch("/api/publicaciones");
    const publicaciones = await respuesta.json();

    listaPublicaciones.innerHTML = "";

    publicaciones.forEach((publicacion) => {
      const elemento = document.createElement("div");
      elemento.className = "admin-publicacion";

      elemento.innerHTML = `
        <strong>${publicacion.titulo}</strong>
        <span>${publicacion.tipo}</span>
        <span>${publicacion.fecha}</span>
        <button type="button" data-id="${publicacion.id}">
          Eliminar
        </button>
      `;

      elemento.querySelector("button").addEventListener("click", async () => {
        const confirmar = confirm(
          `¿Deseas eliminar "${publicacion.titulo}"?`
        );

        if (!confirmar) return;

        const respuesta = await fetch(
          `/api/publicaciones/${publicacion.id}`,
          { method: "DELETE" }
        );

        if (respuesta.ok) {
          cargarPublicaciones();
        } else {
          alert("No se pudo eliminar la publicación.");
        }
      });

      listaPublicaciones.appendChild(elemento);
    });
  } catch (error) {
    console.error(error);
    listaPublicaciones.innerHTML =
      "<p>No se pudieron cargar las publicaciones.</p>";
  }
}

btnPublicar.addEventListener("click", async () => {
  const titulo = document.getElementById("titulo").value.trim();
  const tipo = document.getElementById("tipo").value;
  const archivo = document.getElementById("archivo").files[0];
  const fecha = document.getElementById("fecha").value;

  if (!titulo || !archivo || !fecha) {
    alert("Completa todos los campos antes de publicar.");
    return;
  }

  const datos = new FormData();
  datos.append("titulo", titulo);
  datos.append("tipo", tipo);
  datos.append("archivo", archivo);
  datos.append("fecha", fecha);

  btnPublicar.disabled = true;
  btnPublicar.textContent = "Publicando...";

  try {
    const respuesta = await fetch("/api/publicaciones", {
      method: "POST",
      body: datos
    });

    if (!respuesta.ok) {
      throw new Error("No se pudo publicar.");
    }

    document.getElementById("titulo").value = "";
    document.getElementById("archivo").value = "";
    document.getElementById("fecha").value = "";

    alert("Publicación agregada correctamente.");
    cargarPublicaciones();
  } catch (error) {
    console.error(error);
    alert("Ocurrió un error al publicar.");
  } finally {
    btnPublicar.disabled = false;
    btnPublicar.textContent = "Publicar";
  }
});

cargarPublicaciones();
