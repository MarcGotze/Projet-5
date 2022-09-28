const api = "http://localhost:3000/api/products";
let totalQty = 0;
let totalPrice = 0;

fetch(api)
      .then((response) => response.json())
      .then((response) => {
        generateBasket(response);
    });

function sumQty(a, b) {
    return a += b;
}    

function sumPrice(a, b, c) {
    return a += b * c;
}    

function generateBasket(allItems) {
    const itemsEl = document.querySelector('#cart__items');
    let basket = localStorage.getItem("basket");
    let basketUpdate;
    
    //Serialisation du panier
    if (basket == null) {
        basketUpdate = [];
    } else {
        basketUpdate = JSON.parse(basket);
    };

    //Boucle de création d'éléments dans le DOM
    basketUpdate.forEach((product) => {
        const fullProduct = allItems.find(item => item._id === product.id);
        const a = document.createElement('a');
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
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="0">
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                    </div>
                    </div>
                </div>
            </article>
    `; 
        //Calcul des sommes du panier
        const totalQtySelector = document.querySelector('#totalQuantity');
        totalQty = sumQty(totalQty, product.selectedQty);
        totalQtySelector.innerHTML = `${totalQty}`;

        const totalPriceSelector = document.querySelector('#totalPrice');
        totalPrice = sumPrice(totalPrice, fullProduct.price, product.selectedQty);
        totalPriceSelector.innerHTML = `${totalPrice}`;

        itemsEl.appendChild(a);
        });
}

        