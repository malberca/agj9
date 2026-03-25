import signupFunctions from "@/resources/signup-functions.json";

export type SignupPayload = {
  nombre?: string;
  email?: string;
  telefono?: string;
  estacionServicio?: string;
  funcion?: string;
  mensaje?: string;
};

export type SignupField = "nombre" | "email" | "telefono" | "estacionServicio" | "funcion" | "mensaje";

export type SignupFieldErrors = Partial<Record<SignupField, string>>;

export type SignupFunctionOption = {
  value: string;
  label: string;
};

export const signupFunctionOptions = signupFunctions as SignupFunctionOption[];

const signupFunctionValues = new Set(signupFunctionOptions.map((option) => option.value));
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const wordPattern = /^[\p{L}][\p{L}'’-]*$/u;

export function validateSignupNombre(value: string) {
  const compactValue = value.trim().replace(/\s+/g, " ");

  if (!compactValue) {
    return "Escribi tu nombre y apellido.";
  }

  const parts = compactValue.split(" ");

  if (parts.length < 2 || parts.some((part) => part.replace(/['’-]/g, "").length < 2)) {
    return "Necesito nombre y apellido.";
  }

  if (!parts.every((part) => wordPattern.test(part))) {
    return "Usa solo letras para nombre y apellido.";
  }

  return null;
}

export function validateSignupEmail(value: string) {
  const compactValue = value.trim().toLowerCase();

  if (!compactValue) {
    return "Necesito un email para poder contactarte.";
  }

  if (!emailPattern.test(compactValue)) {
    return "Escribi un email valido, por ejemplo nombre@mail.com.";
  }

  return null;
}

export function validateSignupFuncion(value: string) {
  const compactValue = value.trim();

  if (!compactValue) {
    return null;
  }

  if (!signupFunctionValues.has(compactValue)) {
    return "Elegi una funcion de la lista.";
  }

  return null;
}

export function getSignupFieldErrors(payload: SignupPayload) {
  const errors: SignupFieldErrors = {};

  const nombreError = validateSignupNombre(payload.nombre || "");
  if (nombreError) {
    errors.nombre = nombreError;
  }

  const emailError = validateSignupEmail(payload.email || "");
  if (emailError) {
    errors.email = emailError;
  }

  if (!(payload.telefono || "").trim()) {
    errors.telefono = "Necesito un telefono para poder contactarte.";
  }

  const funcionError = validateSignupFuncion(payload.funcion || "");
  if (funcionError) {
    errors.funcion = funcionError;
  }

  return errors;
}

export function normalizeSignupPayload(payload: SignupPayload) {
  return {
    nombre: (payload.nombre || "").trim().replace(/\s+/g, " "),
    email: (payload.email || "").trim().toLowerCase(),
    telefono: (payload.telefono || "").trim(),
    estacionServicio: (payload.estacionServicio || "").trim(),
    funcion: (payload.funcion || "").trim(),
    mensaje: (payload.mensaje || "").trim(),
  };
}
