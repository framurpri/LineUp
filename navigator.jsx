import { MaterialIcons } from '@expo/vector-icons'; 
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeButton from './HomeButton.jsx';
import ProfileButton from './ProfileButton.jsx';

function navegator() {

    const Tab = createBottomTabNavigator();

return (

<NavigationContainer>
    <Tab.Navigator initialRouteName="Home">
        <Tab.Screen 
            name="Home" 
            component={HomeButton} 
            options={{
                headerShown: false,
                tabBarIcon: ({color, size}) => (
                <MaterialIcons name="house" size={24} color="black" />
            ),
            }}
        />
        <Tab.Screen 
        name="Profile" 
        component={ProfileButton} 
        options={{headerShown: false}}
        />
    </Tab.Navigator>
</NavigationContainer>
)}

export default navegator;