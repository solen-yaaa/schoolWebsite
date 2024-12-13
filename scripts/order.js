
const selectedValue = document.getElementById("selectedValue");

function getSelectValue() {
    return document.getElementById('select').value;   
}

function addOrder() {
    const value = getSelectValue(); 
    console.log(value);
}