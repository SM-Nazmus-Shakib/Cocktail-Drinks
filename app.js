const loadAllDrinks = () => {
fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=cocktail')
.then((res) => res.json())
.then((data) => {
displayDrinks(data.drinks);
});
};

const displayDrinks = (drinks) => {
const drinkContainer = document.getElementById("product-container");
drinkContainer.innerHTML = '';

drinks.forEach((drink) => {
console.log(drink);
const div = document.createElement("div");
div.classList.add("card");
div.innerHTML = `
<img class="card-img" src=${drink.strDrinkThumb} alt="" />
<h5>${drink.strDrink}</h5>
<p>${drink.strInstructions.slice(0, 50)}</p>
<button onclick="singleDrink('${drink.idDrink}')">Details</button>
<button onclick="handleAddToCart('${drink.strDrink.slice(0, 12)}','${drink.idDrink}','${drink.strDrinkThumb}')">Add To Cart</button>
`;

drinkContainer.appendChild(div);
});
};

const handleAddToCart = (name, id, img) => {
const cartCount = document.getElementById("count").innerText;
let convertedCount = parseInt(cartCount);
if (convertedCount >= 7) {
alert("Cart is full! Maximum 7 items allowed.");
return;
}

convertedCount = convertedCount + 1;
document.getElementById("count").innerText = convertedCount;

console.log(convertedCount);

const container = document.getElementById("cart-main-container");
console.log(name, id, img);

const div = document.createElement("div");
div.classList.add("cart-info");
div.innerHTML = `
<img src="${img}" width="50" height="50">
<p>${name}</p>
<button onclick="removeFromCart(this)" class="remove-btn">Remove</button>
`;
container.appendChild(div);
};
const removeFromCart = (button) => {
const cartCount = document.getElementById("count").innerText;
let convertedCount = parseInt(cartCount);
convertedCount = convertedCount - 1;
document.getElementById("count").innerText = convertedCount;
button.parentElement.remove();
};
const UpdateTotal = () => {
const allPrice = document.getElementsByClassName("price")
let count = 0
for (const element of allPrice) {
count = count + parseFloat(element.innerText.replace('$', ''))
}
document.getElementById("total").innerText = count.toFixed(2)
}

const singleDrink = (id) => {
console.log(id);
fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
.then((res) => res.json())
.then((data) => {
const drink = data.drinks[0];
const modal = `
<div style="position:fixed;top:0;left:0;width:100%;height:100%;display:flex;justify-content:center;align-items:center;">
<div style="background:white;padding:20px;border-radius:8px;max-width:400px;">
<h3>${drink.strDrink}</h3>
<img src="${drink.strDrinkThumb}" width="150">
<p>${drink.strInstructions}</p>
<button onclick="this.parentElement.parentElement.remove()">Close</button>
</div>
</div>
`;
document.body.insertAdjacentHTML('beforeend', modal);
});
};

const searchDrinks = () => {
let term = document.getElementById("search-input").value;
if (!term) term = 'cocktail';
fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${term}`)
.then((res) => res.json())
.then((data) => {
displayDrinks(data.drinks);
});
};

loadAllDrinks();

