"use client";
import { useEffect, useState } from "react";
import { fetchContent } from "../../lib/contentful";
import styles from "../../src/styles/Projekt.module.css";

export default function Home() {
  const [content, setContent] = useState([]);
  const [headerInfo, setHeaderInfo] = useState({ rubrik: "", beskrivning: "" });
  const [categories, setCategories] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchContent("projektindex");
      setContent(data);

      if (data.length > 0) {
        setHeaderInfo({
          rubrik: data[0].fields.rubrik || "Default Title",
          beskrivning: data[0].fields.beskrivning || "Default Description",
        });

        const categoryData = await fetchContent("category");

        setCategories([
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
        ]);
      }

      setFilteredProjects(data);
    };

    fetchData();
  }, []);

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
        <h1>{headerInfo.rubrik}</h1>
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
                <img
                  src={`https:${projekt.fields.img?.fields?.file?.url || ""}`}
                  alt={projekt.fields.title || "Project images"}
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
