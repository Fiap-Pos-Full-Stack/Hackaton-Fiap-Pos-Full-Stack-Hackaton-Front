// Variáveis globais
var currentContent = null;
var currentPreviewSlide = 1;

// Conteúdo simulado dos slides
var contentData = {
    'historia1': {
        title: 'Guerra Fria: Corrida Espacial',
        slides: [
            {
                type: 'slide',
                content: `
                    <div class="text-center">
                        <h3>A Corrida Espacial</h3>
                        <p class="mb-4">Competição tecnológica entre EUA e URSS durante a Guerra Fria (1957-1975)</p>
                        <div class="row justify-content-center">
                            <div class="col-md-4 mb-3">
                                <div class="card h-100">
                                    <div class="card-body text-center">
                                        <i class="fas fa-rocket fa-3x mb-3 text-primary"></i>
                                        <h5>Exploração Espacial</h5>
                                        <p>Avanços na tecnologia espacial</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4 mb-3">
                                <div class="card h-100">
                                    <div class="card-body text-center">
                                        <i class="fas fa-satellite fa-3x mb-3 text-success"></i>
                                        <h5>Satélites</h5>
                                        <p>Comunicação e espionagem</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4 mb-3">
                                <div class="card h-100">
                                    <div class="card-body text-center">
                                        <i class="fas fa-user-astronaut fa-3x mb-3 text-info"></i>
                                        <h5>Missões Tripuladas</h5>
                                        <p>Conquista do espaço pelo homem</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            },
            {
                type: 'slide',
                content: `
                    <div>
                        <h4 class="mb-4">Contexto Histórico</h4>
                        <div class="card mb-4">
                            <div class="card-body">
                                <h5 class="text-primary mb-3">Por que a Corrida Espacial?</h5>
                                <ul class="list-unstyled">
                                    <li class="mb-3">
                                        <i class="fas fa-chess-king text-warning me-2"></i>
                                        <strong>Supremacia Tecnológica:</strong> Demonstração de poder entre as superpotências
                                    </li>
                                    <li class="mb-3">
                                        <i class="fas fa-shield-alt text-danger me-2"></i>
                                        <strong>Segurança Nacional:</strong> Desenvolvimento de tecnologia militar
                                    </li>
                                    <li class="mb-3">
                                        <i class="fas fa-flag text-success me-2"></i>
                                        <strong>Prestígio Internacional:</strong> Influência sobre outros países
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                `
            },
            {
                type: 'slide',
                content: `
                    <div>
                        <h4 class="mb-4">Principais Marcos</h4>
                        <div class="timeline">
                            <div class="event mb-4">
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="text-primary">1957 - Sputnik 1</h5>
                                        <p>Primeiro satélite artificial em órbita (URSS)</p>
                                        <div class="text-center">
                                            <i class="fas fa-satellite-dish fa-2x text-primary"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="event mb-4">
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="text-success">1961 - Yuri Gagarin</h5>
                                        <p>Primeiro ser humano no espaço (URSS)</p>
                                        <div class="text-center">
                                            <i class="fas fa-user-astronaut fa-2x text-success"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="event">
                                <div class="card">
                                    <div class="card-body">
                                        <h5 class="text-info">1969 - Apollo 11</h5>
                                        <p>Primeiro pouso tripulado na Lua (EUA)</p>
                                        <div class="text-center">
                                            <i class="fas fa-moon fa-2x text-info"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            },
            {
                type: 'slide',
                content: `
                    <div>
                        <h4 class="mb-4">Legado da Corrida Espacial</h4>
                        <div class="row">
                            <div class="col-md-4 mb-3">
                                <div class="card h-100">
                                    <div class="card-body">
                                        <h5 class="text-primary mb-3">Tecnologia</h5>
                                        <ul class="list-unstyled">
                                            <li><i class="fas fa-microchip me-2"></i> Computadores menores</li>
                                            <li><i class="fas fa-satellite me-2"></i> GPS</li>
                                            <li><i class="fas fa-camera me-2"></i> Câmeras digitais</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4 mb-3">
                                <div class="card h-100">
                                    <div class="card-body">
                                        <h5 class="text-success mb-3">Ciência</h5>
                                        <ul class="list-unstyled">
                                            <li><i class="fas fa-meteor me-2"></i> Astronomia</li>
                                            <li><i class="fas fa-atom me-2"></i> Física</li>
                                            <li><i class="fas fa-flask me-2"></i> Materiais</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-4 mb-3">
                                <div class="card h-100">
                                    <div class="card-body">
                                        <h5 class="text-info mb-3">Sociedade</h5>
                                        <ul class="list-unstyled">
                                            <li><i class="fas fa-globe me-2"></i> Cooperação internacional</li>
                                            <li><i class="fas fa-graduation-cap me-2"></i> Educação STEM</li>
                                            <li><i class="fas fa-lightbulb me-2"></i> Inovação</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            },
            {
                type: 'quiz',
                question: 'Qual foi o primeiro satélite artificial a orbitar a Terra?',
                options: [
                    'Explorer 1 (EUA)',
                    'Sputnik 1 (URSS)',
                    'Vanguard 1 (EUA)',
                    'Luna 1 (URSS)'
                ],
                correctAnswer: 1,
                explanation: 'O Sputnik 1 foi lançado pela URSS em 4 de outubro de 1957, tornando-se o primeiro satélite artificial a orbitar a Terra. Este evento marcou o início da Era Espacial e surpreendeu os EUA, intensificando a corrida espacial.'
            },
            {
                type: 'quiz',
                question: 'Quem foi o primeiro ser humano a viajar para o espaço?',
                options: [
                    'Neil Armstrong (EUA)',
                    'Alan Shepard (EUA)',
                    'Yuri Gagarin (URSS)',
                    'John Glenn (EUA)'
                ],
                correctAnswer: 2,
                explanation: 'Yuri Gagarin, cosmonauta soviético, tornou-se o primeiro ser humano a viajar pelo espaço em 12 de abril de 1961, a bordo da nave Vostok 1. Seu voo orbital durou 108 minutos e foi mais uma vitória da URSS na corrida espacial.'
            },
            {
                type: 'quiz',
                question: 'Qual missão levou os primeiros humanos à Lua?',
                options: [
                    'Apollo 8',
                    'Apollo 11',
                    'Apollo 13',
                    'Gemini 4'
                ],
                correctAnswer: 1,
                explanation: 'A Apollo 11, lançada em 16 de julho de 1969, foi a primeira missão tripulada a pousar na Lua. Neil Armstrong e Buzz Aldrin caminharam na superfície lunar em 20 de julho de 1969, marcando uma vitória histórica dos EUA na corrida espacial.'
            },
            {
                type: 'quiz',
                question: 'Qual foi o principal motivo que levou à Corrida Espacial?',
                options: [
                    'Pesquisa científica pura',
                    'Competição tecnológica e militar',
                    'Exploração de recursos lunares',
                    'Cooperação internacional'
                ],
                correctAnswer: 1,
                explanation: 'A Corrida Espacial foi principalmente motivada pela competição tecnológica e militar entre EUA e URSS durante a Guerra Fria. O desenvolvimento espacial estava diretamente ligado ao poder militar, especialmente em relação aos mísseis balísticos intercontinentais.'
            },
            {
                type: 'quiz',
                question: 'Qual destes NÃO é um legado direto da Corrida Espacial?',
                options: [
                    'GPS',
                    'Internet',
                    'Câmeras digitais',
                    'Teflon'
                ],
                correctAnswer: 1,
                explanation: 'Embora a Internet seja uma tecnologia revolucionária, ela não foi um resultado direto da Corrida Espacial. A Internet teve origem no ARPANET, um projeto militar dos EUA separado do programa espacial. Já o GPS, câmeras digitais e Teflon foram desenvolvidos ou aperfeiçoados durante a Corrida Espacial.'
            },
            {
                type: 'quiz',
                question: 'Qual foi a última grande missão conjunta entre EUA e URSS que marcou o fim da Corrida Espacial?',
                options: [
                    'Projeto Apollo-Soyuz',
                    'Missão Skylab',
                    'Programa Shuttle-Mir',
                    'Estação Espacial Internacional'
                ],
                correctAnswer: 0,
                explanation: 'O Projeto Apollo-Soyuz, realizado em 1975, foi a primeira missão espacial conjunta entre EUA e URSS. Este projeto simbolizou o fim da Corrida Espacial e o início de uma nova era de cooperação internacional na exploração espacial.'
            }
        ]
    },
    'matematica1': {
        title: 'Introdução à Trigonometria',
        slides: [
            {
                type: 'slide',
                content: `
                    <div class="text-center">
                        <h3>Trigonometria Básica</h3>
                        <p class="mb-4">Estudo das relações entre os lados e ângulos de um triângulo</p>
                        <div class="d-flex justify-content-around">
                            <div class="text-center">
                                <i class="fas fa-ruler-combined fa-3x mb-2 text-primary"></i>
                                <p>Medidas</p>
                            </div>
                            <div class="text-center">
                                <i class="fas fa-calculator fa-3x mb-2 text-success"></i>
                                <p>Cálculos</p>
                            </div>
                        </div>
                    </div>
                `
            },
            {
                type: 'quiz',
                question: 'Qual é a razão trigonométrica que representa o cateto oposto dividido pela hipotenusa?',
                options: [
                    'Cosseno',
                    'Seno',
                    'Tangente',
                    'Cotangente'
                ],
                correctAnswer: 1,
                explanation: 'O seno de um ângulo é definido como a razão entre o cateto oposto e a hipotenusa. Esta relação é fundamental na trigonometria e pode ser lembrada pela sigla SOH (Seno = Oposto/Hipotenusa).'
            },
            {
                type: 'quiz',
                question: 'Em um triângulo retângulo, qual é o valor do seno de 30 graus?',
                options: [
                    '1/2',
                    '√3/2',
                    '√2/2',
                    '1'
                ],
                correctAnswer: 0,
                explanation: 'O seno de 30 graus é igual a 1/2. Este é um dos valores notáveis da trigonometria que deve ser memorizado. Pode ser demonstrado usando um triângulo equilátero dividido ao meio, formando um triângulo retângulo 30-60-90.'
            },
            {
                type: 'quiz',
                question: 'Qual é a relação fundamental da trigonometria?',
                options: [
                    'sen²θ + cos²θ = 1',
                    'sen²θ - cos²θ = 1',
                    'senθ + cosθ = 1',
                    'tgθ = senθ + cosθ'
                ],
                correctAnswer: 0,
                explanation: 'A relação fundamental da trigonometria é sen²θ + cos²θ = 1. Esta identidade é válida para qualquer ângulo θ e é a base para muitas outras relações trigonométricas.'
            }
        ]
    },
    'ciencias1': {
        title: 'Sistema Digestivo',
        slides: [
            {
                type: 'slide',
                content: `
                    <div class="text-center">
                        <h3>Sistema Digestivo Humano</h3>
                        <p class="mb-4">Conjunto de órgãos responsáveis pela digestão dos alimentos</p>
                        <div class="d-flex justify-content-around">
                            <div class="text-center">
                                <i class="fas fa-apple-alt fa-3x mb-2 text-danger"></i>
                                <p>Alimentos</p>
                            </div>
                            <div class="text-center">
                                <i class="fas fa-flask fa-3x mb-2 text-warning"></i>
                                <p>Enzimas</p>
                            </div>
                            <div class="text-center">
                                <i class="fas fa-dna fa-3x mb-2 text-info"></i>
                                <p>Nutrientes</p>
                            </div>
                        </div>
                    </div>
                `
            },
            {
                type: 'quiz',
                question: 'Qual enzima é responsável por iniciar a digestão do amido na boca?',
                options: [
                    'Pepsina',
                    'Amilase salivar',
                    'Lipase',
                    'Tripsina'
                ],
                correctAnswer: 1,
                explanation: 'A amilase salivar (ou ptialina) é uma enzima presente na saliva que inicia a digestão dos carboidratos (amido) na boca, quebrando-os em moléculas mais simples. Este é o primeiro passo da digestão química dos alimentos.'
            },
            {
                type: 'quiz',
                question: 'Em qual parte do sistema digestivo ocorre a maior parte da absorção de nutrientes?',
                options: [
                    'Estômago',
                    'Intestino grosso',
                    'Intestino delgado',
                    'Esôfago'
                ],
                correctAnswer: 2,
                explanation: 'O intestino delgado é o principal local de absorção de nutrientes. Suas paredes são revestidas por vilosidades e microvilosidades que aumentam enormemente a superfície de absorção, permitindo que nutrientes entrem na corrente sanguínea.'
            },
            {
                type: 'quiz',
                question: 'Qual é a função principal do suco gástrico?',
                options: [
                    'Absorver vitaminas',
                    'Digerir gorduras',
                    'Digerir proteínas',
                    'Produzir insulina'
                ],
                correctAnswer: 2,
                explanation: 'O suco gástrico, produzido no estômago, contém ácido clorídrico e a enzima pepsina, sendo sua principal função a digestão de proteínas. O ambiente ácido também ajuda a matar bactérias e desnaturar proteínas.'
            }
        ]
    }
};

// Sobrescreve a função showPreview do HTML
function showPreview(contentId) {
    currentContent = contentData[contentId];
    currentPreviewSlide = 1;
    const modal = new bootstrap.Modal(document.getElementById('previewModal'));
    modal.show();
    updatePreview();
}

function updatePreview() {
    document.getElementById('slideCounter').textContent = `Slide ${currentPreviewSlide} de ${currentContent.slides.length}`;
    showPreviewSlide();
}

function nextSlide() {
    if (currentPreviewSlide < currentContent.slides.length) {
        currentPreviewSlide++;
        updatePreview();
    }
}

function previousSlide() {
    if (currentPreviewSlide > 1) {
        currentPreviewSlide--;
        updatePreview();
    }
}

function showPreviewSlide() {
    const previewContent = document.getElementById('previewContent');
    const slide = currentContent.slides[currentPreviewSlide - 1];

    if (slide.type === 'quiz') {
        let quizHtml = `
            <div class="quiz-container">
                <h4 class="mb-4">${slide.question}</h4>
                <div class="quiz-options">
        `;

        slide.options.forEach((option, index) => {
            quizHtml += `
                <div class="quiz-option mb-3" onclick="checkQuizAnswer(${index})">
                    <span class="option-letter">${String.fromCharCode(65 + index)}</span>
                    <span class="option-text">${option}</span>
                    ${index === slide.correctAnswer ? `
                        <div class="correct-answer-explanation" style="display: none;">
                            <div class="alert alert-success mt-2">
                                <i class="fas fa-check-circle me-2"></i>
                                <strong>Resposta Correta!</strong>
                                <hr>
                                ${slide.explanation}
                            </div>
                        </div>
                    ` : ''}
                </div>
            `;
        });

        quizHtml += `
                </div>
            </div>
        `;

        previewContent.innerHTML = quizHtml;
    } else {
        previewContent.innerHTML = slide.content;
    }
}

// Função para atualizar pontuação em todos os lugares
function updatePointsDisplay(points) {
    // Atualizar badge no topo
    const pointsDisplay = document.querySelector('#studentPoints');
    if (pointsDisplay) {
        pointsDisplay.textContent = `Pontos: ${points}`;
    }

    // Atualizar número grande no card
    const pointsCard = document.querySelector('#pointsCard h3');
    if (pointsCard) {
        pointsCard.textContent = points;
    }
}

// Inicializar pontuação ao carregar a página
document.addEventListener('DOMContentLoaded', function() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        updatePointsDisplay(currentUser.points || 850);
    }
});

function checkQuizAnswer(selectedIndex) {
    const slide = currentContent.slides[currentPreviewSlide - 1];
    const options = document.querySelectorAll('.quiz-option');
    
    // Remove explicações anteriores
    document.querySelectorAll('.correct-answer-explanation').forEach(exp => {
        exp.style.display = 'none';
    });

    // Atualizar pontuação se acertar
    if (selectedIndex === slide.correctAnswer) {
        // Recuperar usuário atual
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser) {
            // Adicionar 10 pontos
            currentUser.points = (currentUser.points || 850) + 10;
            
            // Atualizar no localStorage
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            
            // Atualizar na lista de usuários
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const userIndex = users.findIndex(u => u.username === currentUser.username);
            if (userIndex !== -1) {
                users[userIndex].points = currentUser.points;
                localStorage.setItem('users', JSON.stringify(users));
            }
            
            // Atualizar pontuação em todos os lugares
            updatePointsDisplay(currentUser.points);

            // Mostrar mensagem de pontos
            const pointsMessage = document.createElement('div');
            pointsMessage.className = 'alert alert-success mt-2';
            pointsMessage.innerHTML = `
                <i class="fas fa-star me-2"></i>
                <strong>+10 pontos!</strong> Sua pontuação atual: ${currentUser.points}
            `;
            document.querySelector('.quiz-container').appendChild(pointsMessage);

            // Remover mensagem após 3 segundos
            setTimeout(() => {
                pointsMessage.remove();
            }, 3000);
        }
    }

    options.forEach((option, index) => {
        option.classList.remove('correct', 'incorrect');
        if (index === slide.correctAnswer) {
            option.classList.add('correct');
            // Mostra a explicação da resposta correta
            const explanation = option.querySelector('.correct-answer-explanation');
            if (explanation) {
                explanation.style.display = 'block';
            }
        } else if (index === selectedIndex) {
            option.classList.add('incorrect');
        }
    });
}

function toggleContentList(button) {
    const icon = button.querySelector('i');
    const cardBody = button.closest('.card').querySelector('.card-body');
    
    if (icon.classList.contains('fa-chevron-up')) {
        icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
        cardBody.style.display = 'none';
    } else {
        icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
        cardBody.style.display = 'block';
    }
}

// Função de logout
function logout() {
    // Remover dados do usuário do localStorage
    localStorage.removeItem('currentUser');
    // Redirecionar para a página inicial
    window.location.href = 'index.html';
}
