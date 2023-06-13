import { Button, TextInput } from 'react-native-paper'
import { StyleSheet, Text, View } from 'react-native';
import { useState, useEffect } from 'react';
import useRegistroVehiculos from '../hooks/useRegistroVehiculos';

import { useForm, Controller } from "react-hook-form";
import React from "react";
import axios from 'axios';



export default function Login({ navigation }) {

    const { user, setUser } = useRegistroVehiculos();

    const [errormessage, setErrorMessage] = useState('');
    const [message, setMessage] = useState('');

    const { control, handleSubmit, formState: { errors }, reset } = useForm({
        defaultValues: {
            usuario: '',
            contrasena: ''
        }
    });

    const onSubmit = data => console.log(data)


    const onSearch = async (data) => {
        console.log(data)

        try {
            const response = await axios.get(`http://127.0.0.1:3000/api/usuarios/${data.usuario}`);
            if (response.data.usuario === data.usuario && response.data.contrasena === data.contrasena) { // Encuentra el usuario 
                
                if (response.data.role === "1") {
                    //navigation.navigate(/*devolucion de vehiculos o lista de vehiculos*/)

                    console.log("User");
                    setUser(false);
                    reset();
                    navigation.navigate('vehiculoDisponible');
                }
                else if (response.data.role === "2") {
                    //navigation.navigate(/* renta de vehiculo*/)
                    console.log("Admin");
                    setUser(true);
                    reset();
                    navigation.navigate('vehiculoDisponible');
                }

                setErrorMessage(false);
                setMessage('');
            }
            else {
                setErrorMessage(true);
                setMessage("Usuario no encontrado",
                    console.log("Usuario no encontrado"));
                setTimeout(() => {
                    setMessage('');
                }, 2000)

            }
        } catch (error) {
            console.log(error)
            alert(error)
        }
        finally {
            //setLoading(false); 
        }
    };


    return (
        <View style={styles.container} >
            <Text style={{ marginBottom: 10, fontSize: 25, fontWeight: 'bold' }}>Inicio de Sesión</Text>
            <Text style={{ color: 'red' }}>{setErrorMessage}</Text>
            <Text style={{ color: 'gray' }}>{setMessage} </Text>




            {/*usuario */}
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
                name="usuario"
            />
            {errors.usuario?.type === 'required' && <Text>Este Campo es Obligatorio</Text>}
            {errors.usuario?.type === 'pattern' && <Text>Escriba un Nombre solo con Letras y Espacios</Text>}



            {/*contrasena */}
            <Controller
                control={control}
                rules={{
                    required: true,
                    pattern: /(?=.*\d)(?=.*[A-Za-zÁÉÍÓÚáéíóúñÑ])[A-Za-zÁÉÍÓÚáéíóúñÑ0-9]+/g
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        placeholder="Contraseña"
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        secureTextEntry
                        style={{ marginTop: 10 }}
                        left={<TextInput.Icon icon="key" />}
                    />
                )}
                name="contrasena"
            />
            {errors.contrasena?.type === "required" && <Text>Este Campo es Obligatorio</Text>}
            {errors.contrasena?.type === "pattern" && <Text>El Password Debe contener  números y letras</Text>}



            <Button
                icon="door"
                mode="contained"
                buttonColor='#2A4061'
                textColor='white'
                onPress={handleSubmit(onSearch)}
                style={{ marginTop: 10, width: 250 }}
            >
                Ingresar
            </Button>

            <Button style={{ marginTop: 10, width: 250 }} onPress={() => { navigation.navigate('registroUsuario') }} buttonColor='#4B73AD' textColor='white' icon="car-arrow-right">Registrar</Button>
            <Button style={{ marginTop: 10, width: 250 }} onPress={() => { navigation.navigate('ResetPassword') }} buttonColor='#6094E0' textColor='white' icon="help">Recuperar Contraseña</Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
});