import React, {useState, useRef, useEffect} from 'react';
import {
  StyleSheet,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useHabits} from '../context/HabitContext';
import moment from 'moment';
import LottieView from 'lottie-react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const FILTER_OPTIONS = ['All Habits', "Today's Habits", 'Completed Habits'];

const HabitList = ({date}: {date: string}) => {
  const {habits, toggleHabitCompletion, deleteHabit} = useHabits();
  const [showConfetti, setShowConfetti] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All Habits');

  const currentDate = moment(date).format('YYYY-MM-DD');
  const flatListRef = useRef<FlatList>(null);

  const getFilteredHabits = () => {
    let filtered = [];
    switch (activeFilter) {
      case 'All Habits':
        filtered = habits;
        break;
      case "Today's Habits":
        filtered = habits.filter(
          habit => !habit.completedDates.includes(currentDate),
        );
        break;
      case 'Completed Habits':
        filtered = habits.filter(habit =>
          habit.completedDates.includes(currentDate),
        );
        break;
      default:
        filtered = habits;
    }

    return filtered.sort((a, b) => {
      const aCompleted = a.completedDates.includes(currentDate);
      const bCompleted = b.completedDates.includes(currentDate);
      return Number(aCompleted) - Number(bCompleted);
    });
  };

  const filteredHabits = getFilteredHabits();

  
  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({offset: 0, animated: false});
    }
  }, [filteredHabits]);

  const handleComplete = (id: string) => {
    const habit = habits.find(h => h.id === id);
    const isAlreadyCompleted = habit?.completedDates.includes(currentDate);

    toggleHabitCompletion(id, currentDate);

    if (!isAlreadyCompleted) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2500);
    }
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.heading}>Habits for {currentDate}</Text>


        <View style={styles.tabContainer}>
          {FILTER_OPTIONS.map(option => (
            <TouchableOpacity
              key={option}
              onPress={() => setActiveFilter(option)}
              style={[styles.tab, activeFilter === option && styles.activeTab]}>
              <Text
                style={[
                  styles.tabText,
                  activeFilter === option && styles.activeTabText,
                ]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        
        {filteredHabits.length === 0 ? (
          <Text style={styles.emptyText}>No habits found.</Text>
        ) : (
          <FlatList
            ref={flatListRef}
            data={filteredHabits}
            keyExtractor={item => item.id}
            renderItem={({item}) => {
              const isCompleted = item.completedDates.includes(currentDate);

              return (
                <View style={styles.habitItem}>
                  <View style={styles.habitContent}>
                    <Text
                      style={[
                        styles.habitName,
                        isCompleted && styles.completedText,
                      ]}>
                      {item.name}
                    </Text>
                    <Text style={styles.frequency}>{item.frequency}</Text>
                  </View>

                  <View style={styles.actions}>
                    <TouchableOpacity
                      style={[
                        styles.toggleButton,
                        isCompleted ? styles.completed : styles.incomplete,
                      ]}
                      onPress={() => handleComplete(item.id)}>
                      <Text style={styles.actionText}>
                        {isCompleted ? '✓ Done' : 'Mark Done'}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.deleteButton}
                      onPress={() => deleteHabit(item.id)}>
                      <Text style={styles.deleteText}>🗑️</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            }}
          />
        )}
      </View>

      {showConfetti && (
        <View pointerEvents="none" style={styles.confettiWrapper}>
          <LottieView
            source={require('../assets/complete.json')}
            autoPlay
            loop={false}
            style={styles.lottie}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#FFFDE7',
  },
  container: {
    paddingHorizontal: 15,
    paddingBottom: 20,
    flex: 1,
  },
  heading: {
    fontWeight: 'bold',
    marginVertical: 10,
    fontSize: 18,
    color: '#FBC02D',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  tab: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#FFF9C4',
  },
  activeTab: {
    backgroundColor: '#FBC02D',
  },
  tabText: {
    color: '#616161',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#212121',
    fontWeight: 'bold',
  },
  habitItem: {
    backgroundColor: '#FFF8E1',
    borderRadius: 12,
    padding: 15,
    marginVertical: 8,
    elevation: 4,
    shadowColor: '#FDD835',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: '#FFECB3',
  },
  habitContent: {
    marginBottom: 10,
  },
  habitName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#795548',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#9E9D24',
  },
  frequency: {
    color: '#BDB76B',
    fontSize: 13,
    marginTop: 4,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  toggleButton: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  completed: {
    backgroundColor: '#FFF176',
  },
  incomplete: {
    backgroundColor: '#FFEE58',
  },
  actionText: {
    color: '#3E2723',
    fontWeight: 'bold',
  },
  deleteButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: '#FFCDD2',
    borderRadius: 6,
  },
  deleteText: {
    color: '#C62828',
    fontWeight: 'bold',
    fontSize: 16,
  },
  emptyText: {
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 20,
  },
  confettiWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
  },
});

export default HabitList;
