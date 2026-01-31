import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, ProgressBar, Chip } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Activity } from '../types';
import { colors } from '../theme';

interface ActivityCardProps {
  activity: Activity;
  onPress: () => void;
}

export const ActivityCard = ({ activity, onPress }: ActivityCardProps) => {
  const progress = activity.rsvpCount / activity.capacity;
  const spotsLeft = activity.capacity - activity.rsvpCount;
  const isFull = activity.rsvpCount >= activity.capacity;

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <View style={styles.card}>
        <View style={styles.header}>
          <Text variant="titleMedium" style={styles.title}>
            {activity.title}
          </Text>
          <Chip
            mode="outlined"
            compact
            style={[styles.levelChip, { borderColor: colors.primary }]}
            textStyle={{ fontSize: 11 }}
          >
            {activity.fitnessLevel}
          </Chip>
        </View>

        <View style={styles.details}>
          <View style={styles.detail}>
            <Icon name="calendar" size={16} color={colors.text.secondary} />
            <Text variant="bodySmall" style={styles.detailText}>
              {formatDate(activity.dateTime)}
            </Text>
          </View>
          
          <View style={styles.detail}>
            <Icon name="clock-outline" size={16} color={colors.text.secondary} />
            <Text variant="bodySmall" style={styles.detailText}>
              {formatTime(activity.dateTime)} • {activity.duration}min
            </Text>
          </View>
          
          <View style={styles.detail}>
            <Icon name="map-marker" size={16} color={colors.text.secondary} />
            <Text variant="bodySmall" style={styles.detailText} numberOfLines={1}>
              {activity.location.name}
            </Text>
          </View>
        </View>

        <View style={styles.capacity}>
          <View style={styles.capacityHeader}>
            <Text variant="bodySmall" style={styles.capacityText}>
              {activity.rsvpCount}/{activity.capacity} spots filled
            </Text>
            {!isFull && (
              <Text variant="bodySmall" style={styles.spotsLeft}>
                {spotsLeft} spots left
              </Text>
            )}
            {isFull && (
              <Text variant="bodySmall" style={styles.fullText}>
                Full
              </Text>
            )}
          </View>
          <ProgressBar
            progress={progress}
            color={isFull ? colors.warning : colors.primary}
            style={styles.progressBar}
          />
        </View>

        {activity.buddyMatchingEnabled && (
          <View style={styles.buddyBadge}>
            <Icon name="account-heart" size={14} color={colors.accent} />
            <Text variant="bodySmall" style={styles.buddyText}>
              Buddy matching available
            </Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  title: {
    flex: 1,
    fontWeight: '600',
    color: colors.text.primary,
    marginRight: 8,
  },
  levelChip: {
    height: 24,
  },
  details: {
    gap: 8,
    marginBottom: 12,
  },
  detail: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    color: colors.text.secondary,
    flex: 1,
  },
  capacity: {
    marginBottom: 8,
  },
  capacityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  capacityText: {
    color: colors.text.secondary,
  },
  spotsLeft: {
    color: colors.primary,
    fontWeight: '600',
  },
  fullText: {
    color: colors.warning,
    fontWeight: '600',
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
  },
  buddyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  buddyText: {
    color: colors.accent,
    fontSize: 12,
  },
});
