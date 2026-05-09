"use client";

import { useEffect, useState } from "react";

type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const TARGET_ISO = "2026-10-15T00:00:00-03:00";

function getCountdownParts(targetIso: string): CountdownParts {
  const distance = new Date(targetIso).getTime() - Date.now();

  if (distance <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((distance / (1000 * 60)) % 60),
    seconds: Math.floor((distance / 1000) % 60),
  };
}

function pad(value: number) {
  return value.toString().padStart(2, "0");
}

export function HeaderCountdownMarquee() {
  const [countdown, setCountdown] = useState<CountdownParts>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      setCountdown(getCountdownParts(TARGET_ISO));
    };

    updateCountdown();
    const intervalId = window.setInterval(updateCountdown, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  return (
    <div
      className="headerCountdownMarquee"
      aria-label="Informacion institucional y cuenta regresiva"
    >
      <div className="headerCountdownInner">
        <span className="headerCountdownEyebrow">Cada vez falta menos</span>
        <div className="headerCountdownUnits">
          <span className="headerCountdownUnit">
            <strong>{countdown.days}</strong>
            <em>Dias</em>
          </span>
          <span className="headerCountdownDivider">:</span>
          <span className="headerCountdownUnit">
            <strong>{pad(countdown.hours)}</strong>
            <em>Horas</em>
          </span>
          <span className="headerCountdownDivider">:</span>
          <span className="headerCountdownUnit">
            <strong>{pad(countdown.minutes)}</strong>
            <em>Minutos</em>
          </span>
          <span className="headerCountdownDivider">:</span>
          <span className="headerCountdownUnit">
            <strong>{pad(countdown.seconds)}</strong>
            <em>Segundos</em>
          </span>
        </div>
        <div className="headerCountdownInfo">
          <span className="headerCountdownInfoLabel">Informacion:</span>
          <p>
            Informamos a los compañeros que la fecha de vencimiento del mandato actual es el 26 de octubre de 2026.
            Actualmente, desde la Agrupacion 9 de Julio, hemos enviado una carta documento para solicitar formalmente
            las fechas de los comicios y obtener mayor claridad sobre el cronograma real del cambio de autoridades.
          </p>
        </div>
      </div>
    </div>
  );
}
