import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Button, Switch, Divider } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { HomeStackParamList } from '../../navigation/MainNavigator';
import { getActivityById, getCommunityById } from '../../data/mockData';
import { useAuthStore } from '../../store/useAuthStore';
import { useRSVPStore } from '../../store/useRSVPStore';
import { colors } from '../../theme';

type ActivityDetailScreenProps = {
  navigation: StackNavigationProp<HomeStackParamList, 'ActivityDetail'>;
  route: RouteProp<HomeStackParamList, 'ActivityDetail'>;
};

export const ActivityDetailScreen = ({ navigation, route }: ActivityDetailScreenProps) => {
  const { activityId } = route.params;
  const activity = getActivityById(activityId);
  const community = activity ? getCommunityById(activity.communityId) : null;
  
  const { user } = useAuthStore();
  const { addRSVP, hasRSVP, removeRSVP } = useRSVPStore();
  
  const [requestBuddy, setRequestBuddy] = useState(true);
  const userHasRSVP = hasRSVP(activityId);

  if (!activity || !community) {
    return (
      <View style={styles.container}>
        <Text>Activity not found</Text>
      </View>
    );
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    }).format(date);
  };

  const handleRSVP = () => {
    if (!user) return;

    const rsvp = {
      id: `rsvp-${Date.now()}`,
      activityId: activity.id,
      userId: user.id,
      requestedBuddy: activity.buddyMatchingEnabled && requestBuddy,
      createdAt: new Date(),
    };

    addRSVP(rsvp);
    
    if (rsvp.requestedBuddy) {
      Alert.alert(
        'RSVP Confirmed!',
        'You\'ve been registered for this activity. We\'ll match you with a buddy soon!',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } else {
      Alert.alert(
        'RSVP Confirmed!',
        'You\'ve been registered for this activity.',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    }
  };

  const handleCancelRSVP = () => {
    Alert.alert(
      'Cancel RSVP',
      'Are you sure you want to cancel your RSVP?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes',
          onPress: () => {
            removeRSVP(activityId);
            navigation.goBack();
          },
          style: 'destructive',
        },
      ]
    );
  };

  const isFull = activity.rsvpCount >= activity.capacity;
  const spotsLeft = activity.capacity - activity.rsvpCount;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>
          {activity.title}
        </Text>
        <Text variant="bodyLarge" style={styles.community}>
          {community.name}
        </Text>
      </View>

      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Icon name="calendar" size={24} color={colors.primary} />
          <View style={styles.infoText}>
            <Text variant="labelSmall" style={styles.infoLabel}>
              Date
            </Text>
            <Text variant="bodyMedium">{formatDate(activity.dateTime)}</Text>
          </View>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.infoRow}>
          <Icon name="clock-outline" size={24} color={colors.primary} />
          <View style={styles.infoText}>
            <Text variant="labelSmall" style={styles.infoLabel}>
              Time & Duration
            </Text>
            <Text variant="bodyMedium">
              {formatTime(activity.dateTime)} • {activity.duration} minutes
            </Text>
          </View>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.infoRow}>
          <Icon name="map-marker" size={24} color={colors.primary} />
          <View style={styles.infoText}>
            <Text variant="labelSmall" style={styles.infoLabel}>
              Location
            </Text>
            <Text variant="bodyMedium">{activity.location.name}</Text>
            <Text variant="bodySmall" style={styles.address}>
              {activity.location.address}
            </Text>
          </View>
        </View>

        <Divider style={styles.divider} />

        <View style={styles.infoRow}>
          <Icon name="account-group" size={24} color={colors.primary} />
          <View style={styles.infoText}>
            <Text variant="labelSmall" style={styles.infoLabel}>
              Capacity
            </Text>
            <Text variant="bodyMedium">
              {activity.rsvpCount}/{activity.capacity} spots filled
            </Text>
            {!isFull && (
              <Text variant="bodySmall" style={styles.spotsLeft}>
                {spotsLeft} spots remaining
              </Text>
            )}
          </View>
        </View>
      </View>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: activity.location.coordinates.lat,
          longitude: activity.location.coordinates.lng,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        <Marker coordinate={activity.location.coordinates} title={activity.location.name} />
      </MapView>

      <View style={styles.section}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          About
        </Text>
        <Text variant="bodyMedium" style={styles.description}>
          {activity.description}
        </Text>
        <Text variant="bodySmall" style={styles.fitnessLevel}>
          Fitness Level: <Text style={styles.bold}>{activity.fitnessLevel}</Text>
        </Text>
      </View>

      {activity.buddyMatchingEnabled && !userHasRSVP && (
        <View style={styles.buddySection}>
          <View style={styles.buddyHeader}>
            <Icon name="account-heart" size={24} color={colors.accent} />
            <Text variant="titleMedium" style={styles.buddyTitle}>
              Want a buddy for your first time?
            </Text>
          </View>
          <Text variant="bodyMedium" style={styles.buddyDescription}>
            We'll pair you with an experienced member to make your first activity more comfortable.
          </Text>
          <View style={styles.switchRow}>
            <Text variant="bodyMedium">Request a buddy</Text>
            <Switch
              value={requestBuddy}
              onValueChange={setRequestBuddy}
              color={colors.accent}
            />
          </View>
        </View>
      )}

      <View style={styles.buttonContainer}>
        {!userHasRSVP ? (
          <Button
            mode="contained"
            onPress={handleRSVP}
            disabled={isFull}
            style={styles.button}
            contentStyle={styles.buttonContent}
          >
            {isFull ? 'Activity Full' : 'RSVP for Activity'}
          </Button>
        ) : (
          <Button
            mode="outlined"
            onPress={handleCancelRSVP}
            style={styles.button}
            contentStyle={styles.buttonContent}
            textColor={colors.error}
          >
            Cancel RSVP
          </Button>
        )}
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
    padding: 20,
    paddingBottom: 16,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  community: {
    color: colors.text.secondary,
  },
  infoCard: {
    backgroundColor: colors.surface,
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    gap: 16,
  },
  infoText: {
    flex: 1,
  },
  infoLabel: {
    color: colors.text.secondary,
    marginBottom: 4,
  },
  address: {
    color: colors.text.secondary,
    marginTop: 2,
  },
  spotsLeft: {
    color: colors.primary,
    marginTop: 2,
  },
  divider: {
    marginVertical: 12,
  },
  map: {
    height: 200,
    marginHorizontal: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 12,
  },
  description: {
    color: colors.text.secondary,
    lineHeight: 22,
    marginBottom: 12,
  },
  fitnessLevel: {
    color: colors.text.secondary,
  },
  bold: {
    fontWeight: '600',
    color: colors.text.primary,
  },
  buddySection: {
    backgroundColor: `${colors.accent}15`,
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  buddyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  buddyTitle: {
    fontWeight: '600',
    flex: 1,
  },
  buddyDescription: {
    color: colors.text.secondary,
    marginBottom: 16,
    lineHeight: 20,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  button: {
    borderRadius: 8,
  },
  buttonContent: {
    paddingVertical: 8,
  },
});
