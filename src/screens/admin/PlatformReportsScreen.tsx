import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { colors, spacing, typography } from '@/theme';
import { ChartLine, Users, Megaphone, TrendingUp, Download } from 'phosphor-react-native';

type ReportType = 'overview' | 'users' | 'ads' | 'revenue';

export const PlatformReportsScreen: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<ReportType>('overview');

  const reports = {
    overview: {
      title: 'Visão Geral da Plataforma',
      stats: {
        totalUsers: '1.2K',
        totalAds: '456',
        activeAds: '342',
        totalRevenue: 'R$ 125K',
      },
    },
    users: {
      title: 'Relatório de Usuários',
      stats: {
        newUsers: '45',
        activeUsers: '890',
        companies: '123',
        selectMembers: '67',
      },
    },
    ads: {
      title: 'Relatório de Anúncios',
      stats: {
        totalAds: '456',
        activeAds: '342',
        pendingAds: '12',
        expiredAds: '102',
      },
    },
    revenue: {
      title: 'Relatório de Receita',
      stats: {
        totalRevenue: 'R$ 125K',
        monthlyRevenue: 'R$ 45K',
        averageRevenue: 'R$ 4.2K',
        growth: '+15%',
      },
    },
  };

  const renderReportButton = (type: ReportType, label: string) => (
    <TouchableOpacity
      style={[styles.reportButton, selectedReport === type && styles.reportButtonActive]}
      onPress={() => setSelectedReport(type)}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.reportButtonText,
          selectedReport === type && styles.reportButtonTextActive,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  const currentReport = reports[selectedReport];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Relatórios da Plataforma</Text>
          <Text style={styles.subtitle}>Análise completa do desempenho</Text>
        </View>

        <Card style={styles.filtersCard} shadow="medium">
          <View style={styles.reportButtons}>
            {renderReportButton('overview', 'Visão Geral')}
            {renderReportButton('users', 'Usuários')}
            {renderReportButton('ads', 'Anúncios')}
            {renderReportButton('revenue', 'Receita')}
          </View>
        </Card>

        <Card style={styles.summaryCard} shadow="medium">
          <View style={styles.summaryHeader}>
            <ChartLine size={32} color={colors.primary} weight="fill" />
            <Text style={styles.summaryTitle}>{currentReport.title}</Text>
          </View>
          <View style={styles.statsGrid}>
            {Object.entries(currentReport.stats).map(([key, value]) => (
              <View key={key} style={styles.statItem}>
                <Text style={styles.statValue}>{value}</Text>
                <Text style={styles.statLabel}>{key.replace(/([A-Z])/g, ' $1').trim()}</Text>
              </View>
            ))}
          </View>
        </Card>

        <Card style={styles.chartCard} shadow="medium">
          <Text style={styles.chartTitle}>Evolução da Plataforma</Text>
          <View style={styles.chartPlaceholder}>
            <TrendingUp size={64} color={colors.gray[400]} weight="duotone" />
            <Text style={styles.chartPlaceholderText}>
              Gráfico de evolução será exibido aqui
            </Text>
          </View>
        </Card>

        <Card style={styles.exportCard} shadow="medium">
          <View style={styles.exportHeader}>
            <Download size={24} color={colors.primary} weight="fill" />
            <View style={styles.exportInfo}>
              <Text style={styles.exportTitle}>Exportar Relatório</Text>
              <Text style={styles.exportSubtext}>Baixe o relatório completo em PDF ou Excel</Text>
            </View>
          </View>
          <View style={styles.exportButtons}>
            <Button
              title="PDF"
              onPress={() => {}}
              variant="secondary"
              size="small"
              style={styles.exportButton}
            />
            <Button
              title="Excel"
              onPress={() => {}}
              variant="secondary"
              size="small"
              style={styles.exportButton}
            />
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
  filtersCard: {
    margin: spacing.md,
    padding: spacing.lg,
  },
  reportButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  reportButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray[400],
  },
  reportButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  reportButtonText: {
    fontSize: typography.small.fontSize,
    color: colors.gray[700],
  },
  reportButtonTextActive: {
    color: colors.white,
    fontWeight: typography.fontWeight.semibold as '600',
  },
  summaryCard: {
    margin: spacing.md,
    padding: spacing.lg,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  summaryTitle: {
    fontSize: typography.h3.fontSize,
    fontWeight: typography.fontWeight.semibold as '600',
    color: colors.gray[900],
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  statItem: {
    width: '48%',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.gray[100],
    borderRadius: 8,
  },
  statValue: {
    fontSize: typography.h3.fontSize,
    fontWeight: typography.fontWeight.bold as '700',
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: typography.small.fontSize,
    color: colors.gray[700],
    textAlign: 'center',
    textTransform: 'capitalize',
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
  },
  exportCard: {
    margin: spacing.md,
    padding: spacing.lg,
  },
  exportHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  exportInfo: {
    flex: 1,
  },
  exportTitle: {
    fontSize: typography.h3.fontSize,
    fontWeight: typography.fontWeight.semibold as '600',
    color: colors.gray[900],
    marginBottom: spacing.xs,
  },
  exportSubtext: {
    fontSize: typography.small.fontSize,
    color: colors.gray[700],
  },
  exportButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  exportButton: {
    flex: 1,
  },
});
