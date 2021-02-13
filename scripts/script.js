// Script.js

window.addEventListener('DOMContentLoaded', () => {

  if (!localStorage.getItem('products')) {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => localStorage.setItem('products', JSON.stringify(data)))
      .then(loadProducts());
  } else {
    loadProducts();
  }
});

function loadProducts() {
  if(!localStorage.getItem('cart')) {
    let cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  let productList = document.getElementById('product-list');
  let products = JSON.parse(localStorage.getItem('products'));

  for(product in products) {
    let item = new ProductItem(product);
    productList.appendChild(item);
  }
}