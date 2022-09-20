//Récupération de l'id dans l'URL
let str = window.location.href;
let url = new URL(str);
let searchParams = new URLSearchParams(url.search);
let id = '';

if(searchParams.has('id')) {
    id = searchParams.get('id'); 
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
    let itemImg = document.querySelector('.item__img');
    itemImg.innerHTML = `<img src="${product.imageUrl}" alt="${product.altTxt}">`;

    //Construction du nom
    let title = document.querySelector('#title');
    title.innerText = `${product.name}`;

    //Construction du prix
    let price = document.querySelector('#price');
    price.innerText = `${product.price}`;

    //Construction de la description
    let description = document.querySelector('#description');
    description.innerText = `${product.description}`;

    //Boucle ajout des couleurs dans le menu déroulant
    let color = document.querySelector('#colors');
    for (let i of product.colors) {
        color.innerHTML += `<option value="${i}">${i}</option>`;
    }
  }

  productGet();
