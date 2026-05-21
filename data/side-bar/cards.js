let cardContainer = document.querySelector('.cards')
let currentCategory = 'plants' // Default category
let products = []

// Load products from JSON file based on category
async function loadProducts(category) {
  try {
    const response = await fetch(`./data/${category}.json`)
    products = await response.json()
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
            <div class="products">
                <img src="${cat.productImage}" alt="${cat.productName}">
                <div>
                  <h3>${cat.productName}</h3>
                  <p class="products-info">${cat.productInfo}</p>
                </div>

                <div class="products-price">
                    <h4>${cat.productPrice}</h4>
                    <p>${cat.productDiscount || ''}</p>
                </div>

                <div class="products-cart">
                    <div class="controls">
                      <button class="minus">-</button>
                      <span class="count">${cat.productAmount}</span>
                      <button class="plus">+</button>
                    </div>
                    <button class="add">${cat.productCart}</button>
                </div>
             </div>
        `)
  })
  
  attachEventListeners()
}

// Load initial products
loadProducts(currentCategory)

function attachEventListeners() {
  const productCards = cardContainer.querySelectorAll(".products");

  productCards.forEach((card, index) => {
    const minus = card.querySelector(".minus");
    const plus = card.querySelector(".plus");
    const count = card.querySelector(".count");
    const addBtn = card.querySelector(".add");

    let value = 1;

    plus.addEventListener("click", () => {
      value++;
      count.textContent = value;
    });

    minus.addEventListener("click", () => {
      if (value > 1) {
        value--;
        count.textContent = value;
      }
    });

    addBtn.addEventListener("click", () => {
      const productName = products[index].productName
      alert(`Добавлено в корзину: ${value} шт. ${productName}`);
    });
  });
}

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

// Add click listeners to menu items
document.querySelectorAll('.menu li[data-category]').forEach(item => {
  item.addEventListener('click', () => {
    switchCategory(item.dataset.category)
  })
})