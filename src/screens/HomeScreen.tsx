import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Calender from '../components/Calender';
import HabitList from '../components/HabitList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';
import {removeUser} from '../utils/Storage';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../types/navigation';
import {useTheme} from '../context/ThemeContext';
import Feather from 'react-native-vector-icons/Feather';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

type Habit = {
  id: string;
  name: string;
  frequency: 'Daily' | 'Weekly';
};

const HomeScreen = ({navigation}: Props) => {
  const {theme, toggleTheme, isDarkMode} = useTheme();

  const handleLogout = async () => {
    await removeUser();
    navigation.replace('SignUp');
  };

  const today = moment().format('YYYY-MM-DD');
  const [selectedDate, setSelectedDate] = useState(today);
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    const loadHabits = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('habits');
        if (jsonValue != null) {
          const parsed = JSON.parse(jsonValue);
          setHabits(parsed);
        } else {
          setHabits([]);
        }
      } catch (error) {
        console.error('Error loading habits:', error);
        setHabits([]);
      }
    };

    loadHabits();
  }, []);

  return (
    <View style={[styles.container, {backgroundColor: theme.background}]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleTheme} style={styles.iconButton}>
          <Feather
            name={isDarkMode ? 'sun' : 'moon'}
            size={24}
            color={theme.text}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.logoutButton, {backgroundColor: theme.button}]}
          onPress={handleLogout}>
          <Text style={[styles.logoutText, {color: theme.text}]}>Log out</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <Calender selectedDate={selectedDate} onDateChange={setSelectedDate} />
        <HabitList date={selectedDate} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconButton: {
    padding: 10,
    borderRadius: 20,
  },
  logoutButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    elevation: 3,
  },
  logoutText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  body: {
    flex: 1,
    gap: 20,
  },
});

export default HomeScreen;
