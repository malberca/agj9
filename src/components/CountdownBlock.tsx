"use client";

import { useEffect, useState } from "react";

import { Column, Heading, Row, Text } from "@once-ui-system/core";

type CountdownBlockProps = {
  targetIso: string;
};

type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

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

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  return {
    days,
    hours,
    minutes,
    seconds,
  };
}

function pad(value: number) {
  return value.toString().padStart(2, "0");
}

export function CountdownBlock({ targetIso }: CountdownBlockProps) {
  const [countdown, setCountdown] = useState<CountdownParts>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      setCountdown(getCountdownParts(targetIso));
    };

    updateCountdown();

    const intervalId = window.setInterval(updateCountdown, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, [targetIso]);

  return (
    <section className="countdownSection" aria-label="Dias para el cambio">
      <Column fillWidth horizontal="center" className="countdownInner">
        <Text className="countdownEyebrow">Cuenta regresiva</Text>
        <Heading
          as="h2"
          variant="display-strong-m"
          className="countdownTitle"
        >
          Dias para el cambio
        </Heading>
        <Text className="countdownDateHint">Fecha tentativa: 15 de octubre de 2026</Text>

        <Row
          fillWidth
          horizontal="center"
          vertical="center"
          gap="20"
          wrap
          className="countdownGrid"
        >
          <div className="countdownUnit">
            <span className="countdownValue">{countdown.days}</span>
            <span className="countdownLabel">Dias</span>
          </div>
          <span className="countdownDivider">:</span>
          <div className="countdownUnit">
            <span className="countdownValue">{pad(countdown.hours)}</span>
            <span className="countdownLabel">Horas</span>
          </div>
          <span className="countdownDivider">:</span>
          <div className="countdownUnit">
            <span className="countdownValue">{pad(countdown.minutes)}</span>
            <span className="countdownLabel">Minutos</span>
          </div>
          <span className="countdownDivider">:</span>
          <div className="countdownUnit">
            <span className="countdownValue">{pad(countdown.seconds)}</span>
            <span className="countdownLabel">Segundos</span>
          </div>
        </Row>
      </Column>
    </section>
  );
}
