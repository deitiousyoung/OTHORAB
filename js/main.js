// Search conditions
const searchInput = document.getElementById('searchInput');

if (searchInput) {
  searchInput.addEventListener('input', function () {
    const query = this.value.toLowerCase();
    const cards = document.querySelectorAll('.condition-card');

    cards.forEach(card => {
      const title = card.querySelector('h4').textContent.toLowerCase();
      const desc = card.querySelector('p').textContent.toLowerCase();

      if (title.includes(query) || desc.includes(query)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
}
// Appointment form
function submitAppointment() {
  const name = document.getElementById('fullName')?.value;
  const email = document.getElementById('email')?.value;
  const phone = document.getElementById('phone')?.value;
  const condition = document.getElementById('condition')?.value;
  const date = document.getElementById('date')?.value;

  if (!name || !email || !phone || !condition || !date) {
    alert('Please fill in all required fields.');
    return;
  }

  document.getElementById('successMsg').style.display = 'block';
}
