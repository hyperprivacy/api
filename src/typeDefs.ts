import { gql } from "apollo-server";
import * as glob from "glob";
import * as fs from "fs";
import * as path from "path";

path.resolve(__dirname, "./schema/**/*.gql");

const schemaString = glob
  .sync(path.resolve(__dirname, "./schema/**/*.gql"))
  .map(filePath => {
    return fs.readFileSync(filePath);
  })
  .join("\n");

export const typeDefs = gql(schemaString);
