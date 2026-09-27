// app.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const sequelize = require("./util/database");

const expenseRoutes = require("./routes/expenseRoutes");

const app = express();
const PORT = process.env.PORT ;

app.use(cors());
app.use(bodyParser.json());

// Use routes
app.use("/", expenseRoutes);

sequelize.sync()
  .then(() => {
    console.log("Database synced");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => console.error("DB sync error:", err));
