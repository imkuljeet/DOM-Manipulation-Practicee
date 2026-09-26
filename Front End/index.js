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

    list.appendChild(li);
    form.reset();
});
