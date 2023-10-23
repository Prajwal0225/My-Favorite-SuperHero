import { resolve } from "path";
import handlebars from "vite-plugin-handlebars";

const pageInfo = {
  "/index.html": {
    title: "Superheroes",
  },
  "/about.html": {
    title: "About - Superheroes",
  },
  "/contributor.html": {
    title: "Contributor - Superheroes",
  },
};

export default {
  build: {
    rollupOptions: {
      input: {
        main: "./index.html",
        about: "./about.html",
        contributor: "./contributor.html",
      },
    },
  },
  plugins: [
    handlebars({
      context(pagePath) {
        return pageInfo[pagePath];
      },
      partialDirectory: resolve(__dirname, "partials"),
    }),
  ],
};
