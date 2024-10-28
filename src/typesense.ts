/*
 *  Our JavaScript client library works on both the server and the browser.
 *  When using the library on the browser, please be sure to use the
 *  search-only API Key rather than the master API key since the latter
 *  has write access to Typesense and you don't want to expose that.
 */

// const Typesense = require('typesense');
import Typesense from 'typesense';

import TypesenseInstantSearchAdapter from 'typesense-instantsearch-adapter';
export const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: 'xyz', // process.env.TYPESENSE_ADMIN_API_KEY as string, // Use the same you've defined in docker-compose
    nodes: [
      {
        host: 'localhost', // process.env.TYPESENSE_NODE as string,
        port: 8108,
        protocol: 'http',
      },
    ],
  },
  additionalSearchParameters: {
    query_by: 'name',
  },
});

export const searchClient = new Typesense.Client({
  nodes: [{ host: 'localhost', port: 8108, protocol: 'http' }],
  apiKey: 'xyz',
});

// export const searchDb = new Typesense.Client({
//   nodes: [
//     {
//       host: process.env.TYPESENSE_NODE, // For Typesense Cloud use xxx.a1.typesense.net
//       port: 443, // For Typesense Cloud use 443
//       protocol: 'https', // For Typesense Cloud use https
//     },
//   ],
//   apiKey: process.env.TYPESENSE_ADMIN_API_KEY,
//   connectionTimeoutSeconds: 2,
// });

// export default searchDb;
