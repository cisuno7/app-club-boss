import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { colors, spacing, typography } from '@/theme';
import { User, UserRole } from '@/types';
import { MagnifyingGlass, User as UserIcon, Building, Shield, Crown } from 'phosphor-react-native';

const mockUsers: User[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@example.com',
    role: 'client',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Tech Solutions',
    email: 'contato@techsolutions.com',
    role: 'company',
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Maria Admin',
    email: 'admin@example.com',
    role: 'admin',
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Carlos Select',
    email: 'carlos@example.com',
    role: 'select',
    createdAt: new Date().toISOString(),
  },
];

type FilterType = 'all' | UserRole;

export const UsersManagementScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredUsers = useMemo(() => {
    let users = mockUsers;

    if (filter !== 'all') {
      users = users.filter((user) => user.role === filter);
    }

    if (searchQuery) {
      users = users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return users;
  }, [searchQuery, filter]);

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'client':
        return <UserIcon size={24} color={colors.primary} weight="fill" />;
      case 'company':
        return <Building size={24} color={colors.secondary} weight="fill" />;
      case 'admin':
        return <Shield size={24} color={colors.warning} weight="fill" />;
      case 'select':
        return <Crown size={24} color={colors.secondary} weight="fill" />;
    }
  };

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case 'client':
        return 'Cliente';
      case 'company':
        return 'Empresa';
      case 'admin':
        return 'Admin';
      case 'select':
        return 'Select';
    }
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

  const renderUserCard = ({ item }: { item: User }) => (
    <Card style={styles.userCard} shadow="medium">
      <View style={styles.userHeader}>
        <View style={styles.userIcon}>{getRoleIcon(item.role)}</View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.name}</Text>
          <Text style={styles.userEmail}>{item.email}</Text>
        </View>
        <Badge label={getRoleLabel(item.role)} variant="active" />
      </View>
      <View style={styles.userActions}>
        <Button
          title="Ver Detalhes"
          onPress={() => {}}
          variant="secondary"
          size="small"
          style={styles.actionButton}
        />
        <Button
          title="Editar"
          onPress={() => {}}
          variant="secondary"
          size="small"
          style={styles.actionButton}
        />
      </View>
    </Card>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.searchContainer}>
        <MagnifyingGlass size={20} color={colors.gray[700]} />
        <Input
          placeholder="Buscar usuários..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          containerStyle={styles.searchInput}
          style={styles.searchInputStyle}
        />
      </View>
      <View style={styles.filters}>
        {renderFilterButton('all', 'Todos')}
        {renderFilterButton('client', 'Clientes')}
        {renderFilterButton('company', 'Empresas')}
        {renderFilterButton('admin', 'Admins')}
        {renderFilterButton('select', 'Select')}
      </View>
      <Text style={styles.resultsText}>
        {filteredUsers.length} usuário{filteredUsers.length !== 1 ? 's' : ''} encontrado
        {filteredUsers.length !== 1 ? 's' : ''}
      </Text>
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <UserIcon size={64} color={colors.gray[400]} weight="duotone" />
      <Text style={styles.emptyText}>Nenhum usuário encontrado</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FlatList
        data={filteredUsers}
        renderItem={renderUserCard}
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 8,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.gray[400],
  },
  searchInput: {
    marginBottom: 0,
    flex: 1,
  },
  searchInputStyle: {
    borderWidth: 0,
    paddingHorizontal: spacing.sm,
  },
  filters: {
    flexDirection: 'row',
    gap: spacing.sm,
    flexWrap: 'wrap',
    marginBottom: spacing.md,
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
  resultsText: {
    fontSize: typography.small.fontSize,
    color: colors.gray[700],
  },
  userCard: {
    marginBottom: spacing.md,
    padding: spacing.md,
  },
  userHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  userIcon: {
    marginRight: spacing.md,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: typography.h3.fontSize,
    fontWeight: typography.fontWeight.semibold as '600',
    color: colors.gray[900],
    marginBottom: spacing.xs,
  },
  userEmail: {
    fontSize: typography.body.fontSize,
    color: colors.gray[700],
  },
  userActions: {
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
