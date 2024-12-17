"use client";
import { useEffect, useState } from "react";
import { fetchContent } from "../../lib/contentful"; 

export default function Home() {
  const [content, setContent] = useState([]); 

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchContent("omMig");
      setContent(data); 
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-2xl font-bold">About me</h1>
        {content.map((item) => (
          <div key={item.sys.id} className="flex flex-col items-center">
            <p>{item.fields.presentationstext }</p>
            <div style={{ marginRight: "10px", display: "flex", flexDirection:"row", marginTop:"50px"}}>
                 <p style={{ marginRight: "160px"}}>{item.fields.utbildningar }</p>
                 <p>{item.fields.arbetslivserfarenheter}</p>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}