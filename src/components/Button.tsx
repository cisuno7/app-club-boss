import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors, spacing, borderRadius, typography } from '@/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'text';
  size?: 'small' | 'medium' | 'large' | 'sm' | 'md' | 'lg'; // Suporta ambos os formatos
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  fullWidth = false,
}) => {
  // Normaliza tamanho (suporta 'sm'/'md'/'lg' e 'small'/'medium'/'large')
  const normalizedSize = 
    size === 'sm' ? 'small' : 
    size === 'md' ? 'medium' : 
    size === 'lg' ? 'large' : size;

  const buttonStyle: ViewStyle[] = [
    styles.base,
    styles[variant],
    styles[`size_${normalizedSize}`],
    fullWidth && styles.fullWidth,
    (disabled || loading) && styles.disabled,
  ].filter(Boolean) as ViewStyle[];

  const textStyle: TextStyle[] = [
    styles.buttonText,
    styles[`text_${variant}`],
    styles[`textSize_${normalizedSize}`],
  ];

  const getLoaderColor = () => {
    if (variant === 'text') return colors.primary;
    if (variant === 'secondary') return colors.gray[700];
    return colors.white;
  };

  return (
    <TouchableOpacity
      style={buttonStyle}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          color={getLoaderColor()}
          size="small"
        />
      ) : (
        <Text style={textStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  // Variantes conforme DesignSystem.md
  primary: {
    backgroundColor: colors.primary, // Azul confiança
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.gray[400], // Outline cinza
  },
  danger: {
    backgroundColor: colors.error, // Vermelho erro
  },
  text: {
    backgroundColor: 'transparent',
    borderWidth: 0,
  },
  // Tamanhos: Small, Medium, Large
  size_small: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    minHeight: 36,
  },
  size_medium: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    minHeight: 48,
  },
  size_large: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    minHeight: 56,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontWeight: typography.fontWeight.semibold as '600',
    textAlign: 'center',
  },
  text_primary: {
    color: colors.white,
  },
  text_secondary: {
    color: colors.gray[700], // Texto secundário
  },
  text_danger: {
    color: colors.white,
  },
  text_text: {
    color: colors.primary, // Azul confiança
  },
  textSize_small: {
    fontSize: typography.small.fontSize,
  },
  textSize_medium: {
    fontSize: typography.body.fontSize,
  },
  textSize_large: {
    fontSize: typography.bodyLarge.fontSize,
  },
});
