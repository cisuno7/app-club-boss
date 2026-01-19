// Design System - Boss Connection Platform
// Seguindo especificações do DesignSystem.md

export const colors = {
  // Primárias
  primary: '#1A56DB', // Azul confiança
  secondary: '#7E3AF2', // Roxo inovação
  
  // Status
  success: '#0E9F6E', // Verde sucesso
  warning: '#F59E0B', // Amarelo atenção
  error: '#DC2626', // Vermelho erro
  
  // Neutras
  gray: {
    900: '#111827', // Texto
    700: '#374151', // Texto secundário
    400: '#9CA3AF', // Bordas
    100: '#F3F4F6', // Fundos
  },
  
  // Base
  white: '#FFFFFF',
  black: '#000000',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const typography = {
  fontFamily: {
    sans: 'Inter', // Google Fonts
  },
  // Escala conforme DesignSystem.md
  h1: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: '700' as const, // Bold
  },
  h2: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: '700' as const, // Bold
  },
  h3: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: '600' as const, // Semibold
  },
  bodyLarge: {
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '400' as const, // Regular
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400' as const, // Regular
  },
  small: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '400' as const, // Regular
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '400' as const, // Regular
  },
  // Aliases para compatibilidade
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 32,
  },
  fontWeight: {
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
};

export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
};

export const shadows = {
  // Conforme DesignSystem.md
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
    elevation: 2,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 25,
    elevation: 8,
  },
  // Aliases para compatibilidade
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 25,
    elevation: 8,
  },
};

export const theme = {
  colors,
  spacing,
  typography,
  borderRadius,
  shadows,
};

export default theme;
