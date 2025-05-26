import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeUser = async (user: object) => {
  try {
    await AsyncStorage.setItem('user', JSON.stringify(user));
  } catch (e) {
    console.error('Saving user failed', e);
  }
};

export const getUser = async () => {
  try {
    const json = await AsyncStorage.getItem('user');
    return json != null ? JSON.parse(json) : null;
  } catch (e) {
    console.error('Reading user failed', e);
    return null;
  }
};

export const removeUser = async () => {
  try {
    await AsyncStorage.removeItem('user');
  } catch (e) {
    console.error('Removing user failed', e);
  }
};
