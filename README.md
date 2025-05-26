# 📱 Habit Tracker – Build Good Habits, Break Bad Ones!

A React Native app to help users build consistent routines and track progress over time.  
Easily add daily or weekly habits, mark them as complete, and stay motivated with clear visual progress tracking – all stored locally!

---

## 🎯 Project Objective

This mobile app allows users to:

- Register/Login (locally using AsyncStorage)
- Create daily/weekly habits (e.g., "Exercise", "Read", "Drink Water")
- Mark habits as completed each day
- Track progress over time
- Store and retrieve habit data using AsyncStorage

---

## 🚀 Features

- Registration / Login (Local Storage Only)  
- Auto-login if user data exists  
- Logout functionality  
- Create Habit (Name + Frequency: Daily / Weekly)  
- Store habits using AsyncStorage  
- Habit List with FlatList  
- Mark habits as completed  
- Filters: All Habits / Today’s Habits / Completed Habits  
- Progress Tracking: % of habits completed today  
- Weekly progress  
- Calendar view for habit streaks  
- Animations for completing habits  
- Light / Dark mode  

---

## 🛠️ Tech Stack

- React Native CLI
- TypeScript
- React Navigation (Stack + Tab)
- AsyncStorage
- useContext (optional state management)

---


---

## 📦 Setup Instructions

```bash
# Clone the repository
git clone https://github.com/your-username/habit-tracker-app.git
cd habit-tracker-app

# Install dependencies
npm install

# Start the Metro bundler
npx expo start

❗ If you're not using Expo, replace the last command with:
npx react-native start

## 📱 How to Run the App

✅ Android

bash
npx react-native run-android
Make sure Android Studio emulator or a physical device is connected.

🍎 iOS
bash
npx react-native run-ios
Requires macOS with Xcode installed.

✅ If you're using Expo, just scan the QR code from your terminal using the Expo Go app.

📽️ Demo Video

https://github.com/user-attachments/assets/750f6d34-e83e-4061-98cb-9ef54a7bf7a0




