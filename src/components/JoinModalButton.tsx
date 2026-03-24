"use client";

import Image from "next/image";
import { ChangeEvent, FormEvent, useMemo, useState } from "react";

import { Button, Column, Dialog, Heading, Input, Row, Text, Textarea } from "@once-ui-system/core";

type JoinFormState = {
  nombre: string;
  email: string;
  telefono: string;
  estacionServicio: string;
  funcion: string;
  mensaje: string;
};

const initialState: JoinFormState = {
  nombre: "",
  email: "",
  telefono: "",
  estacionServicio: "",
  funcion: "",
  mensaje: "",
};

type JoinModalButtonProps = {
  label?: string;
  className?: string;
};

export function JoinModalButton({
  label = "Sumate!",
  className = "joinHeroTrigger",
}: JoinModalButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [form, setForm] = useState<JoinFormState>(initialState);

  const isDisabled = useMemo(
    () => !form.nombre.trim() || !form.email.trim() || !form.telefono.trim() || isSubmitting,
    [form.nombre, form.email, form.telefono, isSubmitting],
  );

  function updateField(
    field: keyof JoinFormState,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm((current) => ({
      ...current,
      [field]: event.target.value,
    }));
  }

  function handleClose() {
    if (isSubmitting) {
      return;
    }

    setIsOpen(false);
    setErrorMessage("");
    setSubmitMessage("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isDisabled) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");
    setSubmitMessage("");

    try {
      const response = await fetch("/api/lito-signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const result = (await response.json().catch(() => null)) as
        | { error?: string; message?: string }
        | null;

      if (!response.ok) {
        throw new Error(result?.error || "No pude enviar los datos en este momento.");
      }

      setSubmitMessage(result?.message || "Gracias. Ya enviamos tus datos al equipo.");
      setForm(initialState);
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "No pude enviar los datos en este momento.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Button
        variant="secondary"
        size="m"
        weight="default"
        className={className}
        onClick={() => setIsOpen(true)}
      >
        {label}
      </Button>

      <Dialog
        className="joinModal"
        isOpen={isOpen}
        onClose={handleClose}
        title={
          <Column horizontal="center" gap="8" className="joinModalTitleWrap">
            <Image
              src="/images/logo/logo_blue.png"
              alt="Logo Agrupacion Nueve de Julio"
              width={52}
              height={52}
              className="joinModalLogo"
            />
            <Heading as="h2" variant="heading-strong-m" className="joinModalTitle">
              Sumate a la Lista Azul y Blanca
            </Heading>
          </Column>
        }
        description={
          <Text variant="body-default-s" className="joinModalDescription">
            Dejanos tus datos y el equipo se pone en contacto.
          </Text>
        }
        footer={
          <Row
            fillWidth
            horizontal="between"
            vertical="center"
            s={{ direction: "column" }}
            className="joinModalFooter"
          >
            <Button variant="tertiary" size="s" onClick={handleClose} disabled={isSubmitting}>
              Cerrar
            </Button>
            <Button
              form="join-modal-form"
              type="submit"
              disabled={isDisabled}
              size="s"
              className="joinModalSubmit"
            >
              {isSubmitting ? "Enviando..." : "Enviar datos"}
            </Button>
          </Row>
        }
      >
        <form id="join-modal-form" onSubmit={handleSubmit} className="joinModalForm">
          <Column fillWidth gap="12">
            <Input
              id="join-nombre"
              className="joinModalField"
              aria-label="Nombre y apellido"
              height="s"
              value={form.nombre}
              onChange={(event) => updateField("nombre", event)}
              placeholder="Nombre y apellido"
              required
            />
            <Input
              id="join-email"
              className="joinModalField"
              aria-label="Email"
              height="s"
              type="email"
              value={form.email}
              onChange={(event) => updateField("email", event)}
              placeholder="Email"
              required
            />
            <Input
              id="join-telefono"
              className="joinModalField"
              aria-label="Telefono"
              height="s"
              value={form.telefono}
              onChange={(event) => updateField("telefono", event)}
              placeholder="Telefono"
              required
            />
            <Input
              id="join-estacion"
              className="joinModalField"
              aria-label="Estacion de Servicio (direccion)"
              height="s"
              value={form.estacionServicio}
              onChange={(event) => updateField("estacionServicio", event)}
              placeholder="Estacion de Servicio (direccion)"
            />
            <Input
              id="join-funcion"
              className="joinModalField"
              aria-label="Funcion"
              height="s"
              value={form.funcion}
              onChange={(event) => updateField("funcion", event)}
              placeholder="Funcion"
            />
            <Textarea
              id="join-mensaje"
              className="joinModalField joinModalTextarea"
              aria-label="Si queres contarnos algo mas este es tu espacio"
              value={form.mensaje}
              onChange={(event) => updateField("mensaje", event)}
              placeholder="Si queres contarnos algo mas este es tu espacio"
              lines={3}
              resize="vertical"
            />

            {errorMessage && (
              <Text onBackground="danger-medium" variant="body-default-s">
                {errorMessage}
              </Text>
            )}

            {submitMessage && (
              <Text onBackground="success-medium" variant="body-default-s">
                {submitMessage}
              </Text>
            )}
          </Column>
        </form>
      </Dialog>
    </>
  );
}
