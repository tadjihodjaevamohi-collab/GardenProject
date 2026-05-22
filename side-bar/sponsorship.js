const modal = document.getElementById('modal');
const donateText = document.getElementById('donateText');
const donateForm = document.getElementById('donateForm');

function openDonate(amount){

  modal.classList.add('active');

  donateText.innerText =
    `Вы выбрали пожертвование на сумму $${amount}`;

}

function closeModal(){

  modal.classList.remove('active');

}

function customDonate(){

  const amount =
    document.getElementById('customAmount').value;

  if(amount === ''){

    alert('Введите сумму');

    return;
  }

  openDonate(amount);

}

donateForm.addEventListener('submit', function(e){

  e.preventDefault();

  alert('Спасибо за ваш вклад 💚');

  modal.classList.remove('active');

});

// Subfolder Unified Navigation Mappings
const subFolderNavigation = {
  '.collections-link': './collections.html',
  '.exchange-link': './exchange.html',
  '.cards-link': './cards.html',
  '.care-link': './examples.html',
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