import { createStackNavigator } from "@react-navigation/stack";
import Login from "./src/Login";
import { NavigationContainer } from "@react-navigation/native";
import { ServiceScreen } from "./src/Login";

const Stack = createStackNavigator();

function LoginScreen() {
  return(
    <Stack.Navigator initialRouteName="Login" screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login}/>
      <Stack.Screen name="Screen" component={ServiceScreen}/>
    </Stack.Navigator>
  )
  
}

function App() {
  return(
      <NavigationContainer>
        <LoginScreen/>
      </NavigationContainer>
  );
}
export default App;
