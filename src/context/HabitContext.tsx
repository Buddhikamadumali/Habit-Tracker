import React, {createContext, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Habit = {
  id: string;
  name: string;
  frequency: 'Daily' | 'Weekly';
  completedDates: string[];
};

type HabitContextType = {
  habits: Habit[];
  loadHabits: () => Promise<void>;
  addHabit: (habit: Habit) => Promise<void>;
  markHabitCompleted: (habitId: string, date: string) => Promise<void>;
  toggleHabitCompletion: (habitId: string, date: string) => void;
  deleteHabit: (habitId: string) => void;
};

const HabitContext = createContext<HabitContextType | undefined>(undefined);

export const HabitProvider: React.FC<{children: React.ReactNode}> = ({
  children,
}) => {
  const [habits, setHabits] = useState<Habit[]>([]);

  const loadHabits = async () => {
    const json = await AsyncStorage.getItem('habits');
    if (json) setHabits(JSON.parse(json));
  };

  const saveHabits = async (updatedHabits: Habit[]) => {
    setHabits(updatedHabits);
    await AsyncStorage.setItem('habits', JSON.stringify(updatedHabits));
  };

  const addHabit = async (habit: Habit) => {
    const newHabits = [...habits, habit];
    await saveHabits(newHabits);
  };

  const markHabitCompleted = async (habitId: string, date: string) => {
    const updatedHabits = habits.map(habit => {
      if (habit.id === habitId) {
        const updatedDates = habit.completedDates.includes(date)
          ? habit.completedDates
          : [...habit.completedDates, date];
        return {...habit, completedDates: updatedDates};
      }
      return habit;
    });
    await saveHabits(updatedHabits);
  };

  const toggleHabitCompletion = (habitId: string, date: string) => {
    const updatedHabits = habits.map(habit => {
      if (habit.id === habitId) {
        const isCompleted = habit.completedDates.includes(date);
        const updatedDates = isCompleted
          ? habit.completedDates.filter(d => d !== date)
          : [...habit.completedDates, date];
        return {...habit, completedDates: updatedDates};
      }
      return habit;
    });
    saveHabits(updatedHabits);
  };

  const deleteHabit = (habitId: string) => {
    const updatedHabits = habits.filter(habit => habit.id !== habitId);
    saveHabits(updatedHabits);
  };

  useEffect(() => {
    loadHabits();
  }, []);

  return (
    <HabitContext.Provider
      value={{
        habits,
        loadHabits,
        addHabit,
        markHabitCompleted,
        toggleHabitCompletion,
        deleteHabit,
      }}>
      {children}
    </HabitContext.Provider>
  );
};

export const useHabits = () => {
  const context = useContext(HabitContext);
  if (!context)
    throw new Error('useHabits must be used within a HabitProvider');
  return context;
};
