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
  //Find the table body
  let tBody = document.querySelector("tbody");

  for(let i in cart.items){
    let tr = document.createElement('tr');
    tBody.appendChild(tr);

    let tdDelete = document.createElement('td');
    tdDelete.textContent = 'Delete';
    tr.appendChild(tdDelete);

    let tdQuantity = document.createElement('td');
    tdQuantity.textContent = `${cart.items[i].quantity}`;
    tr.appendChild(tdQuantity);

    let tdName = document.createElement('td');
    tdName.textContent = `${cart.items[i].product}`;
    tr.appendChild(tdName);
  }
  // Iterate over the items in the cart
  // Create a TR
  // Create a TD for the delete link, quantity,  and the item
  // Add the TR to the TBODY and each of the TD's to the TR

}


function removeItemFromCart(event) {
  console.log(cart);
  if(event.target.innerHTML === 'Delete'){
    cart.removeItem(event.target.parentNode.sectionRowIndex);
    cart.saveToLocalStorage();
    renderCart();
  }
  // When a delete link is clicked, use cart.removeItem to remove the correct item
  // Save the cart back to local storage
  // Re-draw the cart table
}
// This will initialize the page and draw the cart on screen

const tBodyListener = document.querySelector("tbody");
tBodyListener.addEventListener('click', removeItemFromCart);

renderCart();
