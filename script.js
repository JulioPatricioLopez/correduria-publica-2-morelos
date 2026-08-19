document.getElementById("year").textContent = new Date().getFullYear();

const visor = document.getElementById("visor-infografia");
const imagenAmpliada = document.getElementById("imagen-ampliada");
const cerrarVisor = document.getElementById("cerrar-visor");
const infografias = document.querySelectorAll(".infografia-ampliable");

infografias.forEach((imagen) => {
  imagen.style.cursor = "pointer";

  imagen.addEventListener("click", () => {
    imagenAmpliada.src = imagen.src;
    imagenAmpliada.alt = imagen.alt;
    visor.classList.add("activo");
    document.body.style.overflow = "hidden";
  });
});

function cerrarInfografia() {
  visor.classList.remove("activo");
  imagenAmpliada.src = "";
  document.body.style.overflow = "";
}

cerrarVisor.addEventListener("click", cerrarInfografia);

visor.addEventListener("click", (evento) => {
  if (evento.target === visor) {
    cerrarInfografia();
  }
});

document.addEventListener("keydown", (evento) => {
  if (evento.key === "Escape") {
    cerrarInfografia();
  }
});
