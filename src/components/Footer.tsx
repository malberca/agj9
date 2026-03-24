import Image from "next/image";
import { Row, IconButton, Text } from "@once-ui-system/core";
import { person, social } from "@/resources";
import styles from "./Footer.module.scss";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Row
      as="footer"
      fillWidth
      padding="8"
      horizontal="center"
      s={{ direction: "column" }}
    >
      <Row
        className={`${styles.mobile} ${styles.footerBlue}`}
        maxWidth="m"
        paddingY="8"
        paddingX="16"
        gap="16"
        horizontal="center"
        vertical="center"
        s={{
          direction: "column",
          horizontal: "center",
          align: "center",
        }}
      >
        <Row
          gap="8"
          vertical="center"
          wrap
          horizontal="center"
          className={styles.footerLine}
        >
          <Text variant="body-default-s" className={styles.footerYear}>
            © {currentYear}
          </Text>
          <Text variant="body-default-s" className={styles.footerMeta}>
            |
          </Text>
          <Text variant="body-default-s" className={styles.footerMeta}>
            {person.name}
          </Text>
          <Text variant="body-default-s" className={styles.footerMeta}>
            |
          </Text>
          <Text variant="body-default-s" className={styles.footerMeta}>
            Todos los derechos reservados
          </Text>
        </Row>
        <Row
          gap="12"
          wrap
          horizontal="center"
          vertical="center"
          className={styles.footerCampaignLogos}
        >
          <span className={styles.footerCampaignLogoFrame}>
            <Image
              src="/images/logo/cgt_blue.webp"
              alt="Logo CGT"
              width={92}
              height={40}
              className={styles.footerCampaignLogo}
            />
          </span>
          <span className={styles.footerCampaignLogoFrame}>
            <Image
              src="/images/logo/las62_blue.webp"
              alt="Logo 62"
              width={92}
              height={40}
              className={styles.footerCampaignLogo}
            />
          </span>
          <span className={styles.footerCampaignLogoFrame}>
            <Image
              src="/images/logo/la9_blue.webp"
              alt="Logo La 9"
              width={92}
              height={40}
              className={styles.footerCampaignLogo}
            />
          </span>
          <span className={styles.footerCampaignLogoFrame} aria-label="Logo Mano Consultora">
            <Image
              src="/images/logo/mano-gr.svg"
              alt="Logo Mano Consultora"
              width={70}
              height={70}
              className={styles.footerCampaignLogo}
            />
          </span>
        </Row>
        <Row gap="16">
          {social.map(
            (item) =>
              item.link && (
                <IconButton
                  key={item.name}
                  href={item.link}
                  icon={item.icon}
                  tooltip={item.name}
                  size="s"
                  variant="ghost"
                />
              ),
          )}
        </Row>
      </Row>
      <Row height="80" hide s={{ hide: false }} />
    </Row>
  );
};
