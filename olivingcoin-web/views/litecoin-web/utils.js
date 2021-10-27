let coffees = [];

class Coffee {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
}

function addItemToOrderList(name, price) {
    // add to list
    this.addToList(name, price);
    console.log(coffees);

    console.log("Total price: " + this.getTotalPrice());
    console.log("total amount: " + this.getTotalAmount());

    // check exist
    if (checkAlreadyExist(name)) {
        return;
    }

    // create elements
    let tbody = document.createElement("tbody");
    let tr = document.createElement("tr");
    let nameTd = document.createElement("td");
    let amountTd = document.createElement("td");
    let priceTd = document.createElement("td");
    nameTd.innerHTML = name;
    amountTd.innerHTML = 1;
    priceTd.innerHTML = price;

    tr.appendChild(nameTd);
    tr.appendChild(amountTd);
    tr.appendChild(priceTd);

    tbody.appendChild(tr);

    let orderList = document.getElementById("orderList");

    orderList.appendChild(tbody);


}

function addToList(name, price) {
    coffees.push(new Coffee(name, price));
}

// If exist, plus amount of coffee
function checkAlreadyExist(name) {
    let orderList = document.getElementById("orderList");

    for (let i = 0; i < orderList.rows.length; i++) {
        let item = orderList.rows[i];
        let coffee = item.cells[0];
        let amount = item.cells[1];

        // plus amount
        if (name == coffee.innerHTML) {
            amount.innerHTML = parseInt(amount.innerHTML) + 1;
            return true;
        }
    }

    return false;
}

function getTotalPrice() {
    let totalPrice = 0;
    coffees.forEach(c => totalPrice += c.price);
    return totalPrice;
}

function getTotalAmount() {
    return coffees.length;
}