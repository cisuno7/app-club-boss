import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { colors, spacing, typography } from '@/theme';
import { Building, Envelope, Phone, MapPin, Globe } from 'phosphor-react-native';

export const CompanyProfileScreen: React.FC = () => {
  const [formData, setFormData] = useState({
    name: 'Tech Solutions',
    email: 'contato@techsolutions.com',
    phone: '(11) 99999-9999',
    address: 'Av. Paulista, 1000 - São Paulo, SP',
    website: 'www.techsolutions.com',
    description: 'Empresa especializada em soluções de TI e desenvolvimento de software.',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Building size={48} color={colors.primary} weight="fill" />
            <Text style={styles.title}>Perfil da Empresa</Text>
            <Text style={styles.subtitle}>Gerencie as informações da sua empresa</Text>
          </View>

          <Card style={styles.formCard} shadow="medium">
            <Input
              label="Nome da Empresa *"
              placeholder="Nome da sua empresa"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
            />

            <Input
              label="Email *"
              placeholder="contato@empresa.com"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Input
              label="Telefone"
              placeholder="(00) 00000-0000"
              value={formData.phone}
              onChangeText={(text) => setFormData({ ...formData, phone: text })}
              keyboardType="phone-pad"
            />

            <Input
              label="Endereço"
              placeholder="Endereço completo"
              value={formData.address}
              onChangeText={(text) => setFormData({ ...formData, address: text })}
            />

            <Input
              label="Website"
              placeholder="www.empresa.com"
              value={formData.website}
              onChangeText={(text) => setFormData({ ...formData, website: text })}
              autoCapitalize="none"
            />

            <Input
              label="Descrição"
              placeholder="Descreva sua empresa..."
              value={formData.description}
              onChangeText={(text) => setFormData({ ...formData, description: text })}
              multiline
              numberOfLines={4}
              style={styles.textArea}
            />

            <Button
              title="Salvar Alterações"
              onPress={handleSave}
              loading={isLoading}
              fullWidth
              style={styles.saveButton}
            />
          </Card>

          <Card style={styles.infoCard} shadow="small">
            <Text style={styles.infoTitle}>Informações de Contato</Text>
            <View style={styles.infoItem}>
              <Envelope size={20} color={colors.gray[700]} />
              <Text style={styles.infoText}>{formData.email}</Text>
            </View>
            <View style={styles.infoItem}>
              <Phone size={20} color={colors.gray[700]} />
              <Text style={styles.infoText}>{formData.phone}</Text>
            </View>
            <View style={styles.infoItem}>
              <MapPin size={20} color={colors.gray[700]} />
              <Text style={styles.infoText}>{formData.address}</Text>
            </View>
            {formData.website && (
              <View style={styles.infoItem}>
                <Globe size={20} color={colors.gray[700]} />
                <Text style={styles.infoText}>{formData.website}</Text>
              </View>
            )}
          </Card>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[100],
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  title: {
    fontSize: typography.h2.fontSize,
    fontWeight: typography.fontWeight.bold as '700',
    color: colors.gray[900],
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.body.fontSize,
    color: colors.gray[700],
    textAlign: 'center',
  },
  formCard: {
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    marginTop: spacing.md,
  },
  infoCard: {
    padding: spacing.lg,
  },
  infoTitle: {
    fontSize: typography.h3.fontSize,
    fontWeight: typography.fontWeight.semibold as '600',
    color: colors.gray[900],
    marginBottom: spacing.md,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  infoText: {
    fontSize: typography.body.fontSize,
    color: colors.gray[700],
    flex: 1,
  },
});
