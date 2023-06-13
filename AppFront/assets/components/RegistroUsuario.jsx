import { StyleSheet, Text, FlatList, SafeAreaView, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importar el metodo para generar el bottom tabs
import axios from 'axios'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import React from "react";
import { useState } from 'react';
import { useForm, Controller } from "react-hook-form";

const RegistroUsuario = ({ navigation }) => {

    const [alerta, setAlerta] = useState("");
    const [messages, setMessage] = useState("");
    const [idSearch, setIdSearch] = useState('');
    const [errormessage, setErrorMessage] = useState('');

    const onSearch = async (data) => {
        console.log(data);
        if (data.password != data.passwordRep) {
            setErrorMessage("Las contraseñas no son iguales");
            setTimeout(() => {
                setErrorMessage('')
            }, 2000);
            return
        }

        try {
            const response = await axios.get(`http://127.0.0.1:3000/api/usuarios/${data.username}`);

            console.log(response.data);
            if (response.data != null) {

                setErrorMessage('Este usuario ya existe por favor intente con otro nombre')
                setTimeout(() => {
                    setErrorMessage('')
                }, 2000);
                return
            }



            onSave(data)

        }

        catch (error) {
            console.log(error)
        }


    }



    const onSave = async (data) => {

        const { username, name, password, passwordRep, palabrareservada } = data

        try {
            const response = await axios.post(`http://127.0.0.1:3000/api/usuarios
          `, {

                usuario: username,
                nombre: name,
                role: '1',
                contrasena: password,
                palabrareservada: palabrareservada,



            });

            setAlerta("Usuario agregado correctamente ...");

            setTimeout(() => {
                setAlerta('');
                reset();
                navigation.navigate('login');
            }, 2000);


        } catch (error) {
            console.log(error)
        }
        finally {
            //setLoading(false);
        }
    }

    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            username: '',
            name: '',
            rol: '1',
            palabrareservada: '',
            password: '',
            passwordRep: ''
        }
    });


    return (

        <View style={styles.container}>
            <Text style={{ color: 'black', fontSize: 25, fontWeight: 'bold', textTransform: 'capitalize' }}>Registrate</Text>
            <Text style={{ color: 'red', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase' }}>{errormessage}</Text>
            <Text style={{ color: 'green', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase' }}>{alerta}</Text>

            {/*UserName */}
            <Controller
                control={control}
                rules={{
                    required: true,
                    pattern: /^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9]+$/g
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        placeholder="Username"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        style={{ marginTop: 10 }}
                        left={<TextInput.Icon icon="account" />}
                    />
                )}
                name="username"
            />
            {errors.username?.type === 'required' && <Text>Este Campo es Obligatorio</Text>}
            {errors.username?.type === 'pattern' && <Text>Escribe un nombre de usuario solo con letras y numeros</Text>}

            {/*Name */}
            <Controller
                control={control}
                rules={{
                    required: true,
                    pattern: /^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        placeholder="Name"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        style={{ marginTop: 10 }}
                        left={<TextInput.Icon icon="nature-people" />}
                    />
                )}
                name="name"
            />
            {errors.name?.type === 'required' && <Text>Este Campo es Obligatorio</Text>}
            {errors.name?.type === 'pattern' && <Text>Escriba un Nombre solo con Letras y Espacios</Text>}


            {/*Palabra Reservada */}
            <Controller
                control={control}
                rules={{
                    required: true,
                    pattern: /^[A-Za-zÁÉÍÓÚáéíóúñÑ0-9]+$/g
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        placeholder="Palabra Reservada"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        style={{ marginTop: 10 }}
                        left={<TextInput.Icon icon="security" />}
                    />
                )}
                name="palabrareservada"
            />
            {errors.palabrareservada?.type === 'required' && <Text>Este Campo es Obligatorio</Text>}
            {errors.palabrareservada?.type === 'pattern' && <Text>Escriba una palabra reservada solo con letras y numeros</Text>}

            {/*Password*/}

            <Controller
                control={control}
                rules={{
                    maxLength: 100,
                    required: true,
                    pattern: /(?=.*\d)(?=.*[A-Za-zÁÉÍÓÚáéíóúñÑ])[A-Za-zÁÉÍÓÚáéíóúñÑ0-9]+/g

                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        placeholder="Password"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        style={{ marginTop: 10 }}
                        secureTextEntry
                        left={<TextInput.Icon icon="key" />}

                    />
                )}
                name="password"
            />
            {errors.password?.type === "required" && <Text>Este Campo es Obligatorio</Text>}
            {errors.password?.type === "pattern" && <Text>El Password Debe contener  números y letras</Text>}


            {/* Repetir Password*/}

            <Controller
                control={control}
                rules={{
                    maxLength: 100,
                    required: true,
                    pattern: /(?=.*\d)(?=.*[A-Za-zÁÉÍÓÚáéíóúñÑ])[A-Za-zÁÉÍÓÚáéíóúñÑ0-9]+/g
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        placeholder="Repite tu Password"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        style={{ marginTop: 10 }}
                        secureTextEntry
                        left={<TextInput.Icon icon="key" />}
                    />
                )}
                name="passwordRep"
            />
            {errors.passwordRep?.type === "required" && <Text>Este Campo es Obligatorio</Text>}
            {errors.passwordRep?.type === "pattern" && <Text>El Password debe contener  números y letras</Text>}


            {/* */}

            <Button
                buttonColor='#2A4061'
                textColor='white'
                mode="contained"
                title="Submit"
                icon='car-convertible'
                onPress={handleSubmit(onSearch)}
                style={
                styles.button}
       
            >
                Enviar
            </Button>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
      marginTop: 10,
      width: 300,
      transitionProperty: 'background-color',
      transitionDuration: '0.3s',
    },
    buttonText: {
      color: 'white',
    },
  });
export default RegistroUsuario