import Router from "@koa/router";
import { getAllBlogs } from "../../fetchData";

export const registerBlogsRoute = (): KoaRouterType => {
  const blogsRouter = new Router({
    prefix: `/blogs`,
  });

  blogsRouter.get("/", (ctx, next) => {
    const body = [];
    for (let key in getAllBlogs()) {
      body.push(getAllBlogs()[key]);
    }
    ctx.body = JSON.stringify(body);
  });

  return blogsRouter;
};
