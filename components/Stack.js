import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import ButtonView from "./ButtonView";
import Suggestion from "./Suggestion";
import { lightgreen, white } from "../utils/color";

const views = { 
    Home: {        
        screen: ButtonView,
        navigationOptions: {
            header: null
        }
    },
    Suggestion: {
        screen: Suggestion,
        navigationOptions: {
            headerTintColor: white,
            headerStyle: {
                backgroundColor: lightgreen,
            }    
        }
        
    }
}

const stack = createStackNavigator(views)

export default createAppContainer(stack)