
const selectedValue = document.getElementById("selectedValue");

function getSelectValue() {
    return document.getElementById('select').value;   
}

function getAmount() {
    return document.getElementById('amount').value;   
}

function getPrice() {
    return "25";
}

function addOrder() {
   const value = getSelectValue(); 
   var productname = getSelectValue();
   var price = getPrice();
   var amount = getAmount();
   console.log(amount, productname, price);
   const table = document.getElementById('tableorder');
   const row = document.createElement('tr');
}