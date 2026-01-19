# Boss Connection Platform

**Slogan:** "Onde negócios se encontram"

MVP do aplicativo mobile B2B conectando 4 agentes principais: Cliente, Empresa, Admin e Select.

## 🚀 Tech Stack

- **React Native** com Expo SDK 54
- **TypeScript** (obrigatório)
- **React Navigation** (Stack e Tabs)
- **Zustand** (gerenciamento de estado)
- **NativeWind** (Tailwind CSS para React Native)
- **Phosphor Icons** (ícones)

## 📁 Estrutura do Projeto

```
src/
├── components/     # Componentes reutilizáveis (Button, Card, Input, Badge)
├── screens/        # Telas organizadas por pasta (auth/, client/, company/, admin/, select/, shared/)
├── routes/         # Configuração do React Navigation
├── store/          # Stores do Zustand (authStore)
├── services/       # API simulada e dados mockados
├── types/          # Interfaces TypeScript globais
└── theme/          # Design System (cores, fontes, spacing)
```

## 🎨 Design System

- **Cores Primárias:** Azul Marinho (#1e3a5f) e Cinza Escuro (#334155)
- **Tipografia:** Inter/Roboto (Sans-serif)
- **Estilo:** Moderno, clean, profissional (foco B2B)

## 👥 Tipos de Usuário

1. **Cliente:** Acesso a feed, cupons e perfil
2. **Empresa:** Acesso a dashboard de métricas, gerenciamento de anúncios
3. **Admin:** Acesso a moderação, visão geral da plataforma
4. **Select:** Cliente Premium com acesso a área exclusiva e eventos

## 🛠 Instalação

```bash
npm install
```

## 🚀 Executar

```bash
# Desenvolvimento
npm start

# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## 📝 Notas

- O projeto está configurado com dados mockados para desenvolvimento
- A autenticação permite alternar entre os 4 tipos de usuário para testes
- Estrutura preparada para escalabilidade seguindo melhores práticas do Expo SDK 54
