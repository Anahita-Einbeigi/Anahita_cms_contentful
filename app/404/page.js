"use client";
import { useEffect, useState } from "react";
import { fetchContent } from "../../lib/contentful"; 
import styles from "../../src/styles/404.module.css"; 

export default function NotFound() {
  const [content, setContent] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchContent("felMeddelande"); 
        setContent(data); 
      } catch (error) {
        console.error("Fel vid hämtning av felmeddelande:", error); 
      }
    };

    fetchData(); 
  }, []);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      {content.length > 0 ? (
        content.map((item) => (
          <div key={item.sys.id} className={styles.item}>
            <p className={styles.description}>{item.fields.error}</p>
            <a
              href={item.fields.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              {item.fields.linkText || "Back to the Home page"}
            </a>
          </div>
        ))
      ) : (
        <p className={styles.description}>We couldn't find any error message from Contentful.</p>
      )}
    </div>
  );
}
