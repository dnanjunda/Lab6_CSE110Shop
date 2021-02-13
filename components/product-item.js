// product-item.js

class ProductItem extends HTMLElement {
  constructor(product) {
    super();

    let shadowDom = this.attachShadow({mode: 'open'});

    //create elements for product
    let li = document.createElement('li');
    let img = document.createElement('img');
    let title = document.createElement('title');
    let price = document.createElement('price');
    let button = document.createElement('button');

    let cartCount = document.getElementById('cart-count');

    //set attributes for each element
    li.setAttribute('class', 'product');
    title.setAttribute('class', 'title');
    price.setAttribute('class', 'price');
    img.setAttribute('src', product.image);
    img.setAttribute('alt', product.title);
    title.textContent = product.title;
    price.textContent = product.price;

    button.innerHTML = "Add to Cart";

    let cart = JSON.parse(localStorage.getItem("cart"));

    //set button text based on if product is in cart
    if(cart.includes(product.id.toString())) {
      button.textContent = "Remove from Cart";
      cartCount.textContent = Number(cartCount.textContent) + 1;
    } else {
      button.textContent = "Add to Cart";
    }

    //handle button click based on its current text
    button.addEventListener("click", () => {
      if(button.textContent === "Remove from Cart") {
        button.textContent = "Add to Cart";
        cart.splice(cart.indexOf(product.id.toString()), 1);
        cartCount.textContent = Number(cartCount.textContent) - 1;
      } else {
        button.textContent = "Remove from Cart";
        cart.push(product.id.toString());
        cartCount.textContent = Number(cartCount.textContent) + 1;
      }
      localStorage.setItem('cart', JSON.stringify(cart));
    })

    //add styling from CSS sheet
    let styling = document.createElement('link');
    styling.setAttribute('rel', 'stylesheet');
    styling.setAttribute('href', 'styles/styles.css');

    //add elements to card element
    li.appendChild(img);
    li.appendChild(title);
    li.appendChild(price);
    li.appendChild(button);

    //add elements to the shadow DOM
    shadowDom.appendChild(li);
    shadowDom.appendChild(styling);
  }
}

customElements.define('product-item', ProductItem);