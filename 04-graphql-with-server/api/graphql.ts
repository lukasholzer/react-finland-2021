import { renderPlaygroundPage } from '@apollographql/graphql-playground-html';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';
import { addResolversToSchema } from '@graphql-tools/schema';
import type { HandlerEvent, HandlerResponse } from '@netlify/functions';
import { graphql, introspectionFromSchema } from 'graphql';
import { join } from 'path';
import { books } from './data.json';

const resolvers = {
  Query: {
    books: (_, args: any) => {
      if ('filter' in args && 'byAuthor' in args.filter) {
        return books.filter(({ author }) =>
          author.toLowerCase().includes(args.filter.byAuthor.toLowerCase())
        );
      }
      return books;
    },
  },
};

const schema = loadSchemaSync(join(__dirname, 'schema.graphql'), {
  loaders: [new GraphQLFileLoader()],
});

const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers,
});

export async function handler(event: HandlerEvent): Promise<HandlerResponse> {
  if (event.httpMethod === 'GET') {
    event.headers.Accept;
    const acceptHeader = event.headers.Accept || event.headers.accept;
    if (acceptHeader && acceptHeader.includes(`text/html`)) {
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'text/html' },
        body: renderPlaygroundPage({
          endpoint: event.path || `/`,
          schema: introspectionFromSchema(schema),
        }),
      };
    }
  }
  try {
    const { query, variables = {} } = JSON.parse(event.body!);
    const result = await graphql(
      schemaWithResolvers,
      query,
      null,
      null,
      variables
    );
    return { statusCode: 200, body: JSON.stringify(result) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify(error) };
  }
}
