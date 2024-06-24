import React, { createContext, useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { isLogged } from '../utils/isLogged';

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await isLogged();
      setUserData(data);
      setLoading(false);
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <UserContext.Provider value={{ userData }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;