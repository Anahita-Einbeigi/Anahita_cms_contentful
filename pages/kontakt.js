import { fetchContent } from "../lib/contentful";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faGlobe, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import Image from "next/image";
import styles from "./src/styles/Kontakt.module.css";

export default function Home({ content }) {
  return (
    <div className={styles.kontaktWrapper}>
      <main className={styles.mainContent}>
        {content.map((item) => (
          <div key={item.sys.id} className={styles.flexContainer}>
            {item.fields.image && item.fields.image.fields && item.fields.image.fields.file && (
              <Image
                src={`https:${item.fields.image.fields.file.url}`}
                alt={item.fields.title || "Kontaktbild"} 
                className={styles.responsiveImage}
                width={400}
                height={300}
                priority={true}
              />
            )}
            <div className={styles.content}>
              <h1 className={styles.heading}>{item.fields.rubrik}</h1>
              <p className={styles.paragraph}>{item.fields.kontaktinfo}</p>
              {item.fields.contacts && Array.isArray(item.fields.contacts) && item.fields.contacts.length > 0 && (
                <ul className={styles.ulList}>
                  {item.fields.contacts.map((contact, index) => (
                    <li key={index}>
                      <p><FontAwesomeIcon icon={faPhone} /> <strong> Tell: </strong> {contact.fields.tell}</p>
                      <p><FontAwesomeIcon icon={faGlobe} /> <strong> Website: </strong> {contact.fields.webbsite}</p>
                      <p><FontAwesomeIcon icon={faEnvelope} /> <strong> Mail: </strong> {contact.fields.mail}</p>
                      <p><FontAwesomeIcon icon={faMapMarkerAlt} /> <strong> Adress: </strong> {contact.fields.adress}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export async function getStaticProps() {
  try {
    const data = await fetchContent("kontakt");
    return {
      props: {
        content: data || [], 
      },
      revalidate: 10, 
    };
  } catch (error) {
    return {
      props: {
        content: [],
      },
    };
  }
}
