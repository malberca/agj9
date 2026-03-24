import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Agrupacion",
  lastName: "Nueve de Julio",
  name: "Agrupacion Nueve de Julio",
  role: "Cacho Garcia Conduccion",
  avatar: "/images/avatar.jpg",
  email: "contacto@agj9.ar",
  location: "America/Argentina/Buenos_Aires",
  languages: ["Espanol"],
};

const newsletter: Newsletter = {
  display: false,
  title: <>Novedades de la Agrupacion</>,
  description: <>Actualizaciones, propuestas y agenda</>,
};

const social: Social = [
  {
    name: "Email",
    icon: "email",
    link: `mailto:${person.email}`,
    essential: true,
  },
];

const home: Home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Inicio",
  title: "Agrupacion Nueve de Julio",
  description: "Sitio oficial de la Agrupacion Nueve de Julio.",
  headline: <>Agrupacion Nueve de Julio</>,
  featured: {
    display: false,
    title: <>Coming soon</>,
    href: "/about",
  },
  subline: (
    <>
      <Text as="span" size="xl" weight="strong">
        Cacho Garcia Conduccion
      </Text>
      <br />
      Un Nuevo Gremio es Posible.
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "Agrupacion",
  title: `Agrupacion - ${person.name}`,
  description: `Conoce la propuesta de ${person.name}`,
  tableOfContent: {
    display: false,
    subItems: false,
  },
  avatar: {
    display: false,
  },
  calendar: {
    display: false,
    link: "",
  },
  intro: {
    display: true,
    title: "Quienes somos",
    description: (
      <>
        Somos una agrupacion que busca renovar la vida gremial con cercania,
        organizacion y una comunicacion clara. Esta nueva presencia digital
        esta pensada para compartir propuestas, agenda y acompanar cada etapa
        del camino hacia agosto.
      </>
    ),
  },
  work: {
    display: false,
    title: "Trayectoria",
    experiences: [],
  },
  studies: {
    display: false,
    title: "Formacion",
    institutions: [],
  },
  technical: {
    display: false,
    title: "Lineamientos",
    skills: [],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Novedades",
  title: "Novedades",
  description: "Actualizaciones de la agrupacion",
};

const work: Work = {
  path: "/work",
  label: "Propuestas",
  title: "Propuestas",
  description: "Iniciativas y ejes de trabajo",
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Galeria",
  title: "Galeria",
  description: "Recorridos y presencia territorial",
  images: [],
};

export { person, social, newsletter, home, about, blog, work, gallery };
