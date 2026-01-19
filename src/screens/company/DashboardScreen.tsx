import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '@/components/Card';
import { colors, spacing, typography } from '@/theme';
import { ChartLine, Eye, CursorClick, Ticket } from 'phosphor-react-native';

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon, color }) => (
  <Card style={styles.metricCard} shadow="medium">
    <View style={styles.metricHeader}>
      {icon}
      <Text style={styles.metricTitle}>{title}</Text>
    </View>
    <Text style={[styles.metricValue, { color }]}>{value}</Text>
  </Card>
);

export const DashboardScreen: React.FC = () => {
  // Dados mockados - na implementação real viriam da API
  const metrics = {
    views: '12.5K',
    clicks: '3.4K',
    couponsRedeemed: '890',
    conversionRate: '7.1%',
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Dashboard</Text>
          <Text style={styles.subtitle}>Visão geral das suas métricas</Text>
        </View>

        <View style={styles.metricsGrid}>
          <MetricCard
            title="Visualizações"
            value={metrics.views}
            icon={<Eye size={24} color={colors.primary} weight="fill" />}
            color={colors.primary}
          />
          <MetricCard
            title="Cliques"
            value={metrics.clicks}
            icon={<CursorClick size={24} color={colors.secondary} weight="fill" />}
            color={colors.secondary}
          />
          <MetricCard
            title="Cupons Resgatados"
            value={metrics.couponsRedeemed}
            icon={<Ticket size={24} color={colors.success} weight="fill" />}
            color={colors.success}
          />
          <MetricCard
            title="Taxa de Conversão"
            value={metrics.conversionRate}
            icon={<ChartLine size={24} color={colors.warning} weight="fill" />}
            color={colors.warning}
          />
        </View>

        <Card style={styles.chartCard} shadow="medium">
          <Text style={styles.chartTitle}>Performance dos Anúncios</Text>
          <View style={styles.chartPlaceholder}>
            <ChartLine size={64} color={colors.gray[400]} weight="duotone" />
            <Text style={styles.chartPlaceholderText}>
              Gráfico de performance será exibido aqui
            </Text>
            <Text style={styles.chartPlaceholderSubtext}>
              Use react-native-chart-kit ou similar para implementar
            </Text>
          </View>
        </Card>

        <Card style={styles.recentCard} shadow="medium">
          <Text style={styles.recentTitle}>Anúncios Recentes</Text>
          <View style={styles.recentItem}>
            <View style={styles.recentItemInfo}>
              <Text style={styles.recentItemTitle}>Desconto de 20% em Serviços de TI</Text>
              <Text style={styles.recentItemSubtitle}>1250 visualizações • 340 cliques</Text>
            </View>
            <View style={styles.recentItemBadge}>
              <Text style={styles.recentItemBadgeText}>Ativo</Text>
            </View>
          </View>
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
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: spacing.md,
    gap: spacing.md,
  },
  metricCard: {
    width: '48%',
    padding: spacing.md,
  },
  metricHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  metricTitle: {
    fontSize: typography.small.fontSize,
    color: colors.gray[700],
    flex: 1,
  },
  metricValue: {
    fontSize: typography.h2.fontSize,
    fontWeight: typography.fontWeight.bold as '700',
  },
  chartCard: {
    margin: spacing.md,
    padding: spacing.lg,
  },
  chartTitle: {
    fontSize: typography.h3.fontSize,
    fontWeight: typography.fontWeight.semibold as '600',
    color: colors.gray[900],
    marginBottom: spacing.md,
  },
  chartPlaceholder: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    backgroundColor: colors.gray[100],
    borderRadius: 8,
  },
  chartPlaceholderText: {
    fontSize: typography.body.fontSize,
    color: colors.gray[700],
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  chartPlaceholderSubtext: {
    fontSize: typography.small.fontSize,
    color: colors.gray[400],
  },
  recentCard: {
    margin: spacing.md,
    padding: spacing.lg,
  },
  recentTitle: {
    fontSize: typography.h3.fontSize,
    fontWeight: typography.fontWeight.semibold as '600',
    color: colors.gray[900],
    marginBottom: spacing.md,
  },
  recentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  recentItemInfo: {
    flex: 1,
  },
  recentItemTitle: {
    fontSize: typography.body.fontSize,
    fontWeight: typography.fontWeight.semibold as '600',
    color: colors.gray[900],
    marginBottom: spacing.xs,
  },
  recentItemSubtitle: {
    fontSize: typography.small.fontSize,
    color: colors.gray[700],
  },
  recentItemBadge: {
    backgroundColor: colors.success + '20',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 12,
  },
  recentItemBadgeText: {
    fontSize: typography.caption.fontSize,
    color: colors.success,
    fontWeight: typography.fontWeight.semibold as '600',
  },
});
