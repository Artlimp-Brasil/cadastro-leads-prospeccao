export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const cnpj = searchParams.get("cnpj") || "";
  const telefone = searchParams.get("telefone") || "";
  const nome = searchParams.get("nome") || "";
  const resp = searchParams.get("resp") || "";
  const email = searchParams.get("email") || "";
  const validCnpj = searchParams.get("validCnpj") || "";
  const segmento = searchParams.get("segmento") || "";

  const webhookURL = "https://sistemas.artlimpbrasil.com.br/webhook/comercial/cadastro-leads";

  const fullURL = `${webhookURL}?cnpj=${encodeURIComponent(cnpj)}&telefone=${encodeURIComponent(telefone)}&nome=${encodeURIComponent(nome)}&resp=${encodeURIComponent(resp)}&email=${encodeURIComponent(email)}&validCnpj=${validCnpj}&segmento=${encodeURIComponent(segmento)}`;

    try {
        const response = await fetch(fullURL);
        const data = await response.json();

        return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        }
        });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" }
        });
    }
    
}
