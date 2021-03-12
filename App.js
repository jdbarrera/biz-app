import * as React from 'react';
import { Text, View, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import MainScreen from './components/MainScreen';
import SignUpForm from './components/SignUpForm';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const MainStack = createStackNavigator();

const MainStackkNavigator = () => {
  return (
      <MainStack.Navigator
        initialRouteName="MainScreen"
        screenOptions={{ gestureEnabled: true }}
      >
        <MainStack.Screen
          name="MainScreen"
          component={MainScreen}
          options={{headerShown: false}}
        />
        <MainStack.Screen
          name="SignUpForm"
          component={SignUpForm}
          initialParams={{ isEditing: false }}
          options={{headerShown: false}}
        />
      </MainStack.Navigator>
  );
}

export default function App() {
    return (
      <NavigationContainer>
        <MainStackkNavigator />
      </NavigationContainer>
    );
}

const styles = StyleSheet.create({
});