import { client } from './contentful';

// Funktionen getNavigationItems hämtar navigationsobjekt från Contentful genom att använda getEntries-metoden och sortera dem baserat på fältet 'order'.
export async function getNavigationItems() {
  const response = await client.getEntries({
    content_type: 'navigation',
    order: 'fields.order',
  });
  return response.items;
}
