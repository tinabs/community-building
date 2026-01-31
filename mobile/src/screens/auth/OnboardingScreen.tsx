import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Button, Text, RadioButton, TextInput, Chip } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { useAuthStore } from '../../store/useAuthStore';
import { Gender, Vibe } from '../../types';
import { colors } from '../../theme';

type OnboardingScreenProps = {
  navigation: StackNavigationProp<AuthStackParamList, 'Onboarding'>;
};

export const OnboardingScreen = ({ navigation }: OnboardingScreenProps) => {
  const [step, setStep] = useState(1);
  const [gender, setGender] = useState<Gender>('prefer-not-to-say');
  const [age, setAge] = useState('');
  const [name, setName] = useState('');
  const [selectedVibes, setSelectedVibes] = useState<Vibe[]>([]);
  
  const { setUser, setHasCompletedOnboarding } = useAuthStore();

  const toggleVibe = (vibe: Vibe) => {
    if (selectedVibes.includes(vibe)) {
      setSelectedVibes(selectedVibes.filter(v => v !== vibe));
    } else {
      setSelectedVibes([...selectedVibes, vibe]);
    }
  };

  const handleComplete = () => {
    // Mock user creation
    const user = {
      id: 'user1',
      phone: '+971501234567',
      name,
      age: parseInt(age),
      gender,
      vibes: selectedVibes,
      isBuddy: false,
      createdAt: new Date(),
    };
    
    setUser(user);
    setHasCompletedOnboarding(true);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <View>
            <Text variant="headlineSmall" style={styles.stepTitle}>
              What's your name?
            </Text>
            <TextInput
              label="Name"
              value={name}
              onChangeText={setName}
              mode="outlined"
              style={styles.input}
            />
            <Button
              mode="contained"
              onPress={() => setStep(2)}
              disabled={name.length < 2}
              style={styles.button}
            >
              Continue
            </Button>
          </View>
        );

      case 2:
        return (
          <View>
            <Text variant="headlineSmall" style={styles.stepTitle}>
              Tell us about yourself
            </Text>
            <Text variant="bodyMedium" style={styles.label}>
              Gender
            </Text>
            <RadioButton.Group onValueChange={(value) => setGender(value as Gender)} value={gender}>
              <RadioButton.Item label="Male" value="male" />
              <RadioButton.Item label="Female" value="female" />
              <RadioButton.Item label="Non-binary" value="non-binary" />
              <RadioButton.Item label="Prefer not to say" value="prefer-not-to-say" />
            </RadioButton.Group>
            
            <TextInput
              label="Age"
              value={age}
              onChangeText={setAge}
              keyboardType="number-pad"
              mode="outlined"
              style={styles.input}
            />
            
            <Button
              mode="contained"
              onPress={() => setStep(3)}
              disabled={!age || parseInt(age) < 18}
              style={styles.button}
            >
              Continue
            </Button>
          </View>
        );

      case 3:
        return (
          <View>
            <Text variant="headlineSmall" style={styles.stepTitle}>
              What interests you?
            </Text>
            <Text variant="bodyMedium" style={styles.subtitle}>
              Select at least one
            </Text>
            
            <View style={styles.chipContainer}>
              <Chip
                selected={selectedVibes.includes('running')}
                onPress={() => toggleVibe('running')}
                style={styles.chip}
                mode="outlined"
              >
                🏃 Running
              </Chip>
              <Chip
                selected={selectedVibes.includes('cycling')}
                onPress={() => toggleVibe('cycling')}
                style={styles.chip}
                mode="outlined"
              >
                🚴 Cycling
              </Chip>
            </View>
            
            <Button
              mode="contained"
              onPress={handleComplete}
              disabled={selectedVibes.length === 0}
              style={styles.button}
            >
              Get Started
            </Button>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text variant="labelLarge" style={styles.progress}>
        Step {step} of 3
      </Text>
      {renderStep()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: 24,
    paddingTop: 60,
  },
  progress: {
    color: colors.text.secondary,
    marginBottom: 24,
  },
  stepTitle: {
    fontWeight: 'bold',
    marginBottom: 24,
    color: colors.text.primary,
  },
  label: {
    marginBottom: 8,
    marginTop: 16,
    color: colors.text.secondary,
  },
  subtitle: {
    color: colors.text.secondary,
    marginBottom: 16,
  },
  input: {
    marginBottom: 24,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 32,
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
  },
  button: {
    borderRadius: 8,
    marginTop: 16,
  },
});
