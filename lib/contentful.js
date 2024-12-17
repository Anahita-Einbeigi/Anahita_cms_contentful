import { createClient } from 'contentful';

const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

export const fetchContent = async (contentType) => {
  try {
    const entries = await client.getEntries({
      content_type: contentType,
    });
    return entries.items;
  } catch (error) {
    console.error("Error fetching content from Contentful:", error);
    throw new Error("Failed to fetch content from Contentful");
  }
};