const App = () => {
  const [persons, setPersons] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      const _ = await fetch("/persons").then((_) => _.json());
      setPersons(_);
    })();
  }, []);
  return React.createElement(
    React.Fragment,
    null,
    React.createElement("h2", null, "Bloggers"),
    React.createElement(
      "ul",
      null,
      persons.map((p) => {
        return React.createElement(
          "li",
          { key: p.id },
          React.createElement("img", {
            style: {
              width: 150,
              height: 100,
            },
            src: p.image.src,
            alt: p.image.alt,
            width: p.image.dim.x,
            height: p.image.dim.y,
          }),
          React.createElement(
            "div",
            null,
            React.createElement("strong", null, "Name: "),
            " ",
            p.name
          ),
          React.createElement(
            "div",
            null,
            React.createElement("strong", null, "Title: "),
            " ",
            p.title
          )
        );
      })
    )
  );
};

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(
  React.createElement(React.StrictMode, null, React.createElement(App, null))
);
