"use client";

import { Suspense } from "react";
import CadastroSucessoPage from "./sucesso-client";

export default function CadastroSucesso() {
  return (
    <Suspense fallback={<p>Carregando...</p>}>
      <CadastroSucessoPage />
    </Suspense>
  );
}
