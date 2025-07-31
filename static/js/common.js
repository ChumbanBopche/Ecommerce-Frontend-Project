// common.js - Utility functions for cart and wishlist management

// --- Cart Functions ---

// Get cart from localStorage
function getCart() {
    const cart = localStorage.getItem('myStoreCart');
    return cart ? JSON.parse(cart) : [];
}

// Save cart to localStorage
function saveCart(cart) {
    localStorage.setItem('myStoreCart', JSON.stringify(cart));
}

// Update the cart count display in the header
function updateCartCountDisplay() {
    const cart = getCart();
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountSpan = document.getElementById('header-cart-count');
    if (cartCountSpan) {
        cartCountSpan.textContent = totalItems;
    }
}

// Add item to cart function
function addToCart(productId, quantity = 1, selectedOptions = {}) {
    const cart = getCart();
    const product = productsData.find(p => p.id === productId);

    if (!product) {
        console.error('Product not found for ID:', productId);
        return;
    }

    const optionString = Object.keys(selectedOptions).sort().map(key => `${key}:${selectedOptions[key]}`).join('_');
    const cartItemId = `${productId}_${optionString}`;

    const existingItemIndex = cart.findIndex(item => item.cartItemId === cartItemId);

    if (existingItemIndex > -1) {
        cart[existingItemIndex].quantity += quantity;
    } else {
        const cartItem = {
            cartItemId: cartItemId,
            id: product.id,
            name: product.name,
            image: product.mainImage,
            price: parseFloat(product.currentPrice.replace('₹', '').replace(/,/g, '')),
            quantity: quantity,
            selectedOptions: selectedOptions
        };
        cart.push(cartItem);
    }

    saveCart(cart);
    updateCartCountDisplay();
    console.log('Item added to cart:', product.name, 'Current Cart:', cart);
    // alert(`${product.name} added to cart! Total items: ${cart.reduce((sum, item) => sum + item.quantity, 0)}`);
}

// Function to calculate and update cart totals and manage empty state visibility
function updateCartTotals() {
    const cart = getCart();
    let totalItems = 0;
    let totalPrice = 0;

    cart.forEach(item => {
        totalItems += item.quantity;
        totalPrice += item.price * item.quantity;
    });

    const mobileItemCountSpan = document.getElementById('mobile-item-count');
    const mobileTotalAmountSpan = document.getElementById('mobile-total-amount');
    if (mobileItemCountSpan) mobileItemCountSpan.textContent = totalItems;
    if (mobileTotalAmountSpan) mobileTotalAmountSpan.textContent = `₹ ${totalPrice.toLocaleString('en-IN')}`;

    const desktopItemCountSpan = document.getElementById('desktop-item-count');
    const desktopTotalAmountSpan = document.getElementById('desktop-total-amount');
    if (desktopItemCountSpan) desktopItemCountSpan.textContent = totalItems;
    if (desktopTotalAmountSpan) desktopTotalAmountSpan.textContent = `₹ ${totalPrice.toLocaleString('en-IN')}`;

    const emptyCartState = document.getElementById('empty-cart-state');
    const cartContentWrapper = document.querySelector('.cart-content-wrapper');
    const cartSummaryCard = document.querySelector('.cart-summary-card');

    if (totalItems === 0) {
        if (emptyCartState) emptyCartState.style.display = 'flex';
        if (cartContentWrapper) cartContentWrapper.style.display = 'none';
        if (cartSummaryCard) cartSummaryCard.style.display = 'none';
    } else {
        if (emptyCartState) emptyCartState.style.display = 'none';
        if (cartContentWrapper) cartContentWrapper.style.display = 'block';
        if (cartSummaryCard) cartSummaryCard.style.display = 'block';
    }
}

// Function to render cart items dynamically
function renderCartItems() {
    const cart = getCart();
    const cartItemsContainer = document.getElementById('cart-items-container');
    if (!cartItemsContainer) {
        // This function is intended for cart.html, so it's okay if container isn't found on other pages
        return;
    }
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        updateCartTotals();
        return;
    }

    cart.forEach(item => {
        const itemHtml = `
            <div class="cart-item" data-cart-item-id="${item.cartItemId}">
                <div class="item-image">
                    <a href="product_detail.html?id=${item.id}"><img src="${item.image}" alt="${item.name}"></a>
                </div>
                <div class="item-details">
                    <h2 class="item-title"><a href="product_detail.html?id=${item.id}">${item.name}</a></h2>
                    <p class="item-options">${formatOptions(item.selectedOptions)}</p>
                    <p class="item-price">₹ ${item.price.toLocaleString('en-IN')}</p>
                    <p class="item-stock in-stock">In Stock</p>
                    <div class="quantity-control">
                        <button class="qty-btn minus-btn" data-cart-item-id="${item.cartItemId}" aria-label="Decrease quantity">-</button>
                        <input type="number" value="${item.quantity}" min="1" class="item-quantity-input" data-cart-item-id="${item.cartItemId}">
                        <button class="qty-btn plus-btn" data-cart-item-id="${item.cartItemId}" aria-label="Increase quantity">+</button>
                    </div>
                    <span class="action-divider">|</span>
                    <button class="remove-item-btn" data-cart-item-id="${item.cartItemId}"><i class="fas fa-trash-alt"></i> Remove</button>
                    <span class="action-divider">|</span>
                    <button class="save-for-later-btn" data-product-id="${item.id}" data-selected-options='${JSON.stringify(item.selectedOptions)}'><i class="fas fa-bookmark"></i> Save for Later</button>
                </div>
                <div class="item-subtotal">
                    <span class="subtotal-label">Item Subtotal:</span>
                    <span class="subtotal-amount">₹ ${(item.price * item.quantity).toLocaleString('en-IN')}</span>
                </div>
            </div>
        `;
        cartItemsContainer.insertAdjacentHTML('beforeend', itemHtml);
    });

    attachCartEventListeners();
    updateCartTotals();
}

// Helper function to format options for display
function formatOptions(options) {
    if (Object.keys(options).length === 0) {
        return '';
    }
    const formatted = Object.keys(options).map(key => {
        const readableKey = key.charAt(0).toUpperCase() + key.slice(1);
        return `${readableKey}: ${options[key]}`;
    });
    return `Options: ${formatted.join(', ')}`;
}

// Function to attach event listeners to cart item buttons
function attachCartEventListeners() {
    document.querySelectorAll('.qty-btn.minus-btn').forEach(button => {
        button.removeEventListener('click', handleQuantityChange);
        button.addEventListener('click', handleQuantityChange);
    });
    document.querySelectorAll('.qty-btn.plus-btn').forEach(button => {
        button.removeEventListener('click', handleQuantityChange);
        button.addEventListener('click', handleQuantityChange);
    });
    document.querySelectorAll('.item-quantity-input').forEach(input => {
        input.removeEventListener('change', handleQuantityChange);
        input.addEventListener('change', handleQuantityChange);
    });

    document.querySelectorAll('.remove-item-btn').forEach(button => {
        button.removeEventListener('click', handleRemoveItem);
        button.addEventListener('click', handleRemoveItem);
    });

    // Add event listener for "Save for Later" button in cart
    document.querySelectorAll('.save-for-later-btn').forEach(button => {
        button.removeEventListener('click', handleSaveForLater);
        button.addEventListener('click', handleSaveForLater);
    });
}

// Handler for quantity change
function handleQuantityChange(event) {
    const target = event.target;
    const cartItemDiv = target.closest('.cart-item');
    if (!cartItemDiv) return;

    const cartItemId = cartItemDiv.dataset.cartItemId;
    const inputElement = cartItemDiv.querySelector('.item-quantity-input');
    let currentQuantity = parseInt(inputElement.value);

    if (target.classList.contains('plus-btn')) {
        currentQuantity++;
    } else if (target.classList.contains('minus-btn')) {
        currentQuantity--;
    } else if (event.type === 'change') {
        currentQuantity = parseInt(inputElement.value);
    }

    if (isNaN(currentQuantity) || currentQuantity < 1) {
        currentQuantity = 1;
    }

    updateCartItemQuantity(cartItemId, currentQuantity);
}

// Function to update item quantity in cart
function updateCartItemQuantity(cartItemId, newQuantity) {
    let cart = getCart();
    const itemIndex = cart.findIndex(item => item.cartItemId === cartItemId);

    if (itemIndex > -1) {
        cart[itemIndex].quantity = newQuantity;
        saveCart(cart);
        renderCartItems();
        updateCartCountDisplay();
    }
}

// Handler for removing an item from the cart
function handleRemoveItem(event) {
    const button = event.target.closest('.remove-item-btn');
    if (!button) return;

    const cartItemId = button.dataset.cartItemId;

    let cart = getCart();
    cart = cart.filter(item => item.cartItemId !== cartItemId);
    saveCart(cart);
    renderCartItems();
    updateCartCountDisplay();
}

// Handler for "Save for Later" from cart page
function handleSaveForLater(event) {
    const button = event.target.closest('.save-for-later-btn');
    if (!button) return;

    const productId = button.dataset.productId;
    const selectedOptions = JSON.parse(button.dataset.selectedOptions || '{}');

    addToWishlist(productId, selectedOptions); // Add to wishlist
    handleRemoveItem(event); // Remove from cart after saving for later
    alert('Item moved to Wishlist!'); // Provide feedback
}


// --- Wishlist Functions ---

// Get wishlist from localStorage
function getWishlist() {
    const wishlist = localStorage.getItem('myStoreWishlist');
    return wishlist ? JSON.parse(wishlist) : [];
}

// Save wishlist to localStorage
function saveWishlist(wishlist) {
    localStorage.setItem('myStoreWishlist', JSON.stringify(wishlist));
}

// Update the wishlist count display in the header
function updateWishlistCountDisplay() {
    const wishlist = getWishlist();
    const totalItems = wishlist.length; // Wishlist counts unique items, not quantities
    const wishlistCountSpan = document.getElementById('header-wishlist-count');
    if (wishlistCountSpan) {
        wishlistCountSpan.textContent = totalItems;
    }
}

// Add item to wishlist function
function addToWishlist(productId, selectedOptions = {}) {
    const wishlist = getWishlist();
    const product = productsData.find(p => p.id === productId);

    if (!product) {
        console.error('Product not found for ID:', productId);
        return;
    }

    const optionString = Object.keys(selectedOptions).sort().map(key => `${key}:${selectedOptions[key]}`).join('_');
    const wishlistItemId = `${productId}_${optionString}`;

    const existingItemIndex = wishlist.findIndex(item => item.wishlistItemId === wishlistItemId);

    if (existingItemIndex === -1) { // Only add if not already in wishlist
        const wishlistItem = {
            wishlistItemId: wishlistItemId, // Unique ID for this specific variant in wishlist
            id: product.id,
            name: product.name,
            image: product.mainImage,
            price: parseFloat(product.currentPrice.replace('₹', '').replace(/,/g, '')),
            selectedOptions: selectedOptions
        };
        wishlist.push(wishlistItem);
        saveWishlist(wishlist);
        updateWishlistCountDisplay();
        console.log('Item added to wishlist:', product.name, 'Current Wishlist:', wishlist);
        alert(`${product.name} added to Wishlist!`); // Provide feedback
    } else {
        alert(`${product.name} is already in your Wishlist.`);
    }
}

// Remove item from wishlist function
function removeFromWishlist(wishlistItemId) {
    let wishlist = getWishlist();
    wishlist = wishlist.filter(item => item.wishlistItemId !== wishlistItemId);
    saveWishlist(wishlist);
    renderWishlistItems(); // Re-render wishlist page
    updateWishlistCountDisplay();
    alert('Item removed from Wishlist.'); // Provide feedback
}

// Render wishlist items on the wishlist.html page
function renderWishlistItems() {
    const wishlist = getWishlist();
    const wishlistItemsContainer = document.getElementById('wishlist-items-container');
    if (!wishlistItemsContainer) {
        // This function is intended for wishlist.html
        return;
    }
    wishlistItemsContainer.innerHTML = ''; // Clear existing items

    const emptyWishlistState = document.getElementById('empty-wishlist-state');

    if (wishlist.length === 0) {
        if (emptyWishlistState) emptyWishlistState.style.display = 'flex';
        wishlistItemsContainer.style.display = 'none'; // Hide container if empty
        return;
    } else {
        if (emptyWishlistState) emptyWishlistState.style.display = 'none';
        wishlistItemsContainer.style.display = 'block'; // Show container if not empty
    }

    wishlist.forEach(item => {
        const itemHtml = `
            <div class="wishlist-item" data-wishlist-item-id="${item.wishlistItemId}">
                <div class="item-image">
                    <a href="product_detail.html?id=${item.id}"><img src="${item.image}" alt="${item.name}"></a>
                </div>
                <div class="item-details">
                    <h2 class="item-title"><a href="product_detail.html?id=${item.id}">${item.name}</a></h2>
                    <p class="item-options">${formatOptions(item.selectedOptions)}</p>
                    <p class="item-price">₹ ${item.price.toLocaleString('en-IN')}</p>
                    <p class="item-stock in-stock">In Stock</p>
                    <div class="wishlist-actions">
                        <button class="btn add-to-cart-from-wishlist-btn" data-product-id="${item.id}" data-selected-options='${JSON.stringify(item.selectedOptions)}'><i class="fas fa-shopping-cart"></i> Add to Cart</button>
                        <button class="btn remove-from-wishlist-btn" data-wishlist-item-id="${item.wishlistItemId}"><i class="fas fa-trash-alt"></i> Remove</button>
                    </div>
                </div>
            </div>
        `;
        wishlistItemsContainer.insertAdjacentHTML('beforeend', itemHtml);
    });

    // Attach event listeners for wishlist buttons
    document.querySelectorAll('.add-to-cart-from-wishlist-btn').forEach(button => {
        button.removeEventListener('click', handleAddToCartFromWishlist);
        button.addEventListener('click', handleAddToCartFromWishlist);
    });
    document.querySelectorAll('.remove-from-wishlist-btn').forEach(button => {
        button.removeEventListener('click', handleRemoveFromWishlist);
        button.addEventListener('click', handleRemoveFromWishlist);
    });
}

// Handler for adding item from wishlist to cart
    function handleAddToCartFromWishlist(event) {
        const button = event.target.closest('.add-to-cart-from-wishlist-btn');
        const productId = button.dataset.productId;
        const selectedOptions = JSON.parse(button.dataset.selectedOptions || '{}');
        
        addToCart(productId, 1, selectedOptions); // Add to cart with quantity 1
        alert('Item added to Cart!'); // Changed alert message slightly
    }

// Handler for removing item from wishlist
function handleRemoveFromWishlist(event) {
    const button = event.target.closest('.remove-from-wishlist-btn');
    const wishlistItemId = button.dataset.wishlistItemId;
    removeFromWishlist(wishlistItemId);
}

// Global DOMContentLoaded listener for all pages
document.addEventListener('DOMContentLoaded', () => {
    updateCartCountDisplay(); // Always update cart count in header
    updateWishlistCountDisplay(); // Always update wishlist count in header

    // Page-specific rendering
    if (window.location.pathname.includes('cart.html')) {
        renderCartItems();
    } else if (window.location.pathname.includes('wishlist.html')) {
        renderWishlistItems();
    }
    // No specific rendering needed for index.html or product_detail.html here
    // as their content is handled by their own inline scripts or initial HTML
});