import Image from "next/image";
import cover01Image from "../../public/images/projects/project-01/cover-01.jpg";
import cover02Image from "../../public/images/projects/project-01/cover-02.jpg";
import cover03Image from "../../public/images/projects/project-01/cover-03.webp";
import cover04Image from "../../public/images/projects/project-01/cover-04.webp";

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
          <source src="/video/cacho-mobile.mp4" type="video/mp4" />
        </video>
        <div className="newsHeroOverlay" />

        <div className="newsHeroInner">
          <div className="newsHeroTop">
            <Image
              src="/images/logo/logo_w.webp"
              alt="Agrupacion Nueve de Julio"
              width={260}
              height={96}
              className="newsHeroLogo"
              priority
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
                  Mensaje politico
                </Text>
                <Heading as="h2" variant="display-strong-s" wrap="balance" className="proposalCardTitle">
                  Es momento de recuperar el rumbo.
                </Heading>
                <Text variant="body-default-m" className="thinBodyText proposalCardText">
                  Cuando un sindicato se aleja de los trabajadores, pierde su
                  razon de ser. Hoy queremos volver a poner al afiliado en el
                  centro, con una conduccion presente, seria y comprometida.
                </Text>
              </Column>
            </Card>

            <Column fillWidth gap="16">
              <Card
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
                fillWidth
                radius="xl"
                padding="24"
                direction="column"
                background="surface"
                border="neutral-alpha-medium"
              >
                <Text variant="label-default-s" onBackground="neutral-weak">
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

          <Column fillWidth gap="16" id="propuesta">
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
