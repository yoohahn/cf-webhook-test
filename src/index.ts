import Koa from "koa";
import logger from "koa-logger";
import { updateBlog } from "./fetchData";

import { registerRoutes } from "./routes";

const app = new Koa();
app.use(logger());

// Register Routes
registerRoutes(app);

// Let's start the app!
const PORT = 3543;
const HOST = "0.0.0.0"; // Expose to host if running in WSL2
app.listen(PORT, HOST, () => {
  console.log(`🚀 Server listening on http://127.0.0.1:${PORT}/ 🚀`);
  // Fill with default
  updateBlog();
});
