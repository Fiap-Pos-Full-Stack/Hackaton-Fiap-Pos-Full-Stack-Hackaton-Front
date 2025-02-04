# Educação Digital - Plataforma de Aprendizado com IA

Uma plataforma educacional moderna que utiliza Inteligência Artificial para personalizar o aprendizado dos alunos.

## Funcionalidades

- Dashboard personalizado para alunos e professores
- Sistema de aprendizado adaptativo baseado em IA
- Chatbot para tirar dúvidas em tempo real
- Biblioteca digital interativa
- Sistema de gamificação
- Fórum e comunidade
- Design responsivo

## Tecnologias Utilizadas

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- MongoDB
- NextAuth.js
- OpenAI API

## Configuração do Ambiente

1. Clone o repositório
```bash
git clone [url-do-repositorio]
cd educacao-digital
```

2. Instale as dependências
```bash
npm install
```

3. Configure as variáveis de ambiente
```bash
cp .env.local.example .env.local
```
Edite o arquivo `.env.local` com suas credenciais

4. Inicie o servidor de desenvolvimento
```bash
npm run dev
```

5. Acesse http://localhost:3000

## Estrutura do Projeto

```
src/
  ├── components/     # Componentes React reutilizáveis
  ├── pages/         # Páginas e rotas da aplicação
  ├── lib/           # Utilitários e configurações
  ├── styles/        # Estilos globais
  └── types/         # Definições de tipos TypeScript
```

## Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE.md](LICENSE.md) para mais detalhes.
