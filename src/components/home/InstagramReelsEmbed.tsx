"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    TagembedWidget?: {
      load?: () => void;
    };
  }
}

type InstagramReelsEmbedProps = {
  compact?: boolean;
};

export function InstagramReelsEmbed({ compact = false }: InstagramReelsEmbedProps) {
  useEffect(() => {
    const existingScript = document.querySelector<HTMLScriptElement>(
      'script[data-tagembed-script="true"]',
    );

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://widget.tagembed.com/embed.min.js";
      script.async = true;
      script.type = "text/javascript";
      script.dataset.tagembedScript = "true";
      script.addEventListener("load", () => {
        window.TagembedWidget?.load?.();
      });
      document.body.appendChild(script);
      return;
    }

    window.TagembedWidget?.load?.();
  }, []);

  if (compact) {
    return (
      <section
        className="showcasePhoneCard showcasePhoneCardEmbed reelsEmbedCardTransparent"
        id="ultimos-reels"
      >
        <div className="showcasePhoneCardHeader">
          <span className="showcasePhoneKicker">Ultimos reels</span>
          <h3 className="showcasePhoneTitle">La Nueve de Julio en las redes</h3>
          <p className="showcasePhoneLead">
            Los compañeros en Instagram y Facebook.
          </p>
        </div>

        <div className="reelsEmbedShell reelsEmbedShellCompact reelsEmbedShellNative">
          <div
            className="tagembed-widget"
            style={{ width: "100%", height: "100%", overflow: "auto" }}
            data-widget-id="325066"
            data-website="1"
          />
        </div>
      </section>
    );
  }

  return (
    <section className="masonryCard reelsEmbedCard reelsEmbedCardTransparent masonryCardTall" id="ultimos-reels">
      <div className="cardHeader">
        <span className="cardEyebrow">Ultimos reels</span>
        <h2 className="cardTitle">La Nueve de Julio en las redes</h2>
        <p className="cardLead">
          Los compañeros en Instagram y Facebook.
        </p>
      </div>

      <div className="reelsEmbedShell reelsEmbedShellNative">
        <div
          className="tagembed-widget"
          style={{ width: "100%", height: "100%", overflow: "auto" }}
          data-widget-id="325066"
          data-website="1"
        />
      </div>
    </section>
  );
}
