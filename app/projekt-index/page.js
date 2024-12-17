"use client";
import { useEffect, useState } from "react";
import { fetchContent } from "../../lib/contentful"; 

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
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {content.map((item) => (
          <div key={item.sys.id} className="flex flex-col items-center">
            <h1 className="text-2xl font-bold">{item.fields.rubrik}</h1>
            <p>{item.fields.beskrivning }</p>
            <a
                href={item.fields.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                View my Projects
              </a>
            <div>
            {item.fields.images && item.fields.images.fields && item.fields.images.fields.file && (
                <img
                  src={`https:${item.fields.images.fields.file.url}`}
                  alt={item.fields.rubrik}
                  width={300}
                  height={200}
                />
            )}
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}