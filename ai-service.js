// Configuração das APIs
// const HUGGINGFACE_API_KEY = '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'; // Token gratuito do HuggingFace

async function generateHuggingFaceResponse(prompt) {
    try {
        console.log('Conectando ao servidor...');
        const response = await fetch('http://localhost:3000/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Erro ao gerar resposta');
        }

        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error('Erro na API:', error);
        throw new Error('Não foi possível gerar uma resposta. Por favor, tente novamente em alguns instantes.');
    }
}

async function generateAIResponse(prompt) {
    return await generateHuggingFaceResponse(prompt);
}

// Função para gerar conteúdo educacional
async function generateEducationalContent(topic) {
    const prompt = `Crie um conteúdo educacional em português sobre ${topic} incluindo:
    1. Uma breve introdução
    2. Principais conceitos
    3. Exemplos práticos
    4. 3 perguntas de quiz com respostas
    
    Por favor, formate o texto de forma clara e organizada.`;

    try {
        return await generateAIResponse(prompt);
    } catch (error) {
        console.error('Erro ao gerar conteúdo educacional:', error);
        throw error;
    }
}

// Função para responder perguntas
async function answerQuestion(question) {
    const prompt = `Por favor, responda em português a seguinte pergunta de forma educativa e clara: ${question}
    
    Formate a resposta de maneira organizada e fácil de entender.`;
    
    try {
        return await generateAIResponse(prompt);
    } catch (error) {
        console.error('Erro ao responder pergunta:', error);
        throw error;
    }
}
