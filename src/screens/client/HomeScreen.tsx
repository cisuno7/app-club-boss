import React, { useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AdCard } from '@/components/AdCard';
import { colors, spacing, typography } from '@/theme';
import { mockAds } from '@/services/mockData';
import { Ad } from '@/types';

const { width } = Dimensions.get('window');

type RootStackParamList = {
  Home: undefined;
  AdDetail: { ad: Ad };
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  // Banners são os anúncios que têm bannerUrl
  const banners = useMemo(() => mockAds.filter((ad) => ad.bannerUrl), []);

  // Feed são todos os anúncios ativos
  const feedAds = useMemo(() => mockAds.filter((ad) => ad.status === 'active'), []);

  const handleAdPress = (ad: Ad) => {
    navigation.navigate('AdDetail', { ad });
  };

  const renderBanner = ({ item }: { item: Ad }) => (
    <View style={styles.bannerContainer}>
      <AdCard ad={item} onPress={() => handleAdPress(item)} />
    </View>
  );

  const renderFeedItem = ({ item }: { item: Ad }) => (
    <AdCard ad={item} onPress={() => handleAdPress(item)} />
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>Feed</Text>
      {banners.length > 0 && (
        <View style={styles.bannersSection}>
          <Text style={styles.sectionTitle}>Destaques</Text>
          <FlatList
            data={banners}
            renderItem={renderBanner}
            keyExtractor={(item) => `banner-${item.id}`}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.bannersList}
            pagingEnabled
            snapToInterval={width}
            decelerationRate="fast"
          />
        </View>
      )}
      <Text style={styles.sectionTitle}>Anúncios Disponíveis</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FlatList
        data={feedAds}
        renderItem={renderFeedItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
        windowSize={10}
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
  title: {
    fontSize: typography.h2.fontSize,
    fontWeight: typography.fontWeight.bold as '700',
    color: colors.gray[900],
    marginBottom: spacing.lg,
  },
  bannersSection: {
    marginBottom: spacing.xl,
  },
  sectionTitle: {
    fontSize: typography.h3.fontSize,
    fontWeight: typography.fontWeight.semibold as '600',
    color: colors.gray[900],
    marginBottom: spacing.md,
  },
  bannersList: {
    paddingRight: spacing.md,
  },
  bannerContainer: {
    width: width - spacing.md * 2,
    marginRight: spacing.md,
  },
});
