const form = document.getElementById("expenseForm");
const list = document.getElementById("ourlist");

let editingId = null; // track which expense is being edited

form.addEventListener('submit', async function(event) {
    event.preventDefault();

    let expAmount = event.target.expAmount.value;
    let description = event.target.description.value;
    let category = event.target.category.value;

    try {
        let response;
        if (editingId) {
            // Update existing expense
            response = await axios.put(`http://localhost:3000/expenses/${editingId}`, {
                expAmount,
                description,
                category
            });
            editingId = null; // reset after update
            form.querySelector("button[type='submit']").textContent = "Add Expense";
        } else {
            // Create new expense
            response = await axios.post("http://localhost:3000/expenses", {
                expAmount,
                description,
                category
            });
        }

        const savedExpense = response.data;

        let li = document.createElement("li");
        let text = document.createTextNode(
            `Amount: ${savedExpense.expAmount} | Description: ${savedExpense.description} | Category: ${savedExpense.category}`
        );
        li.appendChild(text);

        let delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.style.marginLeft = "10px";

        delBtn.addEventListener("click", async function() {
            await axios.delete(`http://localhost:3000/expenses/${savedExpense.id}`);
            li.remove();
        });

        let editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.style.marginLeft = "10px";

        editBtn.addEventListener("click", function() {
            form.expAmount.value = savedExpense.expAmount;
            form.description.value = savedExpense.description;
            form.category.value = savedExpense.category;
            editingId = savedExpense.id; // mark this expense for update
            form.querySelector("button[type='submit']").textContent = "Update Expense";
            li.remove();
        });

        li.appendChild(delBtn);
        li.appendChild(editBtn);
        list.appendChild(li);

        form.reset();
    } catch (error) {
        console.error("Error saving expense:", error);
    }
});

document.addEventListener("DOMContentLoaded", async function() {
    try {
        const response = await axios.get("http://localhost:3000/expenses");
        const expenses = response.data;

        expenses.forEach(savedExpense => {
            let li = document.createElement("li");
            let text = document.createTextNode(
                `Amount: ${savedExpense.expAmount} | Description: ${savedExpense.description} | Category: ${savedExpense.category}`
            );
            li.appendChild(text);

            let delBtn = document.createElement("button");
            delBtn.textContent = "Delete";
            delBtn.style.marginLeft = "10px";

            delBtn.addEventListener("click", async function() {
                await axios.delete(`http://localhost:3000/expenses/${savedExpense.id}`);
                li.remove();
            });

            let editBtn = document.createElement("button");
            editBtn.textContent = "Edit";
            editBtn.style.marginLeft = "10px";

            editBtn.addEventListener("click", function() {
                form.expAmount.value = savedExpense.expAmount;
                form.description.value = savedExpense.description;
                form.category.value = savedExpense.category;
                editingId = savedExpense.id;
                form.querySelector("button[type='submit']").textContent = "Update Expense";
                li.remove();
            });

            li.appendChild(delBtn);
            li.appendChild(editBtn);
            list.appendChild(li);
        });
    } catch (error) {
        console.error("Error fetching expenses:", error);
    }
});
