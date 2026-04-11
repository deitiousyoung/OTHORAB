// AI Chat — we'll connect Gemini here later
async function sendMessage() {
  const input = document.getElementById('chatInput');
  const chatBox = document.getElementById('chatBox');
  const message = input.value.trim();
  if (!message) return;

  // Add user message
  const userBubble = document.createElement('div');
  userBubble.className = 'chat-bubble user';
  userBubble.textContent = message;
  chatBox.appendChild(userBubble);
  input.value = '';
  chatBox.scrollTop = chatBox.scrollHeight;

  // Add loading
  const loadingBubble = document.createElement('div');
  loadingBubble.className = 'chat-bubble bot';
  loadingBubble.textContent = '⏳ Thinking...';
  chatBox.appendChild(loadingBubble);
  chatBox.scrollTop = chatBox.scrollHeight;

  // Placeholder response — Gemini coming soon
  setTimeout(() => {
    loadingBubble.textContent = '🤖 AI assistant coming soon! For now please book an appointment or contact us on WhatsApp.';
    chatBox.scrollTop = chatBox.scrollHeight;
  }, 1000);
}

// Enter key to send
document.getElementById('chatInput')?.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') sendMessage();
});

function handleLogout() {
  window.location.href = '../index.html';
}
