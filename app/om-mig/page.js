"use client";
import { useEffect, useState } from "react";
import { fetchContent } from "../../lib/contentful"; 
import "../../src/styles/aboutMe.css"

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
    <div className="bg-black text-white min-h-screen p-8 sm:p-20 flex flex-col gap-12">
      <header className="flex flex-col items-start">
        <h1 className="text-4xl font-bold mb-2">About Me</h1>
        <div className="w-16 border-b-4 border-white"></div>
      </header>

      {content.map((item) => (
        <main key={item.sys.id} className="flex flex-col gap-8 sm:flex-row">
          <div className="sm:w-2/3 flex flex-col gap-8">
            <p className="text-base leading-relaxed">
              {item.fields.presentationstext}
            </p>

            <div className="flex flex-col sm:flex-row gap-8">
            {item.fields.utbildningar2 && Array.isArray(item.fields.utbildningar2) && item.fields.utbildningar2.length > 0 && (
                <div className="sm:w-1/2">
                  <h2 className="text-xl font-bold mb-2">Education</h2>
                  <ul className="list-disc pl-5 text-sm leading-relaxed space-y-4">
                    {item.fields.utbildningar2.map((utbildningar, index) => (
                      <li key={index} className="mb-4">
                        <h3 className="font-semibold text-lg">{utbildningar.fields.rubric}</h3>
                        <p className="text-sm text-gray-400">{utbildningar.fields.date}</p>
                        <p className="text-sm leading-relaxed">{utbildningar.fields.beskrivning}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            {item.fields.arbetslivserfarenhet && Array.isArray(item.fields.arbetslivserfarenhet) && item.fields.arbetslivserfarenhet.length > 0 && (
                <div className="sm:w-1/2">
                  <h2 className="text-xl font-bold mb-2">Work Experience</h2>
                  <ul className="list-disc pl-5 text-sm leading-relaxed space-y-4">
                    {item.fields.arbetslivserfarenhet.map((experience, index) => (
                      <li key={index} className="mb-4">
                        <h3 className="font-semibold text-lg">{experience.fields.rubrik}</h3>
                        <p className="text-sm text-gray-400">{experience.fields.startdate}</p>
                        <p className="text-sm text-gray-400">{experience.fields.slutdate}</p>
                        <p className="text-sm leading-relaxed">{experience.fields.beskrivning}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          <div className="sm:w-1/3 flex justify-center items-center">
            {item.fields.image &&
              item.fields.image.fields &&
              item.fields.image.fields.file && (
                <img
                  src={`https:${item.fields.image.fields.file.url}`}
                  alt={item.fields.rubrik}
                  className="w-full h-auto object-cover rounded-lg"
                />
              )}
          </div>
        </main>
      ))}
    </div>
  );
}