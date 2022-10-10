const api = "http://localhost:3000/api/products";
const apiOrder = "http://localhost:3000/api/products/order";
const totalQtySelector = document.querySelector("#totalQuantity");
const totalPriceSelector = document.querySelector("#totalPrice");
let articleItem = {};
let basket;

//Récupération de l'API
fetch(api)
  .then((response) => response.json())
  .then((response) => {
    generateBasket(response);
  });

//Fonction de sauvegarde dans le LocalStorage
function saveBasket(basket) {
  localStorage.setItem("basket", JSON.stringify(basket));
}

//Désérialisation du contenu du panier
function getBasket() {
  let basket = localStorage.getItem("basket");

  if (basket == null) {
    return [];
  } else {
    return JSON.parse(basket);
  }
}

//Suppresion d'un article
function removeFromBasket(product) {
  let basket = getBasket();
  basket = basket.filter((p) => p.id != product);
  saveBasket(basket);
}

//Changement de la quantité d'un article
function changeQuantity(product, quantity, quantityInner) {
  let basket = getBasket();
  let foundProduct = basket.find((p) => p.id == product);
  let qtyInnerTxt = quantityInner.querySelector('p');

  if (foundProduct != undefined) {
    selectedQty = foundProduct.selectedQty;
    foundProduct.selectedQty = parseInt(quantity);
    qtyInnerTxt.innerHTML = `<p>Qté : ${foundProduct.selectedQty}</p>`;
    saveBasket(basket);
  }
}

//Calcul des totaux
function addToTotal(product, qty) {
    if(qty){
        qty = parseInt(qty, 10);
    }
    articleItem[product._id] = { qty, price: product.price};

    calculateTotal();
}

function calculateTotal(){
    let total = 0;
    let qty = 0;
    Object.values(articleItem).forEach(product => {
        total += product.qty * product.price;
        qty += product.qty;
    });
    
    totalQtySelector.innerText = qty;
    totalPriceSelector.innerText = total;
}

//Génération du panier
function generateBasket(allItems) {
  const itemsEl = document.querySelector("#cart__items");
  let basketUpdate;
  basket = localStorage.getItem("basket");

  //Serialisation du panier
  if (basket == null) {
    basketUpdate = [];
  } else {
    basketUpdate = JSON.parse(basket);
  }

  //Boucle de création d'éléments dans le DOM
  basketUpdate.forEach((product) => {
    const fullProduct = allItems.find((item) => item._id === product.id);
    const a = document.createElement("a");
    a.innerHTML = `
        
        <article class="cart__item" data-id="${product.id}" data-color="${product.selectedColors}">
                <div class="cart__item__img">
                    <img src="${fullProduct.imageUrl}" alt="${fullProduct.altTxt}">
                </div>

                <div class="cart__item__content">
                    <div class="cart__item__content__description">
                    <h2>${fullProduct.name}</h2>
                    <p>${product.selectedColors}</p>
                    <p>${fullProduct.price} €</p>
                    </div>
                    <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p>Qté : ${product.selectedQty}</p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.selectedQty}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                    </div>
                    </div>
                </div>
            </article>
    `;

    const qtyInner = a.querySelector('.cart__item__content__settings__quantity');
    a.querySelector('input').addEventListener('change', (event) => {
        changeQuantity(product.id, event.target.value, qtyInner);
        addToTotal(fullProduct, event.target.value);
    });

    addToTotal(fullProduct, product.selectedQty);
    itemsEl.appendChild(a);
  });

  //Supression du produit
  const deleteInputs = document.querySelectorAll(".deleteItem");

  deleteInputs.forEach((input) => {
    const inputItem = input.closest(".cart__item");

    input.addEventListener("click", () => {
      const productId = inputItem.dataset.id;
      removeFromBasket(productId);
      inputItem.remove();
    });
  });
}

//Formulaire
const order = document.querySelector("#order");

let contact = {
  firstName: "prenom",
  lastName: "nom",
  address: "adresse",
  city: "ville",
  email: "email",
};

//Vérification des champs du formulaire
function validate() {
  const regExEmail =
    /^(([^<>()[]\.,;:s@]+(.[^<>()[]\.,;:s@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
  const regExString = /^[a-zA-Z\-]+$/;
  const regExAddress = /^[a-zA-Z0-9]+$/;

  const userFirstName = document.querySelector("#firstName").value;
  const userLastName = document.querySelector("#lastName").value;
  const userAddress = document.querySelector("#address").value;
  const userCity = document.querySelector("#city").value;
  const userEmail = document.querySelector("#email").value;

  firstNameResult = regExString.test(userFirstName);
  lastNameResult = regExString.test(userLastName);
  addressResult = regExAddress.test(userAddress);
  cityResult = regExString.test(userCity);
  emailResult = regExEmail.test(userEmail);

  if (!firstNameResult) {
    document.getElementById("firstNameErrorMsg").innerHTML =
      "Veuillez saisir un prénom valide";
  }

  if (!lastNameResult) {
    document.getElementById("lastNameErrorMsg").innerHTML =
      "Veuillez saisir un nom valide";
  }

  if (!addressResult) {
    document.getElementById("addressErrorMsg").innerHTML =
      "Veuillez saisir une adresse valide";
  }

  if (!cityResult) {
    document.getElementById("cityErrorMsg").innerHTML =
      "Veuillez saisir une ville valide";
  }

  if (!emailResult) {
    document.getElementById("emailErrorMsg").innerHTML =
      "Veuillez saisir un email valide";
  }

  if (
    firstNameResult &&
    lastNameResult &&
    addressResult &&
    cityResult &&
    emailResult
  ) {
    contact.firstName = userFirstName;
    contact.lastName = userLastName;
    contact.address = userAddress;
    contact.city = userCity;
    contact.email = userEmail;

    //Récupération des id produits
    basket = JSON.parse(basket);
    const productID = [];
    basket.forEach((element) => {
      productID.push(element.id);
    });

    let body = {
      'contact' : contact, 
      'products': productID
    }

    //Envoi du panier en confirmation via un POST
    let orderId = "";

    function orderConfirmation (order) {
      const confirmation = `./confirmation.html?id=${order}`;
      window.location = confirmation;
    }

    fetch(apiOrder, {
    method: "POST",
    headers: {
      Accept: 'application/json',
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: 'default' 
    })
    .then((response) => response.json())
    .then((data) => {
      orderId = data.orderId;
      orderConfirmation(orderId);
    });
  }
}

order.addEventListener("click", (e) => {
  e.preventDefault();
  validate();
});