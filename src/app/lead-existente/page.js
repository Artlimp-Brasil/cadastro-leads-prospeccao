import { Suspense } from "react";
import LeadExistenteClient from "./lead-existe";

export default function LeadExistentePage() {
  return (
    <Suspense fallback={<p>Carregando...</p>}>
      <LeadExistenteClient />
    </Suspense>
  );
}
