let expenses = [];

exports.addExpense = (req, res) => {
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
};
