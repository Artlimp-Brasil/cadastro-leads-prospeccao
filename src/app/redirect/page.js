import { Suspense } from "react";
import RedirectClient from "./redirect-client";

export default function LeadExistentePage() {
  return (
    <Suspense fallback={<p>Carregando...</p>}>
      <RedirectClient />
    </Suspense>
  );
}
