const Expense = require("../models/Expense");
exports.addExpense = async (req, res) => {
    try {
        const { expAmount, description, category } = req.body;

        if (!expAmount || !description || !category) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // Save to DB using Sequelize
        const newExpense = await Expense.create({
            expAmount,
            description,
            category
        });

        console.log("✅ New expense saved:", newExpense.toJSON());

        res.status(201).json(newExpense);
    } catch (err) {
        console.error("❌ Error saving expense:", err);
        res.status(500).json({ error: "Server error" });
    }
};

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll();
    res.json(expenses);
  } catch (err) {
    console.error("❌ Error fetching expenses:", err);
    res.status(500).json({ error: "Server error" });
  }
};

