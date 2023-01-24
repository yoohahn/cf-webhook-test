import Router from "@koa/router";
import { updateBlog, removeEntry } from "../../fetchData";
import type { Entry } from "./type";

function toString(json: any) {
  return JSON.stringify(json, undefined, 2);
}
export const registerHook = (): KoaRouterType => {
  const hookRouter = new Router({
    prefix: `/hook`,
  });

  hookRouter.get("/", (ctx, next) => {
    ctx.body = "Ok";
  });

  hookRouter.post("/", (ctx, next) => {
    let data = ctx.request.body as Entry;

    console.log("<== " + data.sys.type + " ==>\n");

    if(data.sys.type.toLowerCase() === "DeletedEntry".toLowerCase()){
      removeEntry(data.sys.id);
    }

    updateBlog();
    ctx.body = "Ok";
  });

  return hookRouter;
};
