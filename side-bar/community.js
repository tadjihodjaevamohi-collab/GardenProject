function sendMessage(){

  const input = document.getElementById('messageInput');
  const messages = document.getElementById('messages');

  if(input.value.trim() === '') return;

  const message = document.createElement('div');

  message.classList.add('message','self');

  message.innerHTML = `
    <div class="bubble">${input.value}</div>
  `;

  messages.appendChild(message);

  input.value = '';

  messages.scrollTop = messages.scrollHeight;

  setTimeout(()=>{

    const reply = document.createElement('div');

    reply.classList.add('message');

    reply.innerHTML = `
      <img src="./img/woman2.jfif">

      <div class="bubble">
        Очень красиво 🌱
      </div>
    `;

    messages.appendChild(reply);

    messages.scrollTop = messages.scrollHeight;

  },1200);

}

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