// product-item.js

class ProductItem extends HTMLElement {
  constructor(product) {
    super();

    let shadowDom = this.attachShadow({mode: 'open'});
    let li = document.createElement('li');
    let img = document.createElement('img');
    let title = document.createElement('title');
    let price = docment.createElement('price');
    let button = document.createElement('button');

    let cartCount = document.getElementById('cart-count');

    li.setAttribute('class', 'product');
    title.setAttribute('class', 'title');
    price.setAttribute('class', 'price');

    img.setAttribute('src', product['image']);
    img.setAttribute('alt', product['title']);
    title.textContent = product['title'];
    price.textContent = product['price'];

    button.innerHTML = "Add to Cart";

    let cart = JSON.parse(localStorage.getItem("cart"));
    if(cart.includes(product['id'])) {
      button.textContent = "Remove from Cart";
      cartCount.textContent = Number(cartCount.textContent) + 1;
    } else {
      button.textContent = "Add to Cart";
    }

    button.addEventListener("click", () => {
      if(button.textContent === "Remove from Cart") {
        button.textContent = "Add to Cart";
        cart.splice(cart.indexOf(product['id']), 1);
        cartCount.textContent = Number(cartCount.textContent) - 1;
      } else {
        button.textContent = "Remove from Cart";
        cart.push(product['id']);
        cartCount.textContent = Number(cartCount.textContent) + 1;
      }
      localStorage.setItem('cart', JSON.stringify(cart));
    })

    let styling = document.createElement('link');
    styling.setAttribute('rel', 'stylesheet');
    styling.setAttribute('href', '../styles/styles.css');

    li.appendChild(img);
    li.appendChild(title);
    li.appendChild(price);
    li.appendChild(button);
    shadowDom.appendChild(li);
    shadowDom.appendChild(styling);
  }
}

customElements.define('product-item', ProductItem);