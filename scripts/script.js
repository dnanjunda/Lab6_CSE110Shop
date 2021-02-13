// Script.js

window.addEventListener('DOMContentLoaded', () => {

  //fetch products if they don't exist and display them
  if (!localStorage.getItem('products')) {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(data => localStorage.setItem('products', JSON.stringify(data)))
      .then(loadProducts);
  } else {
    loadProducts();
  }
});

function loadProducts() {

  //create cart if it doesn't exist in local storage
  if(!localStorage.getItem('cart')) {
    let cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  let productList = document.getElementById('product-list');
  let products = JSON.parse(localStorage.getItem('products'));

  //use custom ProductItem component to display each product
  for(product of products) {
    let item = new ProductItem(product);
    productList.appendChild(item);
  }
}