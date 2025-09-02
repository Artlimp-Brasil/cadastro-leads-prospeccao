// /app/api/responsaveis/route.js
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const databaseId = process.env.NOTION_DB_RESPONSAVEIS;

export async function GET() {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      page_size: 100,
      filter: {
        and: [
          {
            property: "Nome do Usuário", // Substitua pelo nome da propriedade no Notion
            rich_text: {
              contains: "Comercial"
            }
          }, 
          {
            property: "Status de Usuário", // Substitua pelo nome da propriedade no Notion
            select: {
              does_not_equal: "Disponível"
            }
          }
        ],

      }
    });
    const responsaveis = response.results
      .map(item => item.properties?.["Nome do Usuário"]?.title[0]?.plain_text || null)

    console.log("🚀 Responsáveis filtrados do Notion:", responsaveis);

    return new Response(JSON.stringify(responsaveis), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("❌ Erro ao buscar responsáveis no Notion:", err);

    return new Response(JSON.stringify([]), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
}
