import { Suspense } from "react";
import LeadExistenteClient from "./lead-existe-client";

export default function LeadExistentePage() {
  return (
    <Suspense fallback={<p>Carregando...</p>}>
      <LeadExistenteClient />
    </Suspense>
  );
}
