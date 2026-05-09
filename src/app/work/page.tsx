import Image from "next/image";
import { Column, Meta, Schema } from "@once-ui-system/core";
import { about, baseURL, person, work } from "@/resources";

const proposalSections = [
  {
    title: "Primero: el Convenio Colectivo",
    paragraphs: [
      "Es lo mas urgente y es lo primero que vamos a atacar. Un convenio que refleje como se trabaja hoy: las noches en el garage, las tardes bajo la lluvia en la estacion, los turnos de 7x24. Si el convenio no tiene eso adentro, no te representa.",
      "Lo vamos a actualizar y lo vamos a modernizar, pero siempre con los trabajadores sentados en la mesa, no a espaldas de ellos.",
    ],
  },
  {
    title: "El dirigente tiene que saber lo que es el laburo",
    paragraphs: [
      "Nosotros venimos de ahi. De trabajar en campo. El Negro Moyano trabajo en un camion. Yo vengo de trabajar anos en los antiguos garages de la 9 de Julio. Los dirigentes que valen la pena, laburaron antes de dirigir.",
      "Si no sentiste una noche en un garage, si no estuviste en una estacion de servicio cuando llueve y hace frio, no podes representar a ese trabajador. Es asi de simple.",
      "El SOESGYPE hoy esta lleno de parientes y amigos que nunca pisaron una estacion. Eso se termina.",
    ],
  },
  {
    title: "La modernizacion no te tiene que dejar afuera",
    paragraphs: [
      "No le tenemos miedo a que el mundo cambie. Las estaciones automaticas existen en todo el mundo. Pero hay una diferencia entre modernizarse y rajar companeros.",
      "Nosotros negociamos adaptacion, no despidos. Te garantizamos capacitacion real en las herramientas nuevas para transformarlas en tu aliado en el dia a dia. Ningun trabajador queda afuera del futuro si el gremio hace bien su trabajo.",
    ],
  },
  {
    title: "Tu obra social tiene que funcionar",
    paragraphs: [
      "En la pandemia, las obras sociales sindicales sostuvieron y apuntalaron el sistema de salud. Si no estaban, habria colapsado el Sistema de Salud en todo el Pais. Eso no lo podes perder, es tuyo.",
      "Vamos a poner la obra social al servicio del afiliado y su familia, no de la gestion de turno.",
    ],
  },
  {
    title: "Transparencia y participacion, sin vueltas",
    paragraphs: [
      "Queremos saber cuantos afiliados hay. Queremos el padron. Queremos el estatuto. Pedimos la fecha de elecciones. Si hay que ir a la Justicia, vamos a la Justicia. Esta no la dejamos pasar.",
      "Y cuando lleguemos, las decisiones importantes las tomamos con vos adentro. Tu voz no es un adorno.",
    ],
  },
  {
    title: "Lo que se construyo, se cuida",
    paragraphs: [
      "El hotel lo terminamos de pagar nosotros. El camping lo compramos con nuestra gestion. Todo en gestion anterior a esta. Eso es de los afiliados y va a seguir siendolo.",
      "Los recursos del gremio vuelven al trabajador.",
    ],
  },
];

export async function generateMetadata() {
  return Meta.generate({
    title: work.title,
    description: work.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(work.title)}`,
    path: work.path,
  });
}

export default function Work() {
  return (
    <main className="proposalPage">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={work.path}
        title={work.title}
        description={work.description}
        image={`/api/og/generate?title=${encodeURIComponent(work.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />

      <Column className="proposalPageInner">
        <header className="proposalHero">
          <span className="proposalEyebrow">
            PROPUESTAS — LISTA AZUL Y BLANCA · AGRUPACION 9 DE JULIO
          </span>
          <h1 className="proposalTitle">El gremio tiene que volver a ser tuyo</h1>
          <div className="proposalLead">
            <p>
              Hace tiempo que el sindicato le dio la espalda al trabajador. Lo ves en los numeros:
              hoy estas cobrando 1.400.000 pesos, los del lavadero ni te cuento porque estan todos
              en negro, y los que deberian representarte estan mirando para otro lado.
            </p>
            <p>Nosotros venimos a cambiar eso. No con promesas. Con trabajo.</p>
          </div>
        </header>

        <section className="proposalSpotlight" aria-label="Presentacion de la propuesta">
          <article className="proposalProfileCard">
            <div className="proposalProfileMedia">
              <Image
                src="/images/avatar.jpg"
                alt="Cacho Garcia"
                fill
                className="proposalProfileImage"
                sizes="(max-width: 767px) 100vw, 360px"
              />
            </div>
            <div className="proposalProfileBody">
              <div className="proposalProfileHeading">
                <h2>Cacho Garcia</h2>
                <span className="proposalProfileBadge" aria-hidden="true">
                  ✓
                </span>
              </div>
              <p className="proposalProfileLead">
                Lista Azul y Blanca. Una propuesta para recuperar el sindicato con trabajo,
                experiencia y presencia real.
              </p>
              <div className="proposalProfileFooter">
                <div className="proposalProfileStats">
                  <div className="proposalProfileStat">
                    <strong>6</strong>
                    <span>Ejes</span>
                  </div>
                  <div className="proposalProfileStat">
                    <strong>1</strong>
                    <span>Convenio</span>
                  </div>
                </div>
                <a className="proposalProfileAction" href="#programa-completo">
                  Leer propuestas +
                </a>
              </div>
            </div>
          </article>
        </section>

        <section className="proposalBody" id="programa-completo">
          {proposalSections.map((section) => (
            <article key={section.title} className="proposalSection">
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </article>
          ))}
        </section>

        <footer className="proposalClosing">
          <p>
            Tengan fe en la Agrupacion 9 de Julio y en la Lista Azul y Blanca. Vamos todos juntos
            por un gremio distinto. Y es posible.
          </p>
          <strong>— Cacho Garcia</strong>
        </footer>
      </Column>
    </main>
  );
}
