const express = require("express");
const path = require("path");
const app = express();

app.use(
  "/static",
  express.static(path.join(__dirname, "public", "static", "src"))
);

app.listen(5000, () => {
  console.log("Server is Running...");
  console.log("listening on 5000");
});

app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "public", "index.html"));
});
