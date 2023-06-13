import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import axios from 'axios';

const DevolucionVehiculo = () => {
  const [fechafinal, setFechaFinal] = useState('');
  const [estado, setEstado] = useState('');
  const [placa, setPlaca] = useState('');

  const handleDevolucion = async () => {
    try {
      const response = await axios.get(`http://127.0.0.1:3000/api/carros/${placa}`);
      console.log(response.data);

      if ( response.data.placa === placa) {
        try {
          const updateResponse = await axios.put(`http://127.0.0.1:3000/api/carros/${response.data._id}` ,{                                  
            placa: response.data.placa,
            marca: response.data.marca,
            estado: true,
            valordiario:response.data.valordiario
          });
          console.log(updateResponse.data);
          console.log('Contraseña restablecida exitosamente');
        } catch (error) {
          console.error(error);
          console.log('Error al restablecer la contraseña');
        }
      } else {
        console.log('Usuario o palabra reservada inválida');
      }
    } catch (error) {
      console.error(error);
      
    }
  };

  return (
    <View style={styles.container}>
        <Text style={styles.label}>Placa del vehiculo</Text>
      <TextInput
        style={styles.input}
        onChangeText={setPlaca}
        value={placa}
        placeholder="Ingrese la placa"
      />
      <Text style={styles.label}>Fecha de Entrega:</Text>
      <TextInput
        style={styles.input}
        onChangeText={setFechaFinal}
        value={fechafinal}
        placeholder="Ingrese la fecha de entrega"
      />

      <Text style={styles.label}>Estado:</Text>
      <Text>{estado}</Text>

      

      <Button title="Devolución" onPress={handleDevolucion} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
});

export default DevolucionVehiculo;