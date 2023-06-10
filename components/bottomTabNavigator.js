import React,{Component} from "react"
import {NavigationContainer} from "@react-navigation/native"
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import {SafeAreaProvider} from "react-native-safe-area-context"
import TransitionScreen from "../screens/transitionScreen"
import SearchScreen from "../screens/searchScreen"
import Ionicons from "react-native-vector-icons/Ionicons"
const Tab = createBottomTabNavigator()

export default class BottomTabNavigator extends Component{
    render(){
        return(
            <SafeAreaProvider>
                <NavigationContainer>
                    <Tab.Navigator screenOptions={({route})=>({
                        tabBarIcon: ({focused, color, size})=>{
                            let iconName
                            if(route.name === "transition"){
                                iconName = "qr-code-sharp"
                            }
                            else if(route.name === "search"){
                                iconName = "search-sharp"
                            }
                            return(<Ionicons name = {iconName} size = {size} color={"#85BDA6"}/>)

                        }
                    })} 
                    tabBarOptions={{
                        activeTintColor: "#D8D8D8",
                        inactiveTintColor: "#534D56", 
                        labelStyle:{
                            fontSize: 15,
                            textDecorationLine: "underline"
                        },
                        tabStyle:{
                            backgroundColor: "#724CF9"
                        } 
                    }}>
                        <Tab.Screen name="transition" component={TransitionScreen}/>
                        <Tab.Screen name="search" component={SearchScreen}/>
                    </Tab.Navigator>
                </NavigationContainer>
            </SafeAreaProvider>
        )
    }
}