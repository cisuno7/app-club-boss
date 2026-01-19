import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { colors, spacing, typography, borderRadius } from '@/theme';
import { Image as ImageIcon, X, Upload } from 'phosphor-react-native';
import * as ImagePicker from 'expo-image-picker';

export const UploadBannersScreen: React.FC = () => {
  const [banners, setBanners] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Precisamos de acesso à galeria para fazer upload de imagens.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setBanners([...banners, result.assets[0].uri]);
    }
  };

  const removeBanner = (index: number) => {
    setBanners(banners.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (banners.length === 0) {
      Alert.alert('Atenção', 'Selecione pelo menos uma imagem');
      return;
    }

    setIsUploading(true);
    // Simula upload
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsUploading(false);
    Alert.alert('Sucesso', 'Banners enviados com sucesso!');
    setBanners([]);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Upload de Banners</Text>
          <Text style={styles.subtitle}>
            Faça upload de banners para seus anúncios (recomendado: 16:9)
          </Text>
        </View>

        <Card style={styles.uploadCard} shadow="medium">
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={pickImage}
            activeOpacity={0.7}
          >
            <Upload size={32} color={colors.primary} weight="fill" />
            <Text style={styles.uploadButtonText}>Selecionar Imagem</Text>
            <Text style={styles.uploadButtonSubtext}>Toque para escolher da galeria</Text>
          </TouchableOpacity>
        </Card>

        {banners.length > 0 && (
          <View style={styles.bannersSection}>
            <Text style={styles.sectionTitle}>Banners Selecionados ({banners.length})</Text>
            {banners.map((uri, index) => (
              <Card key={index} style={styles.bannerCard} shadow="small">
                <Image source={{ uri }} style={styles.bannerImage} resizeMode="cover" />
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeBanner(index)}
                  activeOpacity={0.7}
                >
                  <X size={20} color={colors.white} weight="bold" />
                </TouchableOpacity>
              </Card>
            ))}
          </View>
        )}

        {banners.length === 0 && (
          <Card style={styles.emptyCard} shadow="small">
            <ImageIcon size={64} color={colors.gray[400]} weight="duotone" />
            <Text style={styles.emptyText}>Nenhum banner selecionado</Text>
            <Text style={styles.emptySubtext}>
              Selecione imagens para fazer upload dos banners
            </Text>
          </Card>
        )}

        {banners.length > 0 && (
          <Button
            title={isUploading ? 'Enviando...' : 'Enviar Banners'}
            onPress={handleUpload}
            loading={isUploading}
            fullWidth
            style={styles.uploadSubmitButton}
          />
        )}

        <Card style={styles.infoCard} shadow="small">
          <Text style={styles.infoTitle}>💡 Dicas</Text>
          <Text style={styles.infoText}>
            • Formato recomendado: 16:9 (ex: 1920x1080px){'\n'}
            • Tamanho máximo: 5MB por imagem{'\n'}
            • Formatos aceitos: JPG, PNG{'\n'}
            • Use imagens de alta qualidade para melhor resultado
          </Text>
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
    lineHeight: typography.body.lineHeight * typography.body.fontSize,
  },
  uploadCard: {
    margin: spacing.md,
    padding: spacing.xl,
  },
  uploadButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.gray[400],
    borderRadius: borderRadius.md,
    backgroundColor: colors.gray[100],
  },
  uploadButtonText: {
    fontSize: typography.body.fontSize,
    fontWeight: typography.fontWeight.semibold as '600',
    color: colors.primary,
    marginTop: spacing.md,
  },
  uploadButtonSubtext: {
    fontSize: typography.small.fontSize,
    color: colors.gray[700],
    marginTop: spacing.xs,
  },
  bannersSection: {
    padding: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.h3.fontSize,
    fontWeight: typography.fontWeight.semibold as '600',
    color: colors.gray[900],
    marginBottom: spacing.md,
  },
  bannerCard: {
    marginBottom: spacing.md,
    position: 'relative',
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: 200,
    backgroundColor: colors.gray[100],
  },
  removeButton: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    backgroundColor: colors.error,
    borderRadius: borderRadius.full,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyCard: {
    margin: spacing.md,
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
  uploadSubmitButton: {
    margin: spacing.md,
  },
  infoCard: {
    margin: spacing.md,
    padding: spacing.lg,
    backgroundColor: colors.warning + '10',
  },
  infoTitle: {
    fontSize: typography.h3.fontSize,
    fontWeight: typography.fontWeight.semibold as '600',
    color: colors.gray[900],
    marginBottom: spacing.sm,
  },
  infoText: {
    fontSize: typography.body.fontSize,
    color: colors.gray[700],
    lineHeight: typography.body.lineHeight * typography.body.fontSize,
  },
});
