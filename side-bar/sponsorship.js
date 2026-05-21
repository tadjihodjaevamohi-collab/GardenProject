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