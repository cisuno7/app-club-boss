import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '@/store/authStore';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { colors, spacing, typography } from '@/theme';
import { Crown, Star, Calendar, Ticket } from 'phosphor-react-native';

export const SelectProfileScreen: React.FC = () => {
  const { user, logout } = useAuthStore();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.badgeContainer}>
            <Crown size={48} color={colors.secondary} weight="fill" />
            <Badge label="SELECT MEMBER" variant="active" style={styles.memberBadge} />
          </View>
          {user && (
            <>
              <Text style={styles.userName}>{user.name}</Text>
              <Text style={styles.userEmail}>{user.email}</Text>
            </>
          )}
        </View>

        <Card style={styles.statsCard} shadow="medium">
          <Text style={styles.statsTitle}>Seus Benefícios Select</Text>
          <View style={styles.benefitsGrid}>
            <View style={styles.benefitItem}>
              <Ticket size={24} color={colors.secondary} weight="fill" />
              <Text style={styles.benefitValue}>12</Text>
              <Text style={styles.benefitLabel}>Cupons Usados</Text>
            </View>
            <View style={styles.benefitItem}>
              <Calendar size={24} color={colors.secondary} weight="fill" />
              <Text style={styles.benefitValue}>5</Text>
              <Text style={styles.benefitLabel}>Eventos Participados</Text>
            </View>
            <View style={styles.benefitItem}>
              <Star size={24} color={colors.secondary} weight="fill" />
              <Text style={styles.benefitValue}>8</Text>
              <Text style={styles.benefitLabel}>Conteúdos Acessados</Text>
            </View>
          </View>
        </Card>

        <Card style={styles.infoCard} shadow="medium">
          <Text style={styles.infoTitle}>Membro Select desde</Text>
          <Text style={styles.infoValue}>
            {user?.createdAt
              ? new Date(user.createdAt).toLocaleDateString('pt-BR', {
                  month: 'long',
                  year: 'numeric',
                })
              : 'Janeiro 2024'}
          </Text>
        </Card>

        <Card style={styles.featuresCard} shadow="medium">
          <Text style={styles.featuresTitle}>Benefícios Ativos</Text>
          <View style={styles.featureItem}>
            <Crown size={20} color={colors.success} weight="fill" />
            <Text style={styles.featureText}>Acesso a cupons exclusivos</Text>
          </View>
          <View style={styles.featureItem}>
            <Calendar size={20} color={colors.success} weight="fill" />
            <Text style={styles.featureText}>Participação em eventos Select</Text>
          </View>
          <View style={styles.featureItem}>
            <Star size={20} color={colors.success} weight="fill" />
            <Text style={styles.featureText}>Conteúdo exclusivo ilimitado</Text>
          </View>
          <View style={styles.featureItem}>
            <Ticket size={20} color={colors.success} weight="fill" />
            <Text style={styles.featureText}>Prioridade no suporte</Text>
          </View>
        </Card>

        <Button
          title="Sair"
          onPress={logout}
          variant="secondary"
          fullWidth
          style={styles.logoutButton}
        />
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
    alignItems: 'center',
  },
  badgeContainer: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  memberBadge: {
    marginTop: spacing.sm,
    backgroundColor: colors.secondary + '20',
  },
  userName: {
    fontSize: typography.h2.fontSize,
    fontWeight: typography.fontWeight.bold as '700',
    color: colors.gray[900],
    marginBottom: spacing.xs,
  },
  userEmail: {
    fontSize: typography.body.fontSize,
    color: colors.gray[700],
  },
  statsCard: {
    margin: spacing.md,
    padding: spacing.lg,
  },
  statsTitle: {
    fontSize: typography.h3.fontSize,
    fontWeight: typography.fontWeight.semibold as '600',
    color: colors.gray[900],
    marginBottom: spacing.md,
  },
  benefitsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  benefitItem: {
    alignItems: 'center',
  },
  benefitValue: {
    fontSize: typography.h3.fontSize,
    fontWeight: typography.fontWeight.bold as '700',
    color: colors.secondary,
    marginTop: spacing.xs,
    marginBottom: spacing.xs,
  },
  benefitLabel: {
    fontSize: typography.small.fontSize,
    color: colors.gray[700],
    textAlign: 'center',
  },
  infoCard: {
    margin: spacing.md,
    padding: spacing.lg,
  },
  infoTitle: {
    fontSize: typography.body.fontSize,
    color: colors.gray[700],
    marginBottom: spacing.xs,
  },
  infoValue: {
    fontSize: typography.h3.fontSize,
    fontWeight: typography.fontWeight.bold as '700',
    color: colors.gray[900],
  },
  featuresCard: {
    margin: spacing.md,
    padding: spacing.lg,
  },
  featuresTitle: {
    fontSize: typography.h3.fontSize,
    fontWeight: typography.fontWeight.semibold as '600',
    color: colors.gray[900],
    marginBottom: spacing.md,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  featureText: {
    fontSize: typography.body.fontSize,
    color: colors.gray[700],
    flex: 1,
  },
  logoutButton: {
    margin: spacing.md,
  },
});
