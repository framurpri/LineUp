import React from 'react';
import { StyleSheet, View , Text} from 'react-native';
import DownBar from './DownBar.jsx';
import Settings from './Settings.jsx';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NativeRouter, Routes, Route, Link } from 'react-router-native';

export function NavMenu() {
    return (
        <View>
        <DownBar>
            <Link to={{ pathname: '/'}}>
                <Icon name="film" size={25} color="#900" />
            </Link>
            <Link to={{ pathname: '/'}}>
                <Icon name="group" size={25} color="#900" />
            </Link>
            <Link to={{ pathname: '/'}}>
                <Icon name="user" size={25} color="#900" />
            </Link>
            <Link to={{ pathname: '/settings'}}>
                 <Icon name="cog" size={25} color="#900" />
            </Link>
        </DownBar>
        </View>
    )
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#99CCFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        width: 140,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

