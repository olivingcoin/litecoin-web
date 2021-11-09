function changeItems(menu) {
    let coffee = document.getElementById("coffee");
    let noneCoffee = document.getElementById("noneCoffee");
    let teaAndAde = document.getElementById("teaAndAde");
    let sidemenu = document.getElementById("sidemenu");

    coffee.style.display = "none";
    noneCoffee.style.display = "none";
    teaAndAde.style.display = "none";
    sidemenu.style.display = "none";

    switch (menu) {
        case 'coffee':
            coffee.style.display = "";
            break;
        case 'noneCoffee':
            noneCoffee.style.display = "";
            break;
        case 'teaAndAde':
            teaAndAde.style.display = "";
            break;
        case 'sidemenu':
            sidemenu.style.display = "";
            break;
    }
}
