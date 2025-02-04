// Handle user type change in registration
document.getElementById('regUserType').addEventListener('change', function() {
    const professorFields = document.getElementById('professorFields');
    const studentFields = document.getElementById('studentFields');
    
    if (this.value === 'professor') {
        professorFields.classList.remove('d-none');
        studentFields.classList.add('d-none');
    } else {
        professorFields.classList.add('d-none');
        studentFields.classList.remove('d-none');
    }
});

// Handle Registration Form Submission
document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;
    
    if (password !== confirmPassword) {
        alert('As senhas não coincidem!');
        return;
    }
    
    const userData = {
        name: document.getElementById('regName').value,
        email: document.getElementById('regEmail').value,
        username: document.getElementById('regUsername').value,
        password: password,
        userType: document.getElementById('regUserType').value,
    };
    
    if (userData.userType === 'professor') {
        userData.subject = document.getElementById('regSubject').value;
        userData.registration = document.getElementById('regRegistration').value;
    } else {
        userData.class = document.getElementById('regClass').value;
        userData.studentId = document.getElementById('regStudentId').value;
    }
    
    // Get existing users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Check if username or email already exists
    if (users.some(user => user.username === userData.username)) {
        alert('Nome de usuário já existe!');
        return;
    }
    if (users.some(user => user.email === userData.email)) {
        alert('Email já está cadastrado!');
        return;
    }
    
    // Add new user
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
    
    alert('Cadastro realizado com sucesso! Faça login para continuar.');
    window.location.href = 'index_new.html';
});
