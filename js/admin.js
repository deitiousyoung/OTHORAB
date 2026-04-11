const SUPABASE_URL = 'https://hfjcdkmpyldlvxweknci.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhmamNka21weWxkbHZ4d2VrbmNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU5MTEwMTYsImV4cCI6MjA5MTQ4NzAxNn0.NpdwMuolCMME_hGYLMcav1POow6YmurLmn9Bt7_wN4M';
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function loadAdmin() {
  // Load appointments
  const { data: appointments } = await sb.from('appointments')
    .select('*').order('created_at', { ascending: false });

  if (appointments) {
    document.getElementById('totalAppointments').textContent = appointments.length;
    document.getElementById('pendingAppointments').textContent =
      appointments.filter(a => a.status === 'pending').length;
    document.getElementById('confirmedAppointments').textContent =
      appointments.filter(a => a.status === 'confirmed').length;

    const tbody = document.getElementById('appointmentsTable');
    if (appointments.length === 0) {
      tbody.innerHTML = '<tr><td colspan="8" style="text-align:center;color:var(--text-muted);padding:2rem">No appointments yet.</td></tr>';
    } else {
      tbody.innerHTML = '';
      appointments.forEach(a => {
        tbody.innerHTML += `
          <tr>
            <td>${a.name}</td>
            <td>${a.email}</td>
            <td>${a.phone}</td>
            <td>${a.condition}</td>
            <td>${a.date}</td>
            <td>${a.time}</td>
            <td><span class="appt-badge ${a.status}">${a.status}</span></td>
            <td>
              <button class="status-btn" onclick="confirmAppt('${a.id}')">Confirm</button>
            </td>
          </tr>`;
      });
    }
  }

  // Load patients
  const { data: patients } = await sb.from('patients')
    .select('*').order('created_at', { ascending: false });

  if (patients) {
    document.getElementById('totalPatients').textContent = patients.length;
    const tbody = document.getElementById('patientsTable');
    if (patients.length === 0) {
      tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:var(--text-muted);padding:2rem">No patients yet.</td></tr>';
    } else {
      tbody.innerHTML = '';
      patients.forEach(p => {
        tbody.innerHTML += `
          <tr>
            <td>${p.name}</td>
            <td>${p.email}</td>
            <td>${p.phone || '-'}</td>
            <td>${new Date(p.created_at).toLocaleDateString()}</td>
            <td><span class="appt-badge confirmed">Active</span></td>
          </tr>`;
      });
    }
  }
}

async function confirmAppt(id) {
  await sb.from('appointments').update({ status: 'confirmed' }).eq('id', id);
  loadAdmin();
}

loadAdmin();
