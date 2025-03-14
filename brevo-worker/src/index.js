export default {
	async fetch(request, env) {
			if (request.method !== "POST") {
					return new Response("Méthode non autorisée", { status: 405 });
			}

			try {
					const { name, email, message } = await request.json();

					const response = await fetch("https://api.brevo.com/v3/smtp/email", {
							method: "POST",
							headers: {
									"Content-Type": "application/json",
									"api-key": env.BREVO_API_KEY
							},
							body: JSON.stringify({
									sender: { email: "contact@bldwebagency.fr", name: "Martin Bouillaud" },
									to: [{ email: "contact@bouillaudmartin.fr", name: "Martin Bouillaud" }],
									subject: `[Bouillaudmartin.fr] Prise de contact depuis le CV : ${name}`,
									htmlContent: `<p><strong>Nom:</strong> ${name}</p>
																<p><strong>Email:</strong> ${email}</p>
																<p><strong>Message:</strong> ${message}</p>`
							})
					});

					if (!response.ok) {
							throw new Error("Erreur lors de l’envoi de l’email");
					}

					return new Response(JSON.stringify({ message: "E-mail envoyé avec succès !" }), {
							status: 200,
							headers: { "Content-Type": "application/json" }
					});
			} catch (error) {
					return new Response(JSON.stringify({ error: error.message }), {
							status: 500,
							headers: { "Content-Type": "application/json" }
					});
			}
	}
};