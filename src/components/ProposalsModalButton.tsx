"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { Button, Dialog, Icon, Row } from "@once-ui-system/core";

type ProposalsModalButtonProps = {
  label?: string;
  className?: string;
  showIcon?: boolean;
};

const proposalColumns = [
  [
    "Hace tiempo que el sindicato le dio la espalda al trabajador. Lo ves en los numeros: hoy estas cobrando 1.400.000 pesos, los del lavadero ni te cuento porque estan todos en negro, y los que deberian representarte estan mirando para otro lado.",
    "Nosotros venimos a cambiar eso. No con promesas. Con trabajo.",
    "Primero: el Convenio Colectivo. Es lo mas urgente y es lo primero que vamos a atacar. Un convenio que refleje como se trabaja hoy: las noches en el garage, las tardes bajo la lluvia en la estacion, los turnos de 7x24. Si el convenio no tiene eso adentro, no te representa.",
    "Lo vamos a actualizar y lo vamos a modernizar, pero siempre con los trabajadores sentados en la mesa, no a espaldas de ellos.",
  ],
  [
    "El dirigente tiene que saber lo que es el laburo. Nosotros venimos de ahi. De trabajar en campo. El Negro Moyano trabajo en un camion. Yo vengo de trabajar anos en los antiguos garages de la 9 de Julio. Los dirigentes que valen la pena, laburaron antes de dirigir.",
    "Si no sentiste una noche en un garage, si no estuviste en una estacion de servicio cuando llueve y hace frio, no podes representar a ese trabajador. Es asi de simple.",
    "La modernizacion no te tiene que dejar afuera. No le tenemos miedo a que el mundo cambie. Las estaciones automaticas existen en todo el mundo. Pero hay una diferencia entre modernizarse y rajar companeros. Nosotros negociamos adaptacion, no despidos.",
    "Te garantizamos capacitacion real en las herramientas nuevas para transformarlas en tu aliado en el dia a dia. Ningun trabajador queda afuera del futuro si el gremio hace bien su trabajo.",
  ],
  [
    "Tu obra social tiene que funcionar. Vamos a ponerla al servicio del afiliado y su familia, no de la gestion de turno.",
    "Transparencia y participacion, sin vueltas. Queremos saber cuantos afiliados hay. Queremos el padron. Queremos el estatuto. Pedimos la fecha de elecciones. Si hay que ir a la Justicia, vamos a la Justicia. Esta no la dejamos pasar.",
    "Lo que se construyo, se cuida. El hotel lo terminamos de pagar nosotros. El camping lo compramos con nuestra gestion. Eso es de los afiliados y va a seguir siendolo. Los recursos del gremio vuelven al trabajador.",
    "Tengan fe en la Agrupacion 9 de Julio y en la Lista Azul y Blanca. Vamos todos juntos por un gremio distinto. Y es posible.",
  ],
];

export function ProposalsModalButton({
  label = "Propuestas",
  className = "",
  showIcon = false,
}: ProposalsModalButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("proposal-letter-open", isOpen);

    return () => {
      document.body.classList.remove("proposal-letter-open");
    };
  }, [isOpen]);

  return (
    <>
      <button
        type="button"
        className={className}
        onClick={() => setIsOpen(true)}
        aria-label={label || "Propuestas"}
      >
        {showIcon ? (
          <Row as="span" gap="8" vertical="center">
            <Icon name="grid" size="s" />
            {label ? <span>{label}</span> : null}
          </Row>
        ) : (
          label
        )}
      </button>

      <Dialog
        className="proposalLetterModal"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title=""
        footer={
          <Row fillWidth horizontal="end">
            <Button variant="tertiary" size="s" onClick={() => setIsOpen(false)}>
              Cerrar
            </Button>
          </Row>
        }
      >
        <section className="proposalLetterSheet">
          <header className="proposalLetterHeader">
            <div>
              <span className="proposalLetterEyebrow">Nuestra propuesta</span>
              <h2 className="proposalLetterTitle">Carta abierta al afiliado</h2>
            </div>
          </header>

          <div className="proposalLetterGrid">
            {proposalColumns.map((column, index) => (
              <div key={`proposal-column-${index + 1}`} className="proposalLetterColumn">
                {column.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            ))}
          </div>

          <div className="proposalLetterSignature">
            <div className="proposalLetterProfile">
              <Image
                src="/images/avatar.jpg"
                alt="Cacho Garcia"
                width={120}
                height={120}
                className="proposalLetterProfileImage"
              />
              <div className="proposalLetterProfileMeta">
                <Image
                  src="/images/logo/firma-cacho.png"
                  alt="Firma de Cacho Garcia"
                  width={220}
                  height={88}
                  className="proposalLetterSignatureImage"
                />
                <span className="proposalLetterProfileLabel">Cacho Garcia</span>
              </div>
            </div>
          </div>
        </section>
      </Dialog>
    </>
  );
}
