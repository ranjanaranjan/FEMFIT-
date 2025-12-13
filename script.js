// script.js

// 1. GLOBAL STATE
const products = JSON.parse(document.getElementById('product-data').textContent);
// Cart items now store an ID and a SIZE (which makes them unique)
let cart = []; 
let currentFilters = new Set(); 
let currentSearchTerm = ''; 
let currentSort = 'default'; 
const CURRENCY_SYMBOL = '₹'; 

// 2. DOM Elements
const categoryGrid = document.getElementById('category-grid'); 
const productListing = document.getElementById('product-listing'); 
const productDisplayArea = document.getElementById('product-display'); 
const categoryFiltersContainer = document.getElementById('category-filters');
const resetFiltersBtn = document.getElementById('reset-filters');
const searchInput = document.getElementById('search-input'); 
const cartCountSpan = document.getElementById('cart-count');
const cartTotalSpan = document.getElementById('cart-total');
const cartList = document.getElementById('cart-items');
const cartSummary = document.getElementById('cart-summary'); 
const cartToggleBtn = document.getElementById('cart-toggle-btn');
const cartCloseBtn = document.getElementById('cart-close-btn');
const filterToggleBtn = document.getElementById('filter-toggle-btn');
const filterSidebar = document.getElementById('filter-sidebar');
const backBtnContainer = document.getElementById('back-to-categories-container');
const backBtn = document.getElementById('back-to-categories-btn');
const sortControls = document.getElementById('sort-controls'); 
const sortBySelect = document.getElementById('sort-by');         
const checkoutConfirmation = document.getElementById('checkout-confirmation'); 

// CHECKOUT DOM ELEMENTS
const cartView = document.getElementById('cart-view');
const checkoutFormView = document.getElementById('checkout-form-view');
const proceedToInfoBtn = document.getElementById('proceed-to-info-btn'); 
const backToCartBtn = document.getElementById('back-to-cart-btn');
const shippingForm = document.getElementById('shipping-form');

// --- DEFINITION FOR ORGANIZED FILTER GROUPS ---
const categoryGroups = {
    "Kurtis": ["Cotton Kurti", "Silk Kurti", "Heavy Worked Kurti"],
    "Sarees": ["Cotton Sarees", "Silk Sarees", "Tissue Sarees", "Worked Sarees"],
    "Jeans": ["Baggy Jeans", "Skinny Fit Jeans", "Mom Fit Jeans"],
    "Skirts": ["Skirts"], 
    "Winter Wear": ["Winterwear"], 
    "Accessories": ["Accessories"],
    "Dresses": ["Dresses"]
};

// --- IMAGES FOR CATEGORY CARDS (Simplified for brevity in JS) ---
const categoryImages = {
    "Kurtis": "https://images.meesho.com/images/products/508308303/a6n3y_512.webp?width=512", 
    "Sarees": "https://www.devnaagri.com/cdn/shop/files/CelebWebsite2292.jpg?v=1751947543", 
    "Jeans": "https://www.only.in/cdn/shop/files/900742401_g0.jpg?v=1745910181&width=2048", 
    "Skirts": "https://assets.myntassets.com/w_412,q_30,dpr_3,fl_progressive,f_webp/assets/images/24865792/2023/10/4/2f7f7251-0d0b-4cb5-b0ce-19acbe3f57771696415933351-Anayna-Women-Printed-A-Line-Flared-Cotton-Maxi-Skirt-3831696-7.jpg", 
    "Winter Wear": "https://i.pinimg.com/564x/a1/16/d4/a116d40a67ba038bad52bbad20c49a76.jpg", 
    "Accessories": "https://cdn.shopify.com/s/files/1/0640/5167/5359/files/Stan_Mirror_Interlink_Choker_480x480.png?v=1715671789", 
    "Dresses": "https://www.ordinaree.com/cdn/shop/files/SV-20230723-0357_de076a15-0015-48c9-aa62-505fcbf62ee7.jpg?v=1756703329" 
};


// --- UTILITY FUNCTIONS ---

const formatCurrency = (price) => {
    return `${CURRENCY_SYMBOL}${price.toLocaleString('en-IN', {minimumFractionDigits: 0, maximumFractionDigits: 0})}`;
};

/**
 * Sorts the product array based on the currentSort value.
 */
const sortProducts = (productsArray) => {
    switch (currentSort) {
        case 'name-asc':
            return productsArray.sort((a, b) => a.name.localeCompare(b.name));
        case 'price-asc':
            return productsArray.sort((a, b) => a.price - b.price);
        case 'price-desc':
            return productsArray.sort((a, b) => b.price - a.price);
        case 'default':
        default:
            return productsArray.sort((a, b) => a.id - b.id); 
    }
};


// --- VIEW/NAVIGATION HANDLERS ---

const showCheckoutForm = () => {
    if (cart.length === 0) {
        alert('Your cart is empty. Please add items before checking out.');
        return;
    }
    cartView.style.display = 'none';
    checkoutFormView.style.display = 'block';
};

const showCartView = () => {
    cartView.style.display = 'block';
    checkoutFormView.style.display = 'none';
};

// Toggles the visibility of the filter sidebar
const toggleFilterVisibility = () => {
    filterSidebar.classList.toggle('visible');
    
    if (filterSidebar.classList.contains('visible')) {
        filterToggleBtn.innerHTML = '<span class="hamburger-icon">✖</span> Hide Filters';
    } else {
        filterToggleBtn.innerHTML = '<span class="hamburger-icon">☰</span> Filter Options';
    }
};

// Hides the filter if it's visible.
const hideFilterSidebar = () => {
    if (filterSidebar.classList.contains('visible')) {
        toggleFilterVisibility();
    }
};

// Toggles Cart visibility AND resets to the initial cart view
const toggleCartVisibility = () => {
    cartSummary.classList.toggle('visible');
    // Always reset to the cart list view when opening/closing
    showCartView(); 
    // Hide confirmation message when cart is toggled
    checkoutConfirmation.style.display = 'none'; 
};


// --- RENDERING FUNCTIONS ---

const renderCategoryGrid = () => {
    categoryGrid.innerHTML = '';
    productListing.innerHTML = '';
    categoryGrid.style.display = 'grid'; 
    productListing.style.display = 'none'; 
    backBtnContainer.style.display = 'none'; 
    sortControls.style.display = 'none';     
    checkoutConfirmation.style.display = 'none'; 
    
    // Reset state
    currentFilters.clear();
    searchInput.value = '';
    currentSearchTerm = '';
    currentSort = 'default';                 
    sortBySelect.value = 'default';          
    renderFilters(); 
    
    for (const groupName in categoryImages) {
        const imageURL = categoryImages[groupName];
        
        let offerOverlay = '';
        if (groupName === "Winter Wear") {
            offerOverlay = '<div class="winter-offer-text">50% OFF WINTER SALE!</div>';
        }

        const cardHTML = `
            <div class="category-card" data-group="${groupName}">
                ${offerOverlay}
                <img src="${imageURL}" alt="${groupName} Collection" loading="lazy">
                <div class="category-title">${groupName}</div>
            </div>
        `;
        categoryGrid.insertAdjacentHTML('beforeend', cardHTML);
    }
};

const renderProductListing = () => {
    categoryGrid.innerHTML = '';
    productListing.innerHTML = '';
    categoryGrid.style.display = 'none'; 
    productListing.style.display = 'grid'; 
    backBtnContainer.style.display = 'block'; 
    sortControls.style.display = 'flex';     
    checkoutConfirmation.style.display = 'none'; 

    const term = currentSearchTerm.toLowerCase();
    
    // 1. Filter products
    let filteredProducts = products.filter(product => {
        const passesSearchFilter = !term || 
                                   product.name.toLowerCase().includes(term) ||
                                   product.description.toLowerCase().includes(term);
        
        const passesCategoryFilter = (currentFilters.size === 0) || currentFilters.has(product.category);

        return passesSearchFilter && passesCategoryFilter;
    });

    // 2. Sort products
    filteredProducts = sortProducts([...filteredProducts]);


    if (filteredProducts.length === 0) {
        productListing.innerHTML = '<p style="padding: 20px; text-align: center; color: var(--text-primary);">No products match your current filters or search term.</p>';
        return;
    }

    // 3. Render product cards
    filteredProducts.forEach(product => {
        // Build the size selector UI
        const sizeSelectorHTML = product.sizes.map(size => {
            const inputId = `size-${product.id}-${size}`;
            return `
                <input type="radio" name="size-${product.id}" id="${inputId}" class="size-radio" value="${size}">
                <label for="${inputId}" class="size-label">${size}</label>
            `;
        }).join('');
        
        
        let priceDisplay = `<span class="price-container">${formatCurrency(product.price)}</span>`;
        let saleBadge = '';

        if (product.is_on_sale) {
            priceDisplay = `
                <span class="price-container">
                    <span class="original-price">${formatCurrency(product.original_price)}</span>
                    <span class="sale-price">${formatCurrency(product.price)}</span>
                </span>
            `;
            saleBadge = '<div class="sale-badge">SALE</div>';
        }

        const productHTML = `
            <div class="product-card" data-id="${product.id}" data-category="${product.category}">
                ${saleBadge}
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                <h4>${product.name}</h4>
                ${priceDisplay}
                
                <div class="size-options">
                    <div class="size-selector" data-product-id="${product.id}">
                        ${sizeSelectorHTML}
                    </div>
                </div>
                
                <button class="add-btn" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        productListing.insertAdjacentHTML('beforeend', productHTML);
    });
};

const renderFilters = () => {
    categoryFiltersContainer.innerHTML = ''; 

    for (const groupName in categoryGroups) {
        const subCategories = categoryGroups[groupName];
        
        const groupHeader = document.createElement('h4');
        groupHeader.textContent = groupName;
        groupHeader.style.marginTop = '15px';
        groupHeader.style.cursor = 'pointer';
        groupHeader.dataset.group = groupName; 
        groupHeader.classList.add('filter-group-header'); 
        categoryFiltersContainer.appendChild(groupHeader);
        
        subCategories.forEach(category => {
            const hasProducts = products.some(p => p.category === category);
            
            if (hasProducts) {
                const checkboxId = `filter-${category.replace(/\s/g, '-')}`;
                const isChecked = currentFilters.has(category) ? 'checked' : '';
                
                const filterHTML = `
                    <label style="display: block; margin-bottom: 5px; font-size: 0.95em;">
                        <input type="checkbox" id="${checkboxId}" data-category="${category}" data-group="${groupName}" ${isChecked}>
                        ${category}
                    </label>
                `;
                categoryFiltersContainer.insertAdjacentHTML('beforeend', filterHTML);
            }
        });
    }
};

// Renders the cart UI, including the new quantity controls
const updateCartUI = () => {
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    cartCountSpan.textContent = totalItems;
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    cartTotalSpan.textContent = formatCurrency(totalPrice);
    
    cartList.innerHTML = '';
    if (cart.length === 0) {
        cartList.innerHTML = '<li style="color: var(--secondary-text);">Your cart is empty.</li>';
        proceedToInfoBtn.disabled = true; // Disable checkout button if cart is empty
        proceedToInfoBtn.style.opacity = 0.6;
    } else {
        proceedToInfoBtn.disabled = false;
        proceedToInfoBtn.style.opacity = 1;
        cart.forEach(item => {
            const itemTotal = item.price * item.qty;
            // Key update: Display size in cart and add size data attribute to buttons
            const itemHTML = `
                <li data-id="${item.id}" data-size="${item.size}">
                    <div class="cart-item-details">
                        <span class="item-name">${item.name}</span>
                        <span class="item-size">Size: ${item.size}</span>
                    </div>
                    <div class="cart-qty-controls">
                        <button class="qty-btn qty-decrease" data-id="${item.id}" data-size="${item.size}">-</button>
                        <span class="qty-display">${item.qty}</span>
                        <button class="qty-btn qty-increase" data-id="${item.id}" data-size="${item.size}">+</button>
                        <span style="min-width: 80px; text-align: right;">${formatCurrency(itemTotal)}</span>
                    </div>
                </li>
            `;
            cartList.insertAdjacentHTML('beforeend', itemHTML);
        });
    }
};


// --- HANDLER FUNCTIONS ---

const handleSortChange = (e) => {
    currentSort = e.target.value;
    renderProductListing();
};

const handleCategoryCardClick = (e) => {
    const card = e.target.closest('.category-card');
    if (!card) return;

    const groupName = card.dataset.group;
    const subCategories = categoryGroups[groupName];
    
    currentFilters.clear();
    subCategories.forEach(cat => currentFilters.add(cat));
    
    renderProductListing();
    renderFilters(); 
    hideFilterSidebar();
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

const handleSearchInput = (e) => {
    currentSearchTerm = e.target.value;
    if (currentSearchTerm !== '' || currentFilters.size > 0) {
        renderProductListing(); 
    } else {
        renderCategoryGrid();
    }
};

const handleFilterChange = (e) => {
    if (e.target.type !== 'checkbox') return;

    const category = e.target.dataset.category;

    if (e.target.checked) {
        currentFilters.add(category); 
    } else {
        currentFilters.delete(category);
    }
    
    renderFilters(); 
    if (currentFilters.size === 0 && currentSearchTerm === '') {
        renderCategoryGrid();
    } else {
        renderProductListing(); 
    }
};

const handleResetFilters = () => {
    renderCategoryGrid();
    hideFilterSidebar();
};

const handleGroupHeaderClick = (e) => {
    if (!e.target.classList.contains('filter-group-header')) return;

    const groupName = e.target.dataset.group;
    const subCategories = categoryGroups[groupName];
    
    const areAllActive = subCategories.every(cat => currentFilters.has(cat));
    
    if (areAllActive) {
        subCategories.forEach(cat => currentFilters.delete(cat));
    } else {
        subCategories.forEach(cat => currentFilters.add(cat));
    }
    
    renderFilters(); 
    if (currentFilters.size > 0 || currentSearchTerm !== '') {
        renderProductListing();
    } else {
        renderCategoryGrid();
    }
};

// --- CART FUNCTIONS ---

/**
 * Finds item in cart using both ID and Size
 */
const findCartItem = (productId, size) => {
    return cart.find(item => item.id == productId && item.size === size);
};

/**
 * Changes the quantity of an item in the cart, identified by ID and size.
 * @param {number} productId - The ID of the product.
 * @param {string} size - The selected size.
 * @param {number} change - +1 for increment, -1 for decrement.
 */
const changeItemQuantity = (productId, size, change) => {
    const itemIndex = cart.findIndex(item => item.id == productId && item.size === size);
    
    if (itemIndex > -1) {
        cart[itemIndex].qty += change;
        
        if (cart[itemIndex].qty <= 0) {
            // Remove item if quantity hits zero
            cart.splice(itemIndex, 1);
        }
    }
    updateCartUI();
};

/**
 * Handles adding an item, checking for selected size first.
 * @param {number} productId - The ID of the product.
 * @param {HTMLElement} productCard - The containing product card element.
 */
const handleAddToCart = (productId, productCard) => {
    // 1. Get selected size
    const selectedSizeRadio = productCard.querySelector(`input[name="size-${productId}"]:checked`);
    
    if (!selectedSizeRadio) {
        alert('Please select a size before adding to cart.');
        return;
    }
    
    const selectedSize = selectedSizeRadio.value;
    
    // 2. Find product details
    const productToAdd = products.find(p => p.id == productId);
    
    // 3. Check if this specific ID + SIZE combination already exists
    const existingItem = findCartItem(productId, selectedSize);

    if (existingItem) {
        existingItem.qty += 1;
    } else {
        const cartItem = { 
            id: productToAdd.id, 
            name: productToAdd.name, 
            price: productToAdd.price, 
            qty: 1,
            size: selectedSize // Store the size!
        };
        cart.push(cartItem);
    }
    updateCartUI();
};


/**
 * Handles form submission for the final order completion.
 */
const handleOrderCompletion = (e) => {
    e.preventDefault(); 
    
    const finalTotal = cartTotalSpan.textContent;
    const paymentMethod = document.getElementById('payment').value;
    const shippingAddress = document.getElementById('address').value;
    const customerName = document.getElementById('name').value;
    
    // 1. Hide the cart/checkout form
    cartSummary.classList.remove('visible');
    showCartView(); 
    
    // 2. Display the confirmation message on the main page
    checkoutConfirmation.innerHTML = `
        <h3>🎉 Order Successful!</h3>
        <p>Thank thank you, **${customerName}**! Your order totaling <strong>${finalTotal}</strong> has been placed.</p>
        <p>Shipping to: ${shippingAddress} | Payment via: ${paymentMethod === 'cod' ? 'Cash on Delivery' : 'Card'}.</p>
        <p>We have sent a confirmation email with tracking details. You can continue shopping below.</p>
    `;
    checkoutConfirmation.style.display = 'block';
    
    // 3. Clear the cart data and form
    cart = [];
    updateCartUI();
    shippingForm.reset();
    
    // 4. Scroll to the confirmation message
    window.scrollTo({ top: 0, behavior: 'smooth' });
};


// --- INITIALIZATION & EVENT LISTENERS ---

document.addEventListener('DOMContentLoaded', () => {
    renderCategoryGrid(); 
    updateCartUI();

    // Attach listeners
    categoryGrid.addEventListener('click', handleCategoryCardClick);
    filterToggleBtn.addEventListener('click', toggleFilterVisibility); 
    
    // Reset/Back buttons
    resetFiltersBtn.addEventListener('click', handleResetFilters);
    backBtn.addEventListener('click', handleResetFilters); 
    
    // Listener for sorting
    sortBySelect.addEventListener('change', handleSortChange);

    searchInput.addEventListener('input', handleSearchInput);
    categoryFiltersContainer.addEventListener('change', handleFilterChange);
    categoryFiltersContainer.addEventListener('click', handleGroupHeaderClick);

    // Event delegation for the Add to Cart button on the product listing (UPDATED)
    productListing.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-btn')) {
            const productId = e.target.dataset.id;
            const productCard = e.target.closest('.product-card');
            handleAddToCart(productId, productCard);
        }
    });

    // Cart visibility listeners
    cartToggleBtn.addEventListener('click', toggleCartVisibility);
    cartCloseBtn.addEventListener('click', toggleCartVisibility);
    
    // Checkout Navigation Handlers
    proceedToInfoBtn.addEventListener('click', showCheckoutForm);
    backToCartBtn.addEventListener('click', showCartView);
    shippingForm.addEventListener('submit', handleOrderCompletion);
    
    // Event delegation for Cart Quantity Controls (UPDATED to use size attribute)
    cartList.addEventListener('click', (e) => {
        const target = e.target;
        if (target.classList.contains('qty-decrease') || target.classList.contains('qty-increase')) {
            const productId = target.dataset.id;
            const size = target.dataset.size; // Get size from data attribute
            const change = target.classList.contains('qty-increase') ? 1 : -1;
            changeItemQuantity(productId, size, change);
        }
    });
});