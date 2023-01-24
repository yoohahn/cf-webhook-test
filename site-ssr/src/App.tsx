import { useReducer } from "react";
import { Typography, Container, Button } from "@mui/material";
import { BlogPosts } from "./components/BlogPosts";

export function App(): JSX.Element {
  const [_, forceUpdate] = useReducer(x => x + 1, 0);
  return (
    <Container
      maxWidth="md"
      sx={{
        mt: 2,
      }}
    >
      <Button onClick={forceUpdate} variant="outlined">
        Update
      </Button>
      <Typography variant="h4" component="h1">
        Entries
      </Typography>

      <BlogPosts update={_} />
    </Container>
  );
}

export default App;
