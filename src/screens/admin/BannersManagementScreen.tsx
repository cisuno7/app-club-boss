import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { colors, spacing, typography } from '@/theme';
import { ImageSquare, CheckCircle, XCircle, Trash } from 'phosphor-react-native';

interface Banner {
  id: string;
  imageUrl: string;
  title: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

const mockBanners: Banner[] = [
  {
    id: '1',
    imageUrl: 'https://via.placeholder.com/800x200/1A56DB/ffffff?text=Banner+1',
    title: 'Banner Promocional Tech Solutions',
    status: 'active',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    imageUrl: 'https://via.placeholder.com/800x200/7E3AF2/ffffff?text=Banner+2',
    title: 'Banner Marketing Pro',
    status: 'active',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    imageUrl: 'https://via.placeholder.com/800x200/0E9F6E/ffffff?text=Banner+3',
    title: 'Banner Design Studio',
    status: 'inactive',
    createdAt: new Date().toISOString(),
  },
];

export const BannersManagementScreen: React.FC = () => {
  const [banners, setBanners] = useState<Banner[]>(mockBanners);
  const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all');

  const filteredBanners = useMemo(() => {
    if (filter === 'all') return banners;
    return banners.filter((banner) => banner.status === filter);
  }, [banners, filter]);

  const handleToggleStatus = (id: string) => {
    setBanners(
      banners.map((banner) =>
        banner.id === id
          ? { ...banner, status: banner.status === 'active' ? 'inactive' : 'active' }
          : banner
      )
    );
  };

  const handleDelete = (id: string) => {
    Alert.alert('Excluir Banner', 'Tem certeza que deseja excluir este banner?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => {
          setBanners(banners.filter((banner) => banner.id !== id));
        },
      },
    ]);
  };

  const renderFilterButton = (filterType: typeof filter, label: string) => (
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

  const renderBannerCard = ({ item }: { item: Banner }) => (
    <Card style={styles.bannerCard} shadow="medium">
      <Image source={{ uri: item.imageUrl }} style={styles.bannerImage} resizeMode="cover" />
      <View style={styles.bannerInfo}>
        <View style={styles.bannerHeader}>
          <Text style={styles.bannerTitle}>{item.title}</Text>
          <Badge
            label={item.status === 'active' ? 'Ativo' : 'Inativo'}
            variant={item.status === 'active' ? 'active' : 'expired'}
          />
        </View>
        <Text style={styles.bannerDate}>
          Criado em: {new Date(item.createdAt).toLocaleDateString('pt-BR')}
        </Text>
        <View style={styles.bannerActions}>
          <Button
            title={item.status === 'active' ? 'Desativar' : 'Ativar'}
            onPress={() => handleToggleStatus(item.id)}
            variant={item.status === 'active' ? 'secondary' : 'primary'}
            size="small"
            style={styles.actionButton}
          />
          <Button
            title="Excluir"
            onPress={() => handleDelete(item.id)}
            variant="danger"
            size="small"
            style={styles.actionButton}
          />
        </View>
      </View>
    </Card>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>Gerenciamento de Banners</Text>
      <Text style={styles.subtitle}>
        {filteredBanners.length} banner{filteredBanners.length !== 1 ? 's' : ''}
      </Text>
      <View style={styles.filters}>
        {renderFilterButton('all', 'Todos')}
        {renderFilterButton('active', 'Ativos')}
        {renderFilterButton('inactive', 'Inativos')}
      </View>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <ImageSquare size={64} color={colors.gray[400]} weight="duotone" />
      <Text style={styles.emptyText}>Nenhum banner encontrado</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FlatList
        data={filteredBanners}
        renderItem={renderBannerCard}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmpty}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
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
  bannerCard: {
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: 200,
    backgroundColor: colors.gray[100],
  },
  bannerInfo: {
    padding: spacing.md,
  },
  bannerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  bannerTitle: {
    fontSize: typography.h3.fontSize,
    fontWeight: typography.fontWeight.semibold as '600',
    color: colors.gray[900],
    flex: 1,
    marginRight: spacing.sm,
  },
  bannerDate: {
    fontSize: typography.small.fontSize,
    color: colors.gray[700],
    marginBottom: spacing.md,
  },
  bannerActions: {
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
    fontSize: typography.body.fontSize,
    color: colors.gray[700],
    marginTop: spacing.md,
  },
});
