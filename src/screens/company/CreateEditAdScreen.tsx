import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Card } from '@/components/Card';
import { colors, spacing, typography } from '@/theme';
import { Ad } from '@/types';

type RootStackParamList = {
  CreateEditAd: { ad?: Ad };
  AdsList: undefined;
};

type CreateEditAdRouteProp = RouteProp<RootStackParamList, 'CreateEditAd'>;
type CreateEditAdNavigationProp = StackNavigationProp<RootStackParamList, 'CreateEditAd'>;

export const CreateEditAdScreen: React.FC = () => {
  const route = useRoute<CreateEditAdRouteProp>();
  const navigation = useNavigation<CreateEditAdNavigationProp>();
  const { ad } = route.params || {};

  const [formData, setFormData] = useState({
    title: ad?.title || '',
    description: ad?.description || '',
    couponCode: ad?.couponCode || '',
    discount: ad?.discount?.toString() || '',
    expiresAt: ad?.expiresAt ? new Date(ad.expiresAt).toISOString().split('T')[0] : '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const isEdit = !!ad;

  const handleSave = async () => {
    if (!formData.title || !formData.description) {
      Alert.alert('Atenção', 'Preencha título e descrição');
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    Alert.alert('Sucesso', isEdit ? 'Anúncio atualizado!' : 'Anúncio criado!');
    navigation.goBack();
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
            <Text style={styles.title}>
              {isEdit ? 'Editar Anúncio' : 'Criar Novo Anúncio'}
            </Text>
          </View>

          <Card style={styles.formCard} shadow="medium">
            <Input
              label="Título *"
              placeholder="Ex: Desconto de 20% em Serviços"
              value={formData.title}
              onChangeText={(text) => setFormData({ ...formData, title: text })}
            />

            <Input
              label="Descrição *"
              placeholder="Descreva seu anúncio..."
              value={formData.description}
              onChangeText={(text) => setFormData({ ...formData, description: text })}
              multiline
              numberOfLines={4}
              style={styles.textArea}
            />

            <View style={styles.row}>
              <View style={styles.halfInput}>
                <Input
                  label="Código do Cupom"
                  placeholder="EXEMPLO20"
                  value={formData.couponCode}
                  onChangeText={(text) => setFormData({ ...formData, couponCode: text.toUpperCase() })}
                  autoCapitalize="characters"
                />
              </View>
              <View style={styles.halfInput}>
                <Input
                  label="Desconto (%)"
                  placeholder="20"
                  value={formData.discount}
                  onChangeText={(text) => setFormData({ ...formData, discount: text })}
                  keyboardType="numeric"
                />
              </View>
            </View>

            <Input
              label="Data de Expiração"
              placeholder="YYYY-MM-DD"
              value={formData.expiresAt}
              onChangeText={(text) => setFormData({ ...formData, expiresAt: text })}
            />

            <View style={styles.infoBox}>
              <Text style={styles.infoText}>
                💡 Dica: Após salvar, você poderá fazer upload de imagens e banners na próxima etapa.
              </Text>
            </View>

            <Button
              title={isEdit ? 'Salvar Alterações' : 'Criar Anúncio'}
              onPress={handleSave}
              loading={isLoading}
              disabled={!formData.title || !formData.description}
              fullWidth
              style={styles.saveButton}
            />
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
  },
  formCard: {
    padding: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  halfInput: {
    flex: 1,
  },
  textArea: {
    minHeight: 100,
    textAlignVertical: 'top',
  },
  infoBox: {
    backgroundColor: colors.warning + '10',
    padding: spacing.md,
    borderRadius: 8,
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },
  infoText: {
    fontSize: typography.small.fontSize,
    color: colors.gray[700],
    lineHeight: typography.small.lineHeight * typography.small.fontSize,
  },
  saveButton: {
    marginTop: spacing.md,
  },
});
