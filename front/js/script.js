//Récupération des données produit dans l'API
const api = "http://localhost:3000/api/products";

function init() {
    fetch(api)
      .then((response) => response.json())
      .then((products) => {
        parse(products);
      });
  }
  
  function parse(products) {
    const itemsEl = document.querySelector('#items');
  
    products.forEach((product) => {
      const a = document.createElement('a');
      a.href = `./product.html?id=${product._id}`;
      a.innerHTML = `
     
      <article>
            <img src="${product.imageUrl}" alt="${product.altTxt}">
            <h3 class="productName">${product.name}</h3>
            <p class="productDescription">${product.description}</p>
      </article>
  `;
  
      itemsEl.appendChild(a);
    });
  }
  
  init();
