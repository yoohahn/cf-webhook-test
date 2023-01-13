export type CFBlogPostTags = "general" | "javascript" | "static-sites";
export type CFImage = {
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
export interface CFPersonField {
  name: string;
  title: string;
  company: string;
  shortBio: string;
  email: string;
  phone: string;
  facebook: string;
  twitter: string;
  github: string;
  image: CFImage;
}
export type CFItemsFieldSys = {
  id: string;
  contentType: {
    sys: {
      type: string;
      linkType: string;
      id: "person" | "blogPost";
    };
  };
};
export interface CFBlogPostField {
  title: string;
  slug: string;
  description: string;
  body: string;
  heroImage: CFImage;
  author: {
    sys: {
      id: string;
    };
  };
  publishDate: Date;
  tags: CFBlogPostTags[];
}
export interface CFItems {
  createdAt: Date;
  updatedAt: Date;
  sys: CFItemsFieldSys;
  fields: CFPersonField | CFBlogPostField;
}
export interface CFEntries {
  total: number;
  skip: number;
  limit: number;
  items: CFItems[];
}
