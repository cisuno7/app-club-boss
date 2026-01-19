import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Badge } from '@/components/Badge';
import { colors, spacing, typography, borderRadius } from '@/theme';
import { Ad } from '@/types';
import * as Clipboard from 'expo-clipboard';

type RootStackParamList = {
  AdDetail: { ad: Ad };
};

export const AdDetailScreen: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'AdDetail'>>();
  const navigation = useNavigation();
  const { ad } = route.params;
  const [copied, setCopied] = useState(false);

  const handleCopyCode = async () => {
    if (ad.couponCode) {
      await Clipboard.setStringAsync(ad.couponCode);
      setCopied(true);
      Alert.alert('Sucesso', 'Código copiado para a área de transferência!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleUseCoupon = () => {
    Alert.alert('Cupom resgatado!', `Você resgatou o cupom ${ad.couponCode}`);
    // Na implementação real, aqui resgataria o cupom
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {ad.bannerUrl && (
          <Image source={{ uri: ad.bannerUrl }} style={styles.banner} resizeMode="cover" />
        )}
        {!ad.bannerUrl && ad.imageUrl && (
          <Image source={{ uri: ad.imageUrl }} style={styles.banner} resizeMode="cover" />
        )}

        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.companyInfo}>
              <Text style={styles.companyName}>{ad.companyName}</Text>
              <Badge label={ad.status} variant={ad.status} />
            </View>
          </View>

          <Text style={styles.title}>{ad.title}</Text>
          <Text style={styles.description}>{ad.description}</Text>

          {ad.discount && (
            <Card style={styles.discountCard} shadow="small">
              <View style={styles.discountContent}>
                <Text style={styles.discountLabel}>Desconto</Text>
                <Text style={styles.discountValue}>{ad.discount}%</Text>
              </View>
              {ad.couponCode && (
                <View style={styles.codeContainer}>
                  <Text style={styles.codeLabel}>Código do cupom:</Text>
                  <View style={styles.codeRow}>
                    <Text style={styles.codeText}>{ad.couponCode}</Text>
                    <Button
                      title={copied ? 'Copiado!' : 'Copiar'}
                      onPress={handleCopyCode}
                      variant="secondary"
                      size="small"
                    />
                  </View>
                </View>
              )}
            </Card>
          )}

          <Card style={styles.statsCard} shadow="small">
            <Text style={styles.statsTitle}>Estatísticas</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{ad.views}</Text>
                <Text style={styles.statLabel}>Visualizações</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{ad.clicks}</Text>
                <Text style={styles.statLabel}>Cliques</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{ad.couponsRedeemed}</Text>
                <Text style={styles.statLabel}>Cupons resgatados</Text>
              </View>
            </View>
          </Card>

          {ad.expiresAt && (
            <View style={styles.expiresContainer}>
              <Text style={styles.expiresText}>
                Válido até: {new Date(ad.expiresAt).toLocaleDateString('pt-BR')}
              </Text>
            </View>
          )}

          <Button
            title="Usar Cupom"
            onPress={handleUseCoupon}
            fullWidth
            style={styles.useButton}
          />
        </View>
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
  banner: {
    width: '100%',
    height: 250,
    backgroundColor: colors.gray[100],
  },
  content: {
    padding: spacing.lg,
  },
  header: {
    marginBottom: spacing.md,
  },
  companyInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  companyName: {
    fontSize: typography.body.fontSize,
    fontWeight: typography.fontWeight.semibold as '600',
    color: colors.secondary,
  },
  title: {
    fontSize: typography.h2.fontSize,
    fontWeight: typography.fontWeight.bold as '700',
    color: colors.gray[900],
    marginBottom: spacing.sm,
  },
  description: {
    fontSize: typography.body.fontSize,
    color: colors.gray[700],
    lineHeight: typography.body.lineHeight * typography.body.fontSize,
    marginBottom: spacing.lg,
  },
  discountCard: {
    marginBottom: spacing.md,
    padding: spacing.lg,
  },
  discountContent: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  discountLabel: {
    fontSize: typography.small.fontSize,
    color: colors.gray[700],
    marginBottom: spacing.xs,
  },
  discountValue: {
    fontSize: 48,
    fontWeight: typography.fontWeight.bold as '700',
    color: colors.success,
  },
  codeContainer: {
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.gray[100],
  },
  codeLabel: {
    fontSize: typography.small.fontSize,
    color: colors.gray[700],
    marginBottom: spacing.sm,
  },
  codeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  codeText: {
    flex: 1,
    fontSize: typography.bodyLarge.fontSize,
    fontWeight: typography.fontWeight.bold as '700',
    color: colors.gray[900],
    fontFamily: 'monospace',
    backgroundColor: colors.gray[100],
    padding: spacing.sm,
    borderRadius: borderRadius.md,
  },
  statsCard: {
    marginBottom: spacing.md,
    padding: spacing.lg,
  },
  statsTitle: {
    fontSize: typography.h3.fontSize,
    fontWeight: typography.fontWeight.semibold as '600',
    color: colors.gray[900],
    marginBottom: spacing.md,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: typography.h3.fontSize,
    fontWeight: typography.fontWeight.bold as '700',
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: typography.caption.fontSize,
    color: colors.gray[700],
  },
  expiresContainer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  expiresText: {
    fontSize: typography.small.fontSize,
    color: colors.gray[700],
  },
  useButton: {
    marginTop: spacing.md,
  },
});
