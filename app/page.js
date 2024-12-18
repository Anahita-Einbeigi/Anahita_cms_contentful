"use client";
import { useEffect, useState } from "react";
import { fetchContent } from "../lib/contentful"; 
import "../src/styles/startsida.css"; 

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
    <div className="container">
      {content.map((item) => (
        <div key={item.sys.id} className="content">
          {item.fields.image && (
            <div className="image-container">
              <img
                src={`https:${item.fields.image.fields.file.url}`}
                alt={item.fields.rubrik}
                className="responsive-image"
              />
            </div>
          )}
          <div className="text-container">
            <h1 className="heading">{item.fields.rubrik}</h1>
            <p className="description">{item.fields.presentationstext}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
