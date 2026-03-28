import Image from "next/image";
import { Sassy_Frass } from "next/font/google";
import cover01Image from "../../public/images/projects/project-01/cover-01.jpg";
import cover02Image from "../../public/images/projects/project-01/cover-02.jpg";
import cover03Image from "../../public/images/projects/project-01/cover-03.webp";
import cover04Image from "../../public/images/projects/project-01/cover-04.webp";
import editorialImage from "../../public/images/projects/project-01/image-03.jpg";
import editorialMobileImage from "../../public/images/projects/project-01/image-03-mobile.jpg";

import {
  Badge,
  Button,
  Card,
  Column,
  Heading,
  Line,
  Media,
  Meta,
  Row,
  Schema,
  Text,
} from "@once-ui-system/core";
import { CountdownBlock, JoinModalButton } from "@/components";
import { about, baseURL, home, person } from "@/resources";

const signatureFont = Sassy_Frass({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const briefs = [
  {
    kicker: "Afiliado primero",
    title: "Cada voto a la Lista Azul y Blanca es una decision para que el sindicato vuelva a defender al trabajador.",
  },
  {
    kicker: "Conduccion real y representatividad",
    title: "Experiencia, presencia y firmeza para conducir un sindicato cercano, activo y del lado del afiliado.",
  },
  {
    kicker: "Votar para cambiar",
    title: "Es tiempo de acompanar con el voto una propuesta seria, ordenada y con vocacion real de servicio.",
  },
];

const cards = [
  {
    title: "Presencia real",
    description:
      "Un sindicato cercano, que escuche. Siempre espalda con espalda con el trabajador y actue donde hace falta.",
    image: cover02Image.src,
  },
  {
    title: "Gestion seria",
    description:
      "Entendemos al trabajador desde el trabajo en campo. Escuchamos sus ideas dando mas respuestas. Esto es mas Organizacion al Servicio del Trabajador.",
    image: cover03Image.src,
  },
  {
    title: "Modernizacion",
    description:
      "La tecnologia no tiene que ser una amenaza. Tiene que ser una herramienta al servicio del trabajador. Trabajar codo a codo con las empresas en pos de mejoras continuas en la experiencia y el dia a dia de cada trabajador que representamos.",
    image: cover04Image.src,
  },
];

const modernizationColumns = [
  [
    "Venimos a construir un sindicato presente, activo y preparado para los desafios de hoy. No queremos un gremio que reaccione tarde, sino uno que se anticipe.",
    "Impulsamos una modernizacion real, con herramientas actuales que mejoren la gestion y acerquen el sindicato al afiliado. Queremos transparencia en cada decision y acceso claro a la informacion.",
    "Vamos a digitalizar procesos para agilizar tramites y respuestas. Menos burocracia, mas soluciones concretas.",
    "Creemos en la capacitacion constante como eje central. El avance tecnologico no puede dejar a ningun trabajador afuera.",
    "Vamos a promover programas de formacion en nuevas herramientas y oficios. Queremos trabajadores preparados para el presente y el futuro.",
  ],
  [
    "Defendemos cada puesto de trabajo frente a los cambios del sector. Adaptar funciones tambien es proteger el empleo.",
    "Vamos a recuperar un sindicato ordenado y con gestion responsable. Los recursos tienen que volver a estar al servicio del afiliado.",
    "Impulsamos una representacion cercana, que escuche y actue. Un gremio que este donde tiene que estar: al lado del trabajador.",
    "Vamos a fortalecer los canales de participacion. Tu voz tiene que ser parte de cada decision importante.",
    "Queremos un sindicato que acompane en cada etapa laboral. Desde el ingreso hasta el crecimiento profesional.",
  ],
  [
    "Vamos a trabajar por mejores condiciones laborales reales. Con presencia, negociacion y firmeza.",
    "Recuperar derechos perdidos es una prioridad. Pero tambien generar nuevas oportunidades.",
    "Creemos en un gremio que evoluciona sin perder su esencia. Defender al trabajador, con herramientas del presente.",
    "Todo lo que proponemos no puede quedar solo en palabras. Nuestro compromiso es llevar estas transformaciones al Convenio Colectivo de Trabajo, impulsando su actualizacion y modernizacion para que refleje la realidad actual del sector y proteja el futuro de los trabajadores.",
    "No venimos a prometer. Venimos a hacer.",
    "Y a construir, entre todos, un sindicato que vuelva a representar de verdad.",
  ],
];

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default function Home() {
  return (
    <Column fillWidth gap="40">
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

      <section className="newsHero">
        <Image
          src={cover01Image}
          alt="Hero principal"
          fill
          priority
          className="newsHeroBackground"
          sizes="100vw"
        />
        <video
          className="newsHeroVideo newsHeroVideoDesktop"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/projects/project-01/poster-desktop.png"
        >
          <source src="/video/cacho.webm" type="video/webm" />
          <source src="/video/cacho.mp4" type="video/mp4" />
        </video>
        <video
          className="newsHeroVideo newsHeroVideoMobile"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/projects/project-01/poster-mobile.png"
        >
          <source src="/video/cacho-mobile.webm" type="video/webm" />
          <source src="/video/cacho-mobile.mp4" type="video/mp4" />
        </video>
        <div className="newsHeroOverlay" />

        <div className="newsHeroInner">
          <div className="newsHeroTop">
            <img
              src="/images/logo/logo_w.webp?v=20260326"
              alt="Agrupacion Nueve de Julio"
              width={260}
              height={96}
              className="newsHeroLogo"
            />
          </div>

          <div className="newsHeroBody">
            <div className="newsHeroCopy">
              <Heading
                as="h1"
                wrap="balance"
                className="newsHeroTitle"
              >
                Un nuevo sindicato es posible.
              </Heading>
              <Text className="newsHeroClaim">
                Conduccion, presencia y una mirada moderna al servicio del trabajador.
              </Text>
              <Row gap="12" marginTop="32" s={{ direction: "column" }}>
                <Button
                  href="#propuesta"
                  variant="primary"
                  size="m"
                  weight="default"
                  arrowIcon
                  className="heroPrimaryCta"
                >
                  Conoce la propuesta
                </Button>
                <JoinModalButton />
              </Row>
              <div className="newsHeroSupport">
                <Text className="newsHeroText">
                  S.O.E.S.G. Y P.E. ·{" "}
                  <span className="newsHeroTextStrong">
                    LISTA AZUL Y BLANCA · CACHO GARCIA CONDUCCION
                  </span>
                </Text>
                <Row gap="16" marginTop="20" vertical="center" className="newsHeroLogoStrip">
                  <div className="newsHeroPartnerLogoFrame newsHeroPartnerLogoFrameCgt">
                    <Image
                      src="/images/logo/cgt_blue.webp"
                      alt="Logo CGT"
                      width={141}
                      height={60}
                      className="newsHeroPartnerLogo"
                    />
                  </div>
                  <div className="newsHeroPartnerLogoFrame newsHeroPartnerLogoFrame62">
                    <Image
                      src="/images/logo/las62_blue.webp"
                      alt="Logo 62"
                      width={141}
                      height={60}
                      className="newsHeroPartnerLogo"
                    />
                  </div>
                  <div className="newsHeroPartnerLogoFrame newsHeroPartnerLogoFrameLa9">
                    <Image
                      src="/images/logo/la9_blue.webp"
                      alt="Logo La 9"
                      width={141}
                      height={60}
                      className="newsHeroPartnerLogo"
                    />
                  </div>
                </Row>
              </div>
            </div>

            <Card
              className="newsHeroPanel newsHeroPanelStrong"
              fillWidth
              radius="xl"
              padding="24"
              direction="column"
              background="page"
              border="neutral-alpha-medium"
            >
              <Text variant="label-default-s" className="newsHeroPanelKicker">
                Un gremio en serio
              </Text>
              <Heading as="h2" variant="heading-strong-xl" marginTop="8">
                Recuperar el sindicato tambien es recuperar la confianza.
              </Heading>
                <Text marginTop="12" className="thinBodyText newsHeroPanelBody">
                  La Agrupacion 9 de Julio impulsa una propuesta clara:
                  recuperar el sindicato, modernizar su funcionamiento y volver a
                  representar de verdad al trabajador.
                </Text>
            </Card>
          </div>
        </div>
      </section>

      <section className="petroPathSection" aria-labelledby="camino-del-petroleo">
        <div className="petroPathInner">
          <Text
            id="camino-del-petroleo"
            as="span"
            variant="label-default-s"
            className="petroPathKicker"
          >
            cuidamos cada fase del proceso
          </Text>
          <Heading as="h2" variant="display-strong-s" className="petroPathTitle">
            El Camino del Petroleo
          </Heading>
          <div className="petroPathMediaShell">
            <img
              src="/video/Extraccion.gif"
              alt="El Camino del Petroleo"
              className="petroPathFrame petroPathGif"
            />
          </div>
        </div>
      </section>

      <CountdownBlock targetIso="2026-10-15T00:00:00-03:00" />

      <Column fillWidth gap="xl" paddingBottom="16">
        <Column fillWidth gap="l">
          <Row fillWidth gap="20" s={{ direction: "column" }}>
            <Card
              className="proposalCard"
              fillWidth
              radius="xl"
              padding="4"
              direction="column"
              background="surface"
              border="neutral-alpha-medium"
            >
              <Media
                priority
                src={cover01Image.src}
                alt="Nota destacada"
                aspectRatio="16 / 9"
                radius="l"
                sizes="(max-width: 768px) 100vw, 900px"
              />
              <Column fillWidth padding="24" gap="12" className="proposalCardBody">
                <Text variant="label-default-s" className="proposalCardKicker">
                  Politica
                </Text>
                <Heading as="h2" variant="display-strong-s" wrap="balance" className="proposalCardTitle">
                  Es momento de recuperar el rumbo.
                </Heading>
                <Text variant="body-default-m" className="thinBodyText proposalCardText">
                  Cuando un sindicato se aleja de los trabajadores, pierde su
                  razon de ser. Hoy queremos volver a poner al afiliado en el
                  centro, con una conduccion presente, seria y comprometida.
                </Text>
                <Text variant="body-default-m" className="thinBodyText proposalCardText">
                  Sabemos que los desafios cambiaron, y el gremio tiene que
                  estar a la altura de esa realidad. No alcanza con sostener lo
                  que existe: hay que mejorar, actualizar y construir nuevas
                  respuestas para cada trabajador.
                </Text>
                <Text variant="body-default-m" className="thinBodyText proposalCardText">
                  Queremos un sindicato que escuche, que este cerca y que actue
                  a tiempo. Que acompane en lo cotidiano y que tambien piense
                  en el futuro.
                </Text>
                <Text variant="body-default-m" className="thinBodyText proposalCardText">
                  Como decia Juan Domingo Peron:
                </Text>
                <Text variant="body-default-m" className="proposalCardQuote">
                  &ldquo;Primero la gente.&rdquo;
                </Text>
                <Text variant="body-default-m" className="thinBodyText proposalCardText">
                  Porque representar de verdad no es solo estar, es hacerse
                  cargo. Y ese es el camino que venimos a recuperar.
                </Text>
              </Column>
            </Card>

            <Column fillWidth gap="16">
              <Card
                className="voteCard"
                fillWidth
                radius="xl"
                padding="24"
                direction="column"
                background="brand-alpha-weak"
                border="brand-alpha-medium"
              >
                <Text variant="label-default-s" className="voteCardLabel">
                  Con tu voto
                </Text>
                <Heading as="h3" variant="heading-strong-xl" marginTop="8">
                  El voto del afiliado puede poner al sindicato otra vez de pie.
                </Heading>
                <Column as="ul" gap="12" marginTop="20">
                  {briefs.map((item) => (
                    <Column as="li" key={item.title} gap="4">
                      <Text variant="label-default-s" className="voteCardLabel">
                        {item.kicker}
                      </Text>
                      <Text variant="body-default-m" className="voteCardBodyText">
                        {item.title}
                      </Text>
                    </Column>
                  ))}
                </Column>
              </Card>

              <Card
                className="portalCard"
                fillWidth
                radius="xl"
                padding="24"
                direction="column"
                background="surface"
                border="neutral-alpha-medium"
              >
                <Text variant="label-default-s" className="portalCardLabel">
                  Sobre el portal
                </Text>
                <Heading as="h3" variant="heading-strong-l" marginTop="8">
                  Este portal es tuyo.
                </Heading>
                <Text onBackground="neutral-weak" marginTop="8" className="thinBodyText">
                  Es un espacio pensado para escuchar, proponer y construir
                  entre todos. Creemos en un sindicato que no se aleje del
                  afiliado, sino que este presente, ordenado y del lado del
                  trabajador en cada decision.
                </Text>
                <Text onBackground="neutral-weak" marginTop="8" className="thinBodyText">
                  Si queres ser parte de ese cambio, te invitamos a acompanar
                  con tu voto. Pero tambien a algo mas importante: caminar
                  juntos la recuperacion del gremio y de cada derecho que se
                  fue perdiendo.
                </Text>
                <Row marginTop="20">
                  <JoinModalButton label="Quiero ser parte" />
                </Row>
              </Card>
            </Column>
          </Row>

          <section className="editorialManifestoSection" id="propuesta">
            <div className="editorialManifestoShell">
              <div className="editorialManifestoIntro">
                <Text variant="label-default-s" className="editorialManifestoKicker">
                  Nuestra Propuesta
                </Text>
                <Heading as="h2" variant="display-strong-s" className="editorialManifestoTitle">
                  Un sindicato preparado para el futuro
                </Heading>
              </div>

              <div className="editorialManifestoLayout">
                <div className="editorialManifestoImageWrap">
                  <Image
                    src={editorialImage}
                    alt="Cacho Garcia en actividad sindical"
                    fill
                    className="editorialManifestoImage editorialManifestoImageDesktop"
                    sizes="(max-width: 768px) 100vw, 280px"
                  />
                  <Image
                    src={editorialMobileImage}
                    alt="Cacho Garcia en actividad sindical"
                    fill
                    className="editorialManifestoImage editorialManifestoImageMobile"
                    sizes="(max-width: 768px) 100vw, 280px"
                  />
                </div>

                <div className="editorialManifestoColumns">
                  {modernizationColumns.map((column, index) => (
                    <div key={`editorial-column-${index}`} className="editorialManifestoColumn">
                      {column.map((paragraph) => (
                        <Text
                          key={paragraph}
                          variant="body-default-s"
                          className="editorialManifestoParagraph"
                        >
                          {paragraph}
                        </Text>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="editorialManifestoSignature">
                <span className={`${signatureFont.className} editorialManifestoSignatureText`}>
                  Cacho Garcia
                </span>
              </div>
            </div>
          </section>

          <Column fillWidth gap="16" id="ejes-propuesta">
            <Column fillWidth gap="12" horizontal="center" className="proposalMarqueeContainer">
              <Heading as="h2" variant="heading-strong-xl">
                Ejes de la propuesta
              </Heading>
              <div
                className="proposalMarquee"
                aria-label="Presencia, organizacion y defensa concreta del trabajador"
              >
                <div className="proposalMarqueeTrack">
                  <span>Presencia, organizacion y defensa concreta del trabajador</span>
                  <span>Presencia, organizacion y defensa concreta del trabajador</span>
                  <span>Presencia, organizacion y defensa concreta del trabajador</span>
                </div>
              </div>
            </Column>
            <Line />
            <Row fillWidth gap="16" s={{ direction: "column" }}>
              {cards.map((card) => (
                <Card
                  key={card.title}
                  className="proposalCard"
                  fillWidth
                  radius="xl"
                  padding="4"
                  direction="column"
                  background="surface"
                  border="neutral-alpha-medium"
                >
                  <Media
                    src={card.image}
                    alt={card.title}
                    aspectRatio="16 / 10"
                    radius="l"
                    sizes="(max-width: 768px) 100vw, 420px"
                  />
                  <Column fillWidth padding="20" gap="8" className="proposalCardBody">
                    <Text variant="label-default-s" className="proposalCardKicker">
                      Eje central
                    </Text>
                    <Heading as="h3" variant="heading-strong-m" wrap="balance" className="proposalCardTitle">
                      {card.title}
                    </Heading>
                    <Text className="thinBodyText proposalCardText">{card.description}</Text>
                  </Column>
                </Card>
              ))}
            </Row>
          </Column>
        </Column>
      </Column>
    </Column>
  );
}
