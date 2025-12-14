// script.js

// Data for products and categories 
const products = [
    // --- KURTIS (3 products) ---
    { 
        id: 1, 
        name: "Aqua Embroidered Kurti", 
        price: 1800, 
        originalPrice: 2400, 
        category: "Kurtis", 
        group: "Festive", 
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWJ1_sORjtwiYJVgc8ugFDnRP0W_byMMjVMw&s" 
    }, 
    { 
        id: 10, 
        name: "Elegant Block Print Kurti", 
        price: 1950, 
        originalPrice: null, 
        category: "Kurtis", 
        group: "Casual", 
        image: "https://houseofkari.in/cdn/shop/files/9th-feb-20245607.jpg?v=1756990145&width=1500" 
    },
    { 
        id: 11, 
        name: "V-Neck Plain Kurti Set", 
        price: 1400, 
        originalPrice: 2000, 
        category: "Kurtis", 
        group: "Formal", 
        image: "https://wholetex.sgp1.cdn.digitaloceanspaces.com/full/v-neck-fancy-plain-kurti-9149.jpg", 
        sale: true
    },
    
    // --- SAREES (3 products) ---
    { 
        id: 2, 
        name: "Black Sequence Work Saree", 
        price: 4500, 
        originalPrice: 5000, 
        category: "Sarees", 
        group: "Formal", 
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTi7nwj_u3eAkvmXszAwFM2Qgn86qyzIdOIrA&s" 
    }, 
    { 
        id: 12, 
        name: "Blue Designer Silk Saree", 
        price: 5200, 
        originalPrice: 6500, 
        category: "Sarees", 
        group: "Festive", 
        image: "https://trendoye.com/cdn/shop/products/blue-designer-saree-TSNJ-MNS-SWRK6-67011_1200x.jpg?v=1680441921", 
        sale: true
    },
    { 
        id: 13, 
        name: "Georgette Printed Saree", 
        price: 3100, 
        originalPrice: null, 
        category: "Sarees", 
        group: "Casual", 
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRw1ay076rQtUfhD2SqB4raDob6E9U3oGzerQ&s" 
    }, 
    
    // --- JEANS (3 products) ---
    { 
        id: 7, 
        name: "Dark Wash Skinny Jeans", 
        price: 1550, 
        originalPrice: null, 
        category: "Jeans", 
        group: "Casual", 
        image: "https://sassafras.in/cdn/shop/files/SFJEAN0592-1_fbd456eb-0dfb-400c-abb2-07e09c80679c.jpg?v=1757493219" 
    }, 
    { 
        id: 14, 
        name: "High-Rise Baggy Jeans", 
        price: 1999, 
        originalPrice: 2500, 
        category: "Jeans", 
        group: "Casual", 
        image: "https://assets.myntassets.com/w_412,q_30,dpr_3,fl_progressive,f_webp/assets/images/27809704/2025/7/8/9001be77-f1f8-40fd-91c8-74bc1567d35b1751966994547-Bewakoof-Women-Straight-Fit-High-Rise--Baggy-Jeans-751175196-1.jpg" 
    },
    { 
        id: 15, 
        name: "Men's Slim Fit Denim", 
        price: 2100, 
        originalPrice: null, 
        category: "Jeans", 
        group: "Casual", 
        image: "https://imagescdn.vanheusenindia.com/img/app/product/9/919749-11523703.jpg?auto=format&w=390" 
    }, 

    // --- SKIRTS (3 products) ---
    { 
        id: 9, 
        name: "A-Line Cotton Skirt (Floral)", 
        price: 1700, 
        originalPrice: 2300, 
        category: "Skirts", 
        group: "Festive", 
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-BBf2DWTk2zHQdeVU-f8E-btyWC97bGpdNQ&s" 
    },
    { 
        id: 16, 
        name: "Green Ruffle Mini Skirt", 
        price: 1099, 
        originalPrice: null, 
        category: "Skirts", 
        group: "Casual", 
        image: "https://sassafras.in/cdn/shop/products/SFSKRT3151-1.jpg?v=1757500409" 
    },
    { 
        id: 17, 
        name: "Indigo Blue Maxi Skirt", 
        price: 1900, 
        originalPrice: null, 
        category: "Skirts", 
        group: "Casual", 
        image: "https://shop.jaipurkurti.com/cdn/shop/files/1A24SKIRR003-INDIGOBLUE_1.jpg?v=1722503972" 
    },

    // --- JACKETS (3 products) ---
    { 
        id: 4, 
        name: "Navy Quilted Puffer Jacket", 
        price: 3500, 
        originalPrice: 5900, 
        category: "Jackets", 
        group: "Winter Wear", 
        sale: true, 
        image: "https://assets.myntassets.com/dpr_1.5,q_30,w_400,c_limit,fl_progressive/assets/images/2025/APRIL/24/wXMfy3CH_37b331f0a8cf4a529dc22f9ab99140e0.jpg" 
    }, 
    { 
        id: 18, 
        name: "Women's Denim Jacket", 
        price: 2800, 
        originalPrice: 3500, 
        category: "Jackets", 
        group: "Casual", 
        image: "https://i.pinimg.com/564x/c5/ba/9b/c5ba9bd0b3b0b3ad086805e5eccba2d6.jpg" 
    },
    { 
        id: 19, 
        name: "Faux Leather Crop Jacket", 
        price: 4100, 
        originalPrice: 5500, 
        category: "Jackets", 
        group: "Formal", 
        image: "https://assets.myntassets.com/w_412,q_30,dpr_3,fl_progressive,f_webp/assets/images/31086511/2024/9/25/9d125632-d3c0-4ddd-a378-ffdf0371daa71727245541821-TBOJ-Women-Leather-Lightweight-Crop-Outdoor-Leather-Jacket-1-1.jpg" 
    },

    // --- DRESSES (3 products) ---
    { 
        id: 6, 
        name: "Grey Sweater Knit Dress", 
        price: 2199, 
        originalPrice: 3999, 
        category: "Dresses", 
        group: "Winter Wear", 
        sale: true, 
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvLMduB8pUcGQusFnO9kHBLg_so26enCAo0g&s" 
    }, 
    { 
        id: 20, 
        name: "Maroon Solid Maxi Dress", 
        price: 1750, 
        originalPrice: null, 
        category: "Dresses", 
        group: "Casual", 
        image: "https://img.tatacliq.com/images/i16//437Wx649H/MP000000021635720_437Wx649H_202403211908471.jpeg" 
    },
    { 
        id: 21, 
        name: "Floral Print A-Line Dress", 
        price: 1400, 
        originalPrice: 2000, 
        category: "Dresses", 
        group: "Festive", 
        image: "https://media.landmarkshops.in/cdn-cgi/image/h=831,w=615,q=85,fit=cover/max-new/1000015359425-OffWhite-IVORY-1000015359425_09-2100.jpg" 
    },

    // --- OTHER PRODUCTS ---
    { id: 3, name: "Mustard Palazzo Set", price: 2900, originalPrice: null, category: "Suits", group: "Casual", image: "https://cdn.sapnaaz.com/uploads/2024/12/22173051/WINE-1-1.webp" }, 
    { id: 5, name: "Pink Floral Lehenga", price: 7800, originalPrice: null, category: "Lehengas", group: "Festive", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-BBf2DWTk2zHQdeVU-f8E-btyWC97bGpdNQ&s" }, 
];

// Reordered categories for display on the main grid 
const categories = [
    { name: "Kurtis", image: "https://images.meesho.com/images/products/508308303/a6n3y_512.webp?width=512", group: "Casual" },
    { name: "Sarees", image: "https://www.devnaagri.com/cdn/shop/files/CelebWebsite2292.jpg?v=1751947543", group: "Formal" },
    { name: "Jeans", image: "https://www.only.in/cdn/shop/files/900742401_g0.jpg?v=1745910181&width=2048", group: "Casual" }, 
    { name: "Skirts", image: "https://assets.myntassets.com/w_412,q_30,dpr_3,fl_progressive,f_webp/assets/images/24865792/2023/10/4/2f7f7251-0d0b-4cb5-b0ce-19acbe3f57771696415933351-Anayna-Women-Printed-A-Line-Flared-Cotton-Maxi-Skirt-3831696-7.jpg", group: "Casual" }, 
    { name: "Jackets", image: "https://i.pinimg.com/564x/a1/16/d4/a116d40a67ba038bad52bbad20c49a76.jpg", group: "Winter Wear" },
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
            // This is the badge that appears on the category card itself
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

        // This is the sale badge on individual product cards
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
    
    // SHOW BACK BUTTON
    document.getElementById('back-button-container').style.display = 'flex';
    document.getElementById('back-button-container').classList.remove('back-btn-hidden');

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

/**
 * Ensures navigation goes back to the category grid view.
 */
function showCategoryView() {
    currentCategory = null;
    document.getElementById('product-listing').style.display = 'none';
    document.getElementById('category-grid').style.display = 'grid';
    
    // HIDE BACK BUTTON
    document.getElementById('back-button-container').style.display = 'none';
    document.getElementById('back-button-container').classList.add('back-btn-hidden');
    
    // Reset filters on returning to category view
    resetFilters();
}

/**
 * NEW FUNCTION: Shows products marked as "Winter Wear" (Jackets/Dresses)
 */
function showWinterOffer() {
    const winterWearGroup = "Winter Wear";
    
    // Switch the view to the Product Listing grid
    document.getElementById('category-grid').style.display = 'none';
    document.getElementById('product-listing').style.display = 'grid';
    
    // Show the Back button
    document.getElementById('back-button-container').style.display = 'flex';
    document.getElementById('back-button-container').classList.remove('back-btn-hidden');

    // Reset filters first (clears search, price, and category)
    resetFilters(); 

    // Explicitly check the 'Winter Wear' style filter 
    const winterWearCheckbox = document.querySelector(`#style-filter input[value="${winterWearGroup}"]`);
    if (winterWearCheckbox) {
        winterWearCheckbox.checked = true;
    }
    
    // Apply the filters to render the products (filtered by 'Winter Wear' style)
    currentCategory = null; 
    applyFilters();
}


// --- Filter Interaction ---

function toggleFilterSidebar(show = null) {
    const sidebar = document.getElementById('filter-sidebar');
    const overlay = document.getElementById('overlay');
    if (show === null) {
        sidebar.classList.toggle('visible');
    } else if (show) {
        sidebar.classList.add('visible');
    } else {
        sidebar.classList.remove('visible');
    }
    // Toggle overlay visibility
    overlay.style.display = sidebar.classList.contains('visible') || document.getElementById('cart-sidebar').classList.contains('visible') ? 'block' : 'none';
}

function toggleCartSidebar(show = null) {
    const sidebar = document.getElementById('cart-sidebar');
    const overlay = document.getElementById('overlay');
    if (show === null) {
        sidebar.classList.toggle('visible');
    } else if (show) {
        sidebar.classList.add('visible');
    } else {
        sidebar.classList.remove('visible');
    }
    // Always default to cart list view when opening/closing
    showCartListView(); 
    // Toggle overlay visibility
    overlay.style.display = sidebar.classList.contains('visible') || document.getElementById('filter-sidebar').classList.contains('visible') ? 'block' : 'none';
}

/**
 * Hides both the filter and cart sidebars if the click occurred outside of them (or on the overlay).
 */
function closeFilterIfOpen(event) {
    // If the click happened on the overlay itself:
    if (event.target.id === 'overlay') {
        toggleFilterSidebar(false);
        toggleCartSidebar(false);
        // Turn off overlay visibility immediately
        document.getElementById('overlay').style.display = 'none';
    }
    
    // The rest of the logic handles clicks inside or outside the sidebar buttons/containers
    const filterSidebar = document.getElementById('filter-sidebar');
    const cartSidebar = document.getElementById('cart-sidebar');
    const filterToggleBtn = document.querySelector('.filter-toggle-btn');
    const cartToggleBtn = document.querySelector('.cart-btn'); 

    const isFilterOpen = filterSidebar.classList.contains('visible');
    const isCartOpen = cartSidebar.classList.contains('visible');
    
    // Helper function to check if the target is part of an element or its descendants
    const isTargetInside = (element, target) => element.contains(target) || target.closest(`.${element.className.split(' ')[0]}`) === element;
    
    if (isFilterOpen) {
        if (!isTargetInside(filterSidebar, event.target) && event.target !== filterToggleBtn) {
            if (!event.target.closest('.cart-btn')) {
                toggleFilterSidebar(false); 
            }
        }
    }

    if (isCartOpen) {
        if (!isTargetInside(cartSidebar, event.target) && event.target !== cartToggleBtn) {
            if (!event.target.closest('.filter-toggle-btn')) {
                 toggleCartSidebar(false); 
            }
        }
    }
}


// --- Filtering and Sorting ---

function populateCategoryFilter() {
    const filterDiv = document.getElementById('category-filter');
    filterDiv.innerHTML = '';
    // Use unique product categories, not the display categories, for the filter checkbox list
    const uniqueCategories = [...new Set(products.map(p => p.category))].sort();

    uniqueCategories.forEach(cat => {
        // Attach applyFilters to the change event
        filterDiv.innerHTML += `
            <label><input type="checkbox" name="filter-category" value="${cat}" onchange="applyFilters()"> ${cat}</label><br>
        `;
    });
}

function updatePriceDisplay() {
    const priceRange = document.getElementById('price-range');
    document.getElementById('price-display').textContent = priceRange.value;
    applyFilters(); // Apply filters immediately when price range changes
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
        
        const matchesCurrentCategory = currentCategory === null || product.category === currentCategory;

        return matchesSearch && matchesPrice && matchesCategory && matchesStyle && matchesCurrentCategory;
    });

    sortProducts(filteredProducts);
    
    // View switching logic:
    const filtersActive = searchVal || selectedCategories.length > 0 || selectedStyles.length > 0 || maxPrice < 10000;

    if (currentCategory === null && filtersActive) {
        // If we are on the main page but apply a filter, show product listing
        document.getElementById('category-grid').style.display = 'none';
        document.getElementById('product-listing').style.display = 'grid';
        document.getElementById('back-button-container').style.display = 'flex'; 
    } else if (currentCategory === null && !filtersActive) {
        // If all filters and search are clear, show category view
        showCategoryView(); 
    }
}

function sortProducts(productList = null) {
    let listToSort = productList || products;

    if (productList === null) {
        // If no list is passed, we need to get the currently filtered list
        applyFilters(); 
        return;
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
            listToSort.sort((a, b) => a.id - b.id);
            break;
    }

    renderProductListing(listToSort);
}

function resetFilters() {
    document.getElementById('search-input').value = '';
    document.getElementById('price-range').value = 10000;
    document.getElementById('price-display').textContent = 10000;
    
    document.querySelectorAll('#category-filter input[type="checkbox"]').forEach(input => input.checked = false);
    document.querySelectorAll('#style-filter input[type="checkbox"]').forEach(input => input.checked = false);
    document.getElementById('sort-by').value = 'default';
    
    // Re-apply filters to clear the product display
    applyFilters(); 
}


// --- Cart Functions (unchanged logic) ---

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

// --- Sidebar and View Toggle Functions (unchanged logic) ---

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


// --- Checkout Logic (unchanged logic) ---

function handleCheckout(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const paymentMethod = document.getElementById('payment-method').value;
    const total = document.getElementById('cart-total').textContent;

    // Simulate order processing
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
    
    // Clear the cart after confirmed order
    cart = []; 
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


// --- Initialization and Event Listeners ---

document.addEventListener('DOMContentLoaded', () => {
    // Initial content setup
    renderCategories();
    populateCategoryFilter();
    updateCartDisplay();
    updatePriceDisplay();
});