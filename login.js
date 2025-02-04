// Criar usuário padrão se não existir
(function createDefaultUsers() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Verificar se já existe um usuário com username 'aluno'
    if (!users.some(u => u.username === 'aluno')) {
        const defaultStudent = {
            name: 'Aluno Teste',
            email: 'aluno@teste.com',
            username: 'aluno',
            password: '123',
            userType: 'aluno',
            class: '9A',
            studentId: '12345',
            points: 0
        };
        
        users.push(defaultStudent);
        localStorage.setItem('users', JSON.stringify(users));
        console.log('Usuário aluno criado:', defaultStudent);
    }
    
    // Verificar se já existe um usuário com username 'professor'
    if (!users.some(u => u.username === 'professor')) {
        const defaultTeacher = {
            name: 'Professor Teste',
            email: 'professor@teste.com',
            username: 'professor',
            password: '123',
            userType: 'professor',
            subject: 'Matemática',
            registration: '54321'
        };
        
        users.push(defaultTeacher);
        localStorage.setItem('users', JSON.stringify(users));
        console.log('Usuário professor criado:', defaultTeacher);
    }
})();

// Função de login
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    console.log('Tentando login com:', username, password);
    
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    console.log('Usuários encontrados:', users);
    
    // Find user by username and password
    const user = users.find(u => u.username === username && u.password === password);
    console.log('Usuário encontrado:', user);
    
    if (user) {
        // Store current user data
        const userData = {
            name: user.name,
            email: user.email,
            userType: user.userType,
            points: user.points || 0,
            ...(user.userType === 'professor' ? {
                subject: user.subject,
                registration: user.registration
            } : {
                class: user.class,
                studentId: user.studentId
            })
        };
        
        localStorage.setItem('currentUser', JSON.stringify(userData));
        console.log('Dados do usuário salvos:', userData);
        
        // Redirect based on user type
        if (user.userType === 'professor') {
            console.log('Redirecionando para professor.html');
            window.location.href = 'professor.html';
        } else {
            console.log('Redirecionando para aluno.html');
            window.location.href = 'aluno.html';
        }
    } else {
        alert('Usuário ou senha inválidos!');
    }
});
