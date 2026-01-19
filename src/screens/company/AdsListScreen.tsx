import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { colors, spacing, typography } from '@/theme';
import { mockAds } from '@/services/mockData';
import { Ad } from '@/types';
import { Plus, Pencil, Pause, Play } from 'phosphor-react-native';

type RootStackParamList = {
  AdsList: undefined;
  CreateEditAd: { ad?: Ad };
};

type AdsListNavigationProp = StackNavigationProp<RootStackParamList, 'AdsList'>;

type FilterType = 'all' | 'active' | 'paused' | 'finished';

export const AdsListScreen: React.FC = () => {
  const navigation = useNavigation<AdsListNavigationProp>();
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredAds = useMemo(() => {
    if (filter === 'all') return mockAds;
    if (filter === 'active') return mockAds.filter((ad) => ad.status === 'active');
    if (filter === 'paused') return mockAds.filter((ad) => ad.status === 'pending');
    if (filter === 'finished') return mockAds.filter((ad) => ad.status === 'expired');
    return mockAds;
  }, [filter]);

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
      <View style={styles.adStats}>
        <Text style={styles.adStat}>👁️ {item.views}</Text>
        <Text style={styles.adStat}>👆 {item.clicks}</Text>
        <Text style={styles.adStat}>🎫 {item.couponsRedeemed}</Text>
      </View>
      <View style={styles.adActions}>
        <Button
          title="Editar"
          onPress={() => navigation.navigate('CreateEditAd', { ad: item })}
          variant="secondary"
          size="small"
          style={styles.actionButton}
        />
        {item.status === 'active' ? (
          <Button
            title="Pausar"
            onPress={() => {}}
            variant="secondary"
            size="small"
            style={styles.actionButton}
          />
        ) : (
          <Button
            title="Ativar"
            onPress={() => {}}
            variant="primary"
            size="small"
            style={styles.actionButton}
          />
        )}
      </View>
    </Card>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <View>
          <Text style={styles.title}>Meus Anúncios</Text>
          <Text style={styles.subtitle}>
            {filteredAds.length} anúncio{filteredAds.length !== 1 ? 's' : ''}
          </Text>
        </View>
        <Button
          title="Novo"
          onPress={() => navigation.navigate('CreateEditAd', {})}
          variant="primary"
          size="small"
        />
      </View>
      <View style={styles.filters}>
        {renderFilterButton('all', 'Todos')}
        {renderFilterButton('active', 'Ativos')}
        {renderFilterButton('paused', 'Pausados')}
        {renderFilterButton('finished', 'Finalizados')}
      </View>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>Nenhum anúncio encontrado</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FlatList
        data={filteredAds}
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
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
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
  adStats: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.gray[100],
  },
  adStat: {
    fontSize: typography.small.fontSize,
    color: colors.gray[700],
  },
  adActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionButton: {
    flex: 1,
  },
  emptyContainer: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: typography.body.fontSize,
    color: colors.gray[700],
  },
});
