import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, FlatList } from 'react-native';
import { Searchbar, SegmentedButtons, Text } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { HomeStackParamList } from '../../navigation/MainNavigator';
import { CommunityCard } from '../../components/CommunityCard';
import { mockCommunities } from '../../data/mockData';
import { Vibe } from '../../types';
import { colors } from '../../theme';

type HomeScreenProps = {
  navigation: StackNavigationProp<HomeStackParamList, 'HomeList'>;
};

export const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVibe, setSelectedVibe] = useState<'all' | Vibe>('all');

  const filteredCommunities = mockCommunities.filter((community) => {
    const matchesSearch =
      community.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      community.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVibe = selectedVibe === 'all' || community.vibe === selectedVibe;
    return matchesSearch && matchesVibe;
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Searchbar
          placeholder="Search communities..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          style={styles.searchbar}
        />
        
        <SegmentedButtons
          value={selectedVibe}
          onValueChange={(value) => setSelectedVibe(value as 'all' | Vibe)}
          buttons={[
            { value: 'all', label: 'All' },
            { value: 'running', label: '🏃 Running' },
            { value: 'cycling', label: '🚴 Cycling' },
          ]}
          style={styles.segmented}
        />
      </View>

      <FlatList
        data={filteredCommunities}
        renderItem={({ item }) => (
          <CommunityCard
            community={item}
            onPress={() => navigation.navigate('CommunityDetail', { communityId: item.id })}
          />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text variant="bodyLarge" style={styles.emptyText}>
              No communities found
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: 16,
    paddingBottom: 8,
    backgroundColor: colors.background,
  },
  searchbar: {
    marginBottom: 12,
    backgroundColor: colors.surface,
  },
  segmented: {
    marginBottom: 8,
  },
  list: {
    padding: 16,
    paddingTop: 8,
  },
  emptyContainer: {
    padding: 32,
    alignItems: 'center',
  },
  emptyText: {
    color: colors.text.secondary,
    textAlign: 'center',
  },
});
