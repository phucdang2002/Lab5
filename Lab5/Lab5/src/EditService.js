import axios from "axios";
import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, TextInput } from "react-native";
import { Button, Text } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Edit = ({navigation}) =>{
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    
    async function authToken() {
        try {
            const value = await AsyncStorage.getItem('token');
            if (value !== null) {
                return JSON.parse(value);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const getId = async ()=> {
        try {
            const value = await AsyncStorage.getItem('id');
            if (value !== null) {
                return JSON.parse(value);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const getName = async () => {
        try {
            const value = await AsyncStorage.getItem('name');
            if (value !== null) {
                return JSON.parse(value);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const getPrice = async ()=> {
        try {
            const value = await AsyncStorage.getItem('price');
            if (value !== null) {
                return JSON.parse(value);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const editService = async ()=>{
        const _id = await getId();
        console.log(_id)
        console.log(name)
        console.log(price)
        const putData = {
            _id: _id,
            name: name,
            price: price
        };
        const filePath = 'https://kami-backend-5rs0.onrender.com/services/'+_id;
        axios.put(filePath, putData, {
            headers:{
                Authorization: `Bearer ${authToken}`,
            },
        })
        .then(response =>{
            console.log("Response: ", response.data);
            navigation.goBack();
        })
        .catch(error=>{
            console.error("Error: ", error);
        })
    }
    useEffect(() => {
        // Fetch data from AsyncStorage when component mounts
        async function fetchData() {
            const storedName = await getName();
            const storedPrice = await getPrice();

            // Set the retrieved values to the state
            if (storedName !== null) {
                setName(storedName);
            }
            if (storedPrice !== null) {
                setPrice(storedPrice);
            }
        }

        fetchData();
    }, []);
    return (
        <SafeAreaView style={styles.addView}>
            <Text variant="labelLarge">Service name</Text>
            <TextInput style={styles.textField} placeholder="Input a service name" onChangeText={(text)=>setName(text)} value={name} />
            <Text variant="labelLarge">Price</Text>
            <TextInput style={styles.textField} keyboardType="numeric"  onChangeText={(text)=>setPrice(text)} value={price}/>
            <Button mode="contained" style = {styles.btnAdd} onPress={editService}><Text style={styles.txtAdd}>Update</Text></Button>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    addView: {
        margin: 10,
    },
    btnAdd: {
        backgroundColor: "#EF506B",
        height: 50,
        borderRadius: 10,
        marginTop: 30
    },
    txtAdd: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold"
    },
    textField: {
        
        padding: 10,
        textAlign: "left",
        backgroundColor: "#ECECEC",
        borderRadius: 10,

    },
})
export default Edit;