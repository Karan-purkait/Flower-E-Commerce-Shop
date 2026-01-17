// UI Controls
const searchBtn = document.querySelector('#search-btn');
const searchForm = document.querySelector('.search-form');
const cartBtn = document.querySelector('#cart-btn');
const cartSidebar = document.querySelector('#cart-sidebar');
const closeCart = document.querySelector('#close-cart');

searchBtn.onclick = () => searchForm.classList.toggle('active');

cartBtn.onclick = () => cartSidebar.classList.add('active');
closeCart.onclick = () => cartSidebar.classList.remove('active');

window.onscroll = () => {
    searchForm.classList.remove('active');
    
    // Scroll Progress
    let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    document.querySelector(".scroll-indicator").style.width = scrolled + "%";

    reveal();
};

// Cart Engine
let cart = [];
const cartCount = document.querySelector('#cart-count');
const cartItemsContainer = document.querySelector('#cart-items-container');
const totalPriceDisplay = document.querySelector('#total-price');

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const name = button.getAttribute('data-name');
        const price = parseFloat(button.getAttribute('data-price'));
        cart.push({ name, price });
        updateCart();
        
        // Button Feedback
        const originalHTML = button.innerHTML;
        button.innerHTML = '<i class="fas fa-check"></i> Added';
        button.style.background = '#27ae60';
        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.style.background = '#333';
        }, 1000);
    });
});

function updateCart() {
    cartCount.innerText = cart.length;
    cartItemsContainer.innerHTML = '';
    let total = 0;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-msg">Your cart is empty.</p>';
    } else {
        cart.forEach((item, index) => {
            total += item.price;
            cartItemsContainer.innerHTML += `
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem; padding-bottom:1rem; border-bottom:1px solid #eee; font-size:1.6rem;">
                    <div>
                        <p style="font-weight:600; color:#333;">${item.name}</p>
                        <p style="color:#e84393;">$${item.price.toFixed(2)}</p>
                    </div>
                    <i class="fas fa-trash" onclick="removeItem(${index})" style="cursor:pointer; color:#666;"></i>
                </div>`;
        });
    }
    totalPriceDisplay.innerText = total.toFixed(2);
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

// Reveal Animation Logic
function reveal() {
    document.querySelectorAll('.reveal').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 100) {
            el.classList.add('active');
        }
    });
}

// Form Submission Feedback
const contactForm = document.querySelector('#contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.btn');
    btn.innerHTML = 'Sending...';
    setTimeout(() => {
        alert('Thank you for contacting Blossom Bazaar!');
        btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
        contactForm.reset();
    }, 1500);
});

window.onload = reveal;