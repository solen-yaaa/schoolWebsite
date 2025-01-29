const demoData = [
    { name: "cat-elegant", price: 40 },
    { name: "cat-detailed", price: 55 },
    { name: "cat-cute", price: 35 },
    { name: "cross", price: 40 },
    { name: "gravestone", price: 35 },
    { name: "coffin-normal", price: 40 },
    { name: "gravestone-gold", price: 50 },
    { name: "gravestone-white", price: 55 },
    { name: "raven", price: 45 },
    { name: "blackwhite-dragon", price: 60 },
    { name: "dragon-detailed", price: 75 },
    { name: "dragon-brown", price: 50 },
    { name: "dragon-cake", price: 50 },
    { name: "rose-black", price: 45 },
    { name: "rose-brown", price: 55 },
    { name: "rose-blackwhite", price: 50 },
    { name: "gargoyle-head", price: 40 },
    { name: "gargoyle-wings", price: 55 },
    { name: "gargoyle", price: 45 },
    { name: "CUSTOM", price: 250 }
];

const selectedValue = document.getElementById("selectedValue");

function addOrder() {
    // Holt die Fehlermeldung
    var errorMsg = document.getElementById("error-message");
    var errorMsg2 = document.getElementById("error-message2");
    var value = getDataByName(getSelectValue());
    var amount = getAmount();
    var includesPoint = amount.includes('.'); // Überprüft, ob die Eingabe einen Punkt enthält
    var includesComma = amount.includes(',');

    // Überprüft, ob die Eingabe eine gültige Zahl ist
    var isNumber = !isNaN(amount);

    // Wenn es eine Zahl ist und keine Dezimalzahl (also eine Ganzzahl)
    if (isNumber) {
        if (includesPoint || includesComma) {
            // Wenn es sich um eine Kommazahl handelt
            errorMsg.style.display = "none";
            errorMsg2.style.display = "block"; // Fehlermeldung für Kommazahl
        } else {
            // Wenn es sich um eine Ganzzahl handelt und der Wert im zulässigen Bereich ist
            var amountInt = parseInt(amount);
            if (amountInt > 0 && amountInt < 11) {
                var value = getDataByName(getSelectValue());
                addOrderList(amount, value.name, value.price);
                errorMsg.style.display = "none"; 
                errorMsg2.style.display = "none"; // Blendet die Fehlermeldung aus, falls Eingabe gültig ist
            } else {
                errorMsg.style.display = "block"; // Zeigt die Fehlermeldung an, wenn die Zahl nicht im Bereich ist
                errorMsg2.style.display = "none";
            }
        }
    } else {
        errorMsg.style.display = "block"; // Zeigt eine allgemeine Fehlermeldung, wenn die Eingabe keine Zahl ist
        errorMsg2.style.display = "none";
    }
}


// Gibt den wert der Ausgewählt wurde
function getSelectValue() {
    return document.getElementById('select').value;
}

// Gibt Anzahl aus 
function getAmount() {
    return document.getElementById('amount').value; 
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
        cell4.textContent = (price * amount)+ " €";

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
    return totalPrice;
}

window.onload = function() {
    getTotalPrice(); // Ruft getTotalPrice() beim Laden der Seite auf
};

const validators = {
    firstname: value => /^[a-zA-Z]+$/.test(value),
    lastname: value => /^[a-zA-Z]+$/.test(value),
    cityName: value => /^[a-zA-Z]+$/.test(value),
    houseNumber: value => /^[a-z0-9]+$/.test(value),
    plz: value => /^[0-9]{5}$/.test(value),
    street: value => value.trim() !== "",
    email: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
};

function validateField(field) {
    const value = field.value.trim();
    const validator = validators[field.id]; // Hol die Funktion aus dem Objekt

    if (typeof validator === 'function') {
        const isValid = validator(value);
        const errorElement = document.getElementById(`${field.id}Error`);
        if (isValid) {
            errorElement.style.display = "none";
        } else {
            errorElement.style.display = "block";
        }
        return isValid;
    } else {
        console.error(`Kein Validator für field.id: ${field.id}`);
        return false; // Rückgabe für ungültige Validierung
    }
}


function getProductsFromTable() {
    const table = document.getElementById('tableorder'); // Die Tabelle abrufen
    const rows = table.querySelectorAll('tr'); // Nur die Zeilen im <tbody>
    const products = [];

    // Jede Zeile iterieren
    var n = 0;
    rows.forEach(row => {
        if(n == 0){
            n=+1;
        }
        else{
        const cells = row.querySelectorAll('td'); // Alle Zellen in der Zeile
        console.log(cells);
        const product = {
            anz: cells[0].textContent, // Anzahl (erste Spalte)
            prod: cells[1].textContent,          // Produktname (zweite Spalte)
            pr: cells[2].textContent, // Preis pro Stück (dritte Spalte)
            tot: cells[3].textContent,
            // Gesamt (vierte Spalte)
        };
        products.push(product); 
        
        }
            // Produkt ins Array hinzufügen
    });
    console.log(products);
    return products; // Rückgabe des Arrays mit allen Produkten
}

// Beispiel: Produkte auslesen und anzeigen

document.querySelectorAll("#orderForm input").forEach(input => {
    input.addEventListener("input", () => validateField(input));
});


function generateOverview() {
    const inputs = document.querySelectorAll("#orderForm input");
    let isFormValid = true;
    const formData = {};

    inputs.forEach(input => {
        if (!validateField(input)) {
            isFormValid = false;
        }
        formData[input.id] = input.value.trim();
    });
    
    if(isFormValid) {
        const firstname = document.getElementById('firstname').value;
        const lastname = document.getElementById('lastname').value;
        const street = document.getElementById('street').value;
        const houseNumber = document.getElementById('houseNumber').value;
        const plz = document.getElementById('plz').value;
        const cityName = document.getElementById('cityName').value;
        const email = document.getElementById('email').value;
        const products = getProductsFromTable();
        const totPrice = getTotalPrice();
    
        console.log('TotalPrice: ', totPrice);
    
        const overviewWindow = window.open('confirmation.html', '_self');
    
        let productsHTML = products.map(product => `
            <tr>
                <td>${product.anz}</td>
                <td>${product.prod}</td>
                <td>${product.pr}</td>
                <td>${product.tot}</td>
            </tr>
        `).join('');
    
    
        let overviewHTML = `
            <html lang="de">
            <head>
                <meta charset="UTF-8">
                <title>Bestellbestätigung</title>
                <style>
                    .backg {
                        background-image: url(back.jpg);
                        background-size: 100% 100%;
                        position: fixed;
                        bottom: 0;
                        top: 0;
                        left: 0;
                        right: 0;
                        z-index: -1;
                        pointer-events: none;
                    }
                    .table {
                        background-color: black;
                        margin-left: 15%;
                        margin-right: 15%;
                        width: 70%;
                        padding: 3%;
                        border-radius: 20px;
                    }
                    h2 {
                        text-align: center;
                        color: white;
                        font-size: 40px;
    
                    }
                    .address {
                        width: auto;
                        border-collapse: collapse;
                    }
                    table, th, td {
                        border: 1px solid black;
                    }
                    th, td {
                        padding: 8px;
                        text-align: left;
                    }
                    .text {
                        color: white;
                        font-size: 20px;
                        font-family: inherit;
                    }
                    
                    .products {
                        color: white;
                        font-size: 30px;
                        font-weight: bold;
                    }
                    .border {
                        width: 100%;
                        border: 1px solid white;
                        color: white;
                        font-size: 20px;
                        font-family: inherit;
                    }
                </style>
            </head>
            <body>
                <div class="backg">
                    <h2>Deine Bestellung ist bei uns eingegangen</h2>
                    <div class="table">
                        <table class="address text">
                            <tr><td>Vorname</td><td>${firstname}</td></tr>
                            <tr><td>Nachname</td><td>${lastname}</td></tr>
                            <tr><td>Straße</td><td>${street}</td></tr>
                            <tr><td>Hausnummer</td><td>${houseNumber}</td></tr>
                            <tr><td>PLZ</td><td>${plz}</td></tr>
                            <tr><td>Ort</td><td>${cityName}</td></tr>
                            <tr><td>E-Mail</td><td>${email}</td></tr>
                        </table>
                        <p class="products">Bestellte Produkte</p>
                        <table id="productsTable" class="border">
                            <thead>
                                <tr>
                                    <th>Anzahl</th>
                                    <th>Produkt</th>
                                    <th>Preis pro Stück</th>
                                    <th>Gesamt</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${productsHTML}
                            </tbody>
                        </table>
                        <h3 class="text">Gesamtpreis: ${totPrice} €</h3>
                    </div>
    
                </div>
            </body>
            </html>
        `;
    
        overviewWindow.document.write(overviewHTML);
        overviewWindow.document.close();
    
    }
}


function placeOrder() {
    generateOverview();
}