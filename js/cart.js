/* global Cart */
'use strict';

// Create an event listener so that when the delete link is clicked, the removeItemFromCart method is invoked.
const table = document.getElementById('cart');
table.addEventListener('click', removeItemFromCart);
let cart;

function loadCart() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  cart = new Cart(cartItems);
}

// Make magic happen --- re-pull the Cart, clear out the screen and re-draw it
function renderCart() {
  loadCart();
  clearCart();
  showCart();
}

// Remove all of the rows (tr) in the cart table (tbody)
function clearCart() {
  let parent = document.querySelector("tbody");
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

// Fill in the <tr>'s under the <tbody> for each item in the cart
function showCart() {
  let tBody = document.querySelector("tbody");

  for (let i in cart.items) {
    let tr = document.createElement('tr');
    tBody.appendChild(tr);

    let tdDelete = document.createElement('td');
    tdDelete.textContent = 'X';
    tr.appendChild(tdDelete);

    let tdQuantity = document.createElement('td');
    tdQuantity.textContent = `${cart.items[i].quantity}`;
    tr.appendChild(tdQuantity);

    let tdName = document.createElement('td');
    tdName.textContent = `${cart.items[i].product}`;
    tr.appendChild(tdName);
  }
}


function removeItemFromCart(event) {
  let location = event.target.parentNode.sectionRowIndex;
  let confirm = prompt(`Are you sure you want to remove ${cart.items[location].quantity} ${cart.items[location].product}(s) [y/n]`);
  if (confirm.toLowerCase() === 'y' || confirm.toLowerCase() === 'yes') {
    if (event.target.innerHTML === 'X') {
      cart.removeItem(location);
      cart.saveToLocalStorage();
      renderCart();
    }
  } else {
    renderCart();
  }
}


const tBodyListener = document.querySelector("tbody");
tBodyListener.addEventListener('click', removeItemFromCart);

renderCart();
