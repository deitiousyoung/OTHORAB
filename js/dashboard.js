const SUPABASE_URL = 'https://hfjcdkmpyldlvxweknci.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmamNka21weWxkbHZ4d2VrbmNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5MTEwMTYsImV4cCI6MjA5MTQ4NzAxNn0.NpdwMuolCMME_hGYLMcav1POow6YmurLmn9Bt7_wN4M';
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Load patient data
async function loadDashboard() {
  const { data: { user } } = await sb.auth.getUser();

  if (!user) {
    window.location.href = 'login.html';
    return;
  }

  // Get patient info
  const { data: patient } = await sb.from('patients')
    .select('*').eq('email', user.email).single();

  if (patient) {
    document.getElementById('dashName').textContent = patient.name.split(' ')[0];
  }

  // Get appointments
  const { data: appointments } = await sb.from('appointments')
    .select('*').eq('email', user.email).order('created_at', { ascending: false });

  if (appointments && appointments.length > 0) {
    const list = document.querySelector('.appt-list');
    list.innerHTML = '';
    appointments.forEach(a => {
      const date = new Date(a.date);
      list.innerHTML += `
        <div class="appt-item">
          <div class="appt-date">
            <span class="appt-day">${date.getDate()}</span>
            <span class="appt-month">${date.toLocaleString('default',{month:'short'})}</span>
          </div>
          <div class="appt-info">
            <strong>${a.condition}</strong>
            <p>${a.time} • ${a.condition}</p>
          </div>
          <span class="appt-badge ${a.status}">${a.status}</span>
        </div>`;
    });
  }
}

// AI Chat
async function sendMessage() {
  const input = document.getElementById('chatInput');
  const chatBox = document.getElementById('chatBox');
  const message = input.value.trim();
  if (!message) return;

  const userBubble = document.createElement('div');
  userBubble.className = 'chat-bubble user';
  userBubble.textContent = message;
  chatBox.appendChild(userBubble);
  input.value = '';
  chatBox.scrollTop = chatBox.scrollHeight;

  const loadingBubble = document.createElement('div');
  loadingBubble.className = 'chat-bubble bot';
  loadingBubble.textContent = '⏳ Thinking...';
  chatBox.appendChild(loadingBubble);
  chatBox.scrollTop = chatBox.scrollHeight;

 try {
    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyBIT5Drd2kxyoMT536MufX5OPfeeUhzBHA',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are OTHORAB's AI assistant specializing in orthopedic rehabilitation. 
              Answer questions about conditions, devices and recovery. 
              Be friendly, professional and concise.
              Patient question: ${message}`
            }]
          }]
        })
      }
    );
    const data = await response.json();
    loadingBubble.textContent = data.candidates[0].content.parts[0].text;
  } catch (err) {
    loadingBubble.textContent = '❌ AI unavailable. Please contact us on WhatsApp.';
  }
  chatBox.scrollTop = chatBox.scrollHeight;
}

document.getElementById('chatInput')?.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') sendMessage();
});

async function handleLogout() {
  await sb.auth.signOut();
  window.location.href = '../index.html';
}

loadDashboard();
