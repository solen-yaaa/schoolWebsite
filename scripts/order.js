
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

    var cell1 = document.createElement("td");
    var cell2 = document.createElement("td");
    var cell3 = document.createElement("td");

   cell1.textContent = amount;
   cell2.textContent = productname;
   cell3.textContent = price;

   row.appendChild(cell1);
   row.appendChild(cell2);
   row.appendChild(cell3);

   table.appendChild(row);
}