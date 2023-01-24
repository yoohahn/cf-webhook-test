import fs from "fs/promises";
import path from "path";
import type { Request, Response, NextFunction } from "express";
import express from "express";
import compression from "compression";
import serveStatic from "serve-static";
import { createServer as createViteServer } from "vite";

const IS_TEST = process.env.NODE_ENV === "test" || !!process.env.VITE_TEST_BUILD;
const IS_PROD = process.env.NODE_ENV === "production";
const APP_PORT = Number(process.env.PORT || 7456);

async function createServer(dirname: string) {
  const resolvePath = (p: string): string => path.resolve(dirname, p);
  const app = express();
  // Create Vite server in middleware mode and configure the app type as
  // 'custom', disabling Vite's own HTML serving logic so parent server
  // can take control
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "custom",
    logLevel: IS_TEST ? "error" : "info",
  });

  app.use(vite.middlewares);
  const requestHandler = express.static(resolvePath("assets"));
  app.use(requestHandler);
  app.use("/assets", requestHandler);

  if (IS_PROD) {
    app.use(compression());
    app.use(
      serveStatic(resolvePath("dist"), {
        index: false,
      })
    );
  }

  app.use("*", async (req: Request, res: Response, next: NextFunction) => {
    const url = req.originalUrl;

    try {
      // 1. Read index.html
      let template = await fs.readFile(IS_PROD ? resolvePath("dist/index.html") : resolvePath("index.html"), "utf-8");

      // 2. Apply Vite HTML transforms. This injects the Vite HMR client, and
      //    also applies HTML transforms from Vite plugins, e.g. global preambles
      //    from @vitejs/plugin-react
      template = await vite.transformIndexHtml(url, template);

      // 3. Load the server entry. vite.ssrLoadModule automatically transforms
      //    your ESM source code to be usable in Node.js! There is no bundling
      //    required, and provides efficient invalidation similar to HMR.
      const productionBuildPath = resolvePath("./dist/server/entry-server.mjs");
      const devBuildPath = resolvePath("./src/entry-server.tsx");
      const { render } = await vite.ssrLoadModule(IS_PROD ? productionBuildPath : devBuildPath);

      // 4. render the app HTML. This assumes entry-server.js's exported `render`
      //    function calls appropriate framework SSR APIs,
      //    e.g. ReactDOMServer.renderToString()
      const appHtml = await render(url);

      // 5. Inject the app-rendered HTML into the template.
      const html = template
        .replace(`<!--ssr-outlet-->`, appHtml)
        .replace(`<!-- head-ssr -->`, "<!-- from-server--ssr -->");
      // 6. Send the rendered HTML back.
      res.set({
        "X-Foo": "Bar",
      });
      res.removeHeader("X-Powered-By");
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e: any) {
      !IS_PROD && vite.ssrFixStacktrace(e);
      console.log(e.stack);
      // If an error is caught, let Vite fix the stack trace so it maps back to
      // your actual source code.
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });

  app.listen(APP_PORT, "0.0.0.0", () => {
    console.log(`App is listening on http://localhost:${APP_PORT}`);
  });
}
createServer(__dirname);
