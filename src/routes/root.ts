import fs from "fs";
import path from "path";
import favicon from "koa-favicon";
import { Middleware } from "koa";

const indexHtml = fs.readFileSync(
  path.resolve(process.cwd(), "assets/index.html"),
  "utf8"
);

export const getIndexString = (): string => {
  return indexHtml;
};

export const favIcon = (): Middleware => {
  return favicon(`${process.cwd()}/assets/favicon.ico`);
};
