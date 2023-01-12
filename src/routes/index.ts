import Router from "@koa/router";
import koaBody from "koa-body";

import { favIcon, getIndexString } from "./root";
import { registerHook } from "./hook";

export const registerRoutes = (app: KoaAppType): void => {
  const router = new Router();
  router.get("/", (ctx) => {
    ctx.body = getIndexString();
  });
  app.use(favIcon());

  // Bodyparser
  app.use(koaBody({ multipart: true, urlencoded: true }));

  // Register / route
  app.use(router.routes());

  // Register Hook
  app.use(registerHook().routes());
};
