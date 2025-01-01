import Image from "next/image"; 
import { fetchContent } from "../lib/contentful";
import styles from "./src/styles/startsida.module.css";
// import "./src/styles/global.css";

//"Home" renderar innehållet som hämtas från Contentful.
export default function Home({ content }) {
  return (
    <div className={styles.container}>
      {content.map((item) => (
        <div key={item.sys.id} className={styles.content}>
          {item.fields.image && item.fields.image.fields.file && (
            <div className={styles.imageContainer}>
              <Image
                src={`https:${item.fields.image.fields.file.url}`}
                alt={item.fields.rubrik} 
                width={800} 
                height={500} 
                className={styles.responsiveImage}
                priority
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

// getStaticProps hämtar data från Contentful vid byggtid och levererar det som props till komponenten "Home", vilket möjliggör statisk generering av sidan.
export async function getStaticProps() {
  const data = await fetchContent("startsida");
  return {
    props: {
      content: data,
    },
  };
}
