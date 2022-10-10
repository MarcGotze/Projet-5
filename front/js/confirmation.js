//Récupération de l'id dans l'URL
let str = window.location.href;
let url = new URL(str);
let searchParams = new URLSearchParams(url.search);
let id = "";

if (searchParams.has("id")) {
  id = searchParams.get("id");
}

const orderId = document.getElementById("orderId");
orderId.innerHTML = `${id}`;