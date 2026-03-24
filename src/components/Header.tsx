"use client";

import { usePathname } from "next/navigation";
import { Fragment, useEffect, useState } from "react";

import { Flex, Line, Row, ToggleButton } from "@once-ui-system/core";

import { routes, display, person, about, blog, work, gallery } from "@/resources";
import { ThemeToggle } from "./ThemeToggle";
import styles from "./Header.module.scss";

type TimeDisplayProps = {
  timeZone: string;
  locale?: string; // Optionally allow locale, defaulting to 'en-GB'
};

const TimeDisplay: React.FC<TimeDisplayProps> = ({ timeZone, locale = "en-GB" }) => {
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      const timeString = new Intl.DateTimeFormat(locale, options).format(now);
      setCurrentTime(timeString);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, [timeZone, locale]);

  return <>{currentTime}</>;
};

export default TimeDisplay;

export const Header = () => {
  const pathname = usePathname() ?? "";
  const [atTop, setAtTop] = useState(true);

  const disabledNavItems = [
    {
      key: "/about",
      icon: "person" as const,
      label: about.label,
    },
    {
      key: "/work",
      icon: "grid" as const,
      label: work.label,
    },
    {
      key: "/blog",
      icon: "book" as const,
      label: blog.label,
    },
    {
      key: "/gallery",
      icon: "gallery" as const,
      label: gallery.label,
    },
  ];

  useEffect(() => {
    const updateScrollState = () => {
      setAtTop(window.scrollY <= 24);
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });

    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  return (
    <>
      <Row
        fitHeight
        className={`${styles.position} ${atTop ? styles.atTop : ""}`}
        position="fixed"
        as="header"
        zIndex={9}
        fillWidth
        padding="8"
        horizontal="center"
        data-border="rounded"
      >
        <Row
          className={styles.sideSlot}
          paddingLeft="12"
          fillWidth
          vertical="center"
          textVariant="body-default-s"
        >
          {display.location && <Row s={{ hide: true }}>{person.location}</Row>}
        </Row>
        <Row fillWidth horizontal="center">
          <Row
            className={styles.navGlass}
            background="page"
            border="neutral-alpha-weak"
            radius="m-4"
            shadow="l"
            padding="4"
            horizontal="center"
            zIndex={1}
          >
            <Row gap="4" vertical="center" textVariant="body-default-s" suppressHydrationWarning>
              {routes["/"] && (
                <ToggleButton prefixIcon="home" href="/" selected={pathname === "/"} />
              )}
              <Line background="neutral-alpha-medium" vert maxHeight="24" />
              {disabledNavItems.map((item) => (
                <Fragment key={item.key}>
                  <Row s={{ hide: true }}>
                    <ToggleButton
                      prefixIcon={item.icon}
                      label={item.label}
                      disabled
                      tabIndex={-1}
                      aria-disabled="true"
                      className={styles.disabledToggle}
                    />
                  </Row>
                  <Row hide s={{ hide: false }}>
                    <ToggleButton
                      prefixIcon={item.icon}
                      disabled
                      tabIndex={-1}
                      aria-disabled="true"
                      className={styles.disabledToggle}
                    />
                  </Row>
                </Fragment>
              ))}
              {display.themeSwitcher && (
                <>
                  <Line background="neutral-alpha-medium" vert maxHeight="24" />
                  <ThemeToggle />
                </>
              )}
            </Row>
          </Row>
        </Row>
        <Flex className={styles.sideSlot} fillWidth horizontal="end" vertical="center">
          <Flex
            paddingRight="12"
            horizontal="end"
            vertical="center"
            textVariant="body-default-s"
            gap="20"
          >
            <Flex s={{ hide: true }}>
              {display.time && <TimeDisplay timeZone={person.location} />}
            </Flex>
          </Flex>
        </Flex>
      </Row>
    </>
  );
};
