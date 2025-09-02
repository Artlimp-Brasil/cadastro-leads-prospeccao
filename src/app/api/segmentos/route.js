// /app/api/segmentos/route.js
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const databaseId = process.env.NOTION_DB_SEGMENTOS;
export async function GET() {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      page_size: 100,
    });

    const segmentos = response.results.map(item => {
      // Ajuste conforme a propriedade do seu Notion
      return item.properties.Nome?.title[0]?.plain_text || null;
    }).filter(Boolean); // remove valores null

    console.log("🚀 Segmentos recebidos do Notion:", segmentos);

    return new Response(JSON.stringify(segmentos), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("❌ Erro ao buscar segmentos no Notion:", err);

    // Retorna sempre um array vazio em caso de erro
    return new Response(JSON.stringify([]), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
}
