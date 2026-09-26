const form = document.getElementById("expenseForm");

form.addEventListener('submit',function(event){
    event.preventDefault();

    let expAmount = event.target.expAmount.value;

    console.log(expAmount);
    
})