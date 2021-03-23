const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const routes = require("./routes/index");
require("dotenv").config();
const app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api/v1", routes);

const port = process.env.PORT || 4500;
//configure the server port
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
