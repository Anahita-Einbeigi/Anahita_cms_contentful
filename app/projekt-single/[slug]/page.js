import { fetchContent } from "../../../lib/contentful";
import styles from "../../../src/styles/projekt-single.module.css";
import Image from "next/image";

export default async function ProjectSinglePage({ params }) {
  const { slug } = await params;

  const projects = await fetchContent("projektSingle");
  const matchedProject = projects.find(
    (item) => item.fields.slug === slug
  );

  if (!matchedProject) {
    return <div className={styles.error}>The project was not found.</div>;
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>{matchedProject.fields.rubrik}</h1>
        <p className={styles.description}>{matchedProject.fields.beskrivning}</p>
        
        {matchedProject.fields.img?.fields?.file?.url ? (
          <Image
            src={`https:${matchedProject.fields.img.fields.file.url}`}
            alt={matchedProject.fields.rubrik}
            width={800} 
            height={600}
            className={styles.image}
            priority 
          />
        ) : (
          <p>No image available</p>
        )}

        {matchedProject.fields.url && (
          <a
            href={matchedProject.fields.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.backLink}
          >
            Visit the project page
          </a>
        )}

        <p className={styles.description}>{matchedProject.fields.beskrivning2}</p>

        {matchedProject.fields.images && (
          <div className={styles.imageGallery}>
            {matchedProject.fields.images.map((image, index) => (
              <Image
                key={index}
                src={`https:${image.fields.file.url}`}
                alt={`Image ${index + 1}`}
                width={400} 
                height={300}
                className={styles.galleryImage}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
