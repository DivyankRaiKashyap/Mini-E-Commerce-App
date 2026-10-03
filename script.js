// ==========================================
// OM STORE
// MINI E-COMMERCE APP
// ==========================================


// ==========================================
// PRODUCT DATA
// ==========================================

const products = [

    {
        id: 1,
        name: "Wireless Headphones",
        category: "electronics",
        price: 2499,
        icon: "🎧",
        description: "High-quality wireless headphones with clear sound."
    },

    {
        id: 2,
        name: "Smart Watch",
        category: "electronics",
        price: 3999,
        icon: "⌚",
        description: "Smart watch with fitness and health tracking."
    },

    {
        id: 3,
        name: "Laptop Backpack",
        category: "accessories",
        price: 1499,
        icon: "🎒",
        description: "Durable backpack designed for laptops and travel."
    },

    {
        id: 4,
        name: "Running Shoes",
        category: "fashion",
        price: 2999,
        icon: "👟",
        description: "Comfortable running shoes for everyday activities."
    },

    {
        id: 5,
        name: "Classic T-Shirt",
        category: "fashion",
        price: 799,
        icon: "👕",
        description: "Soft and comfortable cotton t-shirt."
    },

    {
        id: 6,
        name: "Sunglasses",
        category: "accessories",
        price: 1199,
        icon: "🕶️",
        description: "Stylish sunglasses with UV protection."
    },

    {
        id: 7,
        name: "Mechanical Keyboard",
        category: "electronics",
        price: 3499,
        icon: "⌨️",
        description: "Mechanical keyboard designed for work and gaming."
    },

    {
        id: 8,
        name: "Travel Bottle",
        category: "accessories",
        price: 699,
        icon: "🥤",
        description: "Reusable stainless steel travel bottle."
    }

];


// ==========================================
// CART
// ==========================================

let cart = [];


// ==========================================
// HTML ELEMENTS
// ==========================================

const productsContainer =
    document.getElementById("productsContainer");

const cartItems =
    document.getElementById("cartItems");

const cartCount =
    document.getElementById("cartCount");

const cartTotal =
    document.getElementById("cartTotal");

const cartButton =
    document.getElementById("cartButton");

const cartSidebar =
    document.getElementById("cartSidebar");

const cartOverlay =
    document.getElementById("cartOverlay");

const closeCart =
    document.getElementById("closeCart");

const searchInput =
    document.getElementById("searchInput");

const categoryFilter =
    document.getElementById("categoryFilter");

const checkoutButton =
    document.getElementById("checkoutButton");

const checkoutModal =
    document.getElementById("checkoutModal");

const closeModal =
    document.getElementById("closeModal");

const checkoutItems =
    document.getElementById("checkoutItems");

const checkoutItemCount =
    document.getElementById("checkoutItemCount");

const checkoutTotal =
    document.getElementById("checkoutTotal");

const placeOrderButton =
    document.getElementById("placeOrderButton");

const successMessage =
    document.getElementById("successMessage");

const continueShopping =
    document.getElementById("continueShopping");


// ==========================================
// FORMAT PRICE
// ==========================================

function formatPrice(price) {

    return "₹" +
        price.toLocaleString("en-IN");

}


// ==========================================
// DISPLAY PRODUCTS
// ==========================================

function displayProducts(productList) {

    productsContainer.innerHTML = "";


    if (productList.length === 0) {

        productsContainer.innerHTML = `
            <div class="no-products">
                <h3>No products found</h3>
                <p>Try another search.</p>
            </div>
        `;

        return;
    }


    productList.forEach(function (product) {

        const card =
            document.createElement("div");


        card.className =
            "product-card";


        card.innerHTML = `

            <div class="product-image">
                ${product.icon}
            </div>

            <div class="product-info">

                <span class="product-category">
                    ${product.category}
                </span>

                <h3>
                    ${product.name}
                </h3>

                <p class="product-description">
                    ${product.description}
                </p>

                <div class="product-bottom">

                    <span class="product-price">
                        ${formatPrice(product.price)}
                    </span>

                    <button
                        class="add-button"
                        onclick="addToCart(${product.id})"
                    >
                        Add to Cart
                    </button>

                </div>

            </div>

        `;


        productsContainer.appendChild(card);

    });

}


// ==========================================
// ADD TO CART
// ==========================================

function addToCart(productId) {

    const product =
        products.find(
            function (item) {
                return item.id === productId;
            }
        );


    if (!product) {
        return;
    }


    const existingItem =
        cart.find(
            function (item) {
                return item.id === productId;
            }
        );


    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({

            ...product,

            quantity: 1

        });

    }


    updateCart();

    openCart();

}


// ==========================================
// UPDATE CART
// ==========================================

function updateCart() {

    displayCartItems();

    updateCartCount();

    updateCartTotal();

}


// ==========================================
// DISPLAY CART ITEMS
// ==========================================

function displayCartItems() {

    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                <h3>Your cart is empty</h3>
                <p>Add some products to continue.</p>
            </div>
        `;

        return;
    }


    cart.forEach(function (item) {

        const cartItem =
            document.createElement("div");


        cartItem.className =
            "cart-item";


        cartItem.innerHTML = `

            <div class="cart-item-icon">
                ${item.icon}
            </div>

            <div class="cart-item-info">

                <h4>
                    ${item.name}
                </h4>

                <div class="cart-item-price">
                    ${formatPrice(
                        item.price * item.quantity
                    )}
                </div>

                <div class="quantity-controls">

                    <button
                        onclick="decreaseQuantity(${item.id})"
                    >
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="increaseQuantity(${item.id})"
                    >
                        +
                    </button>

                    <button
                        class="remove-button"
                        onclick="removeFromCart(${item.id})"
                    >
                        🗑
                    </button>

                </div>

            </div>

        `;


        cartItems.appendChild(cartItem);

    });

}


// ==========================================
// INCREASE QUANTITY
// ==========================================

function increaseQuantity(productId) {

    const item =
        cart.find(
            function (product) {
                return product.id === productId;
            }
        );


    if (item) {

        item.quantity++;

    }


    updateCart();

}


// ==========================================
// DECREASE QUANTITY
// ==========================================

function decreaseQuantity(productId) {

    const item =
        cart.find(
            function (product) {
                return product.id === productId;
            }
        );


    if (!item) {
        return;
    }


    item.quantity--;


    if (item.quantity <= 0) {

        cart =
            cart.filter(
                function (product) {
                    return product.id !== productId;
                }
            );

    }


    updateCart();

}


// ==========================================
// REMOVE FROM CART
// ==========================================

function removeFromCart(productId) {

    cart =
        cart.filter(
            function (product) {
                return product.id !== productId;
            }
        );


    updateCart();

}


// ==========================================
// CART COUNT
// ==========================================

function updateCartCount() {

    const totalItems =
        cart.reduce(
            function (total, item) {

                return total + item.quantity;

            },
            0
        );


    cartCount.textContent =
        totalItems;

}


// ==========================================
// CART TOTAL
// ==========================================

function updateCartTotal() {

    const total =
        cart.reduce(
            function (sum, item) {

                return sum +
                    item.price *
                    item.quantity;

            },
            0
        );


    cartTotal.textContent =
        formatPrice(total);

}


// ==========================================
// OPEN CART
// ==========================================

function openCart() {

    cartSidebar.classList.add("open");

    cartOverlay.classList.add("open");

}


// ==========================================
// CLOSE CART
// ==========================================

function closeCartSidebar() {

    cartSidebar.classList.remove("open");

    cartOverlay.classList.remove("open");

}


// ==========================================
// CART EVENTS
// ==========================================

cartButton.addEventListener(
    "click",
    openCart
);


closeCart.addEventListener(
    "click",
    closeCartSidebar
);


cartOverlay.addEventListener(
    "click",
    closeCartSidebar
);


// ==========================================
// SEARCH PRODUCTS
// ==========================================

function filterProducts() {

    const searchText =
        searchInput.value
        .toLowerCase()
        .trim();


    const selectedCategory =
        categoryFilter.value;


    const filteredProducts =
        products.filter(
            function (product) {

                const matchesSearch =
                    product.name
                    .toLowerCase()
                    .includes(searchText);


                const matchesCategory =
                    selectedCategory === "all" ||
                    product.category ===
                    selectedCategory;


                return (
                    matchesSearch &&
                    matchesCategory
                );

            }
        );


    displayProducts(filteredProducts);

}


searchInput.addEventListener(
    "input",
    filterProducts
);


categoryFilter.addEventListener(
    "change",
    filterProducts
);


// ==========================================
// OPEN CHECKOUT
// ==========================================

checkoutButton.addEventListener(
    "click",
    openCheckout
);


function openCheckout() {

    if (cart.length === 0) {

        alert(
            "Your cart is empty. Add a product first."
        );

        return;
    }


    checkoutItems.innerHTML = "";


    cart.forEach(function (item) {

        const checkoutItem =
            document.createElement("div");


        checkoutItem.className =
            "checkout-item";


        checkoutItem.innerHTML = `

            <span>
                ${item.name}
                × ${item.quantity}
            </span>

            <strong>
                ${formatPrice(
                    item.price *
                    item.quantity
                )}
            </strong>

        `;


        checkoutItems.appendChild(
            checkoutItem
        );

    });


    const totalItems =
        cart.reduce(
            function (total, item) {

                return total +
                    item.quantity;

            },
            0
        );


    const totalPrice =
        cart.reduce(
            function (total, item) {

                return total +
                    item.price *
                    item.quantity;

            },
            0
        );


    checkoutItemCount.textContent =
        totalItems;


    checkoutTotal.textContent =
        formatPrice(totalPrice);


    checkoutModal.classList.add("open");

}


// ==========================================
// CLOSE CHECKOUT MODAL
// ==========================================

closeModal.addEventListener(
    "click",
    function () {

        checkoutModal.classList.remove("open");

    }
);


// ==========================================
// PLACE ORDER
// ==========================================

placeOrderButton.addEventListener(
    "click",
    function () {

        checkoutModal.classList.remove(
            "open"
        );


        closeCartSidebar();


        successMessage.classList.add(
            "open"
        );


        cart = [];


        updateCart();

    }
);


// ==========================================
// CONTINUE SHOPPING
// ==========================================

continueShopping.addEventListener(
    "click",
    function () {

        successMessage.classList.remove(
            "open"
        );


        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


// ==========================================
// CLOSE MODAL WHEN CLICKING OUTSIDE
// ==========================================

checkoutModal.addEventListener(
    "click",
    function (event) {

        if (
            event.target ===
            checkoutModal
        ) {

            checkoutModal.classList.remove(
                "open"
            );

        }

    }
);


// ==========================================
// INITIAL DISPLAY
// ==========================================

displayProducts(products);

updateCart();