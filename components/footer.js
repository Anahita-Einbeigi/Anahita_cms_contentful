'use client';
import { useEffect, useState } from "react";
import { fetchContent } from "../lib/contentful";

const Footer = () => {
  const [footerText, setFooterText] = useState("");

  // Footer-komponenten använder en useEffect-hook för att hämta innehållet från Contentful dynamiskt vid klientens sidladdning.
  useEffect(() => {
    const fetchFooterContent = async () => {
      try {
        const response = await fetchContent("footer"); 
        if (response.length > 0) {
          setFooterText(response[0].fields.text); 
        }
      } catch (error) {
        console.error("Kunde inte hämta footer-innehåll:", error);
      }
    };

    fetchFooterContent();
  }, []);

  return (
    <footer style={{ textAlign: "center", padding: "1rem 0", background: "#2d2c2c", fontSize: "14px" }}>
      {footerText || "Laddar footer..."}
    </footer>
  );
};

export default Footer;
