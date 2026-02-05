// script.js - Main JavaScript for Sustainable Swap

// Mobile Navigation
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const closeMenuBtn = document.getElementById('closeMenuBtn');
const mobileNav = document.getElementById('mobileNav');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        mobileNav.classList.add('active');
    });
}

if (closeMenuBtn) {
    closeMenuBtn.addEventListener('click', () => {
        mobileNav.classList.remove('active');
    });
}

// Close mobile menu when clicking on links
const mobileLinks = document.querySelectorAll('.mobile-nav-links a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
    });
});

// Login Modal
const loginModal = document.getElementById('loginModal');
const userMenuBtn = document.getElementById('userMenuBtn');
const closeLoginModal = document.getElementById('closeLoginModal');

if (userMenuBtn) {
    userMenuBtn.addEventListener('click', () => {
        if (loginModal) loginModal.classList.add('active');
    });
}

if (closeLoginModal) {
    closeLoginModal.addEventListener('click', () => {
        if (loginModal) loginModal.classList.remove('active');
    });
}

// Close modal when clicking outside
if (loginModal) {
    loginModal.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.classList.remove('active');
        }
    });
}

// Product Actions
document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart from localStorage or empty array
    let cart = JSON.parse(localStorage.getItem('sustainableSwapCart')) || [];
    let wishlist = JSON.parse(localStorage.getItem('sustainableSwapWishlist')) || [];
    
    // Update cart badge
    function updateCartBadge() {
        const badge = document.querySelector('#cartBtn .notification-badge');
        if (badge) {
            badge.textContent = cart.length;
        }
    }
    
    // Add to cart functionality
    const addToCartBtns = document.querySelectorAll('#addToCart, .action-icon .fa-shopping-cart');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            if (productCard) {
                const product = {
                    id: Date.now(),
                    title: productCard.querySelector('.product-title span').textContent,
                    price: productCard.querySelector('.product-price').textContent,
                    image: productCard.querySelector('.product-image').src,
                    size: 'M', // Default size
                    quantity: 1
                };
                
                cart.push(product);
                localStorage.setItem('sustainableSwapCart', JSON.stringify(cart));
                updateCartBadge();
                alert('Added to cart!');
            }
        });
    });
    
    // Initialize cart badge
    updateCartBadge();
    
    // Filter functionality for browse page
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.textContent.toLowerCase();
            filterProducts(filter);
        });
    });
    
    // Apply filters button
    const applyFiltersBtn = document.getElementById('applyFilters');
    if (applyFiltersBtn) {
        applyFiltersBtn.addEventListener('click', function() {
            const selectedFilters = getSelectedFilters();
            filterProductsByMultiple(selectedFilters);
        });
    }
    
    // Size selection
    const sizeOptions = document.querySelectorAll('.size-option');
    sizeOptions.forEach(option => {
        option.addEventListener('click', function() {
            sizeOptions.forEach(o => o.classList.remove('selected'));
            this.classList.add('selected');
        });
    });
});

// Helper functions
function filterProducts(filterType) {
    console.log(`Filtering by: ${filterType}`);
    // In a real app, this would filter products from an API
}

function getSelectedFilters() {
    const filters = {
        categories: [],
        types: [],
        sizes: [],
        conditions: [],
        brands: [],
        priceRange: { min: 0, max: 200 },
        sustainability: []
    };
    
    return filters;
}

function filterProductsByMultiple(filters) {
    console.log('Applying filters:', filters);
    // In a real app, this would make an API call with filters
}

// Product detail page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Thumbnail image switching
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('mainImage');
    
    if (thumbnails.length > 0 && mainImage) {
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                // Remove active class from all thumbnails
                thumbnails.forEach(t => t.classList.remove('active'));
                // Add active class to clicked thumbnail
                this.classList.add('active');
                // Change main image
                mainImage.src = this.src;
            });
        });
    }
    
    // Tab switching
    const tabs = document.querySelectorAll('.tab');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    if (tabs.length > 0) {
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                const tabId = this.getAttribute('data-tab');
                
                // Update active tab
                tabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Show corresponding tab content
                tabPanes.forEach(pane => {
                    pane.classList.remove('active');
                    pane.classList.add('hidden');
                    if (pane.id === tabId) {
                        pane.classList.remove('hidden');
                        pane.classList.add('active');
                    }
                });
            });
        });
    }
});

// Cart page functionality
document.addEventListener('DOMContentLoaded', function() {
    // Quantity adjustments
    const minusBtns = document.querySelectorAll('.quantity-btn.minus');
    const plusBtns = document.querySelectorAll('.quantity-btn.plus');
    const quantityInputs = document.querySelectorAll('.quantity-input');
    
    minusBtns.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            let value = parseInt(quantityInputs[index].value);
            if (value > 1) {
                quantityInputs[index].value = value - 1;
                updateCartTotal();
            }
        });
    });
    
    plusBtns.forEach((btn, index) => {
        btn.addEventListener('click', function() {
            let value = parseInt(quantityInputs[index].value);
            quantityInputs[index].value = value + 1;
            updateCartTotal();
        });
    });
    
    // Remove items
    const removeBtns = document.querySelectorAll('.remove-item');
    removeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const cartItem = this.closest('.cart-item');
            cartItem.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                cartItem.remove();
                updateCartTotal();
            }, 300);
        });
    });
    
    function updateCartTotal() {
        // Calculate total based on quantities
        console.log('Updating cart total...');
    }
    
    // Checkout button
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            window.location.href = 'checkout.html';
        });
    }
});

// Add CSS animation for remove
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; transform: translateX(-20px); }
    }
`;
document.head.appendChild(style);