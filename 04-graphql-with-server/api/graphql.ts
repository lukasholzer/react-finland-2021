import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
import { loadSchemaSync } from '@graphql-tools/load';
import { addResolversToSchema } from '@graphql-tools/schema';
import type { HandlerEvent, HandlerResponse } from '@netlify/functions';
import { ApolloServer } from 'apollo-server-lambda';
import { graphql } from 'graphql';
import { join } from 'path';
import { books } from './data.json';

const resolvers = {
  Query: {
    books: (_, args) => {
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
  if (event.httpMethod !== 'POST') {
    return { statusCode: 400 };
  }
  try {
    // console.log(event.body);
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
