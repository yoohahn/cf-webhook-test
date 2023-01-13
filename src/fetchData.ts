import * as contentful from "contentful";

const persons: Record<string, Person> = {};

export const getAllPersons = () => persons;

function getCfClient(): contentful.ContentfulClientApi {
  const client = contentful.createClient({
    space: process.env["CF_TEST_SPACEID"] || process.exit(1),
    accessToken: process.env["CF_TEST_DELIVERY_TOKEN"] || process.exit(1),
  });

  return client;
}

export const updateBlog = async () => {
  const entries = (await getCfClient().getEntries()) as unknown;

  for (let entry of (entries as CF.EntriesBody).items) {
    if (entry.sys.contentType.sys.id === "person") {
      const personFields = entry.fields as CF.PersonField;
      if (!persons[personFields.name]) {
        persons[personFields.name] = {
          id: entry.id,
          name: personFields.name,
          title: personFields.title,
          image: {
            alt: personFields.image.fields.description,
            src: personFields.image.fields.file.url,
            dim: {
              x: personFields.image.fields.file.details.image.width,
              y: personFields.image.fields.file.details.image.height,
            },
          },
        };
      }
    }
  }
};
