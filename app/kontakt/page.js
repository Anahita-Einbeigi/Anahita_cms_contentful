"use client";
import { useEffect, useState } from "react";
import { fetchContent } from "../../lib/contentful"; 
import "../../src/styles/kontakt.css";

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
          <div key={item.sys.id} className="flex">
            {item.fields.image && item.fields.image.fields && item.fields.image.fields.file && (
              <img
                src={`https:${item.fields.image.fields.file.url}`}
                alt={item.fields.title}
                className="responsive-image"
              />
            )}
            <div className="content">
              <h1>{item.fields.rubrik}</h1>
              <p>{item.fields.kontaktinfo}</p>

              {item.fields.contacts && Array.isArray(item.fields.contacts) && item.fields.contacts.length > 0 && (
                <ul>
                  {item.fields.contacts.map((contact, index) => (
                    <div key={index}>
                      <p><strong>Tell:</strong> {contact.fields.tell}</p>
                      <p><strong>Website:</strong> {contact.fields.webbsite}</p>
                      <p><strong>Mail:</strong> {contact.fields.mail}</p>
                      <p><strong>Adress:</strong> {contact.fields.adress}</p>
                    </div>
                  ))}
                </ul>
              )}
            </div>

          </div>
        ))}
      </main>
    </div>
  );
}
