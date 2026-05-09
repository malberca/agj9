import Image from "next/image";
import { ProposalsModalButton } from "@/components/ProposalsModalButton";

export function HeroSimple() {
  return (
    <section className="heroSimple">
      <video
        className="heroSimpleVideo"
        autoPlay
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src="/video/vota.mp4" type="video/mp4" />
      </video>
      <div className="heroSimpleInner">
        <div className="heroSimpleCopy">
          <div className="heroSimpleBrand">
            <Image
              src="/images/logo/logo_verdeazul.png"
              alt="La Nueve de Julio"
              width={214}
              height={86}
              className="heroSimpleLogo"
            />
          </div>
          <p className="heroSimpleEyebrow">Agrupacion Nueve de Julio</p>
          <h1 className="heroSimpleTitle">Un Nuevo Sindicato es Posible.</h1>
          <p className="heroSimpleLead">
            La Agrupacion 9 de Julio ya esta en marcha.
          </p>
          <p className="heroSimpleLead heroSimpleLeadSecondary">
            Entra y conoce nuestras ideas para el futuro del gremio.
          </p>

          <div className="heroSimpleActions">
            <ProposalsModalButton
              label="Propuestas"
              className="heroSimpleButton heroSimpleButtonTertiary proposalModalTrigger"
            />
            <a
              className="heroSimpleButton heroSimpleButtonPrimary"
              href="https://www.instagram.com/la9dejulio_ok/"
              target="_blank"
              rel="noreferrer"
            >
              Compañeros en Instagram
            </a>
            <a
              className="heroSimpleButton heroSimpleButtonSecondary"
              href="https://www.facebook.com/profile.php?id=61572121192006"
              target="_blank"
              rel="noreferrer"
            >
              Los Compañeros en Facebook
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
