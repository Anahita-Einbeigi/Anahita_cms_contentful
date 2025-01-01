import { client } from './contentful';

// Funktionen getFooterText hämtar footer-texten från Contentful med hjälp av Contentful getEntries-metod och returnerar den första posten från resultatet.
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
