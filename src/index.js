const express = require("express");
const cors = require("cors");
const server = express();
const port = process.env.PORT || 3001;
const {
  badRequestHandler,
  notFoundHandler,
  unauthorizedHandler,
  forbiddenHandler,
  catchAllHandler,
} = require("./utils/errorHandlers");
const servicesRoutes = require("./services");

server.use(cors());
server.use(express.json());
server.use("/", servicesRoutes);

server.use(badRequestHandler);
server.use(notFoundHandler);
server.use(unauthorizedHandler);
server.use(forbiddenHandler);
server.use(catchAllHandler);

server.listen(port, () => {
  console.info("Server is running on port " + port);
});

server.on("error", (error) => {
  console.error("Error : server is not running :  " + error);
});
