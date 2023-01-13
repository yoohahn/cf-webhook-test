(async () => {
  const server = "http://127.0.0.1:3543";
  const blogs = await fetch(server + "/blogs").then((_) => _.json());
  const persons = await fetch(server + "/persons").then((_) => _.json());
  console.log("Posts: ", blogs);
  console.log("Persons: ", persons);
})();
