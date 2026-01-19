import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { colors, spacing, typography } from '@/theme';
import { mockAds } from '@/services/mockData';
import { Ad } from '@/types';
import { CheckCircle, XCircle } from 'phosphor-react-native';

type FilterType = 'all' | 'pending' | 'approved' | 'rejected';

export const ModerationScreen: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>('pending');

  // Filtra anúncios pendentes para moderação
  const adsToModerate = useMemo(() => {
    let ads = mockAds.filter((ad) => ad.status === 'pending');
    if (filter === 'approved') {
      ads = mockAds.filter((ad) => ad.status === 'active');
    } else if (filter === 'rejected') {
      ads = mockAds.filter((ad) => ad.status === 'expired');
    }
    return ads;
  }, [filter]);

  const handleApprove = (adId: string) => {
    Alert.alert('Aprovar', 'Anúncio aprovado com sucesso!', [{ text: 'OK' }]);
    // Na implementação real, aqui atualizaria o status
  };

  const handleReject = (adId: string) => {
    Alert.alert('Rejeitar', 'Anúncio rejeitado.', [{ text: 'OK' }]);
    // Na implementação real, aqui atualizaria o status
  };

  const renderFilterButton = (filterType: FilterType, label: string) => (
    <TouchableOpacity
      style={[styles.filterButton, filter === filterType && styles.filterButtonActive]}
      onPress={() => setFilter(filterType)}
      activeOpacity={0.7}
    >
      <Text
        style={[
          styles.filterButtonText,
          filter === filterType && styles.filterButtonTextActive,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  const renderAdCard = ({ item }: { item: Ad }) => (
    <Card style={styles.adCard} shadow="medium">
      <View style={styles.adHeader}>
        <View style={styles.adInfo}>
          <Text style={styles.adTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.adCompany}>{item.companyName}</Text>
        </View>
        <Badge label={item.status} variant={item.status} />
      </View>
      <Text style={styles.adDescription} numberOfLines={2}>
        {item.description}
      </Text>
      {item.status === 'pending' && (
        <View style={styles.actions}>
          <Button
            title="Aprovar"
            onPress={() => handleApprove(item.id)}
            variant="primary"
            size="small"
            style={styles.actionButton}
          />
          <Button
            title="Rejeitar"
            onPress={() => handleReject(item.id)}
            variant="danger"
            size="small"
            style={styles.actionButton}
          />
        </View>
      )}
    </Card>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View>
        <Text style={styles.title}>Moderação de Anúncios</Text>
        <Text style={styles.subtitle}>
          {adsToModerate.length} anúncio{adsToModerate.length !== 1 ? 's' : ''} para revisar
        </Text>
      </View>
      <View style={styles.filters}>
        {renderFilterButton('pending', 'Pendentes')}
        {renderFilterButton('approved', 'Aprovados')}
        {renderFilterButton('rejected', 'Rejeitados')}
      </View>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <CheckCircle size={64} color={colors.gray[400]} weight="duotone" />
      <Text style={styles.emptyText}>Nenhum anúncio pendente</Text>
      <Text style={styles.emptySubtext}>Todos os anúncios foram revisados</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FlatList
        data={adsToModerate}
        renderItem={renderAdCard}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        initialNumToRender={5}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[100],
  },
  listContent: {
    padding: spacing.md,
  },
  header: {
    marginBottom: spacing.lg,
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
    marginBottom: spacing.md,
  },
  filters: {
    flexDirection: 'row',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  filterButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray[400],
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterButtonText: {
    fontSize: typography.small.fontSize,
    color: colors.gray[700],
  },
  filterButtonTextActive: {
    color: colors.white,
    fontWeight: typography.fontWeight.semibold as '600',
  },
  adCard: {
    marginBottom: spacing.md,
    padding: spacing.md,
  },
  adHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  adInfo: {
    flex: 1,
    marginRight: spacing.sm,
  },
  adTitle: {
    fontSize: typography.h3.fontSize,
    fontWeight: typography.fontWeight.semibold as '600',
    color: colors.gray[900],
    marginBottom: spacing.xs,
  },
  adCompany: {
    fontSize: typography.small.fontSize,
    color: colors.gray[700],
  },
  adDescription: {
    fontSize: typography.body.fontSize,
    color: colors.gray[700],
    marginBottom: spacing.md,
    lineHeight: typography.body.lineHeight * typography.body.fontSize,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionButton: {
    flex: 1,
  },
  emptyContainer: {
    padding: spacing.xxl,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: typography.h3.fontSize,
    fontWeight: typography.fontWeight.semibold as '600',
    color: colors.gray[900],
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  emptySubtext: {
    fontSize: typography.body.fontSize,
    color: colors.gray[700],
    textAlign: 'center',
  },
});
