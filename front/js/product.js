//Récupération de l'id dans l'URL
let str = window.location.href;
let url = new URL(str);
let searchParams = new URLSearchParams(url.search);
let id = "";

if (searchParams.has("id")) {
  id = searchParams.get("id");
}

let api = `http://localhost:3000/api/products/${id}`;

//Récupération des données du produit dans l'API
function productGet() {
  fetch(api)
    .then((response) => response.json())
    .then((product) => {
      parse(product);
    });
}

function parse(product) {
  //Construction de l'image
  let itemImg = document.querySelector(".item__img");
  itemImg.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;

  //Construction du nom
  let title = document.querySelector("#title");
  title.innerText = `${product.name}`;

  let titleTab = document.querySelector("title");
  titleTab.innerText = `${product.name}`;

  //Construction du prix
  let price = document.querySelector("#price");
  price.innerText = `${product.price}`;

  //Construction de la description
  let description = document.querySelector("#description");
  description.innerText = `${product.description}`;

  //Boucle ajout des couleurs dans le menu déroulant
  let color = document.querySelector("#colors");
  for (let i of product.colors) {
    color.innerHTML += `<option value="${i}">${i}</option>`;
  }
}

productGet();

//Récupération de la couleur choisie par l'utilisateur
const colors = document.getElementById("colors");
let selectedColors = "";

colors.addEventListener("change", function () {
  selectedColors = colors.value;
  console.log(selectedColors);
});

//Récupération de la quantité choisie par l'utilisateur
const quantity = document.getElementById("quantity");
let selectedQty = 0;

quantity.addEventListener("input", function (e) {
  qty = quantity.value;
  selectedQty = parseInt(qty);
  console.log(selectedQty);
});

//Fonction de sauvegarde dans le LocalStorage
function saveBasket(basket) {
  localStorage.setItem("basket", JSON.stringify(basket));
}

//Serialisation du contenu du panier
function getBasket() {
  let basket = localStorage.getItem("basket");
  if (basket == null) {
    return [];
  } else {
    return JSON.parse(basket);
  }
}

//Ajout d'articles au panier
function addBasket(product) {
  let basket = getBasket();
  let foundProduct = basket.find(
    (p) => p.id == product.id && p.selectedColors == product.selectedColors
  );
  if (foundProduct != undefined) {
    foundProduct.selectedQty += selectedQty;
  } else {
    basket.push(product);
  }
  saveBasket(basket);
}

//Bouton "Ajouter au panier" et sauvegarde du panier
const cart = "./cart.html";
document.querySelector("#addToCart").addEventListener("click", function (e) {
  e.preventDefault();
  if (selectedColors === "" || selectedQty === 0) {
    alert("Veuillez selectionner une couleur et une quantité");
  } else {
    addBasket({ id, selectedQty, selectedColors });
    window.location = cart;
  }
});
