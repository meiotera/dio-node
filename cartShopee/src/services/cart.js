async function addItem(userCart, item) {
  userCart.push(item);
}

async function calculateTotal(userCart) {
  console.log("Total Cart");
  const result = userCart.reduce((total, item) => total + item.subtotal(), 0);

  console.log(result);
}
async function deleteItem(userCart, name) {
  const index = userCart.findIndex((item) => item.name === name);

  if (index !== -1) {
    userCart.splice(index, 1);
  }
}
async function removeOneItem(userCart, index) {
  const deleteIndex = index - 1;
  if (index >= 0 && index < userCart.length) {
    userCart.splice(deleteIndex, 1);
  }
}

async function displayCart(userCart) {
  console.log("--------------Your Cart-------------------");

  console.table(userCart, ["name", "price", "quantity"]);
}

export { addItem, calculateTotal, deleteItem, removeOneItem, displayCart };
