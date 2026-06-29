// ===== SHOW CURRENT DATE =====
function showDate() {
  const el = document.getElementById('currentDate');
  if (el) {
    const now = new Date();
    el.textContent = now.toDateString();
  }
}
showDate();

// ===== MARK ACTIVE NAV LINK =====
function setActiveNav() {
  const links = document.querySelectorAll('.nav-link');
  const current = window.location.pathname.split('/').pop();
  links.forEach(link => {
    const href = link.getAttribute('href').split('/').pop();
    if (href === current) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}
setActiveNav();

// ===== MODAL HELPERS =====
function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add('open');
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.remove('open');
}

// Close modal on overlay click
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) {
      overlay.classList.remove('open');
    }
  });
});

// ===== SEARCH TABLE =====
function searchTable(inputId, tableId) {
  const input = document.getElementById(inputId);
  if (!input) return;

  input.addEventListener('input', function () {
    const query = this.value.toLowerCase();
    const rows = document.querySelectorAll('#' + tableId + ' tbody tr');
    rows.forEach(row => {
      const text = row.textContent.toLowerCase();
      row.style.display = text.includes(query) ? '' : 'none';
    });
  });
}

// ===== DELETE ROW =====
function deleteRow(btn) {
  const row = btn.closest('tr');
  if (row && confirm('Are you sure you want to delete this record?')) {
    row.remove();
  }
}

// ===== ADD STUDENT (Students page) =====
function setupStudentForm() {
  const form = document.getElementById('studentForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const name    = document.getElementById('sName').value.trim();
    const roll    = document.getElementById('sRoll').value.trim();
    const cls     = document.getElementById('sClass').value.trim();
    const email   = document.getElementById('sEmail').value.trim();

    if (!name || !roll || !cls || !email) {
      alert('Please fill all fields.');
      return;
    }

    const tbody = document.querySelector('#studentsTable tbody');
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${roll}</td>
      <td>${name}</td>
      <td>${cls}</td>
      <td>${email}</td>
      <td>
        <button class="btn-edit" onclick="alert('Edit coming soon!')">Edit</button>
        <button class="btn-danger" onclick="deleteRow(this)">Delete</button>
      </td>
    `;
    tbody.prepend(tr);
    form.reset();
    closeModal('addStudentModal');
  });
}

// ===== ADD EXAM (Exams page) =====
function setupExamForm() {
  const form = document.getElementById('examForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const name    = document.getElementById('eName').value.trim();
    const subject = document.getElementById('eSubject').value.trim();
    const date    = document.getElementById('eDate').value;
    const students= document.getElementById('eStudents').value.trim();
    const status  = document.getElementById('eStatus').value;

    if (!name || !subject || !date || !students) {
      alert('Please fill all fields.');
      return;
    }

    const badgeMap = {
      Upcoming: 'badge-upcoming',
      Ongoing:  'badge-ongoing',
      Completed:'badge-done'
    };

    const tbody = document.querySelector('#examsTable tbody');
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${name}</td>
      <td>${subject}</td>
      <td>${date}</td>
      <td>${students}</td>
      <td><span class="badge ${badgeMap[status]}">${status}</span></td>
      <td>
        <button class="btn-edit" onclick="alert('Edit coming soon!')">Edit</button>
        <button class="btn-danger" onclick="deleteRow(this)">Delete</button>
      </td>
    `;
    tbody.prepend(tr);
    form.reset();
    closeModal('addExamModal');
  });
}

// ===== ADD RESULT (Results page) =====
function setupResultForm() {
  const form = document.getElementById('resultForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const student = document.getElementById('rStudent').value.trim();
    const exam    = document.getElementById('rExam').value.trim();
    const marks   = parseInt(document.getElementById('rMarks').value);
    const total   = parseInt(document.getElementById('rTotal').value);

    if (!student || !exam || isNaN(marks) || isNaN(total)) {
      alert('Please fill all fields.');
      return;
    }

    const percent = ((marks / total) * 100).toFixed(1);
    const status  = percent >= 40 ? '<span class="badge badge-pass">Pass</span>' : '<span class="badge badge-fail">Fail</span>';

    const tbody = document.querySelector('#resultsTable tbody');
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${student}</td>
      <td>${exam}</td>
      <td>${marks} / ${total}</td>
      <td>${percent}%</td>
      <td>${status}</td>
      <td><button class="btn-danger" onclick="deleteRow(this)">Delete</button></td>
    `;
    tbody.prepend(tr);
    form.reset();
    closeModal('addResultModal');
  });
}

// ===== INIT ALL =====
document.addEventListener('DOMContentLoaded', function () {
  setupStudentForm();
  setupExamForm();
  setupResultForm();
  searchTable('searchStudents', 'studentsTable');
  searchTable('searchExams', 'examsTable');
  searchTable('searchResults', 'resultsTable');
});