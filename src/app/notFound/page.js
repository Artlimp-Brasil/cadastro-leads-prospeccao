"use client";

import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <>
      <header>
        <div className="header-inner" role="banner">
          <div className="brand" aria-label="ARTLIMP BRASIL">
            <div className="brand-logo" aria-hidden="true">A</div>
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

      <main className="container">
        <img
          src="/assets/img/assets_task_01jv6akfgwf9fv8qc1jqrbhy38_1747190471_img_1.PNG"
          alt="Company not found"
        />
        <div className="mensagem">Empresa não foi encontrada, CNPJ inválido!</div>
        <button onClick={() => router.push("/")}>
          Voltar para o formulário
        </button>
      </main>

      <style jsx global>{`
        html, body {
          height: 100%;
          margin: 0;
          font-family: Arial, sans-serif;
          background: #f9f9f9;
        }
        header { position: sticky; top: 0; z-index: 10; background: linear-gradient(90deg, #0b3b70, #145ea8); color: #fff; box-shadow: 0 6px 18px rgba(2,32,71,0.12);}
        .header-inner { max-width:1080px; margin:0 auto; padding:18px 20px; display:flex; align-items:center; justify-content:space-between; gap:16px; }
        .brand { display:flex; align-items:center; gap:12px; font-weight:800; letter-spacing:0.5px; text-transform:uppercase; }
        .brand-logo { width:36px; height:36px; border-radius:10px; background:linear-gradient(135deg, #fff, #cde8ff); display:grid; place-items:center; color: #145ea8; font-weight:900; box-shadow: inset 0 0 0 3px rgba(255,255,255,0.5), 0 4px 10px rgba(0,0,0,0.15); }

        .container {
          text-align: center;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          max-width: 600px;
          margin: 40px auto;
          padding: 24px;
          background-color: #f9f9f9;
        }

        .container img {
          max-width: 300px;
          height: auto;
        }

        .mensagem {
          font-size: 20px;
          color: #333;
          margin-top: 20px;
        }

        button {
          cursor: pointer;
          font-size: large;
          margin-top: 20px;
          padding: 12px;
          width: 100%;
          max-width: 300px;
          border-radius: 12px;
          outline: none;
          border: none;
          background: linear-gradient(90deg, #0b3b70, #145ea8);
          transition: all 0.3s ease;
        }

        button:hover {
          background-color: #d1d1d1;
          transform: scale(1.05);
        }
      `}</style>
    </>
  );
}
