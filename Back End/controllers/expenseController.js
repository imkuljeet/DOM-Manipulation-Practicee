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

exports.deleteExpense = async (req, res) => {
    try {
        const expenseId = req.params.id;

        const expense = await Expense.findByPk(expenseId);
        if (!expense) {
            return res.status(404).json({ error: "Expense not found" });
        }

        await expense.destroy();
        console.log(`✅ Expense deleted: ID ${expenseId}`);

        res.status(200).json({ message: "Expense deleted successfully" });
    } catch (err) {
        console.error("❌ Error deleting expense:", err);
        res.status(500).json({ error: "Server error" });
    }
};

exports.updateExpense = async (req, res) => {
    try {
        const expenseId = req.params.id;
        const { expAmount, description, category } = req.body;

        const expense = await Expense.findByPk(expenseId);
        if (!expense) {
            return res.status(404).json({ error: "Expense not found" });
        }

        expense.expAmount = expAmount;
        expense.description = description;
        expense.category = category;

        await expense.save();

        console.log(`✅ Expense updated: ID ${expenseId}`);
        res.status(200).json(expense);
    } catch (err) {
        console.error("❌ Error updating expense:", err);
        res.status(500).json({ error: "Server error" });
    }
};

exports.getExpenses = async (req, res) => {
  try {
      const { category } = req.query;
      let expenses;

      if (category) {
          expenses = await Expense.findAll({ where: { category } });
      } else {
          expenses = await Expense.findAll();
      }

      res.json(expenses);
  } catch (err) {
      console.error("❌ Error fetching expenses:", err);
      res.status(500).json({ error: "Server error" });
  }
};



