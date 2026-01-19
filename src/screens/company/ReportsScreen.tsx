import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { colors, spacing, typography } from '@/theme';
import { ChartLine, Download, Calendar, TrendingUp } from 'phosphor-react-native';

type ReportType = 'views' | 'clicks' | 'conversions' | 'revenue';

export const ReportsScreen: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState<ReportType>('views');
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d' | 'all'>('30d');

  const reports = {
    views: {
      title: 'Relatório de Visualizações',
      data: { total: '12.5K', average: '417/dia', peak: '1.2K' },
    },
    clicks: {
      title: 'Relatório de Cliques',
      data: { total: '3.4K', average: '113/dia', peak: '450' },
    },
    conversions: {
      title: 'Relatório de Conversões',
      data: { total: '890', average: '30/dia', peak: '120' },
    },
    revenue: {
      title: 'Relatório de Receita',
      data: { total: 'R$ 45.2K', average: 'R$ 1.5K/dia', peak: 'R$ 8.5K' },
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

  const renderDateButton = (range: typeof dateRange, label: string) => (
    <TouchableOpacity
      style={[styles.dateButton, dateRange === range && styles.dateButtonActive]}
      onPress={() => setDateRange(range)}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.dateButtonText,
          dateRange === range && styles.dateButtonTextActive,
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
          <Text style={styles.title}>Relatórios Detalhados</Text>
          <Text style={styles.subtitle}>Análise completa do desempenho</Text>
        </View>

        <Card style={styles.filtersCard} shadow="medium">
          <Text style={styles.sectionTitle}>Tipo de Relatório</Text>
          <View style={styles.reportButtons}>
            {renderReportButton('views', 'Visualizações')}
            {renderReportButton('clicks', 'Cliques')}
            {renderReportButton('conversions', 'Conversões')}
            {renderReportButton('revenue', 'Receita')}
          </View>

          <Text style={[styles.sectionTitle, { marginTop: spacing.lg }]}>Período</Text>
          <View style={styles.dateButtons}>
            {renderDateButton('7d', '7 dias')}
            {renderDateButton('30d', '30 dias')}
            {renderDateButton('90d', '90 dias')}
            {renderDateButton('all', 'Todos')}
          </View>
        </Card>

        <Card style={styles.summaryCard} shadow="medium">
          <View style={styles.summaryHeader}>
            <ChartLine size={32} color={colors.primary} weight="fill" />
            <Text style={styles.summaryTitle}>{currentReport.title}</Text>
          </View>
          <View style={styles.summaryGrid}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Total</Text>
              <Text style={styles.summaryValue}>{currentReport.data.total}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Média</Text>
              <Text style={styles.summaryValue}>{currentReport.data.average}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Pico</Text>
              <Text style={styles.summaryValue}>{currentReport.data.peak}</Text>
            </View>
          </View>
        </Card>

        <Card style={styles.chartCard} shadow="medium">
          <Text style={styles.chartTitle}>Evolução no Período</Text>
          <View style={styles.chartPlaceholder}>
            <TrendingUp size={64} color={colors.gray[400]} weight="duotone" />
            <Text style={styles.chartPlaceholderText}>
              Gráfico de evolução será exibido aqui
            </Text>
            <Text style={styles.chartPlaceholderSubtext}>
              Use react-native-chart-kit ou similar
            </Text>
          </View>
        </Card>

        <Card style={styles.exportCard} shadow="medium">
          <View style={styles.exportHeader}>
            <Download size={24} color={colors.primary} weight="fill" />
            <View style={styles.exportInfo}>
              <Text style={styles.exportTitle}>Exportar Relatório</Text>
              <Text style={styles.exportSubtext}>Baixe o relatório em PDF ou Excel</Text>
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
  sectionTitle: {
    fontSize: typography.h3.fontSize,
    fontWeight: typography.fontWeight.semibold as '600',
    color: colors.gray[900],
    marginBottom: spacing.md,
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
  dateButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  dateButton: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: 8,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray[400],
    alignItems: 'center',
  },
  dateButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  dateButtonText: {
    fontSize: typography.small.fontSize,
    color: colors.gray[700],
  },
  dateButtonTextActive: {
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
  summaryGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryLabel: {
    fontSize: typography.small.fontSize,
    color: colors.gray[700],
    marginBottom: spacing.xs,
  },
  summaryValue: {
    fontSize: typography.h3.fontSize,
    fontWeight: typography.fontWeight.bold as '700',
    color: colors.primary,
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
