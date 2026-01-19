import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AdCard } from '@/components/AdCard';
import { Card } from '@/components/Card';
import { colors, spacing, typography } from '@/theme';
import { mockAds } from '@/services/mockData';
import { Ad } from '@/types';
import { Crown, Star } from 'phosphor-react-native';

type RootStackParamList = {
  ExclusiveCoupons: undefined;
  AdDetail: { ad: Ad };
};

type ExclusiveCouponsNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ExclusiveCoupons'
>;

export const ExclusiveCouponsScreen: React.FC = () => {
  const navigation = useNavigation<ExclusiveCouponsNavigationProp>();

  // Filtra apenas anúncios com desconto alto (exclusivos Select)
  const exclusiveAds = useMemo(
    () => mockAds.filter((ad) => ad.status === 'active' && (ad.discount || 0) >= 25),
    []
  );

  const handleAdPress = (ad: Ad) => {
    navigation.navigate('AdDetail', { ad });
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerTop}>
        <Crown size={32} color={colors.secondary} weight="fill" />
        <View style={styles.headerText}>
          <Text style={styles.title}>Cupons Exclusivos Select</Text>
          <Text style={styles.subtitle}>
            Descontos especiais disponíveis apenas para membros Select
          </Text>
        </View>
      </View>
      <Card style={styles.badgeCard} shadow="small">
        <Star size={20} color={colors.secondary} weight="fill" />
        <Text style={styles.badgeText}>
          {exclusiveAds.length} cupom{exclusiveAds.length !== 1 ? 's' : ''} exclusivo
          {exclusiveAds.length !== 1 ? 's' : ''}
        </Text>
      </Card>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Crown size={64} color={colors.gray[400]} weight="duotone" />
      <Text style={styles.emptyText}>Nenhum cupom exclusivo no momento</Text>
      <Text style={styles.emptySubtext}>
        Novos cupons exclusivos serão adicionados em breve
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FlatList
        data={exclusiveAds}
        renderItem={({ item }) => <AdCard ad={item} onPress={() => handleAdPress(item)} />}
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
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  headerText: {
    flex: 1,
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
    lineHeight: typography.body.lineHeight * typography.body.fontSize,
  },
  badgeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.md,
    backgroundColor: colors.secondary + '10',
  },
  badgeText: {
    fontSize: typography.body.fontSize,
    fontWeight: typography.fontWeight.semibold as '600',
    color: colors.secondary,
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
