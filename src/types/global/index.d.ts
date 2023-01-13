import type Koa from "koa";
import type Router from "@koa/router";

export {};

export interface Sys {
  type: string;
  linkType: string;
  id: "person" | "blogPost";
}

interface CFPersonField {
  name: string;
  title: string;
  company: string;
  shortBio: string;
  email: string;
  phone: string;
  facebook: string;
  twitter: string;
  github: string;
  image: {
    sys: {
      id: string;
      createdAt: Date;
      updatedAt: Date;
    };
    fields: {
      title: string;
      description: string;
      file: {
        url: string;
        details: {
          size: number;
          image: { width: number; height: number };
        };
        fileName: string;
        contentType: "image/jpeg";
      };
    };
  };
}
interface CFBlogPostField {}

interface CFItems {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  sys: {
    contentType: {
      sys: Sys;
    };
  };
  fields: CFPersonField | CFBlogPostField;
}
interface Entries {
  total: number;
  skip: number;
  limit: number;
  items: CFItems[];
  // includes: any[];
}

declare global {
  type KoaAppType = Koa<Koa.DefaultState, Koa.DefaultContext>;
  type KoaRouterType = Router<Koa.DefaultState, Koa.DefaultContext>;
  type Person = {
    id: string;
    name: string;
    title: string;
    image: {
      alt: string;
      src: string;
      dim: {
        x: number;
        y: number;
      };
    };
  };
  namespace CF {
    interface EntriesBody extends Entries {}
    interface PersonField extends CFPersonField {}
    interface BlogPostField extends CFBlogPostField {}
  }
}
