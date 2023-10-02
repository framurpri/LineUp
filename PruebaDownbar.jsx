import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, BottomNavigation } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Profile from './Profile';
import Settings from './Settings';
import Community from './Community';
import HomeScreen from './Home';

const Tab = createBottomTabNavigator();

export default function MyComponent( ) {

  return(

<Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={({ navigation, state, descriptors, insets }) => (
        <BottomNavigation.Bar
          navigationState={state}
         safeAreaInsets={insets}
         inactiveColor='white'
         activeColor='#F29C46'
         style={{backgroundColor:'#303747'}}
          onTabPress={({ route, preventDefault }) => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
             navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          renderIcon={({ route, focused, color }) => {
            
            const { options } = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({ focused, color: 'white', size: 24});
            }

            return null;
          }}
            //Este código de getLabelText en la práctica no sirve pq le seteo yo el nombre en tabBarLabel con un String
          getLabelText={({ route }) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.title;

            return label;
          }}
        />
      )}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen1}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused, color, size }) => {
            return <Icon name="home" size={size} color={focused?'#F29C46':color}/>;
          },
        }}
      />
      <Tab.Screen
        name="Community"
        component={CommunityScreen}
        options={{
          tabBarLabel: 'Community',
          tabBarIcon: ({ focused, color, size }) => {
            return <Icon name="account-group" size={size} color={focused?'#F29C46':color} />;
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused, color, size }) => {
            return <Icon name="account" size={size} color={focused?'#F29C46':color} />;
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ focused, color, size }) => {
            return <Icon name="cog" size={size} color={focused?'#F29C46':color} />;
          },
        }}
      />
    </Tab.Navigator>

  )
}






function HomeScreen1() {
  return (
    <HomeScreen></HomeScreen>
  );
}
function CommunityScreen() {
  return (
      <Community></Community>
  );
}

function ProfileScreen() {
  return (
      <Profile></Profile>
  );
}
function SettingsScreen() {
  return (
      <Settings/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

