const App = () => {
  const [persons, setPersons] = React.useState([]);
  React.useEffect(() => {
    (async () => {
      const _ = await fetch("/persons").then((_) => _.json());
      setPersons(_);
    })();
  }, []);
  return (
    <React.Fragment>
      <h2>Bloggers</h2>
      <ul>
        {persons.map((p) => {
          return (
            <li key={p.id}>
              <img
                style={{
                  width: 150,
                  height: 100,
                }}
                src={p.image.src}
                alt={p.image.alt}
                width={p.image.dim.x}
                height={p.image.dim.y}
              />
              <div>
                <strong>Name: </strong> {p.name}
              </div>
              <div>
                <strong>Title: </strong> {p.title}
              </div>
            </li>
          );
        })}
      </ul>
    </React.Fragment>
  );
};

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
