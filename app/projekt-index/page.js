"use client";
import { useEffect, useState } from "react";
import { fetchContent } from "../../lib/contentful";
import "../../src/styles/projekts.css";

export default function Home() {
  const [content, setContent] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchContent("projektIndex");
      setContent(data);
    };

    fetchData();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen p-8 sm:p-20">
      <header className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">My Projects</h1>
        <p>
          Welcome to my portfolio! Here you will find a collection of projects
          that showcase my skills and passion for frontend development. Each
          project is an opportunity for me to apply the technologies and
          techniques I have learned to solve real-world problems, enhance user
          experiences, and create visually appealing designs. Feel free to
          explore the projects below, where you’ll find more details and links
          to see the live implementations. These projects reflect my journey
          and growth as a developer, and I am excited to continue learning and
          building even more innovative solutions.
        </p>
      </header>

      <main>
        {content.map((item) => (
          <div
            key={item.sys.id}
            className="flex flex-col items-center text-center bg-gray-800 p-4 rounded-md"
          >
            {item.fields.image && (
              <img
                src={`https:${item.fields.image.fields.file.url}`}
                alt={item.fields.rubrik}
                className="w-full h-auto object-cover rounded-md mb-4"
              />
            )}
            <h2 className="text-xl font-bold mb-2">{item.fields.rubrik}</h2>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              {item.fields.beskrivning}
            </p>
            {item.fields.link && (
              <a
                href={item.fields.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                View Project
              </a>
            )}
          </div>
        ))}
      </main>
    </div>
  );
}
