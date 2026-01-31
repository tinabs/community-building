import React from 'react';
import { View, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { Text, Chip } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Community } from '../types';
import { colors } from '../theme';

interface CommunityCardProps {
  community: Community;
  onPress: () => void;
}

export const CommunityCard = ({ community, onPress }: CommunityCardProps) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <View style={styles.card}>
        <ImageBackground
          source={{ uri: community.images[0] }}
          style={styles.image}
          imageStyle={styles.imageStyle}
        >
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            style={styles.gradient}
          >
            <View style={styles.content}>
              <Chip icon="account-group" style={styles.chip} textStyle={styles.chipText}>
                {community.memberCount} members
              </Chip>
              
              <View style={styles.info}>
                <Text variant="headlineSmall" style={styles.name}>
                  {community.name}
                </Text>
                <View style={styles.location}>
                  <Icon name="map-marker" size={16} color={colors.background} />
                  <Text variant="bodyMedium" style={styles.locationText}>
                    {community.location.neighborhood}
                  </Text>
                </View>
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  image: {
    width: '100%',
    height: 200,
  },
  imageStyle: {
    borderRadius: 12,
  },
  gradient: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  content: {
    padding: 16,
  },
  chip: {
    alignSelf: 'flex-start',
    marginBottom: 8,
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  chipText: {
    fontSize: 12,
  },
  info: {
    gap: 4,
  },
  name: {
    color: colors.background,
    fontWeight: 'bold',
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  locationText: {
    color: colors.background,
  },
});
