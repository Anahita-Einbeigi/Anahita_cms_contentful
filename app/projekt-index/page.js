"use client";
import { useEffect, useState } from "react";
import { fetchContent } from "../../lib/contentful";
import styles from "../../src/styles/Projekt.module.css";

export default function Home() {
  const [content, setContent] = useState([]);
  const [headerInfo, setHeaderInfo] = useState({ rubrik: "", beskrivning: "" });

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchContent("projektindex");
      setContent(data);

      if (data.length > 0) {
        setHeaderInfo({
          rubrik: data[0].fields.rubrik || "Default Title",
          beskrivning: data[0].fields.beskrivning || "Default Description",
        });
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.projektWrapper}>
      <header className={styles.header}>
        <h1>{headerInfo.rubrik}</h1>
        <p>{headerInfo.beskrivning}</p>
      </header>

      <main className={styles.projektGrid}>
        {content &&
          content.map((item) =>
            item.fields.projektreferenser &&
            item.fields.projektreferenser.map((Projekt, index) => (
              <div key={index} className={styles.projektCard}>
                <img
                  src={`https:${Projekt.fields.img?.fields?.file?.url || ""}`}
                  alt={Projekt.fields.title || "Project image"}
                />
                <h2>{Projekt.fields.title}</h2>
                <p>{Projekt.fields.text}</p>
                {Projekt.fields.link && (
                  <a
                    href={Projekt.fields.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    See more information
                  </a>
                )}
              </div>
            ))
          )}
      </main>
    </div>
  );
}
