"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [empresa, setEmpresa] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [segmento, setSegmento] = useState("");
  const [responsaveisOptions, setResponsaveisOptions] = useState([]);
  const [segmentosOptions, setSegmentosOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarSelect(apiUrl, setOptions) {
      try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        setOptions(data);
      } catch (err) {
        console.error(`Erro ao carregar ${apiUrl}:`, err);
        showToast("error", `Falha ao carregar ${apiUrl}`);
      }
    }
    Promise.all([
      carregarSelect("/api/responsaveis", setResponsaveisOptions),
      carregarSelect("/api/segmentos", setSegmentosOptions)
    ]).finally(() => setLoading(false));
  }, []);
  function handleCnpjChange(e) {
    let v = e.target.value.replace(/\D/g, "");
    v = v.replace(/^(\d{2})(\d)/, "$1.$2");
    v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
    v = v.replace(/\.(\d{3})(\d)/, ".$1/$2");
    v = v.replace(/(\d{4})(\d)/, "$1-$2");
    setCnpj(v.substring(0, 18));
  }

  function handleTelefoneChange(e) {
    let v = e.target.value.replace(/\D/g, "");
    if (v.length > 0) v = "+" + v;
    if (v.length > 3) v = v.replace(/^(\+\d{2})(\d)/, "$1 ($2");
    if (v.length > 9) v = v.replace(/(\+\d{2}\s\(\d{2})(\d)/, "$1) $2");
    if (v.length > 15) v = v.replace(/(\d{4,5})(\d{4})$/, "$1-$2");
    setTelefone(v.substring(0, 20));
  }

  function showToast(type, msg, timeout = 4000) {
    const toast = document.getElementById("toast");
    const titleEl = document.getElementById("toast-title");
    const msgEl = document.getElementById("toast-msg");
    toast.classList.remove("success", "error");
    toast.classList.add(type === "success" ? "success" : "error");
    titleEl.textContent = type === "success" ? "Sucesso" : "Erro";
    msgEl.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), timeout);
  }

  function validate(formData) {
    const errors = [];
    const cnpjRegex = /^(\d{2})\.(\d{3})\.(\d{3})\/(\d{4})-(\d{2})$/;
    if (!formData.empresa?.trim())
      errors.push('O campo "Nome da Empresa" é obrigatório.');
    if (!cnpjRegex.test(formData.cnpj))
      errors.push("Informe um CNPJ válido no formato 00.000.000/0000-00.");
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errors.push("E-mail inválido.");
    if (!formData.responsavel) errors.push("Selecione um Responsável.");
    if (!formData.segmento) errors.push("Selecione um Segmento.");
    return errors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const dados = { empresa, cnpj, email, telefone, responsavel, segmento };
    const errors = validate(dados);
    if (errors.length) {
      showToast("error", errors.join("\n"));
      return;
    }
    showToast("success", "Cadastro enviado com sucesso!");
    console.log("📌 Dados do formulário:", dados);

    setTimeout(() => {
      const baseUrl = "/redirect";
      const params = new URLSearchParams({
        cnpj: dados.cnpj,
        resp: dados.responsavel,
        nome: dados.empresa,
        email: dados.email ?? "",
        telefone: dados.telefone ?? "",
        segmento: dados.segmento ?? ""
      });
      window.location.href = `${baseUrl}?${params.toString()}`;
    }, 1000);
  }
   if (loading) {
    return (
      <main style={{ textAlign: "center", padding: "100px 20px", fontSize: 18, color: "var(--ink-500)", background: "white", height: "100vh" }}>
        Carregando dados do formulário...
      </main>
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

      <main>
        <section className="card" aria-labelledby="form-title">
          <div className="card-header">
            <h1 id="form-title">Cadastre um novo Lead</h1>
            <p>
              Campos marcados com <span className="req">*</span> são obrigatórios.
            </p>
          </div>

          <form id="lead-form" noValidate onSubmit={handleSubmit}>
            <div className="grid">
              <div className="col-12">
                <label htmlFor="empresa">
                  Nome da Empresa <span className="req">*</span>
                </label>
                <input
                  type="text"
                  id="empresa"
                  name="empresa"
                  value={empresa}
                  onChange={(e) => setEmpresa(e.target.value)}
                  placeholder="Ex.: Palácio das Festas Ltda"
                  autoComplete="organization"
                  required
                />
              </div>
              <div className="col-6">
                <label htmlFor="cnpj">
                  CNPJ <span className="req">*</span>
                </label>
                <input
                  type="text"
                  id="cnpj"
                  name="cnpj"
                  value={cnpj}
                  onChange={handleCnpjChange}
                  inputMode="numeric"
                  placeholder="00.000.000/0000-00"
                  required
                  maxLength={18}
                />
                <div className="field-help">Formato: 00.000.000/0000-00</div>
              </div>
              <div className="col-6">
                <label htmlFor="email">
                  E-mail{" "}
                  <small style={{ fontWeight: 500, color: "var(--ink-500)" }}>
                    (opcional)
                  </small>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="contato@empresa.com.br"
                  autoComplete="email"
                />
              </div>
              <div className="col-6">
                <label htmlFor="telefone">
                  Telefone{" "}
                  <small style={{ fontWeight: 500, color: "var(--ink-500)" }}>
                    (opcional)
                  </small>
                </label>
                <input
                  type="text"
                  id="telefone"
                  name="telefone"
                  value={telefone}
                  onChange={handleTelefoneChange}
                  inputMode="tel"
                  placeholder="+55 (19) 1234-5678"
                  maxLength={20}
                />
                <div className="field-help">Formato: +55 (DDD) 0000-0000</div>
              </div>
              <div className="col-6">
                <label htmlFor="responsavel">
                  Responsável <span className="req">*</span>
                </label>
                <select
                  id="responsavel"
                  value={responsavel}
                  onChange={(e) => setResponsavel(e.target.value)}
                >
                  <option value="" disabled>
                    Selecione…
                  </option>
                  {responsaveisOptions.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-6">
                <label htmlFor="segmento">
                  Segmento <span className="req">*</span>
                </label>
                <select
                  id="segmento"
                  value={segmento}
                  onChange={(e) => setSegmento(e.target.value)}
                >
                  <option value="" disabled>
                    Selecione…
                  </option>
                  {segmentosOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-12 actions">
                <button type="submit">Enviar cadastro</button>
                <button
                  type="reset"
                  className="btn-secondary"
                  onClick={() => {
                    setEmpresa("");
                    setCnpj("");
                    setEmail("");
                    setTelefone("");
                    setResponsavel("");
                    setSegmento("");
                  }}
                >
                  Limpar
                </button>
                <span
                  id="form-status"
                  role="status"
                  aria-live="polite"
                  style={{ fontSize: 14, color: "var(--ink-500)" }}
                ></span>
              </div>
            </div>
          </form>
        </section>
      </main>

      <div
        id="toast"
        className="toast"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="title" id="toast-title">
          Erro
        </div>
        <div className="msg" id="toast-msg">
          Não foi possível enviar.
        </div>
      </div>
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
.brand span { font-size:14px; opacity:0.9; }
main { max-width:980px; margin:28px auto; padding:0 20px 40px; }
.card { background: var(--white); border-radius: var(--radius); box-shadow: var(--shadow); overflow:hidden; border:1px solid #e6eef9; }
.card-header { padding:22px 24px; border-bottom:1px solid #e8eef7; background: linear-gradient(0deg, #f8fbff, #ffffff); }
.card-header h1 { margin:0 0 6px; font-size:22px; }
.card-header p { margin:0; color: var(--ink-500); font-size:14px; }
form { padding:22px 24px; }
.grid { display:grid; gap:16px; grid-template-columns: repeat(12,1fr); }
.col-12 { grid-column: span 12; }
.col-6 { grid-column: span 6; }
.col-4 { grid-column: span 4; }
@media (max-width: 820px){ .col-6,.col-4{grid-column:span 12;} }
label { display:inline-block; font-weight:600; margin-bottom:8px; }
.req { color: var(--blue-600); }
input[type="text"],
input[type="email"],
input[type="tel"],
select {
  width:100%;
  border:1px solid var(--ink-300);
  padding:12px 14px;
  border-radius:12px;
  font-size:16px;
  outline:none;
  transition: box-shadow 0.15s ease, border-color 0.15s ease;
  background:#fbfdff;
  color: var(--ink-900);
}
input:focus,
select:focus { border-color: var(--blue-600); box-shadow: var(--focus); }
.field-help { font-size:12px; color: var(--ink-500); margin-top:6px; }
.actions { display:flex; gap:12px; align-items:center; margin-top:8px; }
button { appearance:none; border:0; cursor:pointer; background: linear-gradient(180deg, var(--blue-500), var(--blue-600)); color: var(--white); padding:12px 18px; border-radius:12px; font-weight:700; letter-spacing:0.3px; box-shadow:0 10px 20px rgba(25,118,210,0.25), inset 0 -2px 0 rgba(0,0,0,0.1); transition: transform 0.06s ease, filter 0.2s ease; }
button:hover { filter: brightness(1.05); }
button:active { transform: translateY(1px); }
button[disabled] { opacity:0.6; cursor:not-allowed; }
.btn-secondary { background:#e9f2ff; color: var(--blue-700); box-shadow: inset 0 -2px 0 rgba(0,0,0,0.06); }
.toast { position:fixed; right:16px; bottom:16px; z-index:50; max-width:380px; background: var(--white); border:1px solid #e6eef9; border-radius:14px; padding:14px 16px; box-shadow: var(--shadow-sm); display:none; }
.toast.show { display:block; }
.toast.success { border-left:6px solid var(--success); }
.toast.error { border-left:6px solid var(--danger); background-color:#f7e5e5; }
.toast .title { font-weight:700; margin-bottom:4px; }
.toast .msg { color: var(--ink-700); font-size:14px; }
footer { text-align:center; color: var(--ink-500); font-size:12px; margin-top:22px; }
select {
  appearance: none;
  cursor: pointer;
}
select option { color: var(--ink-900); }
select option[disabled] { color: var(--ink-500); font-style: italic; }
`}</style>

    </>
  );
}