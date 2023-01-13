import Router from "@koa/router";
import { getAllPersons } from "../../fetchData";

export const registerPersonRoute = (): KoaRouterType => {
  const personRouter = new Router({
    prefix: `/persons`,
  });

  personRouter.get("/", (ctx, next) => {
    const body = [];
    for (let person in getAllPersons()) {
      body.push(getAllPersons()[person]);
    }
    ctx.body = JSON.stringify(body);
  });

  return personRouter;
};
