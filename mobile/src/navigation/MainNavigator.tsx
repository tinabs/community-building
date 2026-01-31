import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../theme';

// Screens
import { HomeScreen } from '../screens/main/HomeScreen';
import { CommunityDetailScreen } from '../screens/main/CommunityDetailScreen';
import { ActivityDetailScreen } from '../screens/main/ActivityDetailScreen';
import { MyActivitiesScreen } from '../screens/main/MyActivitiesScreen';
import { ProfileScreen } from '../screens/main/ProfileScreen';

export type HomeStackParamList = {
  HomeList: undefined;
  CommunityDetail: { communityId: string };
  ActivityDetail: { activityId: string };
};

export type MainTabParamList = {
  Home: undefined;
  MyActivities: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();
const HomeStack = createStackNavigator<HomeStackParamList>();

const HomeNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeList"
        component={HomeScreen}
        options={{ headerTitle: 'Discover' }}
      />
      <HomeStack.Screen
        name="CommunityDetail"
        component={CommunityDetailScreen}
        options={{ headerTitle: 'Community' }}
      />
      <HomeStack.Screen
        name="ActivityDetail"
        component={ActivityDetailScreen}
        options={{ headerTitle: 'Activity' }}
      />
    </HomeStack.Navigator>
  );
};

export const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text.secondary,
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarLabel: 'Discover',
          tabBarIcon: ({ color, size }) => (
            <Icon name="compass" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="MyActivities"
        component={MyActivitiesScreen}
        options={{
          tabBarLabel: 'My Activities',
          tabBarIcon: ({ color, size }) => (
            <Icon name="calendar-check" size={size} color={color} />
          ),
          headerShown: true,
          headerTitle: 'My Activities',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Icon name="account" size={size} color={color} />
          ),
          headerShown: true,
          headerTitle: 'Profile',
        }}
      />
    </Tab.Navigator>
  );
};
