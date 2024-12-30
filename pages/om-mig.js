import { fetchContent } from "../lib/contentful";
import Image from "next/image";
import Head from "next/head";
import "./src/styles/aboutMe.css";

export default function Home({ content }) {
  return (
    <div className="container">
      <Head>
        <title>About Me</title>
      </Head>
      <header>
        <div className="w-16 border-b-4 border-white"></div>
      </header>

      {content.map((item) => (
        <main key={item.sys.id} className="flex-container">
          <div className="content-left">
            <h1>About Me</h1>
            <p className="text-base leading-relaxed">
              {item.fields.presentationstext}
            </p>

            <div className="flex flex-col sm:flex-row gap-8">
              {item.fields.utbildningar2 &&
                Array.isArray(item.fields.utbildningar2) &&
                item.fields.utbildningar2.length > 0 && (
                  <div className="education">
                    <h2 className="text-xl font-bold mb-2">Education</h2>
                    <ul className="list-disc pl-5 text-sm leading-relaxed space-y-4">
                      {item.fields.utbildningar2.map((utbildningar, index) => (
                        <li key={index} className="mb-4">
                          <h3 className="font-semibold text-lg">
                            {utbildningar.fields.rubric}
                          </h3>
                          <p className="text-sm text-gray-400">
                            {utbildningar.fields.date}
                          </p>
                          <p className="text-sm leading-relaxed">
                            {utbildningar.fields.beskrivning}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>
          </div>

          <div className="image-container">
            {item.fields.image &&
              item.fields.image.fields &&
              item.fields.image.fields.file && (
                <Image
                  src={`https:${item.fields.image.fields.file.url}`}
                  alt={item.fields.rubrik || "om mig bild"}
                  className="h-auto object-cover rounded-lg"
                  width={350}
                  height={500}
                  priority={true}
                />
              )}
          </div>

          {item.fields.arbetslivserfarenhet &&
            Array.isArray(item.fields.arbetslivserfarenhet) &&
            item.fields.arbetslivserfarenhet.length > 0 && (
              <div className="experience">
                <h2 className="text-xl font-bold mb-2">Work Experience</h2>
                <ul className="list-disc pl-5 text-sm leading-relaxed space-y-4">
                  {item.fields.arbetslivserfarenhet.map((experience, index) => (
                    <li key={index} className="mb-4">
                      <h3 className="font-semibold text-lg">
                        {experience.fields.rubrik}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {experience.fields.startdate}
                      </p>
                      <p className="text-sm text-gray-400">
                        {experience.fields.slutdate}
                      </p>
                      <p className="text-sm leading-relaxed">
                        {experience.fields.beskrivning}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
        </main>
      ))}
    </div>
  );
}

export async function getServerSideProps() {
  try {
    const data = await fetchContent("omMig");
    return {
      props: {
        content: data || [],
      },
    };
  } catch (error) {
    console.error("Error fetching content for SSR:", error);
    return {
      props: {
        content: [],
      },
    };
  }
}
