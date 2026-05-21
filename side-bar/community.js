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
      <img src="https://randomuser.me/api/portraits/women/65.jpg">

      <div class="bubble">
        Очень красиво 🌱
      </div>
    `;

    messages.appendChild(reply);

    messages.scrollTop = messages.scrollHeight;

  },1200);

}