import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '@/components/Card';
import { colors, spacing, typography } from '@/theme';
import { Book, Video, FileText, PlayCircle } from 'phosphor-react-native';

export const ExclusiveContentScreen: React.FC = () => {
  const contentItems = [
    { icon: Book, title: 'E-books Exclusivos', description: 'Materiais educacionais premium' },
    { icon: Video, title: 'Webinars Gravados', description: 'Acesso a todas as gravações' },
    { icon: FileText, title: 'Templates e Guias', description: 'Recursos profissionais' },
    { icon: PlayCircle, title: 'Cursos Online', description: 'Formações exclusivas' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Conteúdo Exclusivo</Text>
          <Text style={styles.subtitle}>Acesso premium para membros Select</Text>
        </View>

        {contentItems.map((item, index) => {
          const IconComponent = item.icon;
          return (
            <Card key={index} style={styles.contentCard} shadow="medium">
              <View style={styles.contentHeader}>
                <IconComponent size={32} color={colors.secondary} weight="fill" />
                <View style={styles.contentInfo}>
                  <Text style={styles.contentTitle}>{item.title}</Text>
                  <Text style={styles.contentDescription}>{item.description}</Text>
                </View>
              </View>
            </Card>
          );
        })}

        <Card style={styles.infoCard} shadow="small">
          <Text style={styles.infoText}>
            💎 Todo o conteúdo aqui é exclusivo para membros Select. Aproveite ao máximo seus
            benefícios!
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
  },
  contentCard: {
    margin: spacing.md,
    padding: spacing.lg,
  },
  contentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  contentInfo: {
    flex: 1,
  },
  contentTitle: {
    fontSize: typography.h3.fontSize,
    fontWeight: typography.fontWeight.semibold as '600',
    color: colors.gray[900],
    marginBottom: spacing.xs,
  },
  contentDescription: {
    fontSize: typography.body.fontSize,
    color: colors.gray[700],
  },
  infoCard: {
    margin: spacing.md,
    padding: spacing.lg,
    backgroundColor: colors.secondary + '10',
  },
  infoText: {
    fontSize: typography.body.fontSize,
    color: colors.gray[700],
    lineHeight: typography.body.lineHeight * typography.body.fontSize,
  },
});
