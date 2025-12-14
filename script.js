// script.js

// Data for products and categories (Image paths are set to use the external URLs you provided)
const products = [
    // Updated product images using new external URLs
    { id: 1, name: "Aqua Embroidered Kurti", price: 1800, originalPrice: 2400, category: "Kurtis", group: "Festive", image: "https://snazzyhunt.com/cdn/shop/files/SH-AF-ST-MYR-3155-LAV.jpg?v=1691596650" }, // New URL for Kurti
    { id: 2, name: "Black Silk Saree", price: 4500, originalPrice: 5000, category: "Sarees", group: "Formal", image: "https://manishgharat.com/cdn/shop/files/1.jpg?v=1728562670" }, // New URL for Saree
    { id: 3, name: "Mustard Palazzo Set", price: 2900, originalPrice: null, category: "Suits", group: "Casual", image: "https://cdn.sapnaaz.com/uploads/2024/12/22173051/WINE-1-1.webp" }, // New URL for Suit
    { id: 4, name: "Men's Navy Quilted Jacket", price: 3500, originalPrice: 5900, category: "Jackets", group: "Winter Wear", sale: true, image: "https://images-cdn.ubuy.co.in/65b9c49f96e3d32eb82bfdac-womens-winter-jacket-warm-overcoat-slim.jpg" }, // New URL for Jacket
    { id: 5, name: "Pink Floral Lehenga", price: 7800, originalPrice: null, category: "Lehengas", group: "Festive", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-BBf2DWTk2zHQdeVU-f8E-btyWC97bGpdNQ&s" }, // New URL for Lehenga
    { id: 6, name: "Grey Sweater Dress", price: 1999, originalPrice: 3999, category: "Sweaters", group: "Winter Wear", sale: true, image: "https://images-cdn.ubuy.co.in/6938337402f822e0fc0e6f86-fasacco-gold-jewelry-set-trendy.jpg" }, // New URL for Sweater Dress
    { id: 7, name: "Denim Trousers", price: 1200, originalPrice: null, category: "Bottoms", group: "Casual", image: "https://www.ordinaree.com/cdn/shop/files/SV-20230723-0357_de076a15-0015-48c9-aa62-505fcbf62ee7.jpg?v=1756703329" }, // Using a spare URL for Trousers
    { id: 8, name: "Red Party Dress", price: 2100, originalPrice: 3200, category: "Dresses", group: "Formal", image: "https://cdn.shopify.com/s/files/1/0640/5167/5359/files/Stan_Mirror_Interlink_Choker_480x480.png?v=1715671789" } // Using a spare URL for Dress
];

const categories = [
    // Updated category images using new external URLs
    { name: "Kurtis", image: "https://images.meesho.com/images/products/508308303/a6n3y_512.webp?width=512", group: "Casual" },
    { name: "Sarees", image: "https://www.devnaagri.com/cdn/shop/files/CelebWebsite2292.jpg?v=1751947543", group: "Formal" },
    { name: "Suits", image: "https://www.only.in/cdn/shop/files/900742401_g0.jpg?v=1745910181&width=2048", group: "Festive" },
    { name: "Jackets", image: "https://assets.myntassets.com/w_412,q_30,dpr_3,fl_progressive,f_webp/assets/images/24865792/2023/10/4/2f7f7251-0d0b-4cb5-b0ce-19acbe3f57771696415933351-Anayna-Women-Printed-A-Line-Flared-Cotton-Maxi-Skirt-3831696-7.jpg", group: "Winter Wear" },
    { name: "Lehengas", image: "https://i.pinimg.com/564x/a1/16/d4/a116d40a67ba038bad52bbad20c49a76.jpg", group: "Festive" },
    { name: "Dresses", image: "https://www.ordinaree.com/cdn/shop/files/SV-20230723-0357_de076a15-0015-48c9-aa62-505fcbf62ee7.jpg?v=1756703329", group: "Formal" }
];

let cart = [];
let currentCategory = null;

// --- Initial Render Functions ---

function renderCategories() {
    const grid = document.getElementById('category-grid');
    grid.innerHTML = '';
    categories.forEach(cat => {
        const card = document.createElement('div');
        card.className = 'category-card';
        card.setAttribute('data-group', cat.group);
        card.onclick = () => showProductsByCategory(cat.name);
        
        let saleBadge = '';
        if (cat.group === "Winter Wear") {
            saleBadge = '<div class="winter-offer-text">Up to 50% OFF!</div>';
        }

        card.innerHTML = `
            ${saleBadge}
            <img src="${cat.image}" onerror="this.onerror=null;this.src='https://via.placeholder.com/300x400/CCCCCC/808080?text=Image+Missing'" alt="${cat.name}">
            <div class="category-title">${cat.name}</div>
        `;
        grid.appendChild(card);
    });
}

function renderProductListing(productList) {
    const listing = document.getElementById('product-listing');
    listing.innerHTML = '';
    
    if (productList.length === 0) {
        listing.innerHTML = '<p style="text-align: center; font-size: 1.2em; color: var(--secondary-text);">No products found matching your criteria.</p>';
        return;
    }

    productList.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        
        const priceHTML = product.originalPrice 
            ? `<span class="original-price">₹${product.originalPrice.toFixed(2)}</span> <span class="sale-price">₹${product.price.toFixed(2)}</span>`
            : `₹${product.price.toFixed(2)}`;

        const sizeOptionsHTML = generateSizeOptions(product.id);

        const saleBadge = product.sale ? '<span class="sale-badge">SALE</span>' : '';

        card.innerHTML = `
            ${saleBadge}
            <img src="${product.image}" onerror="this.onerror=null;this.src='https://via.placeholder.com/300x400/CCCCCC/808080?text=Image+Missing'" alt="${product.name}">
            <h3>${product.name}</h3>
            <div class="price-container">${priceHTML}</div>
            
            <div class="size-options">
                <p>Select Size:</p>
                <div class="size-selector">
                    ${sizeOptionsHTML}
                </div>
            </div>

            <button class="add-btn" onclick="addToCart(${product.id})">
                <i class="fas fa-cart-plus"></i> Add to Cart
            </button>
        `;
        listing.appendChild(card);
    });
}

function generateSizeOptions(productId) {
    const sizes = ['S', 'M', 'L', 'XL']; // Example fixed sizes
    return sizes.map(size => `
        <input type="radio" id="size-${productId}-${size}" name="size-${productId}" class="size-radio" value="${size}">
        <label for="size-${productId}-${size}" class="size-label">${size}</label>
    `).join('');
}


// --- View Switching and Navigation ---

function showProductsByCategory(categoryName) {
    currentCategory = categoryName;
    document.getElementById('category-grid').style.display = 'none';
    document.getElementById('product-listing').style.display = 'grid';
    
    // Clear the search bar when switching from category view
    document.getElementById('search-input').value = ''; 
    
    // Set category filter state (uncheck all, then check the selected one)
    const categoryInputs = document.querySelectorAll('#category-filter input[type="checkbox"]');
    categoryInputs.forEach(input => {
        input.checked = false;
        if (input.value === categoryName) {
            input.checked = true;
        }
    });

    applyFilters();
}

function showCategoryView() {
    currentCategory = null;
    document.getElementById('product-listing').style.display = 'none';
    document.getElementById('category-grid').style.display = 'grid';
    // Reset filters on returning to category view
    resetFilters();
    renderProductListing(products); // Render all products in the background
}

// --- Filtering and Sorting ---

function populateCategoryFilter() {
    const filterDiv = document.getElementById('category-filter');
    filterDiv.innerHTML = '';
    const uniqueCategories = [...new Set(products.map(p => p.category))].sort();

    uniqueCategories.forEach(cat => {
        filterDiv.innerHTML += `
            <label><input type="checkbox" name="filter-category" value="${cat}"> ${cat}</label><br>
        `;
    });
}

function updatePriceDisplay() {
    const priceRange = document.getElementById('price-range');
    document.getElementById('price-display').textContent = priceRange.value;
}

function applyFilters() {
    const searchVal = document.getElementById('search-input').value.toLowerCase();
    const maxPrice = parseInt(document.getElementById('price-range').value);
    
    const selectedCategories = Array.from(document.querySelectorAll('#category-filter input:checked'))
                                     .map(input => input.value);
    
    const selectedStyles = Array.from(document.querySelectorAll('#style-filter input:checked'))
                                 .map(input => input.value);

    let filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchVal) || 
                              product.category.toLowerCase().includes(searchVal);
        
        const matchesPrice = product.price <= maxPrice;
        
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
        
        const matchesStyle = selectedStyles.length === 0 || selectedStyles.includes(product.group);
        
        // If coming from a category click, only show that category's products
        const matchesCurrentCategory = currentCategory === null || product.category === currentCategory;

        return matchesSearch && matchesPrice && matchesCategory && matchesStyle && matchesCurrentCategory;
    });

    sortProducts(filteredProducts);
    
    // If the filter is applied, and no category was specifically clicked, switch to product view
    if (currentCategory === null && (searchVal || selectedCategories.length > 0 || selectedStyles.length > 0 || maxPrice < 10000)) {
        document.getElementById('category-grid').style.display = 'none';
        document.getElementById('product-listing').style.display = 'grid';
    } else if (currentCategory === null && searchVal === '' && selectedCategories.length === 0 && selectedStyles.length === 0 && maxPrice === 10000) {
        // If all filters and search are clear, show category view
        showCategoryView(); 
    }
}

function sortProducts(productList = null) {
    let listToSort = productList || products;

    // If productList is null, we need to re-apply filters first to get the current list
    if (productList === null) {
        const searchVal = document.getElementById('search-input').value.toLowerCase();
        const maxPrice = parseInt(document.getElementById('price-range').value);
        const selectedCategories = Array.from(document.querySelectorAll('#category-filter input:checked')).map(input => input.value);
        const selectedStyles = Array.from(document.querySelectorAll('#style-filter input:checked')).map(input => input.value);

        listToSort = products.filter(product => {
            const matchesSearch = product.name.toLowerCase().includes(searchVal) || product.category.toLowerCase().includes(searchVal);
            const matchesPrice = product.price <= maxPrice;
            const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
            const matchesStyle = selectedStyles.length === 0 || selectedStyles.includes(product.group);
            const matchesCurrentCategory = currentCategory === null || product.category === currentCategory;
            return matchesSearch && matchesPrice && matchesCategory && matchesStyle && matchesCurrentCategory;
        });
    }

    const sortType = document.getElementById('sort-by').value;

    switch (sortType) {
        case 'price-asc':
            listToSort.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            listToSort.sort((a, b) => b.price - a.price);
            break;
        case 'name-asc':
            listToSort.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'default':
        default:
            // Optional: Sort by ID or original index for stable default view
            listToSort.sort((a, b) => a.id - b.id);
            break;
    }

    renderProductListing(listToSort);
}

function resetFilters() {
    document.getElementById('search-input').value = '';
    document.getElementById('price-range').value = 10000;
    updatePriceDisplay();
    
    document.querySelectorAll('#category-filter input[type="checkbox"]').forEach(input => input.checked = false);
    document.querySelectorAll('#style-filter input[type="checkbox"]').forEach(input => input.checked = false);
    document.getElementById('sort-by').value = 'default';
}


// --- Cart Functions ---

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const selectedSizeInput = document.querySelector(`input[name="size-${productId}"]:checked`);

    if (!selectedSizeInput) {
        alert("Please select a size before adding to cart.");
        return;
    }

    const size = selectedSizeInput.value;
    const existingItem = cart.find(item => item.id === productId && item.size === size);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            size: size,
            quantity: 1,
            image: product.image 
        });
    }

    updateCartDisplay();
    toggleCartSidebar(true); // Open the cart sidebar on adding item
}

function removeFromCart(productId, size) {
    cart = cart.filter(item => !(item.id === productId && item.size === size));
    updateCartDisplay();
}

function updateQuantity(productId, size, delta) {
    const item = cart.find(item => item.id === productId && item.size === size);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeFromCart(productId, size);
        }
        updateCartDisplay();
    }
}

function updateCartDisplay() {
    const cartList = document.getElementById('cart-list');
    const cartCountSpan = document.getElementById('cart-count');
    const cartTotalSpan = document.getElementById('cart-total');
    let total = 0;

    cartList.innerHTML = '';

    if (cart.length === 0) {
        cartList.innerHTML = '<p style="text-align: center; color: var(--secondary-text); padding: 20px;">Your cart is empty.</p>';
        document.getElementById('checkout-view-btn').disabled = true;
    } else {
        document.getElementById('checkout-view-btn').disabled = false;
    }

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <div style="display:flex; align-items: center; gap: 10px;">
                <img src="${item.image}" onerror="this.onerror=null;this.src='https://via.placeholder.com/50x50/CCCCCC/808080?text=Item';" alt="${item.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;">
                <div class="cart-item-details">
                    <span class="item-name">${item.name}</span>
                    <span class="item-size">Size: ${item.size}</span>
                </div>
            </div>
            <div style="text-align: right;">
                <span style="font-weight: 600;">₹${itemTotal.toFixed(2)}</span>
                <div class="cart-qty-controls">
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, '${item.size}', -1)">-</button>
                    <span class="qty-display">${item.quantity}</span>
                    <button class="qty-btn" onclick="updateQuantity(${item.id}, '${item.size}', 1)">+</button>
                </div>
            </div>
        `;
        cartList.appendChild(listItem);
    });

    cartCountSpan.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartTotalSpan.textContent = total.toFixed(2);
    document.getElementById('order-total-display').textContent = total.toFixed(2);
}

// --- Sidebar and View Toggle Functions ---

function toggleCartSidebar(show = null) {
    const sidebar = document.getElementById('cart-sidebar');
    if (show === null) {
        sidebar.classList.toggle('visible');
    } else if (show) {
        sidebar.classList.add('visible');
    } else {
        sidebar.classList.remove('visible');
    }
    // Always default to cart list view when opening/closing
    showCartListView(); 
}

function toggleFilterSidebar() {
    document.getElementById('filter-sidebar').classList.toggle('visible');
}

function showCheckoutView() {
    if (cart.length === 0) {
        alert("Your cart is empty. Please add items before checking out.");
        return;
    }
    document.getElementById('cart-list-view').style.display = 'none';
    document.getElementById('checkout-form-view').style.display = 'block';
    document.getElementById('confirmation-view').style.display = 'none';
}

function showCartListView() {
    document.getElementById('cart-list-view').style.display = 'block';
    document.getElementById('checkout-form-view').style.display = 'none';
    document.getElementById('confirmation-view').style.display = 'none';
}

function showConfirmationView(orderId) {
    document.getElementById('cart-list-view').style.display = 'none';
    document.getElementById('checkout-form-view').style.display = 'none';
    document.getElementById('confirmation-view').style.display = 'block';
    document.getElementById('order-id').textContent = orderId;
}


// --- Checkout Logic ---

function handleCheckout(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const paymentMethod = document.getElementById('payment-method').value;
    const total = document.getElementById('cart-total').textContent;

    // Simulate order processing (e.g., sending data to a server)
    console.log("Processing Order:", {
        customer: name,
        email: email,
        shipping: address,
        payment: paymentMethod,
        items: cart,
        total: `₹${total}`
    });

    // Simulate successful order placement
    const orderId = 'SH-' + Date.now().toString().slice(-6);
    
    // Show confirmation
    showConfirmationView(orderId);
}

function resetApp() {
    // Reset cart state
    cart = [];
    updateCartDisplay();
    
    // Reset form fields
    document.getElementById('checkout-form').reset();
    
    // Close sidebar and go back to category view
    toggleCartSidebar(false);
    showCategoryView();
    toggleFilterSidebar(false);
}


// --- Initialization ---

document.addEventListener('DOMContentLoaded', () => {
    // Initial content setup
    renderCategories();
    populateCategoryFilter();
    updateCartDisplay();
    updatePriceDisplay();
});