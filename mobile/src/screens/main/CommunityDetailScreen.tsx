import React from 'react';
import { View, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { Text, Chip } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { HomeStackParamList } from '../../navigation/MainNavigator';
import { ActivityCard } from '../../components/ActivityCard';
import { getCommunityById, getActivitiesForCommunity } from '../../data/mockData';
import { colors } from '../../theme';

type CommunityDetailScreenProps = {
  navigation: StackNavigationProp<HomeStackParamList, 'CommunityDetail'>;
  route: RouteProp<HomeStackParamList, 'CommunityDetail'>;
};

export const CommunityDetailScreen = ({ navigation, route }: CommunityDetailScreenProps) => {
  const { communityId } = route.params;
  const community = getCommunityById(communityId);
  const activities = getActivitiesForCommunity(communityId);

  if (!community) {
    return (
      <View style={styles.container}>
        <Text>Community not found</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <ImageBackground
        source={{ uri: community.images[0] }}
        style={styles.header}
      >
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.gradient}
        >
          <View style={styles.headerContent}>
            <Text variant="headlineMedium" style={styles.title}>
              {community.name}
            </Text>
            <View style={styles.location}>
              <Icon name="map-marker" size={20} color={colors.background} />
              <Text variant="bodyLarge" style={styles.locationText}>
                {community.location.neighborhood}
              </Text>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>

      <View style={styles.content}>
        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Icon name="account-group" size={24} color={colors.primary} />
            <Text variant="labelLarge">{community.memberCount} members</Text>
          </View>
          <View style={styles.statItem}>
            <Icon name={community.vibe === 'running' ? 'run' : 'bike'} size={24} color={colors.primary} />
            <Text variant="labelLarge">{community.vibe}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            About
          </Text>
          <Text variant="bodyMedium" style={styles.description}>
            {community.description}
          </Text>
        </View>

        <View style={styles.section}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Fitness Levels
          </Text>
          <View style={styles.chips}>
            {community.fitnessLevels.map((level) => (
              <Chip key={level} mode="outlined" style={styles.chip}>
                {level}
              </Chip>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Upcoming Activities ({activities.length})
          </Text>
          {activities.length > 0 ? (
            activities.map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                onPress={() => navigation.navigate('ActivityDetail', { activityId: activity.id })}
              />
            ))
          ) : (
            <Text variant="bodyMedium" style={styles.emptyText}>
              No upcoming activities
            </Text>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    height: 250,
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  headerContent: {
    padding: 20,
  },
  title: {
    color: colors.background,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    color: colors.background,
  },
  content: {
    padding: 16,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    backgroundColor: colors.surface,
    borderRadius: 12,
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
    gap: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 12,
    color: colors.text.primary,
  },
  description: {
    color: colors.text.secondary,
    lineHeight: 22,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    marginBottom: 4,
  },
  emptyText: {
    color: colors.text.secondary,
    textAlign: 'center',
    paddingVertical: 20,
  },
});
