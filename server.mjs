import serve from "serve";
const server = serve({ port: 5000, directory: "./build", single: true });
