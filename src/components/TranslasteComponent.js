import { Box } from "@mui/material";
import React, { useEffect, useRef } from "react";


const TranslateComponent = () => {
  const googleTranslateRef = useRef(null);

  useEffect(() => {
    const scriptId = "google-translate-script";

    const initializeGoogleTranslate = () => {
      if (window.google?.translate?.TranslateElement) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            autoDisplay: false,
            layout: window.google.translate.TranslateElement?.InlineLayout?.SIMPLE || 0,
          },
          googleTranslateRef.current
        );
      } else {
        setTimeout(initializeGoogleTranslate, 500);
      }
    };

    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;

      script.onload = () => {
        setTimeout(initializeGoogleTranslate, 0);
      };

      script.onerror = () => console.error("Google Translate script failed to load.");

      document.body.appendChild(script);
    } else {
      setTimeout(initializeGoogleTranslate, 0);
    }

    return () => {
      delete window.googleTranslateElementInit;
    };
  }, []);

  return (
    <Box ref={googleTranslateRef} className="google-translate-container" />
  );
};

export default TranslateComponent;
