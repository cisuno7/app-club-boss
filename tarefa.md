O PROMPT PARA O CURSOR
ROLE
Atue como um Arquiteto de Software Sênior e Especialista em React Native (Expo). Seu objetivo é construir o MVP do aplicativo mobile "Boss Connection Platform".

CONTEXTO DO PRODUTO
Nome: Boss Connection PlatformSlogan: "Onde negócios se encontram"Propósito: Ecossistema B2B conectando 4 agentes principais: Cliente, Empresa, Admin e Select.Tech Stack:

React Native (SDK 51+)
Expo (Gerenciamento)
TypeScript (Obrigatório)
Navegação: React Navigation (Stack e Tabs)
Estado: Zustand (leve e simples)
Estilização: NativeWind (Tailwind CSS para RN) ou Styled-Components.
Ícones: Phosphor Icons ou React Native Vector Icons.
Mocks: Dados fictícios para simular o backend inicialmente.
ARQUITETURA E ESTRUTURA DE PASTAS
Crie uma estrutura de pastas organizada e escalável. Exemplo:

src/components/ (Componentes reutilizáveis: Button, Card, Input)
src/screens/ (Telas organizadas por pasta: auth/, client/, company/, admin/, select/, shared/)
src/routes/ (Configuração do React Navigation)
src/store/ (Stores do Zustand: authStore, userStore)
src/services/ (API simulada)
src/types/ (Interfaces TypeScript)
src/theme/ (Cores, fontes, spacing)
AGENTES E LÓGICA DE AUTENTICAÇÃO
O app deve suportar 4 tipos de usuários. Crie um contexto de autenticação que diferencie esses papéis para direcionar para a "Home" correta de cada um:

Cliente: Acesso a feed, cupons e perfil.
Empresa: Acesso a dashboard de métricas, gerenciamento de anúncios.
Admin: Acesso a moderação, visão geral da plataforma.
Select: (Cliente Premium) Acesso a área exclusiva e eventos.
DESIGN SYSTEM E UI
Estilo: Moderno, clean, profissional (foco B2B).
Cores Primárias: Tons de Azul Marinho e Cinza Escuro (confiança e corporativo).
Tipografia: Sans-serif (Inter ou Roboto).
Componentes: Banners rotativos (Swiper), Cards com sombras suaves, Badges para status (Ativo/Expirado).
ESCOPO INICIAL - SETUP
Sua primeira tarefa é:

Inicializar o projeto com as dependências necessárias (React Navigation, Zustand, NativeWind, SafeAreaContext).
Configurar a estrutura de pastas conforme acima.
Criar os Tipos (Types) globais para User, Ad, Coupon.
Configurar a Store de Autenticação (Mockada) permitindo alternar entre os 4 tipos de usuário para fins de teste.
Criar a navegação principal (Stack) e as Tabs iniciais para o fluxo "Cliente" (o fluxo principal).
Não gere código de todas as telas agora. Apenas o esqueleto, a navegação base e a configuração do ambiente. Aguarde minhas instruções para criar as telas específicas.

Como prosseguir depois de enviar o Prompt?
Após o Cursor configurar a base do projeto, você deve guiá-lo com prompts menores e específicos para cada parte da sua "Lista de Telas Necessárias".

Aqui está a ordem recomendada de prompts para seguir:

Fase 1: Estrutura e Auth (Shared)
"Crie a tela de Splash Screen simples com a logo 'Boss Connection Platform'. Em seguida, crie as telas de Login e Registro com validação de formulário."

Fase 2: O Fluxo do Cliente (Core)
"Crie a Home Page do Cliente com uma seção de Banners rotativos no topo e abaixo um Feed de Anúncios em lista. Use dados mockados."

"Crie a tela de Detalhe do Anúncio que recebe os dados por parâmetro de rota e mostre as informações do produto e um botão 'Copiar Código' ou 'Usar Cupom'."

Fase 3: O Fluxo da Empresa (B2B)
"Crie a Dashboard da Empresa. Ela precisa ter gráficos simples (usando a lib 'react-native-chart-kit' ou similar se possível, ou cards de métricas) mostrando 'Visualizações', 'Cliques' e 'Cupons resgatados'."

Fase 4: O Fluxo Admin
"Crie uma tela de Moderação de Anúncios para o Admin, mostrando uma lista de anúncios 'Pendentes' com botões de 'Aprovar' e 'Rejeitar'."

Fase 5: Diferenciação Select
"Adicione um Check na navegação: Se o usuário for do tipo 'Select', mostre uma aba extra na bottom bar chamada 'Mundo Select' com acesso a uma tela de Conteúdo Exclusivo."