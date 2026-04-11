// We'll connect Supabase here later
function handleLogin() {
  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;
  const msg = document.getElementById('loginMsg');

  if (!email || !password) {
    msg.style.display = 'block';
    msg.textContent = '⚠️ Please fill in all fields.';
    msg.style.background = '#ffe0e0';
    msg.style.color = '#cc0000';
    return;
  }

  msg.style.display = 'block';
  msg.textContent = '⏳ Logging in...';
  msg.style.background = 'var(--sky-light)';
  msg.style.color = 'var(--sky-deeper)';
}

function handleSignup() {
  const name = document.getElementById('signupName').value;
  const email = document.getElementById('signupEmail').value;
  const phone = document.getElementById('signupPhone').value;
  const password = document.getElementById('signupPassword').value;
  const confirm = document.getElementById('signupConfirm').value;
  const msg = document.getElementById('signupMsg');

  if (!name || !email || !phone || !password || !confirm) {
    msg.style.display = 'block';
    msg.textContent = '⚠️ Please fill in all fields.';
    msg.style.background = '#ffe0e0';
    msg.style.color = '#cc0000';
    return;
  }

  if (password !== confirm) {
    msg.style.display = 'block';
    msg.textContent = '⚠️ Passwords do not match.';
    msg.style.background = '#ffe0e0';
    msg.style.color = '#cc0000';
    return;
  }

  msg.style.display = 'block';
  msg.textContent = '⏳ Creating account...';
  msg.style.background = 'var(--sky-light)';
  msg.style.color = 'var(--sky-deeper)';
}
