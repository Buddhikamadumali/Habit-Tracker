import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useHabits} from '../context/HabitContext';
import {useTheme} from '../context/ThemeContext';

const AddHabitScreen = () => {
  const [habitName, setHabitName] = useState('');
  const [frequency, setFrequency] = useState<'Daily' | 'Weekly'>('Daily');

  const navigation = useNavigation();
  const {addHabit} = useHabits();
  const {theme, mode} = useTheme();

  const isDark = mode === 'dark';

  const saveHabit = () => {
    if (!habitName.trim()) {
      Alert.alert('Error', 'Please enter a habit name.');
      return;
    }

    const newHabit = {
      id: Date.now().toString(),
      name: habitName,
      frequency,
      completedDates: [],
    };

    addHabit(newHabit);
    setHabitName('');
    setFrequency('Daily');
    Alert.alert('Success', 'Habit saved successfully!');
    navigation.goBack();
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: isDark ? '#121212' : '#fff'},
      ]}>
      <Text style={[styles.label, {color: isDark ? '#fff' : '#333'}]}>
        Habit Name
      </Text>
      <TextInput
        style={[
          styles.input,
          {
            borderColor: isDark ? '#888' : '#fdd835',
            backgroundColor: isDark ? '#1e1e1e' : '#fffceb',
            color: isDark ? '#fff' : '#000',
          },
        ]}
        placeholder="Enter habit name"
        placeholderTextColor={isDark ? '#aaa' : '#999'}
        value={habitName}
        onChangeText={setHabitName}
      />

      <Text style={[styles.label, {color: isDark ? '#fff' : '#333'}]}>
        Frequency
      </Text>
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={[
            styles.frequencyButton,
            {
              backgroundColor: isDark ? '#1e1e1e' : '#fffceb',
              borderColor: isDark ? '#888' : '#fdd835',
            },
            frequency === 'Daily' && {
              backgroundColor: isDark ? '#444' : '#fdd835',
            },
          ]}
          onPress={() => setFrequency('Daily')}>
          <Text style={[styles.buttonText, {color: isDark ? '#fff' : '#333'}]}>
            Daily
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.frequencyButton,
            {
              backgroundColor: isDark ? '#1e1e1e' : '#fffceb',
              borderColor: isDark ? '#888' : '#fdd835',
            },
            frequency === 'Weekly' && {
              backgroundColor: isDark ? '#444' : '#fdd835',
            },
          ]}
          onPress={() => setFrequency('Weekly')}>
          <Text style={[styles.buttonText, {color: isDark ? '#fff' : '#333'}]}>
            Weekly
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[
          styles.saveButton,
          {backgroundColor: isDark ? '#fdd835' : '#fdd835'},
        ]}
        onPress={saveHabit}>
        <Text style={[styles.saveText, {color: '#000'}]}>Save Habit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
  },
  buttonGroup: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 10,
  },
  frequencyButton: {
    flex: 1,
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: '600',
  },
  saveButton: {
    marginTop: 30,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
  },
  saveText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddHabitScreen;
