/* eslint-disable @typescript-eslint/no-var-requires */
let _graphQLSchema: string;
try {
  // This is inlined by babel-plugin-inline-import on web platforms
  const schemaModule = require("../schema.graphql");
  if (schemaModule.default) {
    _graphQLSchema = schemaModule.default;
  } else {
    _graphQLSchema = schemaModule;
  }
} catch (_) {
  const fs = require("fs");
  const path = require("path");
  _graphQLSchema = fs
    .readFileSync(path.join(__dirname, "..", "./schema.graphql"))
    .toString();
}

export const graphQLSchema = _graphQLSchema;
