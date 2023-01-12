export interface Sys {
  sys: {
    type: string;
    linkType: string;
    id: string;
  };
}

export interface EntrySys {
  type: string;
  id: string;
  space: Sys;
  environment: Sys;
  contentType: Sys;
  revision: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface Entry {
  sys: EntrySys;
  metadata?: any;
  fields?: any;
}
