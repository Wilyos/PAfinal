import { Text, View, Button } from 'react-native';
import React, { Component } from 'react';
//ruta de estilos
import { styles } from '../styles/Style';

//ruta de hook para utilizar useState user en este componente
import useRegistroVehiculos from '../hooks/useRegistroVehiculos';
import VehicleListScreen from './VehicleListScreen';
import Disponibles from './Disponibles';
//se esta pasando la funcion onIdentificaRol como prop, favor mantener la funcion
const VehiculosDisponibles = ({ onIdentificaRol }) => {

  // importación de useState, favor no borrar
  const { user } = useRegistroVehiculos()

  //condiciones para iniciar como usuario o administrador

  if (user) {
    onIdentificaRol(true);

   
  } else {
    onIdentificaRol(false);

    
  }



  return (
   <VehicleListScreen/>
  )

}

export default VehiculosDisponibles;