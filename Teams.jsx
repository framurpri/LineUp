import React, { useState } from 'react';
import { View, StyleSheet, Text, Pressable, ScrollView } from 'react-native'
import { Routes, Route, Link } from 'react-router-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import TopBar from './TopBar.jsx'
import DownBar from './DownBar';


function Teams(){

    const data = [
        { id: 1, name: 'Elemento 1' },
        { id: 2, name: 'Elemento 2' },
        { id: 3, name: 'Elemento 3' },
        { id: 4, name: 'Elemento 4' },
      ];
      const [datos, setDatos] = useState(data);
    
      const addNewItem = () => {
        const newItem = { id: datos.length + 1, name: `Elemento ${datos.length + 1}` };
        setDatos([...datos, newItem]);
      };

    return(
        <View style={styles.container}>
            <View>
                <View>
                    <TopBar />
                </View>
            </View>
            <View style={{height: 650,
                justifyContent: 'center',
                alignItems: 'center',
                width:'100%'}}>
                <Pressable style={{backgroundColor: 'grey'}} onPressIn={addNewItem}>
                    <Text style={{fontSize: 20, color:"#900", fontWeight:'bold', width:'100%'}}>+   Create New team</Text>
                </Pressable>
                <ScrollView contentContainerStyle={styles.subview2}>
                    {datos.map((item) => (
                        <View key={item.id} style={styles.row}>
                            <Text style={{fontSize: 20}} key={item.id}>{item.name}</Text>
                        </View>
                    ))}
                </ScrollView>
            </View>
            <View style={styles.staticContainer}>
                    <DownBar>
                        <Link to={{ pathname: '/escenas'}}>
                            <Icon name="film" size={25} color="#900"/>
                        </Link>
                        <Icon name="group" size={25} color="#900" />
                        <Icon name="user" size={25} color="#900" />
                        <Link to={{ pathname: '/settings'}}>
                            <Icon name="cog" size={25} color="#900" />
                        </Link>
                    </DownBar>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    row: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    width: '100%',
    borderBottomColor: 'gray',
    
  },
    staticContainer: {
      height: 100
    },
    subview1: {
      backgroundColor: 'red',
    },
    subview2: {
      flex: 1,
      width: 393,
    },
    item: {
      height: 50,
      borderBottomWidth: 1,
      borderBottomColor: 'gray',
      justifyContent: 'center',
      paddingHorizontal: 16,
    },
    subview3: {
      backgroundColor: 'blue',
    },
  });

export default Teams;
