import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Constants from "expo-constants";
import ButtonView from "./components/ButtonView";
import Stack from "./components/Stack";
import { lightgreen } from "./utils/color";

function MstatusBar({ backgroundColor, ...props }) {
  return(
    <View style={{ backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class App extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <MstatusBar backgroundColor={lightgreen} barStyle="light-content" />
        <Stack />
      </View>
    );  
  }
}
