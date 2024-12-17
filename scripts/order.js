const demoData = [
    { name: "cat-elegant", price: 40 },
    { name: "cat-detailed", price: 55 },
    { name: "cat-cute", price: 35 },
    { name: "cross", price: 40 },
    { name: "gravestone", price: 35 },
    { name: "coffin-normal", price: 40 },
    { name: "gravestone-gold", price: 50 },
    { name: "gravestone-white", price: 55 },
    { name: "blackwhite-dragon", price: 60 },
    { name: "dragon-detailed", price: 75 },
    { name: "dragon-brown", price: 50 },
    { name: "dragon-cake", price: 50 },
    { name: "rose-black", price: 45 },
    { name: "rose-brown", price: 55 },
    { name: "rose-blackwhite", price: 50 },
    { name: "gargoyle-head", price: 40 },
    { name: "gargoyle-wings", price: 55 },
    { name: "gargoyle", price: 45 }
];

const selectedValue = document.getElementById("selectedValue");

// Funktion zu hinzufügen vom HTML
/*function addOrder() {
    if(getAmount() !== "") {
        var errorMsg = document.getElementById("error-message");
        var value = getDataByName(getSelectValue());
        addOrderList(getAmount(), value.name, value.price)
        //label mit Ausgabe: darf nicht leer sein einfügen
}
}*/



function addOrder() {
    // Holt die Fehlermeldung
    var errorMsg = document.getElementById("error-message");
    var value = getDataByName(getSelectValue());
    var amount = getAmount();
    // Überprüft, ob das Eingabefeld leer ist
    if (amount !== "" && amount !== "0" && !isNaN(amount) && Number.isInteger(Number(amount)) && amount < 11 && amount > 0)  {
        var value = getDataByName(getSelectValue());
        addOrderList(getAmount(), value.name, value.price);
        errorMsg.style.display = "none"; // Blendet die Fehlermeldung aus, falls Eingabe gültig ist
    }   
    else {
        errorMsg.style.display = "block"; // Zeigt die Fehlermeldung an, wenn Eingabe leer ist
    }
}

// Gibt den wert der Ausgewählt wurde
function getSelectValue() {
    return document.getElementById('select').value;
}

// Gibt Anzahl aus 
function getAmount() {
    return parseInt(document.getElementById('amount').value); 
}

// Sucht das Produkt aus demoDaten über den Namen
function getDataByName(name) {
    return demoData.find(product => product.name === name);
}

// Lädt die Tabelle
function renderTable() {
    const table = document.getElementById('tableorder');

    // Löscht jede Zeile bis auf die erste (den Header)
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }

    // Holt sich die Bestellliste aus dem LocalStorage
    const orderList = getOrderList();

    // Befüllt die Tabelle mit den Bestell-Daten
    for (var i = 0; i < orderList.length; i++) {
        var productname = orderList[i].name;
        var price = orderList[i].price;
        var amount = orderList[i].amount;

        const row = document.createElement('tr');
        var cell1 = document.createElement("td");
        var cell2 = document.createElement("td");
        var cell3 = document.createElement("td");
        var cell4 = document.createElement("td");
        var cell5 = document.createElement("td");

        cell1.textContent = amount + " x";
        cell2.textContent = productname;
        cell3.textContent = price + " €";
        cell4.textContent = (price * amount) + " € "

        // Button zum Löschen des Produkts
        var button = document.createElement("button");
        button.textContent = "Löschen";

        button.onclick = (function(index) {
            return function() {
                deleteOrderByIndex(index);
                getTotalPrice();  // Löscht das Produkt anhand des Index
            };
        })(i);

        cell5.appendChild(button);

        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        row.appendChild(cell4);
        row.appendChild(cell5);
        table.appendChild(row);
    }
    getTotalPrice(); 
}

// Holt die Bestellliste aus dem LocalStorage
function getOrderList() {
    const orderList = JSON.parse(localStorage.getItem("orderlist")) || [];
    return orderList;
}

// Löscht das Produkt durch den Index aus dem LocalStorage
function deleteOrderByIndex(index) {
    const orderList = getOrderList();
    const output = [];
    for (var i = 0; i < orderList.length; i++) {
        if (i !== index) {
            output.push(orderList[i]);
        }
    }
    localStorage.setItem("orderlist", JSON.stringify(output));
    renderTable();
}

// Hinzufügen der Bestellung zum LocalStorage 
function addOrderList(amount, name, price) {
    const orderList = getOrderList();
    orderList.push({ amount, name, price });
    localStorage.setItem("orderlist", JSON.stringify(orderList));
    renderTable(); 
}

// Automatisch Tabellen Laden beim Aufruf der Seite 
document.addEventListener('DOMContentLoaded', renderTable);

// Gesamtpreis ermitteln
function getTotalPrice() {
    const orderList = getOrderList();
    let totalPrice = 0;

    console.log(orderList);
    for (let i = 0; i < orderList.length; i++) {
        totalPrice += orderList[i].price * orderList[i].amount;
    }
    document.getElementById("total").textContent = `${totalPrice.toFixed(2)} €`;
}

window.onload = function() {
    getTotalPrice(); // Ruft getTotalPrice() beim Laden der Seite auf
};


