// Modal de Login
document.addEventListener('DOMContentLoaded', function() {
    // Get the modals
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    
    // Get the buttons that open the modals
    const btnStartNow = document.getElementById('btnStartNow');
    const btnRegister = document.querySelector('.btn-secondary');
    
    // Get all elements with class="close-modal"
    const closeButtons = document.getElementsByClassName('close-modal');
    
    // When the user clicks the button, open the corresponding modal
    if (btnStartNow) {
        btnStartNow.onclick = function() {
            loginModal.style.display = 'block';
        }
    }
    
    if (btnRegister) {
        btnRegister.onclick = function(e) {
            e.preventDefault();
            registerModal.style.display = 'block';
        }
    }
    
    // When the user clicks on <span> (x), close the corresponding modal
    Array.from(closeButtons).forEach(button => {
        button.onclick = function() {
            if (loginModal) loginModal.style.display = 'none';
            if (registerModal) registerModal.style.display = 'none';
        }
    });
    
    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == loginModal) {
            loginModal.style.display = 'none';
        }
        if (event.target == registerModal) {
            registerModal.style.display = 'none';
        }
    }
    
    // Handle login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.onsubmit = function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Verificar credenciais e redirecionar baseado no nome de usuário
            if ((username === 'professor' || username === '123') && password === '123') {
                // Salvar dados do usuário no localStorage
                localStorage.setItem('currentUser', JSON.stringify({
                    username: username,
                    userType: 'professor',
                    name: 'Professor',
                    email: 'professor@example.com'
                }));
                window.location.href = 'professor.html';
            } else if (username === 'aluno' && password === '123') {
                // Salvar dados do usuário no localStorage
                localStorage.setItem('currentUser', JSON.stringify({
                    username: username,
                    userType: 'aluno',
                    name: 'Aluno',
                    email: 'aluno@example.com'
                }));
                window.location.href = 'aluno.html';
            } else {
                alert('Usuário ou senha incorretos!\nUse:\nProfessor: usuario="123" ou "professor", senha="123"\nAluno: usuario="aluno", senha="123"');
            }
        }
    }
    
    // Handle registration form submission
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.onsubmit = function(e) {
            e.preventDefault();
            
            // Get all form values
            const formData = {
                fullName: document.getElementById('fullName').value,
                email: document.getElementById('email').value,
                username: document.getElementById('newUsername').value,
                password: document.getElementById('newPassword').value,
                confirmPassword: document.getElementById('confirmPassword').value,
                institution: document.getElementById('institution').value,
                userType: document.querySelector('input[name="userType"]:checked').value
            };
            
            // Validate passwords match
            if (formData.password !== formData.confirmPassword) {
                alert('As senhas não coincidem!');
                return;
            }
            
            // Simulate registration - this is just visual
            console.log('Registration data:', formData);
            alert('Cadastro realizado com sucesso!');
            registerModal.style.display = 'none';
        }
    }
});

// Animação suave para links de navegação
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Links sociais
const socialLinks = {
    facebook: 'https://facebook.com/abilityup',
    twitter: 'https://twitter.com/abilityup',
    youtube: 'https://youtube.com/abilityup',
    linkedin: 'https://linkedin.com/company/abilityup',
    rss: '/blog/feed'
};

document.querySelectorAll('.social-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const social = link.querySelector('i').classList[1].split('-')[1];
        window.open(socialLinks[social], '_blank');
    });
});
