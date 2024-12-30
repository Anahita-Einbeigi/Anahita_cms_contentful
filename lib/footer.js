import { createClient } from 'contentful';

export const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

export async function getFooterText() {
  try {
    const response = await client.getEntries({
      content_type: 'footer',
    });

    if (response.items.length > 0) {
      return response.items[0].fields.text; 
    }
    return 'Ingen footer-text tillgänglig.';
  } catch (error) {
    console.error('Error fetching footer text:', error);
    return 'Kunde inte hämta footer-text.';
  }
}
