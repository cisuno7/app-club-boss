import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, borderRadius, typography } from '@/theme';

interface BadgeProps {
  label: string;
  variant?: 'active' | 'expired' | 'pending' | 'success' | 'warning' | 'error';
  style?: ViewStyle;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'active',
  style,
}) => {
  const badgeStyle: ViewStyle[] = [
    styles.base,
    styles[variant],
    style,
  ].filter(Boolean) as ViewStyle[];

  return (
    <View style={badgeStyle}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
  },
  active: {
    backgroundColor: colors.success + '20',
  },
  expired: {
    backgroundColor: colors.error + '20',
  },
  pending: {
    backgroundColor: colors.warning + '20',
  },
  success: {
    backgroundColor: colors.success + '20',
  },
  warning: {
    backgroundColor: colors.warning + '20',
  },
  error: {
    backgroundColor: colors.error + '20',
  },
  text: {
    fontSize: typography.caption.fontSize,
    fontWeight: typography.fontWeight.semibold as '600',
    color: colors.gray[900], // Texto conforme DesignSystem
  },
});
