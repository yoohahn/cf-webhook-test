import Router from "@koa/router";
import koaBody from "koa-body";

import { favIcon, getIndexString } from "./root";
import { registerHook } from "./hook";
import { registerPersonRoute } from "./persons";
import { registerBlogsRoute } from "./blogs";

export const registerRoutes = (app: KoaAppType): void => {
  const router = new Router();
  router.get("/", (ctx) => {
    ctx.body = getIndexString();
  });
  app.use(favIcon());

  // Bodyparser
  app.use(koaBody({ multipart: true, urlencoded: true }));

  // Register routes
  app.use(router.routes());
  app.use(registerHook().routes());
  app.use(registerPersonRoute().routes());
  app.use(registerBlogsRoute().routes());
};
