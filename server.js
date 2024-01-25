// server.js
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");
app.use(bodyParser.json());

// Modify the route to send JSON response
app.post("/webhook", (req, res) => {
  const dealName = req.body.properties.dealname;
  const managerName = req.body.properties.managername;
  const dealAmount = req.body.properties.amount;

  console.log("Received webhook data:", dealName, managerName, dealAmount);

  // Send JSON response with the updated data
  res.json({ dealName, managerName, dealAmount });
});

app.get("/", (req, res) => {
  // Render the index.ejs template without data initially
  res.render("index", { dealName: "", managerName: "", dealAmount: "" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
