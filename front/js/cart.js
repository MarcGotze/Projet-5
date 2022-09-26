let basket = localStorage.getItem("basket");
let basketUpdate;
const itemsEl = document.querySelector('#cart__items');

if (basket == null) {
    basketUpdate = [];
} else {
    basketUpdate = JSON.parse(basket);
};

console.log(basketUpdate);

basketUpdate.forEach((product) => {
    const a = document.createElement('a');
    a.innerHTML = `
   
    <article class="cart__item" data-id="${product.id}" data-color="${product.selectedColors}">
            <div class="cart__item__img">
                <img src="" alt="Photographie d'un canapé">
            </div>

            <div class="cart__item__content">
                <div class="cart__item__content__description">
                <h2>Nom du produit</h2>
                <p>${product.selectedColors}</p>
                <p>42,00 €</p>
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

    itemsEl.appendChild(a);
  });


