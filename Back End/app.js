const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

let expenses = [];

app.post("/expenses", (req, res) => {
    const { expAmount, description, category } = req.body;

    if (!expAmount || !description || !category) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const newExpense = {
        expAmount,
        description,
        category
    };

    expenses.push(newExpense);

    console.log("New expense received:", newExpense);

    res.status(201).json(newExpense);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
