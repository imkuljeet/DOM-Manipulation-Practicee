// app.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const expenseRoutes = require("./routes/expenseRoutes");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Use routes
app.use("/", expenseRoutes);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
