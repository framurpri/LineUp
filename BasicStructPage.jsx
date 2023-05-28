import React from 'react';
import { StyleSheet, View , Text} from 'react-native';
import DownBar from './DownBar.jsx';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NativeRouter, Routes, Route, Link } from 'react-router-native';
const Basic = () => {
    return (
        <View>
        <DownBar>
            <Icon name="film" size={25} color="#900" />
            <Icon name="group" size={25} color="#900" />
            <Icon name="user" size={25} color="#900" />
            <Link to={{ pathname: '/settings'}}>
                 <Icon name="cog" size={25} color="#900" />
            </Link>
        </DownBar>
        </View>
    );
};

const Login = () => (
    <Routes>
      <Route path="/" element={<Basic />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
);

const styles = StyleSheet.create({
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default Basic;