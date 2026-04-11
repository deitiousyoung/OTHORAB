const SUPABASE_URL = 'https://hfjcdkmpyldlvxweknci.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmamNka21weWxkbHZ4d2VrbmNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5MTEwMTYsImV4cCI6MjA5MTQ4NzAxNn0.NpdwMuolCMME_hGYLMcav1POow6YmurLmn9Bt7_wN4M';
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function handleSignup() {
  const name = document.getElementById('signupName').value;
  const email = document.getElementById('signupEmail').value;
  const phone = document.getElementById('signupPhone').value;
  const password = document.getElementById('signupPassword').value;
  const confirm = document.getElementById('signupConfirm').value;
  const msg = document.getElementById('signupMsg');

  if (!name || !email || !phone || !password || !confirm) {
    showMsg(msg, '⚠️ Please fill in all fields.', 'error'); return;
  }
  if (password !== confirm) {
    showMsg(msg, '⚠️ Passwords do not match.', 'error'); return;
  }

  showMsg(msg, '⏳ Creating account...', 'info');

  const { data, error } = await sb.auth.signUp({ email, password });
  if (error) { showMsg(msg, '❌ ' + error.message, 'error'); return; }

  await sb.from('patients').insert({ name, email, phone });
  showMsg(msg, '✅ Account created! Check your email to confirm.', 'success');
}

async function handleLogin() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  const msg = document.getElementById('loginMsg');

  if (!email || !password) {
    showMsg(msg, '⚠️ Please fill in all fields.', 'error'); return;
  }

  showMsg(msg, '⏳ Logging in...', 'info');

  const { data, error } = await sb.auth.signInWithPassword({ email, password });
  if (error) { showMsg(msg, '❌ ' + error.message, 'error'); return; }

  window.location.href = 'dashboard.html';
}

async function handleLogout() {
  await sb.auth.signOut();
  window.location.href = '../index.html';
}

function showMsg(el, text, type) {
  el.style.display = 'block';
  el.textContent = text;
  if (type === 'error') {
    el.style.background = '#ffe0e0';
    el.style.color = '#cc0000';
  } else if (type === 'success') {
    el.style.background = '#e0fff0';
    el.style.color = '#00aa55';
  } else {
    el.style.background = 'var(--sky-light)';
    el.style.color = 'var(--sky-deeper)';
  }
}
