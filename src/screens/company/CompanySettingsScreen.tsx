import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Switch, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { colors, spacing, typography } from '@/theme';
import { Bell, Shield, CreditCard, Trash } from 'phosphor-react-native';

interface SettingItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
}

const SettingItem: React.FC<SettingItemProps> = ({
  icon,
  title,
  description,
  value,
  onValueChange,
}) => (
  <View style={styles.settingItem}>
    <View style={styles.settingIcon}>{icon}</View>
    <View style={styles.settingContent}>
      <Text style={styles.settingTitle}>{title}</Text>
      <Text style={styles.settingDescription}>{description}</Text>
    </View>
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ false: colors.gray[400], true: colors.primary }}
      thumbColor={colors.white}
    />
  </View>
);

export const CompanySettingsScreen: React.FC = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: false,
    smsNotifications: false,
    autoApproveAds: false,
    publicProfile: true,
  });

  const handleSettingChange = (key: keyof typeof settings, value: boolean) => {
    setSettings({ ...settings, [key]: value });
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Excluir Conta',
      'Tem certeza que deseja excluir sua conta? Esta ação não pode ser desfeita.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Conta excluída', 'Sua conta foi excluída com sucesso.');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Configurações</Text>
          <Text style={styles.subtitle}>Gerencie as configurações da sua conta</Text>
        </View>

        <Card style={styles.settingsCard} shadow="medium">
          <Text style={styles.sectionTitle}>Notificações</Text>
          <SettingItem
            icon={<Bell size={24} color={colors.primary} weight="fill" />}
            title="Notificações por Email"
            description="Receba atualizações por email"
            value={settings.emailNotifications}
            onValueChange={(value) => handleSettingChange('emailNotifications', value)}
          />
          <SettingItem
            icon={<Bell size={24} color={colors.primary} weight="fill" />}
            title="Notificações Push"
            description="Receba notificações no dispositivo"
            value={settings.pushNotifications}
            onValueChange={(value) => handleSettingChange('pushNotifications', value)}
          />
          <SettingItem
            icon={<Bell size={24} color={colors.primary} weight="fill" />}
            title="Notificações por SMS"
            description="Receba alertas importantes por SMS"
            value={settings.smsNotifications}
            onValueChange={(value) => handleSettingChange('smsNotifications', value)}
          />
        </Card>

        <Card style={styles.settingsCard} shadow="medium">
          <Text style={styles.sectionTitle}>Anúncios</Text>
          <SettingItem
            icon={<Shield size={24} color={colors.primary} weight="fill" />}
            title="Aprovação Automática"
            description="Anúncios são publicados automaticamente"
            value={settings.autoApproveAds}
            onValueChange={(value) => handleSettingChange('autoApproveAds', value)}
          />
          <SettingItem
            icon={<Shield size={24} color={colors.primary} weight="fill" />}
            title="Perfil Público"
            description="Sua empresa aparece nas buscas"
            value={settings.publicProfile}
            onValueChange={(value) => handleSettingChange('publicProfile', value)}
          />
        </Card>

        <Card style={styles.settingsCard} shadow="medium">
          <Text style={styles.sectionTitle}>Assinatura</Text>
          <View style={styles.subscriptionInfo}>
            <View style={styles.subscriptionHeader}>
              <CreditCard size={24} color={colors.primary} weight="fill" />
              <View style={styles.subscriptionContent}>
                <Text style={styles.subscriptionTitle}>Plano Atual</Text>
                <Text style={styles.subscriptionPlan}>Premium</Text>
              </View>
            </View>
            <Button
              title="Gerenciar Assinatura"
              onPress={() => {}}
              variant="secondary"
              size="small"
            />
          </View>
        </Card>

        <Card style={styles.dangerCard} shadow="medium">
          <Text style={styles.dangerTitle}>Zona de Perigo</Text>
          <Button
            title="Excluir Conta"
            onPress={handleDeleteAccount}
            variant="danger"
            fullWidth
            style={styles.deleteButton}
          />
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
  settingsCard: {
    margin: spacing.md,
    padding: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.h3.fontSize,
    fontWeight: typography.fontWeight.semibold as '600',
    color: colors.gray[900],
    marginBottom: spacing.md,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100],
  },
  settingIcon: {
    marginRight: spacing.md,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: typography.body.fontSize,
    fontWeight: typography.fontWeight.semibold as '600',
    color: colors.gray[900],
    marginBottom: spacing.xs,
  },
  settingDescription: {
    fontSize: typography.small.fontSize,
    color: colors.gray[700],
  },
  subscriptionInfo: {
    gap: spacing.md,
  },
  subscriptionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  subscriptionContent: {
    flex: 1,
  },
  subscriptionTitle: {
    fontSize: typography.body.fontSize,
    color: colors.gray[700],
    marginBottom: spacing.xs,
  },
  subscriptionPlan: {
    fontSize: typography.h3.fontSize,
    fontWeight: typography.fontWeight.bold as '700',
    color: colors.primary,
  },
  dangerCard: {
    margin: spacing.md,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.error + '30',
  },
  dangerTitle: {
    fontSize: typography.h3.fontSize,
    fontWeight: typography.fontWeight.semibold as '600',
    color: colors.error,
    marginBottom: spacing.md,
  },
  deleteButton: {
    marginTop: spacing.sm,
  },
});
