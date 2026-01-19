import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useAuthStore } from '@/store/authStore';
import { colors, typography, spacing } from '@/theme';

export const SplashScreen: React.FC = () => {
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    // Simula carregamento inicial
    // Na implementação real, aqui verificaria token, carregaria dados, etc.
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>BOSS</Text>
      <Text style={styles.subtitle}>Connection Platform</Text>
      <Text style={styles.tagline}>Onde negócios se encontram</Text>
      <ActivityIndicator
        size="large"
        color={colors.primary}
        style={styles.loader}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
  },
  logo: {
    fontSize: typography.h1.fontSize,
    fontWeight: typography.fontWeight.bold as '700',
    color: colors.white,
    letterSpacing: 4,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.bodyLarge.fontSize,
    color: colors.white,
    opacity: 0.9,
    marginBottom: spacing.sm,
  },
  tagline: {
    fontSize: typography.small.fontSize,
    color: colors.white,
    opacity: 0.7,
    marginBottom: spacing.xl,
  },
  loader: {
    marginTop: spacing.xl,
  },
});
