import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AdCard } from '@/components/AdCard';
import { colors, spacing, typography } from '@/theme';
import { mockAds } from '@/services/mockData';
import { Ad } from '@/types';

type RootStackParamList = {
  AvailableCoupons: undefined;
  AdDetail: { ad: Ad };
};

type AvailableCouponsNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AvailableCoupons'
>;

type FilterType = 'all' | 'high-discount' | 'newest';

export const AvailableCouponsScreen: React.FC = () => {
  const navigation = useNavigation<AvailableCouponsNavigationProp>();
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredAds = useMemo(() => {
    let ads = mockAds.filter((ad) => ad.status === 'active' && ad.couponCode);

    switch (filter) {
      case 'high-discount':
        ads = ads.filter((ad) => (ad.discount || 0) >= 20);
        break;
      case 'newest':
        ads = [...ads].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      default:
        break;
    }

    return ads;
  }, [filter]);

  const handleAdPress = (ad: Ad) => {
    navigation.navigate('AdDetail', { ad });
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

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>Cupons Disponíveis</Text>
      <Text style={styles.subtitle}>
        {filteredAds.length} cupom{filteredAds.length !== 1 ? 's' : ''} disponível
        {filteredAds.length !== 1 ? 'eis' : ''}
      </Text>
      <View style={styles.filters}>
        {renderFilterButton('all', 'Todos')}
        {renderFilterButton('high-discount', 'Maior desconto')}
        {renderFilterButton('newest', 'Mais recentes')}
      </View>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>Nenhum cupom disponível no momento</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FlatList
        data={filteredAds}
        renderItem={({ item }) => <AdCard ad={item} onPress={() => handleAdPress(item)} />}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
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
  emptyContainer: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: typography.body.fontSize,
    color: colors.gray[700],
    textAlign: 'center',
  },
});
