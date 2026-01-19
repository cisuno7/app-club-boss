import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Card } from '@/components/Card';
import { colors, spacing, typography } from '@/theme';

export const ContactBossScreen: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos obrigatórios');
      return;
    }

    setIsLoading(true);
    // Simula envio
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    Alert.alert('Sucesso', 'Sua mensagem foi enviada! Entraremos em contato em breve.');
    // Limpa formulário
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
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
            <Text style={styles.title}>Contato com Boss</Text>
            <Text style={styles.subtitle}>
              Entre em contato conosco. Estamos aqui para ajudar!
            </Text>
          </View>

          <Card style={styles.formCard} shadow="medium">
            <Input
              label="Nome completo *"
              placeholder="Seu nome"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
              autoCapitalize="words"
            />

            <Input
              label="Email *"
              placeholder="seu@email.com"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />

            <Input
              label="Telefone"
              placeholder="(00) 00000-0000"
              value={formData.phone}
              onChangeText={(text) => setFormData({ ...formData, phone: text })}
              keyboardType="phone-pad"
            />

            <Input
              label="Assunto *"
              placeholder="Sobre o que você quer falar?"
              value={formData.subject}
              onChangeText={(text) => setFormData({ ...formData, subject: text })}
            />

            <Input
              label="Mensagem *"
              placeholder="Descreva sua dúvida ou solicitação..."
              value={formData.message}
              onChangeText={(text) => setFormData({ ...formData, message: text })}
              multiline
              numberOfLines={6}
              style={styles.messageInput}
            />

            <Button
              title="Enviar Mensagem"
              onPress={handleSubmit}
              loading={isLoading}
              disabled={!formData.name || !formData.email || !formData.subject || !formData.message}
              fullWidth
              style={styles.submitButton}
            />
          </Card>

          <Card style={styles.infoCard} shadow="small">
            <Text style={styles.infoTitle}>Outras formas de contato</Text>
            <Text style={styles.infoText}>📧 Email: contato@bossconnection.com</Text>
            <Text style={styles.infoText}>📱 WhatsApp: (00) 00000-0000</Text>
            <Text style={styles.infoText}>🕐 Horário: Segunda a Sexta, 9h às 18h</Text>
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
    lineHeight: typography.body.lineHeight * typography.body.fontSize,
  },
  formCard: {
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  messageInput: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  submitButton: {
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
  infoText: {
    fontSize: typography.body.fontSize,
    color: colors.gray[700],
    marginBottom: spacing.xs,
  },
});
