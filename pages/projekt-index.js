import { useEffect, useState } from "react";
import { fetchContent } from "../lib/contentful";
import Image from "next/image";
import styles from "./src/styles/Projekt.module.css";
import "./src/styles/global.css";

// Komponent "Home" renderar projektinnehåll dynamiskt baserat på valda kategorier.
export default function Home({ content, categories, headerInfo }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredProjects, setFilteredProjects] = useState(content);

  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredProjects(content);
    } else {
      const filtered = content.map((item) => ({
        ...item,
        fields: {
          ...item.fields,
          projektreferenser: item.fields.projektreferenser?.filter((projekt) => {
            return projekt.fields?.category?.some(
              (cat) => cat.sys.id === selectedCategory
            );
          }),
        },
      }));

      setFilteredProjects(
        filtered.filter((item) => item.fields.projektreferenser.length > 0)
      );
    }
  }, [selectedCategory, content]);

  return (
    <div className={styles.projektWrapper}>
      <header className={styles.header}>
        <h1 className={styles.statuspunkt}>{headerInfo.rubrik}</h1>
        <p>{headerInfo.beskrivning}</p>

        <div className={styles.filterWrapper}>
          <label htmlFor="categoryFilter">Filter by category:</label>
          <select
            id="categoryFilter"
            onChange={(e) => setSelectedCategory(e.target.value)}
            value={selectedCategory}
          >
            {categories.length > 0 ? (
              categories.map((category, index) => (
                <option key={index} value={category.sysId}>
                  {category.name}
                </option>
              ))
            ) : (
              <option>No categories found</option>
            )}
          </select>
        </div>
      </header>

      <main className={styles.projektGrid}>
        {filteredProjects && filteredProjects.length > 0 ? (
          filteredProjects.map((item) =>
            item.fields.projektreferenser.map((projekt, index) => (
              <div key={index} className={styles.projektCard}>
                <Image
                  src={`https:${projekt.fields.img?.fields?.file?.url || ""}`}
                  alt={projekt.fields.title || "Project images"}
                  width={500}  
                  height={300} 
                  style={{ objectFit: 'contain' }}
                />
                <h2>{projekt.fields.title}</h2>
                <p>{projekt.fields.text}</p>
                {projekt.fields.link && (
                  <a
                    href={projekt.fields.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    See more information
                  </a>
                )}
              </div>
            ))
          )
        ) : (
          <p>No projects found for this category</p>
        )}
      </main>
    </div>
  );
}

// getServerSideProps hämtar data från Contentful varje gång sidan laddas på servern(SSR), vilket säkerställer att projekt och kategorier är aktuella.
export async function getServerSideProps() {
  try {
    const content = await fetchContent("projektindex");
    const categoryData = await fetchContent("category");

    const headerInfo = {
      rubrik: content.length > 0 ? content[0].fields.rubrik : "Default Title",
      beskrivning: content.length > 0 ? content[0].fields.beskrivning : "Default Description",
    };

    const categories = [
      { name: "All", slug: "All", sysId: "All" },
      ...categoryData
        .filter(Boolean)
        .map((cat) => ({
          name: cat.fields.name,
          slug: cat.fields.slug,
          sysId: cat.sys.id,
        }))
        .filter(
          (value, index, self) =>
            self.findIndex((item) => item.sysId === value.sysId) === index
        ),
    ];

    return {
      props: {
        content: content || [],
        categories: categories || [],
        headerInfo: headerInfo,
      },
    };
  } catch (error) {
    console.error("Error fetching content for SSR:", error);
    return {
      props: {
        content: [],
        categories: [],
        headerInfo: { rubrik: "Error", beskrivning: "Could not load data" },
      },
    };
  }
}
