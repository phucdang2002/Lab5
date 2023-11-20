import { Alert, SafeAreaView } from "react-native";
import { Text } from "react-native-paper";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import {} from "react-native-popup-menu"

const Detail = ({route}) => {
    const {service} =route.params;
    const {_id}=service;
    const [data, setData] = useState([]);
    const filePath = "https://kami-backend-5rs0.onrender.com/services/"+_id;
    const authToken = "";
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
                Authorization: `Beared ${authToken}`
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