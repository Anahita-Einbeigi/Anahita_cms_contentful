"use client";
import { useEffect, useState } from "react";
import { fetchContent } from "../lib/contentful"; 
import styles from "../src/styles/startsida.module.css";

export default function Home() {
  const [content, setContent] = useState([]); 

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchContent("startsida");
      setContent(data); 
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      {content.map((item) => (
        <div key={item.sys.id} className={styles.content}>
          {item.fields.image && (
            <div className={styles.imageContainer}>
              <img
                src={`https:${item.fields.image.fields.file.url}`}
                alt={item.fields.rubrik}
                className={styles.responsiveImage}
              />
            </div>
          )}
          <div className={styles.textContainer}>
            <h1 className={styles.heading}>{item.fields.rubrik}</h1>
            <p className={styles.description}>{item.fields.presentationstext}</p>
            <div className={styles.buttonGroup}>
              {item.fields.link && (
                <a href={item.fields.link} target="_blank" rel="noopener noreferrer">
                  Explore Now
                </a>
              )}
              {item.fields.linkedin && (
                <a href={item.fields.linkedin} target="_blank" rel="noopener noreferrer">
                  Linkedin
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
