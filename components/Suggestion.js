import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from "react-native";
import  {getSeggestion} from "../utils/api";
import  Mapview,{Marker} from "react-native-maps";
import { FontAwesome } from '@expo/vector-icons'
import { lightgreen, lightPurp, green, white, gray } from "../utils/color";

class Suggestion extends Component {

    state = {
        result: '',
        loading: true,
    }

    async componentDidMount () {
        const { lat, lon } = this.props.navigation.state.params
        let result = await getSeggestion( lat, lon)
        console.log(result);
        this.setState({ result, loading: false })
    }

    onPress = () => {
        this.setState({loading: true})
        this.componentDidMount()
    }

    render() {
        const { name, lat, lon, cat, link } = this.state.result
        var marker = {
            latitude: Number(lat),
            longitude: Number(lon),
        }  
        
        var region = {
            latitude: Number(lat),
            longitude: Number(lon),
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
        }
        
        if (this.state.loading) {
            return(
                <View style={styles.loadcontainer}>
				    <Image 
                        source={require('../assets/think.gif')}
                        style={styles.img}
				    />
                    <Text style={styles.textload}>وشرايك في...</Text>
			    </View>
            )
        }

        return(
            <View>
                <Mapview loadingEnabled={true} region={region} style={styles.mapStyle}>
                    <View style={styles.container}>
                        <Text style={styles.text}>{name}</Text>
                        <Text style={[styles.text, {fontSize: 15}]}>{cat}</Text>
                    </View>
                    <Marker coordinate={marker} />
                    <TouchableOpacity style={styles.butn} onPress={this.onPress}>
                        <Text style={styles.textbutn}>اقتراح آخر</Text>
                    </TouchableOpacity>    
                </Mapview>                    
            </View>
        )
    }
}

const styles = StyleSheet.create({
    loadcontainer: {
        flex:1,
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: lightgreen 
    },
    container: {
        height:'30%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    butn: {
        height: 50,
        backgroundColor: lightgreen,
        borderRadius: 9,
        width: '60%',
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 25,
        color: green,
        marginBottom: 10,
        opacity: 1
    },
    mapStyle: {
        justifyContent: 'flex-start',
        alignItems: 'center',
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    textbutn: {
        fontSize: 20,
        color: white,
    },
    textload: {
        marginTop: 20,
        fontSize: 20,
        color: white,
    },
    img: {
		height: 300,
        width: 300,
        borderRadius: 20
	}
});

export default Suggestion