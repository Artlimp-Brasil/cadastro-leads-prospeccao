"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function RedirectClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const cnpj = searchParams.get("cnpj") || "";
    const telefone = searchParams.get("telefone") || "";
    const nome = searchParams.get("nome") || "";
    const resp = searchParams.get("resp") || "";
    const email = searchParams.get("email") || "";
    const segmento = searchParams.get("segmento") || "";

    if (!cnpj) {
      document.body.innerHTML = "<h2>Erro: CNPJ não fornecido na URL.</h2>";
      return;
    }

    const cnpjFormatado = cnpj.replace(/[^\d]+/g, "");

    const cnpjValido = (cnpj) => {
      if (!cnpj || cnpj.length !== 14) return false;
      if (/^(\d)\1{13}$/.test(cnpj)) return false;
      let tamanho = cnpj.length - 2;
      let numeros = cnpj.substring(0, tamanho);
      let digitos = cnpj.substring(tamanho);
      let soma = 0;
      let pos = tamanho - 7;

      for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
      }
      let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
      if (resultado != digitos.charAt(0)) return false;

      tamanho = tamanho + 1;
      numeros = cnpj.substring(0, tamanho);
      soma = 0;
      pos = tamanho - 7;
      for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2) pos = 9;
      }
      resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
      if (resultado != digitos.charAt(1)) return false;

      return true;
    };

    //const webhookURL = "https://hook.us1.make.com/77i2qmjxzmqp2ze1f2gp59zrjmjvn5dl";

    const proxyURL = `/api/proxy?cnpj=${encodeURIComponent(cnpjFormatado)}&telefone=${encodeURIComponent(telefone)}&nome=${encodeURIComponent(nome)}&resp=${encodeURIComponent(resp)}&email=${encodeURIComponent(email)}&validCnpj=${cnpjValido(cnpjFormatado)}&segmento=${encodeURIComponent(segmento)}`;

    fetch(proxyURL)
      .then(res => res.json())
      .then(data => {
        // Se o webhook retornar um cliente existente, redireciona para /lead-existente com query params
        console.log("Dados recebidos do webhook:", data);
        if (data.cliente) {
          const params = new URLSearchParams({
            cnpj: data.cliente.cnpj,
            empresa: data.cliente.empresa,
            vendedor: data.cliente.vendedor,
            status: data.cliente.status,
            telefone: data.cliente.telefone,
            email: data.cliente.email,
            link: data.cliente?.link || ""
          });
          router.push(`${data.redirectUrl}?${params.toString()}`);
        } else if (data.redirectUrl) {
          // caso não exista cliente, segue para o redirect normal
          window.location.href = data.redirectUrl;
        } else {
          document.body.innerHTML = "<h2>Erro: Webhook não retornou dados válidos.</h2>";
        }
      })
      .catch(err => {
        console.error("Erro ao chamar o webhook:", err);
        document.body.innerHTML = "<h2>Erro ao processar o CNPJ. Tente novamente.</h2>";
      });

  }, [searchParams, router]);

  return (
      <main style={{ textAlign: "center", padding: "100px 20px", fontSize: 18, color: "var(--ink-500)", background: "white", height: "100vh" }}>
        Carregando dados...
      </main>
    );
}
