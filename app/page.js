"use client";
import { useEffect, useState } from "react";
import { fetchContent } from "../lib/contentful"; 

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
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-2xl font-bold">My Portfolio</h1>
        {content.map((item) => (
          <div key={item.sys.id} className="flex flex-col items-center">
            <h2 className="text-xl">{item.fields.Rubrik}</h2>
            <p>{item.fields.presentationstext }</p>
            {item.fields.image && (
              <img
                src={`https:${item.fields.image.fields.file.url}`}
                alt={item.fields.title}
                width={300}
                height={200}
              />
            )}
          </div>
        ))}
      </main>
    </div>
  );
}