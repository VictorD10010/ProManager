# Página de Login - Informações

## Credenciais de Demo

Para testar a página de login, use as seguintes credenciais:

- **Email:** demo@example.com
- **Senha:** demo123

## Funcionalidades Implementadas

### Interface do Usuário
- ✅ Layout split-screen moderno e responsivo
- ✅ Painel visual com imagem de fundo e gradiente
- ✅ Formulário de login com validação
- ✅ Botão de login social (Google)
- ✅ Toggle para mostrar/ocultar senha
- ✅ Checkbox "Lembrar de mim"
- ✅ Links para "Esqueceu a senha?" e "Criar conta"
- ✅ Badge de segurança

### Validação
- Email obrigatório e formato válido
- Senha mínima de 6 caracteres
- Validação em tempo real com mensagens de erro claras

### Estados Visuais
- **Loading:** Botão mostra "Entrando..." durante o processamento
- **Sucesso:** Ícone de check com "Sucesso!" e notificação verde
- **Erro:** Notificação vermelha com mensagem do servidor
- **Reset:** Formulário limpa automaticamente após 2 segundos do sucesso

### Responsividade
- Desktop: Layout split-screen com painel visual à direita
- Tablet/Mobile: Layout de coluna única focado no formulário

## Tecnologias Utilizadas

- React 18 com TypeScript
- Shadcn UI (componentes)
- React Hook Form + Zod (validação)
- TanStack Query (gerenciamento de estado)
- Tailwind CSS (estilização)
- Express.js (backend)
- In-memory storage (armazenamento)

## Notas de Desenvolvimento

- Todos os elementos interativos possuem `data-testid` para testes E2E
- Mensagens de erro do backend são propagadas corretamente
- Fonte configurada: Inter (conforme design guidelines)
- Tema claro com suporte futuro para dark mode
- SEO otimizado com meta tags apropriadas

## Próximos Passos (Sugestões)

1. Implementar hash de senhas (bcrypt/argon2) no backend
2. Adicionar autenticação real com Google OAuth
3. Criar páginas de "Esqueceu a senha" e "Criar conta"
4. Implementar persistência em banco de dados PostgreSQL
5. Adicionar sessões e tokens JWT
6. Implementar dark mode
