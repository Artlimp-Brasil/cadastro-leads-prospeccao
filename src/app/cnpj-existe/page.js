import { Suspense } from "react";
import CnpjExisteClient from "./cnpj-client";

export default function CnpjExistePage() {
  return (
    <Suspense fallback={<p>Carregando...</p>}>
      <CnpjExisteClient />
    </Suspense>
  );
}
