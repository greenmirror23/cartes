// Relais serveur vers le webhook n8n.
//
// Le formulaire de /formulaire envoie ses données ici plutôt que directement
// vers n8n : la requête reste donc sur le même domaine et n'est jamais bloquée
// par le navigateur (CORS). Le corps est transmis tel quel, en conservant son
// content-type, pour que les fichiers envoyés (logo) arrivent intacts.

const WEBHOOK_URL = "https://n8n.srv823169.hstgr.cloud/webhook/creer-carte"

export async function POST(request: Request) {
  try {
    const contentType =
      request.headers.get("content-type") ?? "application/octet-stream"
    const corps = await request.arrayBuffer()

    const reponse = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "content-type": contentType },
      body: corps,
    })

    const texte = await reponse.text()

    if (!reponse.ok) {
      return Response.json(
        {
          ok: false,
          message: `Le service de création a répondu une erreur (${reponse.status}).`,
          detail: texte.slice(0, 500),
        },
        { status: 502 }
      )
    }

    return Response.json({ ok: true, detail: texte.slice(0, 500) })
  } catch {
    return Response.json(
      {
        ok: false,
        message:
          "Impossible de joindre le service de création. Réessayez dans un instant.",
      },
      { status: 502 }
    )
  }
}
