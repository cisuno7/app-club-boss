import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuthStore } from '@/store/authStore';

// Screens
import { SplashScreen } from '@/screens/shared/SplashScreen';
import { LoginScreen } from '@/screens/auth/LoginScreen';
import { HomeScreen } from '@/screens/client/HomeScreen';
import { CouponsScreen } from '@/screens/client/CouponsScreen';
import { ProfileScreen } from '@/screens/client/ProfileScreen';

// Icons (usando Phosphor Icons)
import { House, Ticket, User } from 'phosphor-react-native';
import { colors } from '@/theme';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Navigator para Cliente
const ClientTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.gray[400],
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: colors.gray[100],
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => <House size={size} color={color} weight="fill" />,
          tabBarLabel: 'Feed',
        }}
      />
      <Tab.Screen
        name="Coupons"
        component={CouponsScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Ticket size={size} color={color} weight="fill" />,
          tabBarLabel: 'Cupons',
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => <User size={size} color={color} weight="fill" />,
          tabBarLabel: 'Perfil',
        }}
      />
    </Tab.Navigator>
  );
};

export const AppNavigator: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isAuthenticated ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <Stack.Screen name="ClientTabs" component={ClientTabs} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
