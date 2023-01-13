import type Koa from "koa";
import type Router from "@koa/router";
import {
  CFBlogPostField,
  CFBlogPostTags,
  CFEntries,
  CFPersonField,
} from "./contentful";

export {};

type Image = {
  id: string;
  alt: string;
  src: string;
  dim: {
    x: number;
    y: number;
  };
};
declare global {
  type KoaAppType = Koa<Koa.DefaultState, Koa.DefaultContext>;
  type KoaRouterType = Router<Koa.DefaultState, Koa.DefaultContext>;

  namespace Model {
    type Person = {
      id: string;
      name: string;
      title: string;
      image: Image;
    };

    type BlogPost = {
      id: string;
      createdAt: Date;
      updatedAt: Date;
      publishDate: Date;
      title: string;
      description: string;
      body: string;
      image: Image;
      authorId: string;
      tags: CFBlogPostTags[];
    };
  }

  namespace CF {
    interface EntriesBody extends CFEntries {}
    interface PersonField extends CFPersonField {}
    interface BlogPostField extends CFBlogPostField {}
  }
}
