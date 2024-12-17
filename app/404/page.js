"use client";
import { useEffect, useState } from "react";
import { fetchContent } from "../../lib/contentful"; 

export default function Home() {
  const [content, setContent] = useState([]); 

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchContent("felMeddelande");
      setContent(data); 
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-2xl font-bold">Error</h1>
        {content.map((item) => (
          <div key={item.sys.id} className="flex flex-col items-center">
            <p>{item.fields.error }</p>
            <a
                href={item.fields.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                View Home page
              </a>
          </div>
        ))}
      </main>
    </div>
  );
}