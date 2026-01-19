import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { colors, spacing, typography } from '@/theme';
import { Megaphone, Newspaper } from 'phosphor-react-native';

export const NewsScreen: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: 'update',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handlePublish = async () => {
    if (!formData.title || !formData.content) {
      Alert.alert('Atenção', 'Preencha título e conteúdo');
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    Alert.alert('Sucesso', 'Notícia publicada com sucesso!');
    setFormData({ title: '', content: '', category: 'update' });
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
            <Megaphone size={48} color={colors.primary} weight="fill" />
            <Text style={styles.title}>Postar Notícias</Text>
            <Text style={styles.subtitle}>Compartilhe atualizações com a plataforma</Text>
          </View>

          <Card style={styles.formCard} shadow="medium">
            <Input
              label="Título da Notícia *"
              placeholder="Ex: Nova funcionalidade disponível"
              value={formData.title}
              onChangeText={(text) => setFormData({ ...formData, title: text })}
            />

            <Input
              label="Categoria"
              placeholder="update"
              value={formData.category}
              onChangeText={(text) => setFormData({ ...formData, category: text })}
            />

            <Input
              label="Conteúdo *"
              placeholder="Escreva a notícia aqui..."
              value={formData.content}
              onChangeText={(text) => setFormData({ ...formData, content: text })}
              multiline
              numberOfLines={10}
              style={styles.textArea}
            />

            <View style={styles.infoBox}>
              <Newspaper size={24} color={colors.primary} weight="fill" />
              <View style={styles.infoContent}>
                <Text style={styles.infoTitle}>Dicas para uma boa notícia</Text>
                <Text style={styles.infoText}>
                  • Use títulos claros e objetivos{'\n'}
                  • Seja conciso no conteúdo{'\n'}
                  • Inclua informações relevantes{'\n'}
                  • Use formatação quando necessário
                </Text>
              </View>
            </View>

            <Button
              title="Publicar Notícia"
              onPress={handlePublish}
              loading={isLoading}
              disabled={!formData.title || !formData.content}
              fullWidth
              style={styles.publishButton}
            />
          </Card>

          <Card style={styles.recentCard} shadow="medium">
            <Text style={styles.recentTitle}>Notícias Recentes</Text>
            <View style={styles.recentItem}>
              <Text style={styles.recentItemTitle}>Nova funcionalidade de cupons</Text>
              <Text style={styles.recentItemDate}>Publicado há 2 dias</Text>
            </View>
            <View style={styles.recentItem}>
              <Text style={styles.recentItemTitle}>Atualização do sistema</Text>
              <Text style={styles.recentItemDate}>Publicado há 1 semana</Text>
            </View>
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
    minHeight: 200,
    textAlignVertical: 'top',
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: colors.primary + '10',
    padding: spacing.md,
    borderRadius: 8,
    marginTop: spacing.md,
    marginBottom: spacing.md,
    gap: spacing.md,
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: typography.body.fontSize,
    fontWeight: typography.fontWeight.semibold as '600',
    color: colors.gray[900],
    marginBottom: spacing.xs,
  },
  infoText: {
    fontSize: typography.small.fontSize,
    color: colors.gray[700],
    lineHeight: typography.small.lineHeight * typography.small.fontSize,
  },
  publishButton: {
    marginTop: spacing.md,
  },
  recentCard: {
    padding: spacing.lg,
  },
  recentTitle: {
    fontSize: typography.h3.fontSize,
    fontWeight: typography.fontWeight.semibold as '600',
    color: colors.gray[900],
    marginBottom: spacing.md,
  },
  recentItem: {
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[100],
  },
  recentItemTitle: {
    fontSize: typography.body.fontSize,
    fontWeight: typography.fontWeight.semibold as '600',
    color: colors.gray[900],
    marginBottom: spacing.xs,
  },
  recentItemDate: {
    fontSize: typography.small.fontSize,
    color: colors.gray[700],
  },
});
