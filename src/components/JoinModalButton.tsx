"use client";

import Image from "next/image";
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";

import { Button, Column, Dialog, Heading, Input, Row, Text, Textarea } from "@once-ui-system/core";
import {
  SignupField,
  SignupFieldErrors,
  getSignupFieldErrors,
  signupFunctionOptions,
} from "@/lib/signup-validation";

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
  const [isSuccessPreview, setIsSuccessPreview] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [form, setForm] = useState<JoinFormState>(initialState);
  const [fieldErrors, setFieldErrors] = useState<SignupFieldErrors>({});

  const isDisabled = useMemo(
    () => !form.nombre.trim() || !form.email.trim() || !form.telefono.trim() || isSubmitting,
    [form.nombre, form.email, form.telefono, isSubmitting],
  );

  useEffect(() => {
    document.body.classList.toggle("join-modal-open", isOpen);

    return () => {
      document.body.classList.remove("join-modal-open");
    };
  }, [isOpen]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const isLocalPreview =
      window.location.hostname === "localhost" && params.get("join-success-preview") === "1";

    setIsSuccessPreview(isLocalPreview);
  }, []);

  function updateField(
    field: keyof JoinFormState,
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    setForm((current) => ({
      ...current,
      [field]: event.target.value,
    }));
    setFieldErrors((current) => {
      if (!current[field as SignupField]) {
        return current;
      }

      return {
        ...current,
        [field]: undefined,
      };
    });
  }

  function handleClose() {
    if (isSubmitting) {
      return;
    }

    setIsOpen(false);
    setErrorMessage("");
    setSubmitMessage("");
    setFieldErrors({});
  }

  function handleOpen() {
    if (isSuccessPreview) {
      setErrorMessage("");
      setSubmitMessage("Gracias. Ya enviamos tus datos al equipo.");
    }

    setIsOpen(true);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isDisabled) {
      return;
    }

    const validationErrors = getSignupFieldErrors(form);

    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      setErrorMessage("Revisa los campos marcados y volve a intentar.");
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
      setFieldErrors({});
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
        onClick={handleOpen}
      >
        {label}
      </Button>

      <Dialog
        className={`joinModal${submitMessage ? " is-success" : ""}`}
        isOpen={isOpen}
        onClose={handleClose}
        title={
          submitMessage ? undefined : (
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
          )
        }
        description={
          submitMessage ? undefined : (
            <Text variant="body-default-s" className="joinModalDescription">
              Dejanos tus datos y el equipo se pone en contacto.
            </Text>
          )
        }
        footer={
          submitMessage ? (
            <Row fillWidth horizontal="center" className="joinModalFooter joinModalFooterSuccess">
              <Button
                variant="secondary"
                size="s"
                onClick={handleClose}
                disabled={isSubmitting}
                className="joinModalSuccessClose"
              >
                Cerrar
              </Button>
            </Row>
          ) : (
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
          )
        }
      >
        {submitMessage ? (
          <div className="joinModalSuccess">
            <div className="joinModalSuccessInner">
              <Image
                src="/images/projects/project-01/lito_gracias_zoom.webp"
                alt="Lito agradeciendo la adhesión"
                width={420}
                height={420}
                className="joinModalSuccessImage"
              />
              <div className="joinModalSuccessEyebrow">Lista Azul y Blanca</div>
              <div className="joinModalSuccessSubeyebrow">Cacho Garcia Conduccion</div>
              <div className="joinModalSuccessTitle">Gracias</div>
              <div className="joinModalSuccessText">{submitMessage}</div>
            </div>
          </div>
        ) : (
          <form id="join-modal-form" onSubmit={handleSubmit} className="joinModalForm">
            <Column fillWidth gap="12">
              <div className="joinModalFieldGroup">
                <Input
                  id="join-nombre"
                  className="joinModalField"
                  aria-label="Nombre y apellido"
                  aria-invalid={Boolean(fieldErrors.nombre)}
                  height="s"
                  value={form.nombre}
                  onChange={(event) => updateField("nombre", event)}
                  placeholder="Nombre y apellido"
                  required
                />
                {fieldErrors.nombre && (
                  <Text variant="body-default-xs" className="joinModalFieldError">
                    {fieldErrors.nombre}
                  </Text>
                )}
              </div>
              <div className="joinModalFieldGroup">
                <Input
                  id="join-email"
                  className="joinModalField"
                  aria-label="Email"
                  aria-invalid={Boolean(fieldErrors.email)}
                  height="s"
                  type="email"
                  value={form.email}
                  onChange={(event) => updateField("email", event)}
                  placeholder="Email"
                  required
                />
                {fieldErrors.email && (
                  <Text variant="body-default-xs" className="joinModalFieldError">
                    {fieldErrors.email}
                  </Text>
                )}
              </div>
              <div className="joinModalFieldGroup">
                <Input
                  id="join-telefono"
                  className="joinModalField"
                  aria-label="Telefono"
                  aria-invalid={Boolean(fieldErrors.telefono)}
                  height="s"
                  value={form.telefono}
                  onChange={(event) => updateField("telefono", event)}
                  placeholder="Telefono"
                  required
                />
                {fieldErrors.telefono && (
                  <Text variant="body-default-xs" className="joinModalFieldError">
                    {fieldErrors.telefono}
                  </Text>
                )}
              </div>
              <div className="joinModalFieldGroup">
                <Input
                  id="join-estacion"
                  className="joinModalField"
                  aria-label="Estacion de Servicio (direccion)"
                  height="s"
                  value={form.estacionServicio}
                  onChange={(event) => updateField("estacionServicio", event)}
                  placeholder="Estacion de Servicio (direccion)"
                />
              </div>
              <div className="joinModalFieldGroup">
                <select
                  id="join-funcion"
                  className={`joinModalField joinModalSelect${form.funcion ? "" : " is-empty"}`}
                  aria-label="Funcion"
                  aria-invalid={Boolean(fieldErrors.funcion)}
                  value={form.funcion}
                  onChange={(event) => updateField("funcion", event)}
                >
                  <option value="">Funcion</option>
                  {signupFunctionOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {fieldErrors.funcion && (
                  <Text variant="body-default-xs" className="joinModalFieldError">
                    {fieldErrors.funcion}
                  </Text>
                )}
              </div>
              <div className="joinModalFieldGroup">
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
              </div>

              {errorMessage && (
                <Text onBackground="danger-medium" variant="body-default-s" className="joinModalErrorMessage">
                  {errorMessage}
                </Text>
              )}
            </Column>
          </form>
        )}
      </Dialog>
    </>
  );
}
