import { Alert, SafeAreaView, TouchableOpacity } from "react-native";
import { Text } from "react-native-paper";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import {Menu, MenuTrigger, MenuOption, MenuOptions, MenuProvider} from "react-native-popup-menu";
import Icon from 'react-native-vector-icons/Entypo';
import AsyncStorage from "@react-native-async-storage/async-storage";

export const DetailHeader = ({ navigation }) => {
    const handleMenuSelect = option => {
      if (option==="Edit") {
        navigation.navigate("Edit");
      }else {
        Alert.alert("Warning", "Are you sure you want to remove this service? This operation cannot be returned", [{
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {text: 'OK', onPress: () => {

        }}
      ])
      }
    };
  
    return (
      <MenuProvider>
        <Menu onSelect={value => handleMenuSelect(value)}>
          <MenuTrigger>
            <Text style={{marginTop: 16, marginRight: 10}}><Icon name="dots-three-vertical" size={25} color="#fff"/></Text>
          </MenuTrigger>
          <MenuOptions optionsContainerStyle={{marginRight: 50}}>
            <MenuOption value="Edit" text="Edit"/>
            <MenuOption value="Delete" text="Delete"/>
          </MenuOptions>
        </Menu>
      </MenuProvider>
    );
  };

const Detail = ({route}) => {
    const {service} =route.params;
    const {_id}=service;
    const saveId = async(_id) =>{
      try {
          await AsyncStorage.setItem('id', JSON.stringify(_id))
        } catch (error) {
          console.error(error);
        }
    }
    const [data, setData] = useState([]);
    const filePath = "https://kami-backend-5rs0.onrender.com/services/"+_id;
    
    const authToken = async () =>{
      try {
        const value = await AsyncStorage.getItem('token');
        if (value !== null) {
            return JSON.parse(value);
        }
      } catch (error) {
          console.log(error);
      }
    };
    useEffect(() =>{
        axios.get(filePath)
        .then(response =>{
            setData(response.data);
        })
        .catch(error => {
            console.error(error);
        })
    },[]);
    const deleteService = () =>{
        axios.delete(filePath,{
            headers: {
                Authorization: `Bearer ${authToken}`
            }
            .then(() =>{
                Alert.alert("Delete successfully")
            })
            .catch(error => {
                console.error(error);
            })
        })
    }
    return (
        <SafeAreaView>
            <Text>Service name: {data.name}</Text>
            <Text>Price: {data.price}</Text>
            <Text>Creator: {data.user && data.user.name}</Text>
            <Text>Time: {moment(data.createdAt).format('MM-DD-YYYY, h:mm:ss a')}</Text>
            <Text>Final update: {moment(data.updatedAt).format('MM-DD-YYYY, h:mm:ss a')}</Text>
        </SafeAreaView>
    )
}

export default Detail;