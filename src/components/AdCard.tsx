import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import { Card } from './Card';
import { Badge } from './Badge';
import { colors, spacing, typography, borderRadius } from '@/theme';
import { Ad } from '@/types';

interface AdCardProps {
  ad: Ad;
  onPress: () => void;
  style?: ViewStyle;
}

export const AdCard: React.FC<AdCardProps> = ({ ad, onPress, style }) => {
  const getStatusVariant = (): 'active' | 'expired' | 'pending' => {
    return ad.status;
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Card style={[styles.card, style]} shadow="medium">
        <Image source={{ uri: ad.imageUrl }} style={styles.image} resizeMode="cover" />
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.companyName}>{ad.companyName}</Text>
            <Badge label={ad.status} variant={getStatusVariant()} />
          </View>
          <Text style={styles.title} numberOfLines={2}>
            {ad.title}
          </Text>
          <Text style={styles.description} numberOfLines={2}>
            {ad.description}
          </Text>
          {ad.discount && (
            <View style={styles.discountContainer}>
              <Text style={styles.discountText}>{ad.discount}% OFF</Text>
              {ad.couponCode && (
                <Text style={styles.couponCode}>Código: {ad.couponCode}</Text>
              )}
            </View>
          )}
          <View style={styles.stats}>
            <Text style={styles.statText}>👁️ {ad.views}</Text>
            <Text style={styles.statText}>👆 {ad.clicks}</Text>
            <Text style={styles.statText}>🎫 {ad.couponsRedeemed}</Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: colors.gray[100],
  },
  content: {
    padding: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  companyName: {
    fontSize: typography.small.fontSize,
    fontWeight: typography.fontWeight.semibold as '600',
    color: colors.secondary,
    flex: 1,
  },
  title: {
    fontSize: typography.h3.fontSize,
    fontWeight: typography.fontWeight.semibold as '600',
    color: colors.gray[900],
    marginBottom: spacing.xs,
  },
  description: {
    fontSize: typography.body.fontSize,
    color: colors.gray[700],
    marginBottom: spacing.sm,
    lineHeight: typography.body.lineHeight * typography.body.fontSize,
  },
  discountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.success + '10',
    padding: spacing.sm,
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
  },
  discountText: {
    fontSize: typography.bodyLarge.fontSize,
    fontWeight: typography.fontWeight.bold as '700',
    color: colors.success,
  },
  couponCode: {
    fontSize: typography.small.fontSize,
    color: colors.gray[700],
    fontFamily: 'monospace',
  },
  stats: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.xs,
  },
  statText: {
    fontSize: typography.caption.fontSize,
    color: colors.gray[700],
  },
});
