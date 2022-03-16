/** @format */

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { theme, Icon } from "native-base";
import { Feather } from "@expo/vector-icons";

import { Desenvolvedores } from "./pages/Desenvolvedores";
import { Niveis } from "./pages/Niveis";
import { FormDesenvolvedor } from "./pages/FormDesenvolvedor";
import { DesenvolvedorProps } from "./hooks/useDesevolvedor";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export type RootStackParamList = {
  FormDesenvolvedor: {type: "create" | "update", dev?: DesenvolvedorProps}
  Tab: undefined
}

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: theme.colors.white },
        tabBarActiveTintColor: theme.colors.blue[500],
        tabBarInactiveTintColor: theme.colors.gray[500],
      }}>
      <Tab.Screen
        name="Desenvolvedores"
        component={Desenvolvedores}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              as={Feather}
              name="users"
              size="sm"
              color={focused ? "blue.500" : "gray.400"}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Niveis"
        component={Niveis}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon
              as={Feather}
              name="star"
              size="sm"
              color={focused ? "blue.500" : "gray.400"}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Tab"
        screenOptions={{ headerShown: false, animation: "fade_from_bottom" }}>
        <Stack.Screen name="Tab" component={Tabs} />
        <Stack.Screen name="FormDesenvolvedor" component={FormDesenvolvedor} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
