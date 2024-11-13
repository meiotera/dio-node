import createItem from "./services/items.js";
import * as cartService from "./services/cart.js";

const myCart = [];
const myWishList = [];

console.log("Welcome to the your cart");

const item1 = await createItem("Caderno", 15.9, 2);
const item2 = await createItem("Sandalia", 15.9, 1);

await cartService.addItem(myCart, item1);
await cartService.addItem(myCart, item2);

// await cartService.deleteItem(myCart, item1.name);
// await cartService.deleteItem(myCart, item2.name);

await cartService.removeOneItem(myCart, 1);

await cartService.displayCart(myCart);

await cartService.calculateTotal(myCart);
