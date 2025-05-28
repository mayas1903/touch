
const ws = new WebSocket('wss://your-server.com?room=123abc');

let myTaps = 0;
let friendTaps = 0;

document.addEventListener('click', (e) => {
  const x = e.clientX;
  const y = e.clientY;

  myTaps++;
  updateCounter();
  createHeart(x, y);
  checkForGift();

  ws.send(JSON.stringify({ x, y }));
});

ws.onmessage = (event) => {
  const { x, y } = JSON.parse(event.data);
  friendTaps++;
  updateCounter();
  createHeart(x, y);
  checkForGift();
};

function updateCounter() {
  document.getElementById('counter').textContent = `Ты: ${myTaps} | Друг: ${friendTaps}`;
}

function createHeart(x, y) {
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.style.left = x - 15 + 'px';
  heart.style.top = y - 15 + 'px';
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 1000);
}

function checkForGift() {
  if (myTaps + friendTaps >= 1000 && !window.giftShown) {
    window.giftShown = true;
    showGiftModal();
  }
}

function showGiftModal() {
  document.getElementById('giftModal').classList.remove('hidden');
  document.getElementById('fireworks').classList.remove('hidden');
}

function closeModal() {
  document.getElementById('giftModal').classList.add('hidden');
  document.getElementById('fireworks').classList.add('hidden');
}

document.getElementById('counter').addEventListener('click', () => {
  document.getElementById('modalMy').textContent = myTaps;
  document.getElementById('modalFriend').textContent = friendTaps;
  const total = myTaps + friendTaps;
  document.getElementById('modalTotal').textContent = total;
  document.getElementById('modalLeft').textContent = Math.max(0, 1000 - total);
  document.getElementById('counterModal').classList.remove('hidden');
});

function closeCounterModal() {
  document.getElementById('counterModal').classList.add('hidden');
}
