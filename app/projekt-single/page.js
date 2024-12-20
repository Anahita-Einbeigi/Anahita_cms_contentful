// "use client";
// import { useEffect, useState } from "react";
// import { fetchContent } from "../../lib/contentful";
// import styles from "../../src/styles/projekt-single.module.css";

// export default function Home() {
//   const [content, setContent] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const data = await fetchContent("projektSingle");
//       setContent(data);
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className={styles.container}>
//       <main className={styles.main}>
//         <h1 className={styles.title}>My Project</h1>
//         {content.map((item) => (
//           <div key={item.sys.id} className={styles.card}>
//             <h2 className={styles.cardTitle}>{item.fields.rubrik}</h2>
//             <p className={styles.cardDescription}>{item.fields.beskrivning}</p>
//             {item.fields.image && item.fields.image.fields && item.fields.image.fields.file && (
//               <img
//                 src={`https:${item.fields.image.fields.file.url}`}
//                 alt={item.fields.rubrik}
//                 className={styles.cardImage}
//               />
//             )}
//           </div>
//         ))}
//       </main>
//     </div>
//   );
// }
