const searchInput = document.getElementById("searchInput");
const output = document.getElementById("output");
const cartOutput = document.getElementById("cartOutput");
let timeoutId;
let cart = []; // Array to store added products

// Fetch data from the API
async function fetchData(query = "") {
    try {
        const endpoint = query ? `https://dummyjson.com/products/search?q=${query}` : `https://dummyjson.com/products`;
        const res = await fetch(endpoint);
        if (!res.ok) {
            throw new Error(`Error: ${res.status}`);
        }
        const result = await res.json();
        console.log(result);
        
        displayProducts(result.products); 
    } catch (error) {
        console.error("Failed to fetch data:", error);
    }
}

// Display products in the output section
function displayProducts(products) {
    output.innerHTML = ""; 
    if (products.length === 0) {
        output.textContent = "No products found.";
        return;
    }
    
    products.forEach(product => {
        const productItem = document.createElement("div");
        productItem.classList.add("product-item");

        const productTitle = document.createElement("h3");
        productTitle.textContent = product.title;
        
        const productImage = document.createElement("img");
        productImage.src = product.thumbnail;
        productImage.alt = product.title;
        productImage.classList.add("product-image");

        const addToCartBtn = document.createElement("button");
        addToCartBtn.textContent = "Add to Cart";
        addToCartBtn.classList.add("add-to-cart-btn");
        addToCartBtn.addEventListener("click", () => addToCart(product)); // Add to cart on click

        productItem.appendChild(productImage);
        productItem.appendChild(productTitle);
        productItem.appendChild(addToCartBtn);
        output.appendChild(productItem);
    });
}

// Add selected product to the cart
function addToCart(product) {
    cart.push(product);
    console.log(`Added to cart: ${product.title}`);
    updateCart(); // Update cart display after adding
}

// Remove a product from the cart
function removeFromCart(index) {
    cart.splice(index, 1); // Remove item from cart array
    updateCart(); // Update cart display after removing
}

// Update cart display
function updateCart() {
    cartOutput.innerHTML = ""; // Clear existing cart items
    cart.forEach((item, index) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        const cartTitle = document.createElement("h3");
        cartTitle.textContent = item.title;

        const cartImage = document.createElement("img");
        cartImage.src = item.thumbnail;
        cartImage.alt = item.title;
        cartImage.classList.add("product-image");

        const removeFromCartBtn = document.createElement("button");
        removeFromCartBtn.textContent = "Remove";
        removeFromCartBtn.classList.add("remove-from-cart-btn");
        removeFromCartBtn.addEventListener("click", () => removeFromCart(index)); // Remove from cart on click

        cartItem.appendChild(cartImage);
        cartItem.appendChild(cartTitle);
        cartItem.appendChild(removeFromCartBtn);
        cartOutput.appendChild(cartItem);
    });
}

// Debounce function to limit the rate of API calls
function debounceFetch(query) {
    clearTimeout(timeoutId); 
    timeoutId = setTimeout(() => fetchData(query), 300); 
}

// Event listener for the search input
searchInput.addEventListener("input", (e) => {
    const query = e.target.value.trim(); 
    if (query) {
        debounceFetch(query);
    } else {
        fetchData(); // Fetch all products if the search input is cleared
    }
});

// Fetch all products by default when the page loads
fetchData();


// Select DOM Elements
const mobileMenuIcon = document.querySelector('.mobile-menu-icon');
const navMenu = document.querySelector('.nav-menu');
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');

// Responsive Navbar Toggle
mobileMenuIcon.addEventListener('click', () => {
    // Toggle display for the nav menu
    if (navMenu.style.display === 'block') {
        navMenu.style.display = 'none';
    } else {
        navMenu.style.display = 'block';
    }
});

// Login Button Click Handler
loginBtn.addEventListener('click', () => {
    alert('Login functionality is under development.');
});

// Signup Button Click Handler
signupBtn.addEventListener('click', () => {
    alert('Sign-up functionality is under development.');
});
