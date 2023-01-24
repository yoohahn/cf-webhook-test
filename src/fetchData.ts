import * as contentful from "contentful";

const persons: Record<string, Model.Person> = {};
const blogs: Record<string, Model.BlogPost> = {};

export const getAllPersons = () => persons;
export const getAllBlogs = () => blogs;

function panicAttack(msg: string) {
  console.error(msg);
  return process.exit(1);
}

function getCfClient(): contentful.ContentfulClientApi {
  const client = contentful.createClient({
    space:
      process.env["CF_TEST_SPACEID"] ||
      panicAttack("Missing environment key: 'CF_TEST_SPACEID'"),
    accessToken:
      process.env["CF_TEST_DELIVERY_TOKEN"] ||
      panicAttack("Missing environment key: 'CF_TEST_DELIVERY_TOKEN'"),
  });

  return client;
}

export const removeEntry = (id: string): void => {
  // @ts-ignore
  blogs[id] = null;
  // @ts-ignore
  persons[id] = null;
  delete persons[id];
  delete blogs[id];
}

export const updateBlog = async (): Promise<void> => {
  const entries = (await getCfClient().getEntries()) as unknown;

  for (let entry of (entries as CF.EntriesBody).items) {
    if (entry.sys.contentType.sys.id === "person") {
      const pId = entry.sys.id;
      const personFields = entry.fields as CF.PersonField;
      persons[pId] = {
        id: pId,
        name: personFields.name,
        title: personFields.title,
        image: {
          id: personFields.image.sys.id,
          alt: personFields.image.fields.description,
          src: personFields.image.fields.file.url,
          dim: {
            x: personFields.image.fields.file.details.image.width,
            y: personFields.image.fields.file.details.image.height,
          },
        },
      };
    } else {
      const pId = entry.sys.id;
      const postField = entry.fields as CF.BlogPostField;
      blogs[pId] = {
        id: pId,
        body: postField.body,
        description: postField.description,
        title: postField.title,
        updatedAt: entry.updatedAt,
        createdAt: entry.createdAt,
        publishDate: postField.publishDate,
        authorId: postField.author.sys.id,
        tags: postField.tags,
        image: {
          id: postField.heroImage.sys.id,
          alt: postField.heroImage.fields.description,
          src: postField.heroImage.fields.file.url,
          dim: {
            x: postField.heroImage.fields.file.details.image.width,
            y: postField.heroImage.fields.file.details.image.height,
          },
        },
      };
    }
  }
};
