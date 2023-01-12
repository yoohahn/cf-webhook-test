import type Koa from "koa";
import type Router from "@koa/router";

export {};

declare global {
  type KoaAppType = Koa<Koa.DefaultState, Koa.DefaultContext>;
  type KoaRouterType = Router<Koa.DefaultState, Koa.DefaultContext>;
}
