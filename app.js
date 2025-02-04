// Gerenciamento de estado
let currentUser = null;
let contents = JSON.parse(localStorage.getItem('contents')) || [];
let presentations = JSON.parse(localStorage.getItem('presentations')) || [];
let users = JSON.parse(localStorage.getItem('users')) || [
    { username: 'professor', password: '123', type: 'professor' },
    { username: 'aluno', password: '123', type: 'aluno' }
];

// Função para gerar nomes aleatórios
function generateRandomName() {
    const firstNames = [
        'João', 'Maria', 'Pedro', 'Ana', 'Lucas', 'Julia', 'Gabriel', 'Beatriz', 'Rafael', 'Isabella',
        'Miguel', 'Sofia', 'Arthur', 'Helena', 'Bernardo', 'Valentina', 'Heitor', 'Laura', 'Davi', 'Lívia',
        'Lorenzo', 'Manuela', 'Théo', 'Luiza', 'Nicolas', 'Alice', 'Daniel', 'Sophia', 'Henry', 'Júlia'
    ];
    
    const lastNames = [
        'Silva', 'Santos', 'Oliveira', 'Souza', 'Ferreira', 'Lima', 'Costa', 'Alves', 'Martins', 'Rodrigues',
        'Pereira', 'Carvalho', 'Gomes', 'Ribeiro', 'Almeida', 'Mendes', 'Barbosa', 'Pinto', 'Moreira', 'Cardoso'
    ];
    
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    
    return `${firstName} ${lastName}`;
}

// Função para gerar ranking simulado
function generateSimulatedRanking() {
    const classes = ['9º Ano A', '9º Ano B', '9º Ano C', '9º Ano D'];
    let simulatedRanking = [];
    
    classes.forEach(className => {
        // Gerar 30 alunos para cada turma
        for (let i = 0; i < 30; i++) {
            // Gerar pontuação base entre 500 e 1000
            const basePoints = Math.floor(Math.random() * (1000 - 500 + 1)) + 500;
            // Adicionar variação para criar mais diversidade
            const variation = Math.floor(Math.random() * 200) - 100;
            const points = basePoints + variation;
            
            simulatedRanking.push({
                name: `${className.split(' ')[0]} - ${generateRandomName()}`,
                points: points,
                class: className
            });
        }
    });
    
    // Ordenar por pontuação
    simulatedRanking.sort((a, b) => b.points - a.points);
    
    return simulatedRanking;
}

// Gerar ranking simulado
let rankingData = generateSimulatedRanking();
localStorage.setItem('rankingData', JSON.stringify(rankingData));

// Variáveis para gerenciamento de slides
let slides = [];
let currentSlideId = 0;

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    console.log('Bootstrap:', typeof bootstrap);
    console.log('Bootstrap Modal:', typeof bootstrap.Modal);
    
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const userType = document.getElementById('userType').value;
            
            const user = users.find(u => u.username === username && u.password === password && u.type === userType);
            
            if (user) {
                currentUser = user;
                showDashboard(user.type);
            } else {
                alert('Usuário ou senha inválidos!');
            }
        });
    } else {
        console.error('Login form not found');
    }
});

// Funções de navegação
function showDashboard(type) {
    // Esconder página de login
    document.getElementById('loginPage').classList.add('d-none');
    
    // Esconder todos os dashboards
    document.getElementById('professorDashboard').classList.add('d-none');
    document.getElementById('studentDashboard').classList.add('d-none');
    
    // Mostrar dashboard apropriado
    if (type === 'professor') {
        document.getElementById('professorDashboard').classList.remove('d-none');
        loadProfessorContent();
        updateRanking('rankingList'); // Carregar ranking para professor
    } else if (type === 'aluno') {
        document.getElementById('studentDashboard').classList.remove('d-none');
        loadStudentContent();
        updateRanking('studentRanking'); // Carregar ranking para aluno
    }
}

function logout() {
    currentUser = null;
    // Esconder dashboards
    document.getElementById('professorDashboard').classList.add('d-none');
    document.getElementById('studentDashboard').classList.add('d-none');
    // Mostrar página de login
    document.getElementById('loginPage').classList.remove('d-none');
}

// Funções do Professor
function showCreateContent() {
    const modalElement = document.getElementById('contentGeneratorModal');
    if (!modalElement) {
        console.error('Modal element not found');
        return;
    }

    // Initialize modal
    const modal = new bootstrap.Modal(modalElement);
    
    // Clear existing slides
    slides = [];
    currentSlideId = 0;

    // Reset form fields
    document.getElementById('presentationTitle').value = '';
    document.getElementById('presentationTheme').value = 'default';
    document.getElementById('presentationLayout').value = 'modern';

    // Clear slides list and preview
    const slidesList = document.getElementById('slidesList');
    const slidePreview = document.getElementById('slidePreview');
    
    if (slidesList) {
        slidesList.innerHTML = '';
    }
    
    if (slidePreview) {
        slidePreview.innerHTML = `
            <div class="text-center text-muted">
                <i class="fas fa-desktop fa-3x mb-2"></i>
                <p>Selecione um slide para visualizar</p>
            </div>
        `;
    }

    // Show modal
    modal.show();
}

function addQuizQuestion() {
    const quizQuestions = document.getElementById('quizQuestions');
    const questionDiv = document.createElement('div');
    questionDiv.className = 'quiz-question mb-3';
    questionDiv.innerHTML = `
        <input type="text" class="form-control mb-2" placeholder="Pergunta" required>
        <input type="text" class="form-control mb-2" placeholder="Alternativa A" required>
        <input type="text" class="form-control mb-2" placeholder="Alternativa B" required>
        <input type="text" class="form-control mb-2" placeholder="Alternativa C" required>
        <input type="text" class="form-control mb-2" placeholder="Alternativa D" required>
        <select class="form-control" required>
            <option value="">Selecione a resposta correta</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
        </select>
        <input type="number" class="form-control mt-2" placeholder="Pontos" min="1" required>
    `;
    quizQuestions.appendChild(questionDiv);
}

function saveContent() {
    const title = document.getElementById('contentTitle').value;
    const text = document.getElementById('contentText').value;
    const quizQuestions = Array.from(document.querySelectorAll('.quiz-question')).map(q => {
        const inputs = q.querySelectorAll('input');
        const select = q.querySelector('select');
        return {
            question: inputs[0].value,
            options: {
                A: inputs[1].value,
                B: inputs[2].value,
                C: inputs[3].value,
                D: inputs[4].value
            },
            correctAnswer: select.value,
            points: parseInt(inputs[5].value)
        };
    });

    const content = {
        id: Date.now(),
        title,
        text,
        quiz: quizQuestions,
        feedback: [],
        submissions: []
    };

    contents.push(content);
    localStorage.setItem('contents', JSON.stringify(contents));
    loadProfessorContent();
    
    const modal = bootstrap.Modal.getInstance(document.getElementById('createContentModal'));
    modal.hide();
}

function loadProfessorContent() {
    const contentList = document.getElementById('contentList');
    contentList.innerHTML = contents.map(content => `
        <div class="content-card">
            <h4>${content.title}</h4>
            <p>${content.text.substring(0, 200)}...</p>
            <div class="d-flex justify-content-between">
                <span>${content.quiz.length} questões</span>
                <span>${content.submissions.length} respostas</span>
            </div>
            <div class="feedback-section">
                <h6>Feedback (${content.feedback.length})</h6>
                ${content.feedback.map(f => `<p>${f}</p>`).join('')}
            </div>
        </div>
    `).join('');
}

function savePresentation() {
    const title = document.getElementById('presentationTitle').value;
    const theme = document.getElementById('presentationTheme').value;
    const layout = document.getElementById('presentationLayout').value;
    
    if (!title) {
        alert('Por favor, insira um título para a apresentação.');
        return;
    }

    if (slides.length === 0) {
        alert('Por favor, adicione pelo menos um slide.');
        return;
    }
    
    const presentation = {
        id: Date.now(),
        title,
        theme,
        layout,
        slides: [...slides],
        createdBy: currentUser.username,
        createdAt: new Date().toISOString()
    };
    
    // Adicionar à lista de apresentações
    presentations.push(presentation);
    localStorage.setItem('presentations', JSON.stringify(presentations));
    
    // Fechar modal
    const modal = bootstrap.Modal.getInstance(document.getElementById('contentGeneratorModal'));
    modal.hide();
    
    // Mostrar mensagem de sucesso
    alert('Apresentação salva com sucesso!');
    
    // Recarregar conteúdo
    if (currentUser.type === 'professor') {
        loadProfessorContent();
    } else {
        loadStudentContent();
    }
}

function loadProfessorContent() {
    const contentList = document.getElementById('contentList');
    contentList.innerHTML = '';
    
    // Carregar apresentações
    presentations.forEach(presentation => {
        const card = document.createElement('div');
        card.className = 'card mb-3';
        card.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${presentation.title}</h5>
                <p class="card-text">
                    <small class="text-muted">
                        Criado em: ${new Date(presentation.createdAt).toLocaleDateString()}
                        <br>
                        ${presentation.slides.length} slides
                    </small>
                </p>
                <div class="btn-group">
                    <button class="btn btn-primary" onclick="viewPresentation(${presentation.id})">
                        <i class="fas fa-eye"></i> Visualizar
                    </button>
                    <button class="btn btn-warning" onclick="editPresentation(${presentation.id})">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                    <button class="btn btn-danger" onclick="deletePresentation(${presentation.id})">
                        <i class="fas fa-trash"></i> Excluir
                    </button>
                </div>
            </div>
        `;
        contentList.appendChild(card);
    });
}

function loadStudentContent() {
    const availableContent = document.getElementById('availableContent');
    availableContent.innerHTML = '<h3>Conteúdos Disponíveis</h3>';
    
    // Carregar apresentações
    presentations.forEach(presentation => {
        const card = document.createElement('div');
        card.className = 'card mb-3';
        card.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${presentation.title}</h5>
                <p class="card-text">
                    <small class="text-muted">
                        ${presentation.slides.length} slides
                    </small>
                </p>
                <button class="btn btn-primary" onclick="viewPresentation(${presentation.id})">
                    <i class="fas fa-eye"></i> Visualizar
                </button>
            </div>
        `;
        availableContent.appendChild(card);
    });
}

function viewPresentation(id) {
    const presentation = presentations.find(p => p.id === id);
    if (!presentation) return;
    
    // Criar modal de visualização
    const modal = document.createElement('div');
    modal.className = 'modal fade';
    modal.id = 'presentationViewModal';
    modal.innerHTML = `
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">${presentation.title}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div class="d-flex justify-content-between mb-3">
                        <button class="btn btn-primary" onclick="previousSlide()">
                            <i class="fas fa-chevron-left"></i> Anterior
                        </button>
                        <span id="slideCounter">Slide 1/${presentation.slides.length}</span>
                        <button class="btn btn-primary" onclick="nextSlide()">
                            Próximo <i class="fas fa-chevron-right"></i>
                        </button>
                    </div>
                    <div id="slideContent"></div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Inicializar visualização
    window.currentPresentationData = {
        presentation,
        currentSlideIndex: 0
    };
    
    showSlide(0);
    
    // Mostrar modal
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
    
    // Limpar modal quando fechado
    modal.addEventListener('hidden.bs.modal', function () {
        document.body.removeChild(modal);
        delete window.currentPresentationData;
    });
}

function showSlide(index) {
    const { presentation, currentSlideIndex } = window.currentPresentationData;
    const slide = presentation.slides[index];
    
    // Atualizar contador
    document.getElementById('slideCounter').textContent = `Slide ${index + 1}/${presentation.slides.length}`;
    
    // Mostrar conteúdo do slide
    const slideContent = document.getElementById('slideContent');
    slideContent.innerHTML = '';
    
    switch (slide.type) {
        case 'title':
            slideContent.innerHTML = `
                <div class="text-center">
                    <h1>${slide.title || ''}</h1>
                    <h3>${slide.subtitle || ''}</h3>
                </div>
            `;
            break;
            
        case 'content':
            slideContent.innerHTML = `
                <h2>${slide.title || ''}</h2>
                <div>${slide.content || ''}</div>
            `;
            break;
            
        case 'image':
            slideContent.innerHTML = `
                <div class="text-center">
                    <img src="${slide.imageUrl || ''}" class="img-fluid" alt="Slide Image">
                    <p class="mt-3">${slide.caption || ''}</p>
                </div>
            `;
            break;
            
        case 'quiz':
            slideContent.innerHTML = `
                <h2>${slide.question || ''}</h2>
                <div class="mt-3">
                    ${slide.options.map((option, i) => `
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="quizOption" value="${i}">
                            <label class="form-check-label">${option}</label>
                        </div>
                    `).join('')}
                </div>
            `;
            break;
    }
}

function previousSlide() {
    if (window.currentPresentationData.currentSlideIndex > 0) {
        window.currentPresentationData.currentSlideIndex--;
        showSlide(window.currentPresentationData.currentSlideIndex);
    }
}

function nextSlide() {
    if (window.currentPresentationData.currentSlideIndex < window.currentPresentationData.presentation.slides.length - 1) {
        window.currentPresentationData.currentSlideIndex++;
        showSlide(window.currentPresentationData.currentSlideIndex);
    }
}

function deletePresentation(id) {
    if (confirm('Tem certeza que deseja excluir esta apresentação?')) {
        presentations = presentations.filter(p => p.id !== id);
        localStorage.setItem('presentations', JSON.stringify(presentations));
        loadProfessorContent();
    }
}

// Funções do Aluno
function loadStudentContent() {
    const availableContent = document.getElementById('availableContent');
    if (!availableContent) {
        console.error('availableContent element not found');
        return;
    }
    
    availableContent.innerHTML = '<h3>Conteúdos Disponíveis</h3>';
    
    // Carregar apresentações
    if (presentations.length === 0) {
        availableContent.innerHTML += '<p class="text-muted">Nenhum conteúdo disponível no momento.</p>';
    } else {
        presentations.forEach(presentation => {
            const card = document.createElement('div');
            card.className = 'card mb-3';
            card.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${presentation.title}</h5>
                    <p class="card-text">
                        <small class="text-muted">
                            ${presentation.slides.length} slides
                        </small>
                    </p>
                    <button class="btn btn-primary" onclick="viewPresentation(${presentation.id})">
                        <i class="fas fa-eye"></i> Visualizar
                    </button>
                </div>
            `;
            availableContent.appendChild(card);
        });
    }
}

// Função unificada de ranking
function updateRanking(elementId) {
    const rankingElement = document.getElementById(elementId);
    if (!rankingElement) {
        console.error(`Element ${elementId} not found`);
        return;
    }
    
    // Ordenar ranking por pontos
    const sortedRanking = [...rankingData].sort((a, b) => b.points - a.points);
    
    // Agrupar por turma
    const rankingByClass = {};
    sortedRanking.forEach(student => {
        if (!rankingByClass[student.class]) {
            rankingByClass[student.class] = [];
        }
        rankingByClass[student.class].push(student);
    });
    
    // Criar HTML do ranking
    let rankingHTML = '';
    
    // Para professor, mostrar todas as turmas
    if (elementId === 'rankingList') {
        Object.entries(rankingByClass).forEach(([className, students]) => {
            rankingHTML += `
                <div class="ranking-section mb-4">
                    <h4 class="ranking-title">${className}</h4>
                    <div class="list-group">
                        ${students.map((student, index) => `
                            <div class="list-group-item d-flex justify-content-between align-items-center">
                                <span>
                                    <strong>#${index + 1}</strong> ${student.name}
                                </span>
                                <span class="badge bg-primary rounded-pill">${student.points} pts</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        });
    }
    // Para aluno, mostrar apenas sua turma e destacar sua posição
    else {
        const userClass = '9º Ano A'; // Simulando que o aluno é do 9º Ano A
        const classStudents = rankingByClass[userClass] || [];
        
        rankingHTML = `
            <div class="list-group">
                ${classStudents.map((student, index) => `
                    <div class="list-group-item d-flex justify-content-between align-items-center
                        ${student.name === currentUser.username ? 'list-group-item-info' : ''}">
                        <span>
                            <strong>#${index + 1}</strong> ${student.name}
                            ${student.name === currentUser.username ? ' (Você)' : ''}
                        </span>
                        <span class="badge bg-primary rounded-pill">${student.points} pts</span>
                    </div>
                `).join('')}
            </div>
        `;
    }
    
    rankingElement.innerHTML = rankingHTML;
}

function startQuiz(contentId) {
    const content = contents.find(c => c.id === contentId);
    if (!content) return;

    const availableContent = document.getElementById('availableContent');
    availableContent.innerHTML = `
        <div class="quiz-container">
            <h3>${content.title} - Quiz</h3>
            <form id="quizForm">
                ${content.quiz.map((q, i) => `
                    <div class="quiz-question">
                        <p><strong>${i + 1}. ${q.question}</strong> (${q.points} pontos)</p>
                        ${Object.entries(q.options).map(([key, value]) => `
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="q${i}" value="${key}" required>
                                <label class="form-check-label">${key}) ${value}</label>
                            </div>
                        `).join('')}
                    </div>
                `).join('')}
                <button type="submit" class="btn btn-primary mt-3">Enviar Respostas</button>
            </form>
        </div>
    `;

    document.getElementById('quizForm').addEventListener('submit', function(e) {
        e.preventDefault();
        submitQuiz(content);
    });
}

function submitQuiz(content) {
    const answers = content.quiz.map((_, i) => {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        return selected ? selected.value : null;
    });

    let totalPoints = 0;
    const results = content.quiz.map((q, i) => {
        const correct = q.correctAnswer === answers[i];
        if (correct) totalPoints += q.points;
        return { correct, points: correct ? q.points : 0 };
    });

    content.submissions.push({
        user: currentUser.username,
        points: totalPoints,
        timestamp: Date.now()
    });

    localStorage.setItem('contents', JSON.stringify(contents));

    showQuizResults(results, totalPoints);
    updateRanking('studentRanking');
}

function showQuizResults(results, totalPoints) {
    const availableContent = document.getElementById('availableContent');
    availableContent.innerHTML = `
        <div class="quiz-result">
            <h3>Resultado do Quiz</h3>
            <p>Pontuação Total: ${totalPoints} pontos</p>
            <p>Acertos: ${results.filter(r => r.correct).length} de ${results.length}</p>
            <button class="btn btn-primary" onclick="loadStudentContent()">Voltar para Conteúdos</button>
        </div>
    `;
}

// Funções de IA
function generateAIContent() {
    const modalElement = document.getElementById('aiGeneratorModal');
    if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
    } else {
        console.error('Modal element not found');
        alert('Erro ao abrir o modal. Por favor, tente novamente.');
    }
}

async function generateContent() {
    const topic = document.getElementById('aiTopic').value;
    if (!topic) {
        alert('Por favor, digite um tópico');
        return;
    }

    const responseDiv = document.getElementById('aiResponse');
    try {
        responseDiv.innerHTML = '<div class="text-center"><div class="spinner-border text-primary" role="status"></div><p class="mt-2">Gerando conteúdo...</p></div>';
        const content = await generateEducationalContent(topic);
        responseDiv.innerHTML = `
            <div class="mb-3">
                <small class="text-muted">Resposta gerada com sucesso!</small>
            </div>
            ${content.replace(/\n/g, '<br>')}
        `;
    } catch (error) {
        responseDiv.innerHTML = `
            <div class="alert alert-danger">
                <strong>Erro:</strong> ${error.message}
                ${error.message.includes('OpenAI') ? '<br><small>Tentando com API alternativa...</small>' : ''}
            </div>
        `;
        console.error(error);
    }
}

async function askQuestion() {
    const question = document.getElementById('aiTopic').value;
    if (!question) {
        alert('Por favor, digite sua pergunta');
        return;
    }

    const responseDiv = document.getElementById('aiResponse');
    try {
        responseDiv.innerHTML = '<div class="text-center"><div class="spinner-border text-primary" role="status"></div><p class="mt-2">Gerando resposta...</p></div>';
        const answer = await answerQuestion(question);
        responseDiv.innerHTML = `
            <div class="mb-3">
                <small class="text-muted">Resposta gerada com sucesso!</small>
            </div>
            ${answer.replace(/\n/g, '<br>')}
        `;
    } catch (error) {
        responseDiv.innerHTML = `
            <div class="alert alert-danger">
                <strong>Erro:</strong> ${error.message}
                ${error.message.includes('OpenAI') ? '<br><small>Tentando com API alternativa...</small>' : ''}
            </div>
        `;
        console.error(error);
    }
}

function showFAQ() {
    // Create modal HTML
    const modalHTML = `
        <div class="modal fade" id="faqModal" tabindex="-1" aria-labelledby="faqModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="faqModalLabel">Dúvidas Frequentes</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <div class="accordion" id="faqAccordion">
                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#faq1">
                                        Como criar um novo simulado?
                                    </button>
                                </h2>
                                <div id="faq1" class="accordion-collapse collapse show" data-bs-parent="#faqAccordion">
                                    <div class="accordion-body">
                                        Clique no botão "Novo Simulado" na seção de simulados. Você pode editar o título, 
                                        conteúdo e as questões do quiz clicando no botão "Editar".
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq2">
                                        Como duplicar um simulado existente?
                                    </button>
                                </h2>
                                <div id="faq2" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                    <div class="accordion-body">
                                        Clique no botão "Duplicar" ao lado do simulado que deseja copiar. Uma cópia exata 
                                        será criada logo abaixo do simulado original.
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq3">
                                        Como editar um simulado?
                                    </button>
                                </h2>
                                <div id="faq3" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                    <div class="accordion-body">
                                        Clique no botão "Editar" do simulado desejado. O título e conteúdo se tornarão 
                                        editáveis. Faça as alterações necessárias e clique em "Salvar" quando terminar.
                                    </div>
                                </div>
                            </div>
                            <div class="accordion-item">
                                <h2 class="accordion-header">
                                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#faq4">
                                        Como excluir um simulado?
                                    </button>
                                </h2>
                                <div id="faq4" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                                    <div class="accordion-body">
                                        Clique no botão "Excluir" do simulado que deseja remover. Uma confirmação será 
                                        solicitada antes da exclusão definitiva.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Remove existing modal if any
    const existingModal = document.getElementById('faqModal');
    if (existingModal) {
        existingModal.remove();
    }

    // Add modal to document
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Show modal
    const modal = new bootstrap.Modal(document.getElementById('faqModal'));
    modal.show();
}

function showAskQuestion() {
    const modalElement = document.getElementById('aiGeneratorModal');
    if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
    } else {
        console.error('Modal element not found');
        alert('Erro ao abrir o modal. Por favor, tente novamente.');
    }
}

function showRanking() {
    // Implementação futura
    alert('Funcionalidade em desenvolvimento');
}

function showFeedback() {
    // Implementação futura
    alert('Funcionalidade em desenvolvimento');
}

// Function to format time as HH:MM:SS
function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

// Function to populate ranking with simulated data
function populateRanking() {
    const rankingList = document.getElementById('rankingList');
    if (!rankingList) return;

    // Clear existing content
    rankingList.innerHTML = '';

    // Generate 100 students with random scores and times
    const students = [];
    const firstNames = ['Ana', 'João', 'Maria', 'Pedro', 'Lucas', 'Julia', 'Gabriel', 'Beatriz', 'Rafael', 'Laura'];
    const lastNames = ['Silva', 'Santos', 'Oliveira', 'Souza', 'Pereira', 'Ferreira', 'Rodrigues', 'Almeida', 'Lima', 'Gomes'];

    for (let i = 0; i < 100; i++) {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const score = Math.floor(Math.random() * 100) + 200; // Scores between 200-300
        const timeInSeconds = Math.floor(Math.random() * 3600) + 3600; // Times between 1-2 hours

        students.push({
            name: `${firstName} ${lastName}`,
            score: score,
            time: timeInSeconds
        });
    }

    // Sort students by score (descending) and time (ascending)
    students.sort((a, b) => {
        if (b.score !== a.score) {
            return b.score - a.score;
        }
        return a.time - b.time;
    });

    // Create ranking items
    students.forEach((student, index) => {
        const position = index + 1;
        const rankingItem = document.createElement('div');
        rankingItem.className = 'ranking-item';
        
        rankingItem.innerHTML = `
            <div class="ranking-position">${position}</div>
            <div class="ranking-user">
                <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(student.name)}&background=random" alt="${student.name}">
                <span>${student.name}</span>
            </div>
            <div class="ranking-score">${student.score}</div>
            <div class="ranking-time">${formatTime(student.time)}</div>
        `;

        rankingList.appendChild(rankingItem);
    });
}

// Call populateRanking when the professor dashboard is shown
document.addEventListener('DOMContentLoaded', () => {
    // Existing event listeners...
});

// Presentation Management
function addNewSlide(type) {
    currentSlideId++;
    const slide = {
        id: currentSlideId,
        type: type,
        content: '',
        image: null,
        options: type === 'quiz' ? [
            { text: 'Opção 1', correct: false },
            { text: 'Opção 2', correct: false },
            { text: 'Opção 3', correct: false },
            { text: 'Opção 4', correct: false }
        ] : null
    };
    
    slides.push(slide);
    
    const slideHTML = createSlideHTML(slide);
    document.getElementById('slidesList').insertAdjacentHTML('beforeend', slideHTML);
    
    // Select the new slide
    selectSlide(currentSlideId);
}

function createSlideHTML(slide) {
    let content = '';
    switch(slide.type) {
        case 'title':
            content = `
                <div class="slide-content">
                    <input type="text" class="form-control mb-2" placeholder="Título do Slide" 
                           onchange="updateSlideContent(${slide.id}, 'title', this.value)">
                    <textarea class="form-control" placeholder="Subtítulo ou descrição"
                            onchange="updateSlideContent(${slide.id}, 'subtitle', this.value)"></textarea>
                </div>
            `;
            break;
            
        case 'content':
            content = `
                <div class="slide-content">
                    <input type="text" class="form-control mb-2" placeholder="Título da Seção"
                           onchange="updateSlideContent(${slide.id}, 'title', this.value)">
                    <textarea class="form-control" placeholder="Conteúdo do slide..."
                            onchange="updateSlideContent(${slide.id}, 'content', this.value)"></textarea>
                </div>
            `;
            break;
            
        case 'image':
            content = `
                <div class="slide-content">
                    <input type="text" class="form-control mb-2" placeholder="Título da Imagem"
                           onchange="updateSlideContent(${slide.id}, 'title', this.value)">
                    <div class="image-upload-area" onclick="triggerImageUpload(${slide.id})">
                        <i class="fas fa-cloud-upload-alt fa-2x mb-2"></i>
                        <p>Clique para fazer upload de uma imagem</p>
                        <input type="file" id="image-upload-${slide.id}" class="d-none" 
                               accept="image/*" onchange="handleImageUpload(${slide.id}, this)">
                    </div>
                    <textarea class="form-control mt-2" placeholder="Descrição da imagem"
                            onchange="updateSlideContent(${slide.id}, 'description', this.value)"></textarea>
                </div>
            `;
            break;
            
        case 'quiz':
            content = `
                <div class="slide-content">
                    <input type="text" class="form-control mb-2" placeholder="Pergunta"
                           onchange="updateSlideContent(${slide.id}, 'question', this.value)">
                    <div class="quiz-options">
                        ${slide.options.map((option, index) => `
                            <div class="quiz-option">
                                <input type="radio" name="correct-${slide.id}" 
                                       onchange="setCorrectAnswer(${slide.id}, ${index})">
                                <input type="text" class="form-control" placeholder="Opção ${index + 1}"
                                       onchange="updateQuizOption(${slide.id}, ${index}, this.value)">
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            break;
    }
    
    return `
        <div class="slide-item" id="slide-${slide.id}" onclick="selectSlide(${slide.id})">
            <div class="slide-actions">
                <button class="btn btn-sm btn-outline-danger" onclick="deleteSlide(${slide.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
            <h6>Slide ${slide.id} - ${getSlideTypeName(slide.type)}</h6>
            ${content}
        </div>
    `;
}

function getSlideTypeName(type) {
    const types = {
        title: 'Título',
        content: 'Conteúdo',
        image: 'Imagem',
        quiz: 'Quiz'
    };
    return types[type] || type;
}

function selectSlide(id) {
    // Remove active class from all slides
    document.querySelectorAll('.slide-item').forEach(item => item.classList.remove('active'));
    
    // Add active class to selected slide
    const selectedSlide = document.getElementById(`slide-${id}`);
    if (selectedSlide) {
        selectedSlide.classList.add('active');
        updatePreview(id);
    }
}

function updatePreview(id) {
    const slide = slides.find(s => s.id === id);
    if (!slide) return;
    
    const preview = document.getElementById('slidePreview');
    let previewHTML = '';
    
    switch(slide.type) {
        case 'title':
            previewHTML = `
                <div class="text-center">
                    <h2>${slide.title || 'Título do Slide'}</h2>
                    <p class="lead">${slide.subtitle || 'Subtítulo ou descrição'}</p>
                </div>
            `;
            break;
            
        case 'content':
            previewHTML = `
                <div>
                    <h3>${slide.title || 'Título da Seção'}</h3>
                    <div class="mt-3">${slide.content || 'Conteúdo do slide...'}</div>
                </div>
            `;
            break;
            
        case 'image':
            previewHTML = `
                <div class="text-center">
                    <h3>${slide.title || 'Título da Imagem'}</h3>
                    ${slide.image ? `<img src="${slide.image}" alt="${slide.title || 'Imagem do slide'}" class="my-3">` : 
                                  '<div class="text-muted">(Nenhuma imagem selecionada)</div>'}
                    <p>${slide.description || 'Descrição da imagem'}</p>
                </div>
            `;
            break;
            
        case 'quiz':
            previewHTML = `
                <div>
                    <h3>${slide.question || 'Pergunta'}</h3>
                    <div class="mt-3">
                        ${slide.options.map((option, index) => `
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="preview-quiz-${id}" 
                                       ${option.correct ? 'checked' : ''} disabled>
                                <label class="form-check-label">
                                    ${option.text || `Opção ${index + 1}`}
                                </label>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
            break;
    }
    
    preview.innerHTML = previewHTML;
}

function updateSlideContent(id, field, value) {
    const slide = slides.find(s => s.id === id);
    if (slide) {
        slide[field] = value;
        updatePreview(id);
    }
}

function updateQuizOption(slideId, optionIndex, value) {
    const slide = slides.find(s => s.id === slideId);
    if (slide && slide.options) {
        slide.options[optionIndex].text = value;
        updatePreview(slideId);
    }
}

function setCorrectAnswer(slideId, optionIndex) {
    const slide = slides.find(s => s.id === slideId);
    if (slide && slide.options) {
        slide.options.forEach((option, index) => {
            option.correct = index === optionIndex;
        });
        updatePreview(slideId);
    }
}

function triggerImageUpload(id) {
    document.getElementById(`image-upload-${id}`).click();
}

function handleImageUpload(id, input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const slide = slides.find(s => s.id === id);
            if (slide) {
                slide.image = e.target.result;
                updatePreview(id);
            }
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function deleteSlide(id) {
    if (confirm('Tem certeza que deseja excluir este slide?')) {
        slides = slides.filter(s => s.id !== id);
        document.getElementById(`slide-${id}`).remove();
        
        if (slides.length > 0) {
            selectSlide(slides[0].id);
        } else {
            document.getElementById('slidePreview').innerHTML = `
                <div class="text-center text-muted">
                    <i class="fas fa-presentation fa-3x mb-2"></i>
                    <p>Selecione um slide para visualizar</p>
                </div>
            `;
        }
    }
}

// Simulation Management Functions
function createNewSimulation() {
    const template = document.querySelector('.simulation-item').cloneNode(true);
    template.querySelector('.simulation-title').textContent = 'Novo Simulado';
    template.querySelector('.simulation-content').innerHTML = `
        <h5>Título da Seção</h5>
        <p>Adicione seu conteúdo aqui...</p>
        
        <h5>Tópicos Principais</h5>
        <ul>
            <li>Tópico 1</li>
            <li>Tópico 2</li>
            <li>Tópico 3</li>
        </ul>
    `;
    
    // Reset quiz questions
    const quizQuestions = template.querySelectorAll('.quiz-question input[type="radio"]');
    quizQuestions.forEach(input => input.checked = false);
    
    document.getElementById('simulationsList').appendChild(template);
}

function duplicateSimulation(button) {
    const simulationItem = button.closest('.simulation-item');
    const clone = simulationItem.cloneNode(true);
    
    // Reset radio buttons in the clone
    const radioButtons = clone.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radio => {
        radio.checked = false;
        // Generate new unique names for radio groups
        const newName = radio.name + '_' + Date.now();
        radio.name = newName;
    });
    
    simulationItem.parentNode.insertBefore(clone, simulationItem.nextSibling);
}

function editSimulation(button) {
    const simulationItem = button.closest('.simulation-item');
    const title = simulationItem.querySelector('.simulation-title');
    const content = simulationItem.querySelector('.simulation-content');
    
    // Toggle edit mode
    title.contentEditable = title.contentEditable === 'true' ? 'false' : 'true';
    content.contentEditable = content.contentEditable === 'true' ? 'false' : 'true';
    
    // Update button text
    button.innerHTML = title.contentEditable === 'true' ? 
        '<i class="fas fa-save"></i> Salvar' : 
        '<i class="fas fa-edit"></i> Editar';
        
    if (title.contentEditable === 'true') {
        title.focus();
    }
}

function deleteSimulation(button) {
    if (confirm('Tem certeza que deseja excluir este simulado?')) {
        const simulationItem = button.closest('.simulation-item');
        simulationItem.remove();
    }
}

function editPresentation(id) {
    const presentation = presentations.find(p => p.id === id);
    if (!presentation) return;
    
    // Resetar variáveis globais
    slides = [...presentation.slides];
    currentSlideId = slides.length > 0 ? slides[slides.length - 1].id : 0;
    
    // Preencher campos do modal
    document.getElementById('presentationTitle').value = presentation.title;
    document.getElementById('presentationTheme').value = presentation.theme;
    document.getElementById('presentationLayout').value = presentation.layout;
    
    // Atualizar lista de slides
    const slidesList = document.getElementById('slidesList');
    slidesList.innerHTML = '';
    slides.forEach(slide => {
        const slideElement = document.createElement('div');
        slideElement.id = `slide-${slide.id}`;
        slideElement.className = 'slide-item mb-2 p-2 border rounded';
        slideElement.innerHTML = createSlideHTML(slide);
        slidesList.appendChild(slideElement);
    });
    
    // Mostrar preview do primeiro slide se houver
    if (slides.length > 0) {
        selectSlide(slides[0].id);
    } else {
        document.getElementById('slidePreview').innerHTML = `
            <div class="text-center text-muted">
                <i class="fas fa-desktop fa-3x mb-2"></i>
                <p>Selecione um slide para visualizar</p>
            </div>
        `;
    }
    
    // Abrir modal
    const modal = new bootstrap.Modal(document.getElementById('contentGeneratorModal'));
    modal.show();
    
    // Adicionar ID da apresentação sendo editada
    document.getElementById('contentGeneratorModal').dataset.editingId = id;
}

function savePresentation() {
    const title = document.getElementById('presentationTitle').value;
    const theme = document.getElementById('presentationTheme').value;
    const layout = document.getElementById('presentationLayout').value;
    
    if (!title) {
        alert('Por favor, insira um título para a apresentação.');
        return;
    }

    if (slides.length === 0) {
        alert('Por favor, adicione pelo menos um slide.');
        return;
    }
    
    const modal = document.getElementById('contentGeneratorModal');
    const editingId = modal.dataset.editingId;
    
    let presentation;
    
    // Se estiver editando uma apresentação existente
    if (editingId) {
        const index = presentations.findIndex(p => p.id === parseInt(editingId));
        if (index !== -1) {
            presentation = {
                ...presentations[index],
                title,
                theme,
                layout,
                slides: [...slides],
                updatedAt: new Date().toISOString()
            };
            presentations[index] = presentation;
        }
        delete modal.dataset.editingId;
    }
    // Se for uma nova apresentação
    else {
        presentation = {
            id: Date.now(),
            title,
            theme,
            layout,
            slides: [...slides],
            createdBy: currentUser.username,
            createdAt: new Date().toISOString()
        };
        presentations.push(presentation);
    }
    
    // Salvar no localStorage
    localStorage.setItem('presentations', JSON.stringify(presentations));
    
    // Fechar modal
    const bsModal = bootstrap.Modal.getInstance(modal);
    bsModal.hide();
    
    // Mostrar mensagem de sucesso
    alert(editingId ? 'Apresentação atualizada com sucesso!' : 'Apresentação salva com sucesso!');
    
    // Recarregar conteúdo
    loadProfessorContent();
}

// Registration and Login Page Toggle Functions
function showRegistration() {
    document.getElementById('loginPage').classList.add('d-none');
    document.getElementById('registrationPage').classList.remove('d-none');
}

function showLogin() {
    document.getElementById('registrationPage').classList.add('d-none');
    document.getElementById('loginPage').classList.remove('d-none');
}

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
document.getElementById('registrationForm').addEventListener('submit', async function(e) {
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
    
    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            alert('Cadastro realizado com sucesso! Faça login para continuar.');
            showLogin();
        } else {
            alert(data.message || 'Erro ao realizar cadastro.');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao realizar cadastro. Tente novamente.');
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

// Botões CTA
document.querySelector('.btn-primary').addEventListener('click', () => {
    window.location.href = '/cadastro';
});

document.querySelector('.btn-secondary').addEventListener('click', () => {
    window.location.href = '/cadastro';
});

// Modal de Login
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM carregado');
    
    const modal = document.getElementById('loginModal');
    const btnLogin = document.getElementById('btnStartNow');
    const closeModal = document.querySelector('.close-modal');
    const loginForm = document.getElementById('loginForm');

    console.log('Modal:', modal);
    console.log('Botão login:', btnLogin);
    console.log('Botão fechar:', closeModal);
    console.log('Form:', loginForm);

    if (btnLogin) {
        btnLogin.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Botão clicado');
            if (modal) {
                modal.classList.add('show');
                console.log('Modal aberto');
            }
        });
    }

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.classList.remove('show');
            console.log('Modal fechado pelo X');
        });
    }

    // Fechar modal ao clicar fora dele
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            console.log('Modal fechado pelo overlay');
        }
    });

    // Processar o formulário de login
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('Form submetido');
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            const userType = document.querySelector('input[name="userType"]:checked').value;

            console.log('Dados:', { username, password, userType });

            // Simulação de login
            if (username === '123' && password === '123') {
                if (userType === 'professor') {
                    window.location.href = 'professor.html';
                } else {
                    window.location.href = 'aluno.html';
                }
            } else {
                alert('Usuário ou senha incorretos!');
            }
        });
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
