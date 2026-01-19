import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { colors, spacing, typography, borderRadius } from '@/theme';
import { mockCoupons } from '@/services/mockData';
import { Coupon } from '@/types';
import { Ticket } from 'phosphor-react-native';

type FilterType = 'all' | 'active' | 'used' | 'expired';

export const CouponsScreen: React.FC = () => {
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredCoupons = useMemo(() => {
    if (filter === 'all') return mockCoupons;
    return mockCoupons.filter((coupon) => coupon.status === filter);
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

  const renderCouponCard = ({ item }: { item: Coupon }) => {
    const isExpired = new Date(item.expiresAt) < new Date();
    const statusVariant: 'active' | 'expired' | 'pending' =
      item.status === 'used' ? 'expired' : item.status === 'expired' || isExpired ? 'expired' : 'active';

    return (
      <Card style={styles.couponCard} shadow="medium">
        <View style={styles.couponHeader}>
          <View style={styles.couponIcon}>
            <Ticket size={32} color={colors.primary} weight="fill" />
          </View>
          <View style={styles.couponInfo}>
            <Text style={styles.couponCode}>{item.code}</Text>
            <Text style={styles.couponDiscount}>{item.discount}% OFF</Text>
          </View>
          <Badge label={item.status} variant={statusVariant} />
        </View>
        <View style={styles.couponDetails}>
          <Text style={styles.couponExpires}>
            Válido até: {new Date(item.expiresAt).toLocaleDateString('pt-BR')}
          </Text>
          {item.redeemedAt && (
            <Text style={styles.couponRedeemed}>
              Resgatado em: {new Date(item.redeemedAt).toLocaleDateString('pt-BR')}
            </Text>
          )}
        </View>
        {item.status === 'active' && !isExpired && (
          <Button
            title="Usar Cupom"
            onPress={() => {}}
            variant="primary"
            size="small"
            fullWidth
            style={styles.useButton}
          />
        )}
      </Card>
    );
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>Meus Cupons</Text>
      <Text style={styles.subtitle}>
        {filteredCoupons.length} cupom{filteredCoupons.length !== 1 ? 's' : ''}
      </Text>
      <View style={styles.filters}>
        {renderFilterButton('all', 'Todos')}
        {renderFilterButton('active', 'Ativos')}
        {renderFilterButton('used', 'Usados')}
        {renderFilterButton('expired', 'Expirados')}
      </View>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Ticket size={64} color={colors.gray[400]} weight="duotone" />
      <Text style={styles.emptyText}>Nenhum cupom encontrado</Text>
      <Text style={styles.emptySubtext}>
        {filter === 'all'
          ? 'Você ainda não possui cupons'
          : `Nenhum cupom ${filter === 'active' ? 'ativo' : filter === 'used' ? 'usado' : 'expirado'}`}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FlatList
        data={filteredCoupons}
        renderItem={renderCouponCard}
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
  couponCard: {
    marginBottom: spacing.md,
    padding: spacing.md,
  },
  couponHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  couponIcon: {
    marginRight: spacing.md,
  },
  couponInfo: {
    flex: 1,
  },
  couponCode: {
    fontSize: typography.h3.fontSize,
    fontWeight: typography.fontWeight.bold as '700',
    color: colors.gray[900],
    fontFamily: 'monospace',
    marginBottom: spacing.xs,
  },
  couponDiscount: {
    fontSize: typography.bodyLarge.fontSize,
    fontWeight: typography.fontWeight.bold as '700',
    color: colors.success,
  },
  couponDetails: {
    marginBottom: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.gray[100],
  },
  couponExpires: {
    fontSize: typography.small.fontSize,
    color: colors.gray[700],
    marginBottom: spacing.xs,
  },
  couponRedeemed: {
    fontSize: typography.small.fontSize,
    color: colors.gray[700],
  },
  useButton: {
    marginTop: spacing.sm,
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
