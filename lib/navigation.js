import { client } from './contentful';

export async function getNavigationItems() {
  const response = await client.getEntries({
    content_type: 'navigation',
    order: 'fields.order',
  });
  return response.items;
}
