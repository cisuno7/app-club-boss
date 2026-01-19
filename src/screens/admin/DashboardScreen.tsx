import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '@/components/Card';
import { colors, spacing, typography } from '@/theme';
import { Users, Megaphone, ChartLine, ShieldCheck } from 'phosphor-react-native';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, color }) => (
  <Card style={styles.statCard} shadow="medium">
    <View style={styles.statHeader}>
      {icon}
      <Text style={styles.statTitle}>{title}</Text>
    </View>
    <Text style={[styles.statValue, { color }]}>{value}</Text>
  </Card>
);

export const AdminDashboardScreen: React.FC = () => {
  // Dados mockados
  const stats = {
    totalUsers: '1.2K',
    totalAds: '456',
    pendingModeration: '12',
    platformGrowth: '+15%',
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Dashboard Admin</Text>
          <Text style={styles.subtitle}>Visão geral da plataforma</Text>
        </View>

        <View style={styles.statsGrid}>
          <StatCard
            title="Total de Usuários"
            value={stats.totalUsers}
            icon={<Users size={24} color={colors.primary} weight="fill" />}
            color={colors.primary}
          />
          <StatCard
            title="Total de Anúncios"
            value={stats.totalAds}
            icon={<Megaphone size={24} color={colors.secondary} weight="fill" />}
            color={colors.secondary}
          />
          <StatCard
            title="Pendentes Moderação"
            value={stats.pendingModeration}
            icon={<ShieldCheck size={24} color={colors.warning} weight="fill" />}
            color={colors.warning}
          />
          <StatCard
            title="Crescimento"
            value={stats.platformGrowth}
            icon={<ChartLine size={24} color={colors.success} weight="fill" />}
            color={colors.success}
          />
        </View>

        <Card style={styles.quickActionsCard} shadow="medium">
          <Text style={styles.sectionTitle}>Ações Rápidas</Text>
          <View style={styles.quickActions}>
            <View style={styles.quickActionItem}>
              <Text style={styles.quickActionLabel}>Moderação</Text>
              <Text style={styles.quickActionValue}>{stats.pendingModeration} pendentes</Text>
            </View>
            <View style={styles.quickActionItem}>
              <Text style={styles.quickActionLabel}>Usuários</Text>
              <Text style={styles.quickActionValue}>Gerenciar</Text>
            </View>
            <View style={styles.quickActionItem}>
              <Text style={styles.quickActionLabel}>Relatórios</Text>
              <Text style={styles.quickActionValue}>Ver todos</Text>
            </View>
          </View>
        </Card>

        <Card style={styles.recentActivityCard} shadow="medium">
          <Text style={styles.sectionTitle}>Atividade Recente</Text>
          <View style={styles.activityItem}>
            <View style={styles.activityDot} />
            <View style={styles.activityContent}>
              <Text style={styles.activityText}>Novo anúncio criado por Tech Solutions</Text>
              <Text style={styles.activityTime}>Há 2 horas</Text>
            </View>
          </View>
          <View style={styles.activityItem}>
            <View style={styles.activityDot} />
            <View style={styles.activityContent}>
              <Text style={styles.activityText}>Novo usuário cadastrado</Text>
              <Text style={styles.activityTime}>Há 5 horas</Text>
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
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: spacing.md,
    gap: spacing.md,
  },
  statCard: {
    width: '48%',
    padding: spacing.md,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    gap: spacing.sm,
  },
  statTitle: {
    fontSize: typography.small.fontSize,
    color: colors.gray[700],
    flex: 1,
  },
  statValue: {
    fontSize: typography.h2.fontSize,
    fontWeight: typography.fontWeight.bold as '700',
  },
  quickActionsCard: {
    margin: spacing.md,
    padding: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.h3.fontSize,
    fontWeight: typography.fontWeight.semibold as '600',
    color: colors.gray[900],
    marginBottom: spacing.md,
  },
  quickActions: {
    gap: spacing.md,
  },
  quickActionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100],
  },
  quickActionLabel: {
    fontSize: typography.body.fontSize,
    color: colors.gray[700],
  },
  quickActionValue: {
    fontSize: typography.body.fontSize,
    fontWeight: typography.fontWeight.semibold as '600',
    color: colors.primary,
  },
  recentActivityCard: {
    margin: spacing.md,
    padding: spacing.lg,
  },
  activityItem: {
    flexDirection: 'row',
    marginBottom: spacing.md,
  },
  activityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginTop: spacing.xs,
    marginRight: spacing.md,
  },
  activityContent: {
    flex: 1,
  },
  activityText: {
    fontSize: typography.body.fontSize,
    color: colors.gray[900],
    marginBottom: spacing.xs,
  },
  activityTime: {
    fontSize: typography.small.fontSize,
    color: colors.gray[700],
  },
});
