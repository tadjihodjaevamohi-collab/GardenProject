let cardContainer = document.querySelector('.grid')
let currentCategory = 'products' // Default category
let examples = [

]

// Load products from JSON file based on category
async function loadProducts(category) {
    try {
        const response = await fetch(`../data/${category}.json`)
        examples = await response.json()
        renderCategories(products)
    } catch (error) {
        console.error('Error loading products:', error)
        cardContainer.innerHTML = '<p>Error loading products</p>'
    }
}

function renderCategories(arr) {
    cardContainer.innerHTML = ''

    arr.forEach(cat => {
        cardContainer.insertAdjacentHTML('beforeend', `
            <div class="card">
                <div class="content">
                    <div class="title">${cat.productName}</div>
                    <div class="desc">${cat.productInfo}</div>

                    <div class="controls">
                        <div class="qty">
                            <button onclick="changeQty(0,-1)">-</button>
                            <span id="qty-0">1</span>
                            <button onclick="changeQty(0,1)">+</button>
                        </div>

                        <button class="add" onclick="addToCart(event,'Pottery',0)">
                            <span>Add</span>
                        </button>
                    </div>
                </div>
             </div>
        `)
    })

    attachEventListeners()
}

let cart = [];

function changeQty(id, change) {
    const el = document.getElementById("qty-" + id);
    let value = parseInt(el.innerText);

    value += change;
    if (value < 1) value = 1;

    el.innerText = value;
}

function addToCart(e, name, id) {
    const btn = e.currentTarget;

    // ripple
    btn.classList.add("ripple");
    setTimeout(() => btn.classList.remove("ripple"), 600);

    // added animation
    btn.classList.add("added");
    btn.querySelector("span").innerText = "Added ✓";

    setTimeout(() => {
        btn.classList.remove("added");
        btn.querySelector("span").innerText = "Add";
    }, 1500);

    const qty = document.getElementById("qty-" + id).innerText;
    cart.push({ name, qty });

    renderCart();
}

function renderCart() {
    const list = document.getElementById("cartList");
    list.innerHTML = "";

    cart.forEach(item => {
        const li = document.createElement("li");
        li.innerText = item.name + " x" + item.qty;
        list.appendChild(li);
    });
}

// Set up profile button redirection
const profileImage = document.querySelector('img.profile')
if (profileImage) {
    profileImage.style.cursor = 'pointer'
    profileImage.addEventListener('click', () => {
        const userInfo = localStorage.getItem('user')
        if (userInfo) {
            window.location.href = '../profile.html'
        } else {
            window.location.href = '../enter.html'
        }
    })
}

// Subfolder Unified Navigation Mappings
const subFolderNavigation = {
    '.collections-link': './collections.html',
    '.exchange-link': './exchange.html',
    '.cards-link': './cards.html',
    '.seminars-link': './community.html',
    '.consultations-link': './community.html',
    '.sponsorship-link': './sponsorship.html',
    '.journal-link': '../interior.html'
}

Object.entries(subFolderNavigation).forEach(([selector, url]) => {
    const element = document.querySelector(selector)
    if (element) {
        element.style.cursor = 'pointer'
        element.addEventListener('click', () => {
            window.location.href = url
        })
    }
})

// Catalog Button
const catalogBtn = document.querySelector('.catalog-btn')
if (catalogBtn) {
    catalogBtn.addEventListener('click', () => {
        window.location.href = './cards.html'
    })
}

// Load initial products based on URL search query or default category
const urlParams = new URLSearchParams(window.location.search);
const initialCat = urlParams.get('category') || 'plants';

// Update active menu item and load initial category
switchCategory(initialCat);

// Add function to switch categories
function switchCategory(category) {
    currentCategory = category
    loadProducts(category)

    // Update active menu item
    document.querySelectorAll('.menu li').forEach(item => {
        item.classList.remove('active')
        if (item.dataset.category === category) {
            item.classList.add('active')
        }
    })
}

// Add click listeners to category switching menu items
document.querySelectorAll('.menu li[data-category]').forEach(item => {
    item.addEventListener('click', () => {
        switchCategory(item.dataset.category)
    })
})

// ..................................
// let cart = [];

// function changeQty(id, change) {
//     const el = document.getElementById("qty-" + id);
//     let value = parseInt(el.innerText);

//     value += change;
//     if (value < 1) value = 1;

//     el.innerText = value;
// }

// function addToCart(e, name, id) {
//     const btn = e.currentTarget;

//     // ripple
//     btn.classList.add("ripple");
//     setTimeout(() => btn.classList.remove("ripple"), 600);

//     // added animation
//     btn.classList.add("added");
//     btn.querySelector("span").innerText = "Added ✓";

//     setTimeout(() => {
//         btn.classList.remove("added");
//         btn.querySelector("span").innerText = "Add";
//     }, 1500);

//     const qty = document.getElementById("qty-" + id).innerText;
//     cart.push({ name, qty });

//     renderCart();
// }

// function renderCart() {
//     const list = document.getElementById("cartList");
//     list.innerHTML = "";

//     cart.forEach(item => {
//         const li = document.createElement("li");
//         li.innerText = item.name + " x" + item.qty;
//         list.appendChild(li);
//     });
// }