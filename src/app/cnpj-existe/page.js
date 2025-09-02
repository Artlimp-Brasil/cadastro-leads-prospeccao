import { Suspense } from "react";
import CnpjExisteClient from "./cnpj-existe-client";

export default function CnpjExistePage() {
  return (
    <Suspense fallback={<p>Carregando...</p>}>
      <CnpjExisteClient />
    </Suspense>
  );
}
