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
      console.log("Fetched data:", data);
      setContent(data);

      if (data.length > 0) {
        setHeaderInfo({
          rubrik: data[0].fields.rubrik || "Default Title",
          beskrivning: data[0].fields.beskrivning || "Default Description",
        });

        const allCategories = data
          .flatMap((item) =>
            item.fields.projektreferenser?.map((Projekt) => {
              console.log("Projekt category:", Projekt?.fields?.category);
              return Projekt?.fields?.category?.fields?.name || null;
            })
          )
          .filter((value, index, self) => value && self.indexOf(value) === index);
        
        console.log("All Categories:", allCategories); 
        setCategories(["All", ...allCategories]); 
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
          projektreferenser: item.fields.projektreferenser?.filter(
            (Projekt) =>
              Projekt.fields.category?.fields.name === selectedCategory
          ),
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
                <option key={index} value={category}>
                  {category}
                </option>
              ))
            ) : (
              <option>No categories found</option>
            )}
          </select>
        </div>
      </header>

      <main className={styles.projektGrid}>
        {filteredProjects &&
          filteredProjects.map((item) =>
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
