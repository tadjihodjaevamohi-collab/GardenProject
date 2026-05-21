
// let products = [
//   {
//     prductId: 1,
//     productImage: './img/product1.png',
//     productName: 'Monstera Deliciosa',
//     productInfo: 'XL ARCHITECTURAL SPECIMEN',
//     productPrice: '$68.00',
//     productDiscount: '$80.00',
//     productAmount: '1',
//     productCart: 'Add to Cart',
//   },
//   {
//     prductId: 2,
//     productImage: './img/product2.png',
//     productName: 'Sansevieria Laurentii',
//     productInfo: 'HARDY STRUCTURAL ELEMENT',
//     productPrice: '$42.00',
//     productDiscount: '',
//     productAmount: '1',
//     productCart: 'Add to Cart',
//   },
//   {
//     prductId: 3,
//     productImage: './img/product3.png',
//     productName: 'Ficus Lyrata',
//     productInfo: 'LUXURY TREE STATEMENT',
//     productPrice: '$115.00',
//     productDiscount: '$140.00',
//     productAmount: '1',
//     productCart: 'Add to Cart',
//   },
//   {
//     prductId: 4,
//     productImage: './img/product4.png',
//     productName: 'Olea Europaea',
//     productInfo: 'ANCIENT MEDITERRANEAN GRACE',
//     productPrice: '$95.00',
//     productDiscount: '',
//     productAmount: '1',
//     productCart: 'Add to Cart',
//   },
// ]


// Open profile page when the profile image is clicked
const profileImage = document.querySelector('img.profile')
if (profileImage) {
  profileImage.style.cursor = 'pointer'
  profileImage.addEventListener('click', () => {
    const userInfo = localStorage.getItem('user')
    if (userInfo) {
      window.location.href = './profile.html'
    } else {
      window.location.href = './enter.html'
    }
  })
}

const exchangeLink = document.querySelector('li.exchange-link')
if (exchangeLink) {
  exchangeLink.style.cursor = 'pointer'
  exchangeLink.addEventListener('click', () => {
<<<<<<< HEAD
    window.location.href = './side-bar/exchange.html'
=======
    window.location.href = './data/side-bar/exchange.html'
>>>>>>> 01aba09811a9ded0b6b8393413e53bb6f127ac27
  })
}

const cardsLink = document.querySelector('li.cards-link')
if (cardsLink) {
  cardsLink.style.cursor = 'pointer'
  cardsLink.addEventListener('click', () => {
<<<<<<< HEAD
    window.location.href = './side-bar/cards.html'
=======
    window.location.href = './data/side-bar/cards.html'
>>>>>>> 01aba09811a9ded0b6b8393413e53bb6f127ac27
  })
}

// async function sendLocationToTelegram(latitude, longitude, address) {
//   try {
//     const url = `https://api.telegram.org/bot${TG_BOT_TOKEN}/sendLocation`;
//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         chat_id: TG_CHAT_ID,
//         latitude: latitude,
//         longitude: longitude,
//         horizontal_accuracy: 50,
//         reply_markup: {
//           inline_keyboard: [[{
//             text: `📍 ${address}`,
//             url: `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`
//           }]]
//         }
//       }),
//     });

//     if (!response.ok) {
//       console.error("Telegram location API error:", response.statusText);
//       return false;
//     }

//     const data = await response.json();
//     console.log("Location sent to Telegram:", data);
//     return true;
//   } catch (error) {
//     console.error("Error sending location to Telegram:", error);
//     return false;
//   }
// }