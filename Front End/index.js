const form = document.getElementById("expenseForm");
const list = document.getElementById("ourlist");
const prevBtn = document.getElementById("prevPage");
const nextBtn = document.getElementById("nextPage");
const pageNumbers = document.getElementById("pageNumbers");

let editingId = null; // track which expense is being edited
let currentPage = 1;
const limit = 3; // show 3 expenses per page

// Load expenses with pagination
async function loadExpenses(page = 1) {
    try {
        const response = await axios.get(`http://localhost:3000/expenses?page=${page}&limit=${limit}`);
        const data = response.data;

        list.innerHTML = ""; // clear list

        // Render expenses
        data.expenses.forEach(savedExpense => {
            let li = document.createElement("li");
            let text = document.createTextNode(
                `Amount: ${savedExpense.expAmount} | Description: ${savedExpense.description} | Category: ${savedExpense.category}`
            );
            li.appendChild(text);

            // Delete button
            let delBtn = document.createElement("button");
            delBtn.textContent = "Delete";
            delBtn.style.marginLeft = "10px";
            delBtn.addEventListener("click", async function() {
                await axios.delete(`http://localhost:3000/expenses/${savedExpense.id}`);
                li.remove();
            });

            // Edit button
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

        // Render page numbers dynamically
        pageNumbers.innerHTML = "";
        for (let i = 1; i <= data.totalPages; i++) {
            let pageBtn = document.createElement("button");
            pageBtn.textContent = i;
            pageBtn.style.margin = "0 5px";

            if (i === data.currentPage) {
                pageBtn.disabled = true; // highlight current page
                pageBtn.style.fontWeight = "bold";
                pageBtn.style.backgroundColor = "#ddd";
            }

            pageBtn.addEventListener("click", () => loadExpenses(i));
            pageNumbers.appendChild(pageBtn);
        }

        // Update prev/next buttons
        prevBtn.disabled = data.currentPage === 1;
        nextBtn.disabled = data.currentPage === data.totalPages;

        currentPage = data.currentPage;
    } catch (error) {
        console.error("Error fetching expenses:", error);
    }
}

// Handle form submit (create or update)
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

        form.reset();
        // Reload current page after add/update
        loadExpenses(currentPage);
    } catch (error) {
        console.error("Error saving expense:", error);
    }
});

// Pagination button events
prevBtn.addEventListener("click", () => {
    if (currentPage > 1) loadExpenses(currentPage - 1);
});

nextBtn.addEventListener("click", () => {
    loadExpenses(currentPage + 1);
});

// Initial load
document.addEventListener("DOMContentLoaded", () => loadExpenses());
