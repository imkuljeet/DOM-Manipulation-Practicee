const form = document.getElementById("expenseForm");
const list = document.getElementById("ourlist");

form.addEventListener('submit', function(event) {
    event.preventDefault();

    let expAmount = event.target.expAmount.value;
    let description = event.target.description.value;
    let category = event.target.category.value;

    let li = document.createElement("li");
    let text = document.createTextNode(`Amount: ${expAmount} | Description: ${description} | Category: ${category}`);
    li.appendChild(text);

    let delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.style.marginLeft = "10px";

    delBtn.addEventListener("click", function() {
        delBtn.parentElement.remove();
    });

    li.appendChild(delBtn);
    list.appendChild(li);
    form.reset();
});
