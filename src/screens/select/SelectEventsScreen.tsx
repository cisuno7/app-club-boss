import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { colors, spacing, typography } from '@/theme';
import { Calendar, MapPin, Clock } from 'phosphor-react-native';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  status: 'upcoming' | 'past';
}

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Networking Select - Janeiro 2024',
    date: '2024-01-15',
    time: '19:00',
    location: 'São Paulo, SP',
    status: 'upcoming',
  },
  {
    id: '2',
    title: 'Workshop de Inovação',
    date: '2024-02-20',
    time: '14:00',
    location: 'Rio de Janeiro, RJ',
    status: 'upcoming',
  },
  {
    id: '3',
    title: 'Encontro Select - Dezembro 2023',
    date: '2023-12-10',
    time: '18:00',
    location: 'Belo Horizonte, MG',
    status: 'past',
  },
];

export const SelectEventsScreen: React.FC = () => {
  const renderEventCard = ({ item }: { item: Event }) => (
    <Card style={styles.eventCard} shadow="medium">
      <View style={styles.eventHeader}>
        <Text style={styles.eventTitle}>{item.title}</Text>
        <Badge
          label={item.status === 'upcoming' ? 'Próximo' : 'Realizado'}
          variant={item.status === 'upcoming' ? 'active' : 'expired'}
        />
      </View>
      <View style={styles.eventDetails}>
        <View style={styles.eventDetail}>
          <Calendar size={20} color={colors.gray[700]} />
          <Text style={styles.eventDetailText}>
            {new Date(item.date).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
          </Text>
        </View>
        <View style={styles.eventDetail}>
          <Clock size={20} color={colors.gray[700]} />
          <Text style={styles.eventDetailText}>{item.time}</Text>
        </View>
        <View style={styles.eventDetail}>
          <MapPin size={20} color={colors.gray[700]} />
          <Text style={styles.eventDetailText}>{item.location}</Text>
        </View>
      </View>
    </Card>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.title}>Eventos Select</Text>
      <Text style={styles.subtitle}>Agenda de eventos exclusivos</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <FlatList
        data={mockEvents}
        renderItem={renderEventCard}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
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
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: typography.body.fontSize,
    color: colors.gray[700],
  },
  eventCard: {
    marginBottom: spacing.md,
    padding: spacing.lg,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  eventTitle: {
    fontSize: typography.h3.fontSize,
    fontWeight: typography.fontWeight.semibold as '600',
    color: colors.gray[900],
    flex: 1,
    marginRight: spacing.sm,
  },
  eventDetails: {
    gap: spacing.sm,
  },
  eventDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  eventDetailText: {
    fontSize: typography.body.fontSize,
    color: colors.gray[700],
  },
});
