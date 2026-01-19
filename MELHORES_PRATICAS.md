# Melhores Práticas - Boss Connection Platform

Este documento contém as melhores práticas aplicadas no projeto baseadas em pesquisas sobre **Expo SDK 54** e desenvolvimento React Native.

## 📋 Expo SDK 54 - Características Importantes

### Novidades e Mudanças

- **React Native 0.81**: SDK 54 vem com RN 0.81, com builds pré-compilados no iOS (XCFrameworks), reduzindo significativamente o tempo de build limpo
- **Última versão com Legacy Architecture**: SDK 54 é a última versão que suporta arquitetura legada. A partir do SDK 55, apenas New Architecture será suportada
- **Autolinking melhorado**: Dependências transitivas agora são automaticamente linkadas para módulos do React Native e Expo
- **Edge-to-edge no Android**: Layouts edge-to-edge são padrão no Android (API 36 / Android 16)
- **Reanimated 4.x**: Incluído por padrão no SDK 54
- **React Compiler**: Ativado por padrão em novos projetos Expo, ajudando na memoização automática

### Requisitos Mínimos

- **Node.js**: ≥ 20.19.4
- **Xcode**: ≥ 16.1 (para builds iOS)

## 🏗️ Arquitetura e Organização

### Estrutura de Pastas

O projeto segue uma estrutura baseada em **features** e **camadas compartilhadas**:

```
src/
├── components/     # Componentes reutilizáveis (Button, Card, Input, Badge)
├── screens/        # Telas organizadas por feature (auth/, client/, company/, admin/, select/, shared/)
├── routes/         # Configuração do React Navigation
├── store/          # Stores do Zustand (gerenciamento de estado)
├── services/       # API simulada e serviços
├── types/          # Interfaces TypeScript globais
└── theme/          # Design System (cores, fontes, spacing, shadows)
```

### Princípios de Organização

1. **Separação por Feature**: Telas e componentes específicos de uma feature ficam juntos
2. **Componentes Reutilizáveis**: Componentes genéricos em `components/`
3. **Tipagem Forte**: TypeScript obrigatório, evitando `any`
4. **Design System Centralizado**: Tema único em `theme/` para consistência visual

## 🎨 Design System e Responsividade

### Cores

- **Primárias**: Azul Marinho (#1e3a5f) - confiança e profissionalismo B2B
- **Secundárias**: Cinza Escuro (#334155) - elegância e sofisticação
- **Accent**: Azul claro (#3b82f6) - CTAs e ações importantes

### Responsividade

#### Safe Area Context

✅ **SEMPRE usar** `react-native-safe-area-context` ao invés de `SafeAreaView` nativo:
- SDK 54 deprecou `SafeAreaView` padrão
- `SafeAreaView` do `react-native-safe-area-context` funciona melhor com edge-to-edge

```typescript
import { SafeAreaView } from 'react-native-safe-area-context';

<SafeAreaView style={styles.container} edges={['top', 'bottom']}>
  {/* Conteúdo */}
</SafeAreaView>
```

#### Layouts Flexíveis

- ✅ Usar **Flexbox** (`flex`, `justifyContent`, `alignItems`) para layouts fluidos
- ✅ Evitar valores fixos em pixels; preferir `%`, `flex`, dimensões relativas
- ✅ Usar `Dimensions` ou `useWindowDimensions()` para ajustes responsivos
- ✅ Componentes com `flex: 1` para ocupar espaço disponível

#### Tipografia Responsiva

- Usar `RFValue` ou unidades relativas baseadas na largura de tela
- Tamanhos de fonte definidos no tema para consistência

### Imagens

- ✅ Usar `expo-image` para melhor performance
- ✅ Pré-carregar assets críticos com `expo-asset`
- ✅ Formatos eficientes (WebP quando possível)
- ✅ `resizeMode` apropriado para diferentes contextos

## ⚡ Performance

### Memoização

- ✅ Usar `React.memo` para componentes que não mudam frequentemente
- ✅ `useMemo` e `useCallback` quando apropriado
- ✅ React Compiler (ativado por padrão) ajuda na memoização automática

### Listas

- ✅ **SEMPRE usar** `FlatList` ou `SectionList` para listas grandes
- ✅ Configurar `keyExtractor`, `getItemLayout` quando possível
- ✅ Limitar `initialNumToRender` para melhor performance inicial

### Animações

- ✅ Usar `react-native-reanimated` (v4) para animações pesadas
- ✅ Animações rodam no thread nativo (melhor performance)
- ✅ Evitar animações inline que causam re-renders

### Otimizações Gerais

- ✅ Pré-carregar assets com `expo-splash-screen` e `Asset.loadAsync()`
- ✅ Evitar re-renderizações desnecessárias
- ✅ Usar Hermes engine (ativado por padrão no Expo)

## 🔧 Gerenciamento de Estado

### Zustand

- ✅ Store leve e simples para autenticação e estado global
- ✅ Stores separadas por domínio (ex: `authStore`, `userStore`)
- ✅ TypeScript para type-safety

### Boas Práticas

- Evitar prop drilling desnecessário
- Estado local quando possível, global quando necessário
- Separar lógica de negócio da UI

## 🧭 Navegação

### React Navigation

- ✅ Stack Navigator para fluxos principais
- ✅ Tab Navigator para navegação principal (Cliente)
- ✅ Navegação condicional baseada em autenticação e role do usuário

### Estrutura de Navegação

```typescript
// Fluxo de autenticação
Login → (autenticado) → Tabs baseadas no role

// Roles e suas navegações
- Cliente: Feed, Cupons, Perfil
- Empresa: Dashboard, Anúncios, Métricas
- Admin: Moderação, Visão Geral
- Select: Feed Premium, Eventos, Conteúdo Exclusivo
```

## 📦 Dependências

### Bibliotecas Principais

- `expo`: ~54.0.0
- `react-native`: 0.81.0
- `@react-navigation/native`: ^7.0.0
- `zustand`: ^5.0.0
- `nativewind`: ^4.0.0
- `react-native-reanimated`: ~4.0.0
- `react-native-safe-area-context`: ~5.0.0
- `@phosphor-icons/react-native`: ^2.1.0

### Verificação de Compatibilidade

- ✅ Usar `npx expo install --fix` para manter dependências alinhadas
- ✅ Verificar compatibilidade de bibliotecas com SDK 54 e Reanimated v4
- ✅ Usar `expo-doctor` para diagnosticar problemas

## 🐛 Troubleshooting

### Problemas Comuns SDK 54

1. **Builds iOS falhando**: Verificar versão do Xcode (≥ 16.1)
2. **Reanimated incompatível**: Verificar se bibliotecas são compatíveis com v4
3. **Autolinking**: Usar `npx expo-modules-autolinking verify -v` para verificar
4. **Web builds**: Pode haver problemas com React 19 + React Navigation (monitorar issues)

## 📝 Convenções de Código

### Nomenclatura

- **Componentes**: PascalCase (`Button.tsx`, `HomeScreen.tsx`)
- **Hooks**: camelCase com prefixo `use` (`useAuth.ts`)
- **Tipos/Interfaces**: PascalCase (`User`, `Ad`, `Coupon`)
- **Stores**: camelCase com sufixo `Store` (`authStore.ts`)

### Estrutura de Componentes

```typescript
// 1. Imports
import React from 'react';
import { View, Text } from 'react-native';

// 2. Tipos/Interfaces
interface Props {
  // ...
}

// 3. Componente
export const Component: React.FC<Props> = ({ ... }) => {
  // ...
};

// 4. Estilos
const styles = StyleSheet.create({
  // ...
});
```

## ✅ Checklist de Implementação

Ao criar novas features, verificar:

- [ ] Tipos TypeScript definidos
- [ ] Componentes usando SafeAreaView do `react-native-safe-area-context`
- [ ] Layouts responsivos com Flexbox
- [ ] Listas usando FlatList/SectionList
- [ ] Memoização quando apropriado
- [ ] Estilos usando tema centralizado
- [ ] Navegação configurada corretamente
- [ ] Dados mockados para desenvolvimento

## 📚 Referências

- [Expo SDK 54 Changelog](https://expo.dev/changelog/sdk-54)
- [React Navigation Docs](https://reactnavigation.org/)
- [Zustand Docs](https://zustand-demo.pmnd.rs/)
- [NativeWind Docs](https://www.nativewind.dev/)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
