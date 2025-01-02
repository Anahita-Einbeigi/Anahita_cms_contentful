import { fetchContent } from "../lib/contentful";
import styles from "./src/styles/404.module.css";

export default function NotFound({ content }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      {content.length > 0 ? (
        content.map((item) => (
          <div key={item.sys.id} className={styles.item}>
            <p className={styles.description}>{item.fields.error|| "We couldn't find any error message."}</p>
            <a
              href={item.fields.link|| "/"}
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

// hämta data statict(SSG)
export async function getStaticProps() {
  try {
    const data = await fetchContent("felMeddelande");
    return {
      props: {
        content: data || [],
      },
      revalidate: 10,
    };
  } catch (error) {
    console.error("Error fetching error message:", error);
    return {
      props: {
        content: [],
      },
    };
  }
}
