import fs from "fs";
import path from "path";
import favicon from "koa-favicon";
import { Middleware } from "koa";

const indexHtml = fs.readFileSync(
  path.resolve(process.cwd(), "assets/index.html"),
  "utf8"
);

const jsxCode = fs.readFileSync(
  path.resolve(process.cwd(), "assets/compiled.js"),
  "utf8"
);

export const getIndexString = (): string => {
  return indexHtml.replace("//INSERT-CODE", jsxCode);
};

export const favIcon = (): Middleware => {
  return favicon(`${process.cwd()}/assets/favicon.ico`);
};
