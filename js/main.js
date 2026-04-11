const SUPABASE_URL = 'https://hfjcdkmpyldlvxweknci.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmamNka21weWxkbHZ4d2VrbmNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5MTEwMTYsImV4cCI6MjA5MTQ4NzAxNn0.NpdwMuolCMME_hGYLMcav1POow6YmurLmn9Bt7_wN4M';

let sb;
if (typeof supabase !== 'undefined') {
  sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

// Search conditions
const searchInput = document.getElementById('searchInput');
if (searchInput) {
  searchInput.addEventListener('input', function () {
    const query = this.value.toLowerCase();
    const cards = document.querySelectorAll('.condition-card');
    cards.forEach(card => {
      const title = card.querySelector('h4').textContent.toLowerCase();
      const desc = card.querySelector('p').textContent.toLowerCase();
      card.style.display = (title.includes(query) || desc.includes(query)) ? 'block' : 'none';
    });
  });
}

// Search devices
const deviceSearch = document.getElementById('deviceSearch');
if (deviceSearch) {
  deviceSearch.addEventListener('input', function () {
    const query = this.value.toLowerCase();
    const cards = document.querySelectorAll('.device-card');
    cards.forEach(card => {
      const title = card.querySelector('h4').textContent.toLowerCase();
      card.style.display = title.includes(query) ? 'block' : 'none';
    });
  });
}

// Appointment form
async function submitAppointment() {
  const name = document.getElementById('fullName').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const age = document.getElementById('age').value;
  const condition = document.getElementById('condition').value;
  const date = document.getElementById('date').value;
  const time = document.getElementById('time').value;
  const notes = document.getElementById('notes').value;
  const msg = document.getElementById('successMsg');

  if (!name || !email || !phone || !condition || !date) {
    msg.style.display = 'block';
    msg.textContent = '⚠️ Please fill in all required fields.';
    msg.style.background = '#ffe0e0';
    msg.style.color = '#cc0000';
    return;
  }

  msg.style.display = 'block';
  msg.textContent = '⏳ Submitting...';
  msg.style.background = 'var(--sky-light)';
  msg.style.color = 'var(--sky-deeper)';

  const { error } = await sb.from('appointments').insert({
    name, email, phone, age, condition, date, time, notes, status: 'pending'
  });

  if (error) {
    msg.textContent = '❌ Error: ' + error.message;
    msg.style.background = '#ffe0e0';
    msg.style.color = '#cc0000';
  } else {
    msg.textContent = '✅ Appointment booked! We will contact you shortly.';
    msg.style.background = '#e0fff0';
    msg.style.color = '#00aa55';
  }
}
