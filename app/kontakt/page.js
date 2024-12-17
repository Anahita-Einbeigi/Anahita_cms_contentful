"use client";
import { useEffect, useState } from "react";
import { fetchContent } from "../../lib/contentful"; 

export default function Home() {
  const [content, setContent] = useState([]); 

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchContent("kontakt");
      setContent(data); 
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        {content.map((item) => (
          <div key={item.sys.id} className="flex flex-col items-center">
            <h1 className="text-xl">{item.fields.rubrik}</h1>
            <div style={{display:"flex,",flexDirection:"row"}}>
            {item.fields.image && item.fields.image.fields && item.fields.image.fields.file && (
                <img
                    src={`https:${item.fields.image.fields.file.url}`}
                    alt={item.fields.title}
                    width={300}
                    height={200}
                />
                )}
            <p>{item.fields.kontaktinfo }</p>
            <p>{item.fields.contactinformation }</p>
            
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}