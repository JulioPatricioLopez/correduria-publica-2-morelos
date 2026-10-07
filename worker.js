export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // API para consultar publicaciones
    if (url.pathname === "/api/publicaciones" && request.method === "GET") {
      return new Response(
        JSON.stringify({
          ok: true,
          publicaciones: []
        }),
        {
          headers: {
            "Content-Type": "application/json; charset=UTF-8"
          }
        }
      );
    }

    // API para agregar publicaciones
    if (url.pathname === "/api/publicaciones" && request.method === "POST") {
      return new Response(
        JSON.stringify({
          ok: false,
          mensaje: "El sistema de almacenamiento se configurará en el siguiente paso."
        }),
        {
          status: 501,
          headers: {
            "Content-Type": "application/json; charset=UTF-8"
          }
        }
      );
    }

    // Para el resto del sitio
    return env.ASSETS.fetch(request);
  }
};
