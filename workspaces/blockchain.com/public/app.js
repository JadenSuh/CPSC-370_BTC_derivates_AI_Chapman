const currencyElement = document.getElementById('currency');
const loadingElement = document.getElementById('loading');
currencyElement.addEventListener('change', fetchBitcoinPrice);

function animatePrice(oldPrice, newPrice) {
  const priceElement = document.getElementById('price');
  priceElement.textContent = newPrice;
  if (oldPrice < newPrice) {
    priceElement.classList.add('increase');
  } else if (oldPrice > newPrice) {
    priceElement.classList.add('decrease');
  }
  setTimeout(() => {
    priceElement.classList.remove('increase', 'decrease');
  }, 1000);
}

function fetchBitcoinPrice() {
  const currency = currencyElement.value;
  loadingElement.style.display = 'block';
  fetch(`https://blockchain.info/ticker`)
    .then(response => response.json())
    .then(data => {
      const oldPrice = parseFloat(document.getElementById('price').textContent.split(' ')[1]);
      const newPrice = data[currency].last;
      animatePrice(oldPrice, newPrice);
      loadingElement.style.display = 'none';
    })
    .catch(error => {
      console.error('Error:', error);
      loadingElement.style.display = 'none';
    });
}

// Fetch the Bitcoin price when the page loads
fetchBitcoinPrice();

function isValidAddress(address) {
  // Bitcoin addresses are 26-35 characters long, consist of alphabetic and numeric characters, 
  // start with either a 1 or a 3, and never use 0, O, l and I to avoid visual ambiguity.
  // This is a simple validation and does not cover all cases.
  const regex = /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/;
  return regex.test(address);
}

function getBalanceSummary() {
  const addresses = document.getElementById('address').value.split('|');
  for (let i = 0; i < addresses.length; i++) {
    if (!isValidAddress(addresses[i])) {
      document.getElementById('balance').textContent = 'Invalid Bitcoin address.';
      return;
    }
  }
  fetch(`https://blockchain.info/balance?active=${addresses.join('|')}`)
    .then(response => response.json())
    .then(data => {
      let balanceText = '';
      for (let i = 0; i < addresses.length; i++) {
        balanceText += `Balance for ${addresses[i]}: ${data[addresses[i]].final_balance}\n`;
      }
      document.getElementById('balance').textContent = balanceText;
    })
    .catch(error => console.error('Error:', error));
}

const QRCode = require('qrcode');

function generateQRCode() {
  const address = document.getElementById('address').value;
  const canvas = document.getElementById('qrcode');
  QRCode.toCanvas(canvas, address, function (error) {
    if (error) console.error(error);
    console.log('QR code generated!');
  });
}

// Call the generateQRCode function when the page loads
console.log('Generating QR code...');
generateQRCode();
