import React from 'react';
import Link from 'next/link';

const PrivacyPolicy = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Container for Privacy Policy */}
      <div className="container mx-auto p-4 mt-8 rounded-lg bg-white shadow-lg">
        {/* Privacy Policy Title */}
        <h1 className="text-3xl font-semibold mb-4">Privatlivspolitik</h1>
        
        {/* Privacy Policy Content */}
        <div className="mb-4">
          <p className="mb-2">
            Demens ur bruger Piwik PRO Analytics Suite som vores website/app-analyseværktøj og samtykkeadministrationsværktøj. Jeg indsamler data om webstedsbesøgende baseret på <a className="text-sky-600" href="https://help.piwik.pro/support/getting-started/cookies-created-by-piwik-pro/">cookies (engelsk)</a>. De indsamlede oplysninger kan omfatte en din IP-adresse, operativsystem, browser-ID, browseraktivitet og andre tilsvarende ikke-personfølsomme oplysninger. Se omfanget af <a className="text-sky-600" href="https://help.piwik.pro/support/getting-started/what-data-does-piwik-pro-collect/">data indsamlet af Piwik PRO (engelsk)</a>.
          </p>
          <p className="mb-2">
            Formålet er at udlede information som afvisningsrate, sidevisninger, sessioner og lignende for at forstå, hvordan uret bruges.
          </p>
          <p className="mb-2">
            Piwik PRO hoster sin løsning på Microsoft Azure og ElastX, hvor data opbevares i 14/25 måneder.
          </p>
          <p className="mb-2">
            Formålet med databehandling: Analyse baseret på samtykke. Juridisk grundlag: Art. 6, stk. 1, litra a, GDPR.
          </p>
          <p>
            Piwik PRO sender ikke data om dig til andre underdatabehandlere eller tredjeparter og bruger det ikke til egne formål. Læs mere i <a className="text-sky-600" href='https://piwik.pro/privacy-policy/#product'>Piwik PRO&#39;s privatlivspolitik (engelsk)</a>.
          </p>
        </div>

        {/* Back to Homepage Link */}
        <div className="text-center">
          <Link href="/" className="text-sky-600 hover:underline">Tilbage til forsiden</Link>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;