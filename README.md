# Automate your stack with GraphQL

Resources for the React Finland 2021 Talk

## Examples

### [Basic minimal react app](./00-basic-ui/)

This features a simple react app without any complex webpack setup to demo the little things you need for adding good developer experience.

### [Query data with Rest](./01-using-rest-api/)

This shows how to query simple data from a rest api with [react-query](https://react-query.tanstack.com/) which provides a super convenient hook based api.

Nevertheless the developer experience is kind a rusty as you don't have any types.

### [Query data with GraphQL](./02-using-graphql/)

Demonstrates the use of a GraphQL with a simple fetch request. It shows the benefit of not over fetching data.
Sadly this provides zero type support as well.

## [Query data with GraphQL and auto generated types. ](./03-graphql-generated-query/)

Add to the example from before a [graphql-code generation](https://www.graphql-code-generator.com/).
This generates a typed hook for accessing the data.

When running this in the watch mode by running `$ pnpm run codegen -- --watch` it will automatically watch for changes and regenerate everything.

The cool stuff now is that it is 100% type safe. So when the api changes it will generate new types and the typescript build is failing.

### Added and Modified files:

- [codegen.yml](./03-graphql-generated-query/codegen.yml)
  - Specifies what should be generated and where
- [graphql.config.js](./03-graphql-generated-query/graphql.config.js)
  - used for VSCode autocompletion and live preview of queries
- [src/allPeople.graphql](./03-graphql-generated-query/src/allPeople.graphql)
  - we extracted the query in its own file
- [package.json](./03-graphql-generated-query/package.json)
  - Added following dependencies
    - `@graphql-codegen/cli`
    - `@graphql-codegen/near-operation-file-preset`
    - `@graphql-codegen/typescript`
    - `@graphql-codegen/typescript-operations`
    - `@graphql-codegen/typescript-react-query`
  - And add the npm script `"codegen": "graphql-codegen --config codegen.yml"`

## [Serverless GraphQL api added with ui](./04-graphql-with-server/)

Add to the code generation example from before a serverless api with graphql that is deployed and served with [Netlify](https://www.netlify.com/).