import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { colors, spacing, typography } from '@/theme';
import { Crown, Star, Ticket, Calendar } from 'phosphor-react-native';

export const HomeSelectScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.title}>Mundo Select</Text>
              <Text style={styles.subtitle}>Área exclusiva para membros premium</Text>
            </View>
            <Badge label="SELECT" variant="active" />
          </View>
        </View>

        <Card style={styles.welcomeCard} shadow="large">
          <View style={styles.welcomeHeader}>
            <Crown size={48} color={colors.secondary} weight="fill" />
            <Text style={styles.welcomeTitle}>Bem-vindo ao Select!</Text>
          </View>
          <Text style={styles.welcomeText}>
            Você tem acesso exclusivo a eventos, cupons premium e networking de alto nível.
          </Text>
        </Card>

        <View style={styles.featuresGrid}>
          <Card style={styles.featureCard} shadow="medium">
            <Star size={32} color={colors.secondary} weight="fill" />
            <Text style={styles.featureTitle}>Cupons Exclusivos</Text>
            <Text style={styles.featureText}>Acesso a descontos especiais</Text>
          </Card>
          <Card style={styles.featureCard} shadow="medium">
            <Calendar size={32} color={colors.secondary} weight="fill" />
            <Text style={styles.featureTitle}>Eventos Select</Text>
            <Text style={styles.featureText}>Agenda de eventos exclusivos</Text>
          </Card>
          <Card style={styles.featureCard} shadow="medium">
            <Ticket size={32} color={colors.secondary} weight="fill" />
            <Text style={styles.featureTitle}>Networking</Text>
            <Text style={styles.featureText}>Conecte-se com outros Select</Text>
          </Card>
        </View>

        <Card style={styles.exclusiveCard} shadow="medium">
          <Text style={styles.exclusiveTitle}>Conteúdo Exclusivo</Text>
          <Text style={styles.exclusiveText}>
            Acesse conteúdos premium, webinars exclusivos e materiais educacionais avançados
            disponíveis apenas para membros Select.
          </Text>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[100],
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: spacing.lg,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100],
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: typography.h2.fontSize,
    fontWeight: typography.fontWeight.bold as '700',
    color: colors.gray[900],
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.body.fontSize,
    color: colors.gray[700],
  },
  welcomeCard: {
    margin: spacing.md,
    padding: spacing.lg,
    backgroundColor: colors.secondary + '10',
  },
  welcomeHeader: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  welcomeTitle: {
    fontSize: typography.h3.fontSize,
    fontWeight: typography.fontWeight.bold as '700',
    color: colors.gray[900],
    marginTop: spacing.md,
  },
  welcomeText: {
    fontSize: typography.body.fontSize,
    color: colors.gray[700],
    textAlign: 'center',
    lineHeight: typography.body.lineHeight * typography.body.fontSize,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: spacing.md,
    gap: spacing.md,
  },
  featureCard: {
    width: '48%',
    padding: spacing.md,
    alignItems: 'center',
  },
  featureTitle: {
    fontSize: typography.body.fontSize,
    fontWeight: typography.fontWeight.semibold as '600',
    color: colors.gray[900],
    marginTop: spacing.sm,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  featureText: {
    fontSize: typography.small.fontSize,
    color: colors.gray[700],
    textAlign: 'center',
  },
  exclusiveCard: {
    margin: spacing.md,
    padding: spacing.lg,
  },
  exclusiveTitle: {
    fontSize: typography.h3.fontSize,
    fontWeight: typography.fontWeight.semibold as '600',
    color: colors.gray[900],
    marginBottom: spacing.sm,
  },
  exclusiveText: {
    fontSize: typography.body.fontSize,
    color: colors.gray[700],
    lineHeight: typography.body.lineHeight * typography.body.fontSize,
  },
});
