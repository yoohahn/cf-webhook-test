import Router from "@koa/router";
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

    if (data.sys.type === "DeletedEntry") {
      console.log("<== Unpublish ==>\n");
      console.log("Body: ", toString(data));
      console.log("\n<== Unpublish ==>\n");
    } else {
      console.log("<== Publish ==>\n");
      console.log("Body: ", toString(data));
      console.log("\n<== Publish ==>\n");
    }
    ctx.body = "Ok";
  });

  return hookRouter;
};
