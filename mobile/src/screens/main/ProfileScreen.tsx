import React from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Avatar, List, Switch, Divider, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAuthStore } from '../../store/useAuthStore';
import { colors } from '../../theme';

export const ProfileScreen = () => {
  const { user, logout } = useAuthStore();
  const [isBuddy, setIsBuddy] = React.useState(user?.isBuddy || false);

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Not logged in</Text>
      </View>
    );
  }

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        onPress: () => logout(),
        style: 'destructive',
      },
    ]);
  };

  const getVibeEmoji = (vibe: string) => {
    return vibe === 'running' ? '🏃' : '🚴';
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Avatar.Text
          size={80}
          label={user.name.charAt(0).toUpperCase()}
          style={styles.avatar}
        />
        <Text variant="headlineSmall" style={styles.name}>
          {user.name}
        </Text>
        <Text variant="bodyMedium" style={styles.phone}>
          {user.phone}
        </Text>
        <View style={styles.badges}>
          {user.vibes.map((vibe) => (
            <View key={vibe} style={styles.badge}>
              <Text variant="bodyMedium">
                {getVibeEmoji(vibe)} {vibe}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Buddy Settings
        </Text>
        <View style={styles.card}>
          <List.Item
            title="Opt-in as a Buddy"
            description="Help newcomers feel welcome at their first activity"
            left={(props) => <Icon name="account-heart" size={24} color={colors.accent} />}
            right={() => (
              <Switch
                value={isBuddy}
                onValueChange={setIsBuddy}
                color={colors.accent}
              />
            )}
          />
        </View>
        {isBuddy && (
          <Text variant="bodySmall" style={styles.buddyNote}>
            You'll be matched with newcomers who request a buddy. We'll notify you when matched!
          </Text>
        )}
      </View>

      <View style={styles.section}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          Account
        </Text>
        <View style={styles.card}>
          <List.Item
            title="Edit Profile"
            left={(props) => <Icon name="account-edit" size={24} color={colors.primary} />}
            right={(props) => <List.Icon icon="chevron-right" />}
            onPress={() => {}}
          />
          <Divider />
          <List.Item
            title="Notifications"
            left={(props) => <Icon name="bell" size={24} color={colors.primary} />}
            right={(props) => <List.Icon icon="chevron-right" />}
            onPress={() => {}}
          />
          <Divider />
          <List.Item
            title="Privacy"
            left={(props) => <Icon name="shield-account" size={24} color={colors.primary} />}
            right={(props) => <List.Icon icon="chevron-right" />}
            onPress={() => {}}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text variant="titleMedium" style={styles.sectionTitle}>
          About
        </Text>
        <View style={styles.card}>
          <List.Item
            title="Help & Support"
            left={(props) => <Icon name="help-circle" size={24} color={colors.primary} />}
            right={(props) => <List.Icon icon="chevron-right" />}
            onPress={() => {}}
          />
          <Divider />
          <List.Item
            title="Terms of Service"
            left={(props) => <Icon name="file-document" size={24} color={colors.primary} />}
            right={(props) => <List.Icon icon="chevron-right" />}
            onPress={() => {}}
          />
          <Divider />
          <List.Item
            title="Privacy Policy"
            left={(props) => <Icon name="shield-check" size={24} color={colors.primary} />}
            right={(props) => <List.Icon icon="chevron-right" />}
            onPress={() => {}}
          />
        </View>
      </View>

      <View style={styles.logoutContainer}>
        <Button
          mode="outlined"
          onPress={handleLogout}
          textColor={colors.error}
          style={styles.logoutButton}
        >
          Logout
        </Button>
      </View>

      <Text variant="bodySmall" style={styles.version}>
        Version 1.0.0
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 24,
    backgroundColor: colors.surface,
  },
  avatar: {
    backgroundColor: colors.primary,
    marginBottom: 16,
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  phone: {
    color: colors.text.secondary,
    marginBottom: 12,
  },
  badges: {
    flexDirection: 'row',
    gap: 8,
  },
  badge: {
    backgroundColor: colors.background,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    overflow: 'hidden',
  },
  buddyNote: {
    color: colors.text.secondary,
    marginTop: 8,
    paddingHorizontal: 4,
    lineHeight: 18,
  },
  logoutContainer: {
    paddingHorizontal: 16,
    marginTop: 32,
    marginBottom: 16,
  },
  logoutButton: {
    borderColor: colors.error,
  },
  version: {
    textAlign: 'center',
    color: colors.text.secondary,
    marginBottom: 32,
  },
});
