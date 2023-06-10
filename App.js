import React, {Component} from "react"
import {View, Text, Image, TextInput} from "react-native"
import TransitionScreen from "./screens/transitionScreen"
import BottomTabNavigator from "./components/bottomTabNavigator"

export default class App extends Component{
  render(){
    return <BottomTabNavigator/>
  }
}