//AFFICHAGE DES PRODUITS SUR LA PAGE D'ACCUEIL
const api = "http://localhost:3000/api/products";

//Récupération des données de tous les produits dans l'API
function productsGet() {
    fetch(api)
      .then((response) => response.json())
      .then((products) => {
        parse(products);
      });
  }
  
  //Selection de l'id #items dans le DOM
  function parse(products) {
    const itemsEl = document.querySelector('#items');
  
  //Boucle avec construction de blocs dans le DOM (HTML) + récupération des données dans le tableau de l'API  
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

  productsGet();


