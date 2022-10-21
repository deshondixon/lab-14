/* global Product, Cart */

'use strict';

// Set up an empty cart for use on this page.
const cart = new Cart([]);

function populateForm() {
  const selectElement = document.getElementById('items');
  for (let i in Product.allProducts) {
    let option = document.createElement
    ('option');
    option.textContent = Product.allProducts[i].name;
    selectElement.appendChild(option);
  }
}

function handleSubmit(event) {
  event.preventDefault();
  addSelectedItemToCart();
  cart.saveToLocalStorage();
  updateCounter();
  updateCartPreview();

}

//Add the selected item and quantity to the cart
function addSelectedItemToCart() {
  let itemPicked = document.getElementById('items').value;
  let quantityPicked = document.getElementById('quantity').value;
  cart.addItem(itemPicked, quantityPicked);
}

//Update the cart count in the header nav with the number of items in the Cart
function updateCounter() { 
  document.getElementById('itemCount').textContent = ` ${cart.items.length} items(s)`;
}

//As you add items into the cart, show them (item & quantity) in the cart preview div
function updateCartPreview() {
  let parent = document.getElementById('cartContents');
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
  for(let i in cart.items){
    let newElement = document.createElement('p');
    newElement.textContent = `${cart.items[i].quantity} ${cart.items[i].product}(s)`;
    parent.appendChild(newElement);
  }
}


const catalogForm = document.getElementById('catalog');
catalogForm.addEventListener('submit', handleSubmit);

populateForm();
