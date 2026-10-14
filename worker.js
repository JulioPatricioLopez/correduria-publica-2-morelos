export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/publicaciones") {
      if (request.method === "GET") {
        try {
          const { results } = await env.DB.prepare(
            "SELECT id, titulo, tipo, archivo, fecha FROM publicaciones ORDER BY fecha DESC, id DESC"
          ).all();

          return Response.json({
            ok: true,
            publicaciones: results
          });
        } catch (error) {
          return Response.json(
            { ok: false, mensaje: "Error al consultar publicaciones." },
            { status: 500 }
          );
        }
      }

      if (request.method === "POST") {
        return Response.json(
          {
            ok: false,
            mensaje: "La publicación desde el panel requiere configurar acceso seguro."
          },
          { status: 501 }
        );
      }

      return new Response("Método no permitido", { status: 405 });
    }

    return env.ASSETS.fetch(request);
  }
};
