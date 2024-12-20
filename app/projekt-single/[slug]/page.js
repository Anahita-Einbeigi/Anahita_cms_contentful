"use client";
import { useEffect, useState } from "react";
import { fetchContent } from "../../../lib/contentful";
import styles from "../../../src/styles/projekt-single.module.css";

export default function ProjectSingle({ params }) {
  const [project, setProject] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resolvedParams = await params;
        const slug = resolvedParams.slug; 

        const data = await fetchContent("projektSingle");
        const matchedProject = data.find((item) => item.fields.slug === slug);

        if (matchedProject) {
          setProject(matchedProject);
        } else {
          setError("Projektet hittades inte.");
        }
      } catch (err) {
        console.error("Fel vid hämtning av data:", err);
        setError("Ett fel uppstod vid hämtning av projektet.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [params]);

  if (loading) {
    return <div>Laddar...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {project && (
          <>
            <h1 className={styles.title}>{project.fields.rubrik}</h1>
            <p className={styles.description}>{project.fields.beskrivning}</p>
            {project.fields.image?.fields?.file?.url ? (
              <img
                src={`https:${project.fields.image.fields.file.url}`}
                alt={project.fields.rubrik}
                className={styles.image}
              />
            ) : (
              <p>Ingen bild tillgänglig</p>
            )}
          </>
        )}
      </main>
    </div>
  );
}
