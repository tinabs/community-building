import React, { useMemo } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '../../navigation/MainNavigator';
import { ActivityCard } from '../../components/ActivityCard';
import { useAuthStore } from '../../store/useAuthStore';
import { useRSVPStore } from '../../store/useRSVPStore';
import { getActivityById } from '../../data/mockData';
import { colors } from '../../theme';

export const MyActivitiesScreen = () => {
  const navigation = useNavigation<StackNavigationProp<HomeStackParamList>>();
  const { user } = useAuthStore();
  const { getRSVPsForUser } = useRSVPStore();

  const userRSVPs = useMemo(() => {
    if (!user) return [];
    return getRSVPsForUser(user.id);
  }, [user, getRSVPsForUser]);

  const upcomingActivities = useMemo(() => {
    return userRSVPs
      .map((rsvp) => getActivityById(rsvp.activityId))
      .filter((activity) => activity && activity.dateTime > new Date())
      .sort((a, b) => a!.dateTime.getTime() - b!.dateTime.getTime());
  }, [userRSVPs]);

  if (upcomingActivities.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text variant="headlineSmall" style={styles.emptyTitle}>
          No Upcoming Activities
        </Text>
        <Text variant="bodyLarge" style={styles.emptyText}>
          Browse communities and RSVP for activities to see them here!
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={upcomingActivities}
        renderItem={({ item }) =>
          item && (
            <ActivityCard
              activity={item}
              onPress={() => navigation.navigate('ActivityDetail', { activityId: item.id })}
            />
          )
        }
        keyExtractor={(item) => item!.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  list: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    backgroundColor: colors.background,
  },
  emptyTitle: {
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  emptyText: {
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
  },
});
