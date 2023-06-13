import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import axios from 'axios';

export default function ResetPassword() {
  const [usuario, setUsuario] = useState('');
  const [palabrareservada, setPalabrareservada] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:3000/api/usuarios/${usuario}`);
      console.log(response.data);

      if (response.data && response.data.usuario === usuario && response.data.palabrareservada === palabrareservada) {
        try {
          const updateResponse = await axios.put(`http://127.0.0.1:3000/api/usuarios/${response.data._id}`, {
            usuario: response.data.usuario,
            nombre: response.data.nombre,
            contrasena: contrasena,
            role: response.data.role,
            palabrareservada: response.data.palabrareservada
          });
          console.log(updateResponse.data);
          setMessage('Contraseña restablecida exitosamente');
        } catch (error) {
          console.error(error);
          setMessage('Error al restablecer la contraseña');
        }
      } else {
        setMessage('Usuario o palabra reservada inválida');
      }
    } catch (error) {
      console.error(error);
      setMessage('Oops! Ha ocurrido un error');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={{ color: 'black', fontSize: 25, fontWeight: 'bold', textTransform: 'capitalize' }}>Recuperar Contraseña</Text>
      <TextInput
        label="Username"
        value={usuario}
        onChangeText={(text) => setUsuario(text)}
        style={styles.input}
      />
      <TextInput
        label="Keyword"
        value={palabrareservada}
        onChangeText={(text) => setPalabrareservada(text)}
        style={styles.input}
      />
      <TextInput
        label="New Password"
        value={contrasena}
        onChangeText={(text) => setContrasena(text)}
        secureTextEntry
        style={styles.input}
      />
      <Button  mode="contained" textColor='white'  buttonColor='#2A4061' onPress={handleResetPassword}>Restablecer contraseña</Button>
      <Text>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    marginVertical: 10,
    width: 250,
  },
});
