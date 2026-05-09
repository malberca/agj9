import { Meta, Schema } from "@once-ui-system/core";

import Image from "next/image";
import { HeroSimple, InstagramReelsEmbed } from "@/components/home";
import { JoinModalButton } from "@/components";
import { about, baseURL, home, person } from "@/resources";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default async function Home() {
  return (
    <main className="laNueveHome laNueveHomeShowcase">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <div className="topArrivalBadge" aria-hidden="true">
        <Image
          src="/images/llegaste.png"
          alt=""
          width={220}
          height={220}
          className="topArrivalBadgeImage"
        />
      </div>

      <HeroSimple />

      <section className="showcaseSection" aria-label="Contenido principal">
        <div className="showcaseIntroSpacer" aria-hidden="true" />

        <section className="sumateModule" aria-label="Sumate a la Lista Azul y Blanca">
          <div className="sumateModuleCard">
            <div className="sumateModuleCopy">
              <span className="sumateModuleEyebrow">Sumate</span>
              <h2 className="sumateModuleTitle">Queremos escucharte y caminar con vos.</h2>
              <p className="sumateModuleText">
                Si queres recibir novedades, acercar una inquietud o ser parte de la Lista Azul y
                Blanca, dejanos tus datos. El equipo te contacta y suma tu voz al trabajo que viene.
              </p>
            </div>
            <JoinModalButton label="Quiero sumarme" className="joinHeroTrigger sumateModuleTrigger" />
          </div>
        </section>

        <div className="showcaseReelsRow">
          <InstagramReelsEmbed />
        </div>
      </section>
    </main>
  );
}
