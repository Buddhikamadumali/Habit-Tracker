import React from 'react';
import {View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';
import {useHabits} from '../context/HabitContext';
import moment from 'moment';
import {BarChart} from 'react-native-chart-kit';
import * as Progress from 'react-native-progress';

const screenWidth = Dimensions.get('window').width;

const HabitProgressScreen = () => {
  const {habits} = useHabits();
  const today = moment().format('YYYY-MM-DD');

  // --- Daily Progress ---
  const todayHabits = habits.filter(habit => {
    if (habit.frequency === 'Daily') return true;
    if (habit.frequency === 'Weekly') return moment().day() === 1;
    return false;
  });

  const completedToday = todayHabits.filter(habit =>
    habit.completedDates.includes(today),
  );

  const dailyProgress =
    todayHabits.length === 0
      ? 0
      : Math.round((completedToday.length / todayHabits.length) * 100);

  // --- Weekly Progress ---
  const weekDays = Array.from({length: 7}, (_, i) =>
    moment().startOf('week').add(i, 'days'),
  );

  const weeklyProgress = weekDays.map(day => {
    const dateStr = day.format('YYYY-MM-DD');
    const dayOfWeek = day.day();

    const relevantHabits = habits.filter(habit => {
      if (habit.frequency === 'Daily') return true;
      if (habit.frequency === 'Weekly') return dayOfWeek === 1;
      return false;
    });

    const completed = relevantHabits.filter(habit =>
      habit.completedDates.includes(dateStr),
    );

    const percentage =
      relevantHabits.length === 0
        ? 0
        : Math.round((completed.length / relevantHabits.length) * 100);

    return percentage;
  });

  const chartData = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        data: weeklyProgress,
      },
    ],
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Daily Progress</Text>
      <View style={styles.progressContainer}>
        <Progress.Bar
          progress={dailyProgress / 100}
          width={screenWidth - 40}
          color="#fdd835"
          unfilledColor="#fff3cd"
          borderWidth={0}
          height={20}
          borderRadius={10}
        />
        <Text style={styles.percentageText}>
          {dailyProgress}% completed today
        </Text>
      </View>

      <Text style={styles.heading}>Weekly Progress</Text>
      <BarChart
        data={chartData}
        width={screenWidth - 30}
        height={220}
        yAxisLabel=""
        yAxisSuffix="%"
        chartConfig={{
          backgroundColor: '#fff',
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(253, 216, 53, ${opacity})`, // yellow
          labelColor: () => '#333',
          style: {
            borderRadius: 16,
          },
        }}
        style={styles.chart}
        verticalLabelRotation={0}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingTop: 30,
  },
  heading: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
    marginTop: 20,
  },
  progressContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  percentageText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  chart: {
    marginVertical: 20,
    borderRadius: 16,
    alignSelf: 'center',
  },
});
export default HabitProgressScreen;
