import React, { Component } from "react";
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, Image } from "react-native";
import { white, lightgreen } from "../utils/color";
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Foundation } from '@expo/vector-icons'
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';


class ButtonView extends Component {

    state = {
        coords: null,
        status: 'undetermined',
      }

    componentDidMount () {
        Permissions.getAsync(Permissions.LOCATION)
          .then(({ status }) => {            
            if (status === 'granted') {
              return this.setLocation()
              
            }
            this.setState(() => ({ status }))
        })
          .catch((error) => {
            console.warn('Error getting Location permission: ', error)
    
            this.setState(() => ({ status: 'undetermined' }))
        })
    }

    askPermission = () => {
        Permissions.askAsync(Permissions.LOCATION)
          .then(({ status }) => {
            
            if (status === 'granted') {
              return this.setLocation()
            }
    
            this.setState(() => ({ status }))
          })
          .catch((error) => console.warn('error asking Location permission: ', error))
    }

    setLocation = () => {
        
        Location.watchPositionAsync({
          enableHighAccuracy: true,
        }, ({ coords }) => {       
          this.setState(() => ({
            coords,
            status: 'granted',
          }))
        })
    }

    onPress = () => {
        const { coords } = this.state
        this.props.navigation.navigate('Suggestion',{lat: coords.latitude, lon: coords.longitude})
    }

    render() {

        const { status } = this.state        

        if (status === 'denied') {
            return (
              <View style={styles.center}>
                <Foundation name='alert' size={50} />
                <Text>
                  لقد رفضت تحديد موقعك. يمكنك إصلاح ذلك من خلال زيارة الإعدادات الخاصة بك وتمكين خدمات الموقع لهذا التطبيق
                </Text>
              </View>
            )
        }

        if (status === 'undetermined') {
            return (
              <View style={styles.container}>
                <Foundation name='alert' size={50} />
                <Text>
                  تحتاج تمكين خدمات الموقع للتطبيق
                </Text>
                <TouchableOpacity style={styles.butn} onPress={this.askPermission}>
                  <Text style={styles.textbutn}>
                    تفيعل
                  </Text>
                </TouchableOpacity>
              </View>
            )
        }

        return(          
            <View style={styles.container}>
                <Image style={styles.backgroundImage} source={require('../assets/map.png')}/>
                    <MaterialCommunityIcons
                        name={'food-fork-drink'}
                        size={200}
                    />
                    <Text style={styles.text}>وين ناكل؟</Text>
                    <TouchableOpacity style={styles.butn} onPress={this.onPress}>
                        <Text style={styles.textbutn}>اقترح</Text>    
                    </TouchableOpacity>                                    
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: lightgreen,
        justifyContent: 'center',
        alignItems: 'center'
    },
    backgroundImage:{
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        opacity: 0.3,
    },
    text: {
        fontSize: 50,
        marginTop: 20,
        marginBottom: 20,
    },
    butn: {
        height: 50,
        backgroundColor: white,
        borderRadius: 9,
        width: '60%',
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textbutn: {
        fontSize: 30,
        color: lightgreen,
    }
})

export default ButtonView