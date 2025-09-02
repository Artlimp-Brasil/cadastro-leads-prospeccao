"use client";

import { useSearchParams, useRouter } from "next/navigation";

export default function CadastroSucessoPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const cliente = {
    status: searchParams.get("status"),
    empresa: searchParams.get("empresa"),
    cnpj: searchParams.get("cnpj"),
    email: searchParams.get("email"),
    telefone: searchParams.get("telefone"),
    vendedor: searchParams.get("vendedor"),
    link: searchParams.get("link") // link para o Notion
  };

  const statusClasses = {
    "Prospectando": "prospectando",
    "Desistiu de Prospectar": "desistiu"
  };
  const classe = statusClasses[cliente.status] || "nao-informado";

  const hasData = cliente.empresa || cliente.cnpj;

  if (!hasData) {
    return (
        <> <header>
                <div className="header-inner" role="banner">
                    <div className="brand" aria-label="ARTLIMP BRASIL">
                        <div className="brand-logo" aria-hidden="true">
                            A
                        </div>
                        <div>
                            <div style={{ fontSize: 16, lineHeight: 1 }}>ARTLIMP BRASIL</div>
                            <span>Cadastro de Leads</span>
                        </div>
                    </div>
                    <img
                        src="https://www.artlimpbrasil.com.br/pub/media/logo/stores/1/logo-artlimp.png"
                        width="170"
                        height="84"
                        loading="lazy"
                        alt=""
                    />
                </div>
            </header>   
        <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>Erro: Nenhuma informação de cliente foi fornecida.</h2>
        <p>Por favor, volte e tente novamente.</p>
        <button onClick={() => router.push("/")}>Voltar para o formulário</button>
      </div>
        </>
      
    );
  }

  return (
    <>
     <header>
                <div className="header-inner" role="banner">
                    <div className="brand" aria-label="ARTLIMP BRASIL">
                        <div className="brand-logo" aria-hidden="true">
                            A
                        </div>
                        <div>
                            <div style={{ fontSize: 16, lineHeight: 1 }}>ARTLIMP BRASIL</div>
                            <span>Cadastro de Leads</span>
                        </div>
                    </div>
                    <img
                        src="https://www.artlimpbrasil.com.br/pub/media/logo/stores/1/logo-artlimp.png"
                        width="170"
                        height="84"
                        loading="lazy"
                        alt=""
                    />
                </div>
            </header>   

    <div className="container">
      <h1>✅ Cadastro feito com sucesso!</h1>
      <table>
        <tbody>
          <tr>
            <th>Status:</th>
            <td><span className={`tag ${classe}`}>{cliente.status || "Não informado"}</span></td>
          </tr>
          <tr>
            <th>Empresa:</th>
            <td>{cliente.empresa || "Não informado"}</td>
          </tr>
          <tr>
            <th>CNPJ:</th>
            <td>{cliente.cnpj || "Não informado"}</td>
          </tr>
          <tr>
            <th>Email:</th>
            <td>{cliente.email || "Não informado"}</td>
          </tr>
          <tr>
            <th>Telefone:</th>
            <td>{cliente.telefone || "Não informado"}</td>
          </tr>
          <tr>
            <th>Vendedor responsável:</th>
            <td>{cliente.vendedor || "Não informado"}</td>
          </tr>
        </tbody>
      </table>

      <a href={cliente.link || "/"} target="_blank" rel="noopener noreferrer">
        <button>Abrir o Leads no Notion</button>
      </a>

      <button onClick={() => router.push("/")}>Cadastrar outro Lead</button>

         <style jsx global>{`
                :root {
  --blue-900: #0b3b70;
  --blue-700: #145ea8;
  --blue-600: #1976d2;
  --blue-500: #1e88e5;
  --blue-100: #e3f2fd;
  --ink-900: #0f172a;
  --ink-700: #334155;
  --ink-500: #64748b;
  --ink-300: #cbd5e1;
  --bg: #f7fafc;
  --white: #ffffff;
  --success: #16a34a;
  --danger: #dc2626;
  --radius: 16px;
  --shadow: 0 10px 25px rgba(2, 32, 71, 0.15);
  --shadow-sm: 0 6px 18px rgba(2, 32, 71, 0.12);
  --focus: 0 0 0 3px rgba(25, 118, 210, 0.25);
}
* { box-sizing: border-box; }
html, body {
  height: 100%;
  margin: 0;
  font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, Helvetica Neue, Arial;
  color: var(--ink-900);
  background: radial-gradient(1200px 600px at 80% -10%, var(--blue-100), transparent),
              radial-gradient(800px 400px at -10% 20%, #eef6ff, transparent),
              var(--bg);
}
      header { position: sticky; top:0; z-index:10; background: linear-gradient(90deg, var(--blue-900), var(--blue-700)); color: var(--white); box-shadow: var(--shadow-sm); }
        .header-inner { max-width:1080px; margin:0 auto; padding:18px 20px; display:flex; align-items:center; justify-content:space-between; gap:16px; }
        .brand { display:flex; align-items:center; gap:12px; font-weight:800; letter-spacing:0.5px; text-transform:uppercase; }
        .brand-logo { width:36px; height:36px; border-radius:10px; background:linear-gradient(135deg, var(--white), #cde8ff); display:grid; place-items:center; color: var(--blue-700); font-weight:900; box-shadow: inset 0 0 0 3px rgba(255,255,255,0.5), 0 4px 10px rgba(0,0,0,0.15); }
        .container {
          text-align: left;
          max-width: 600px;
          margin: 40px auto;
          padding: 24px;
          border: 1px solid #ddd;
          border-radius: 8px;
          background-color: #f9f9f9;
          font-family: Arial, sans-serif;
        }
        .container {
          text-align: left;
          max-width: 600px;
          margin: 40px auto;
          padding: 24px;
          border: 1px solid #ddd;
          border-radius: 8px;
          background-color: #f9f9f9;
          font-family: Arial, sans-serif;
        }
        h1 {
          color: #28a745;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        th, td {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          text-align: left;
        }
        th {
          width: 180px;
          color: #555;
          font-weight: bold;
          background-color: #f1f1f1;
        }
        button {
          cursor: pointer;
          font-size: large;
          margin-top: 20px;
          padding: 12px;
          width: 100%;
          border-radius: 12px;
          outline: none;
          border: none;
          background: linear-gradient(90deg, var(--blue-900), var(--blue-700));
          transition: all 0.3s ease;
        }
        button:hover {
          background-color: #d1d1d1;
          transform: scale(1.05);
        }
        .tag {
          display: inline-block;
          padding: 4px 16px;
          border-radius: 12px;
          font-size: 0.875rem;
          font-weight: 500;
          color: white;
          text-align: center;
          white-space: nowrap;
        }
        .prospectando {
          background-color: green;
        }
        .desistiu {
          background-color: red;
        }
        .nao-informado {
          background-color: #555;
        }
      `}</style>
    </div>
    </>
  );
}
