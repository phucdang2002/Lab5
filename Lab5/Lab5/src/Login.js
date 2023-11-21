import axios from 'axios';
import {SafeAreaView, TextInput, StyleSheet, View, Alert} from 'react-native';
import {Text, Button, Provider} from 'react-native-paper';
import {useState} from 'react';
import Add from './AddService';
import Home from './Home';
import Detail from './ServiceDetail';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DetailHeader } from './ServiceDetail';
import Edit from './EditService';


const Stack = createStackNavigator();
const Login = ({navigation}) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const authentication = () => {
    const filePath = 'https://kami-backend-5rs0.onrender.com/auth';
    const auth = {
      phone: phone,
      password: password,
    };
    console.log(auth);
    axios.post(filePath, auth)
      .then(response => {
        navigation.navigate('Screen', {user: response.data});
      })
      .catch(error => {
        console.error(error);
      });
  };
  return (
    <SafeAreaView style={styles.login}>
      <Text variant="displayMedium" style={styles.label}>
        Login
      </Text>
      <TextInput
        style={styles.textField}
        placeholder="Phone"
        keyboardType="numeric"
        onChangeText={text => setPhone(text)}></TextInput>
      <TextInput
        style={styles.textField}
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}></TextInput>
      <Button
        mode="contained"
        style={styles.btnLogin}
        onPress={authentication}
        textColor="#fff">
        Login
      </Button>
    </SafeAreaView>
  );
};
const saveToken = async(token) =>{
    try {
        await AsyncStorage.setItem('token', JSON.stringify(token))
      } catch (error) {
        console.error(error);
      }
  }
export const ServiceScreen = ({route}) => {
  const auth = route.params;
  const {user} = auth;
  const {name, token} = user;
  saveToken(token);
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTintColor: '#fff',
        headerStyle: {backgroundColor: '#EF506B'},
      }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{title: name.toUpperCase()}}
      />
      <Stack.Screen name="Add" component={Add} options={{title: 'Service'}} />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{
          title: 'Service Detail',
          headerRight: ({ navigation }) => (
          <DetailHeader navigation={navigation} />)
        }}
      />
      {/* <Stack.Screen name="Edit" component={Edit} options={{title: 'Service'}} /> */}
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  login: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  label: {
    color: '#EF506B',
    fontWeight: 'bold',
    marginBottom: 30,
  },
  textField: {
    margin: 5,
    padding: 10,
    textAlign: 'left',
    borderColor: '#b5b5b5',
    borderWidth: 1,
    borderRadius: 10,
    width: 300,
  },
  btnLogin: {
    backgroundColor: '#EF506B',
    width: 300,
    height: 50,
    borderRadius: 10,
    
    marginTop: 30,
    fontSize: 30,
  },
  txtLogin: {
    color: '#fff',

    lineHeight: 50,
    fontWeight: 'bold',
  },
});
export default Login;
