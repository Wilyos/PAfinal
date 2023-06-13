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
import { styles } from '../styles/Style';
import { DatePickerInput } from 'react-native-paper-dates';
import { SafeAreaProvider } from "react-native-safe-area-context";



const RentaVehiculo = ({ navigation }) => {
    const [errormessage, setErrorMessage] = useState('');
    const [alerta, setAlerta] = useState("");
    const [searchId,setIdSearch]=useState('');

    const onSearch = async (data) => {
      
      const {placa}=data
    
      console.log(placa)
      let fecha1= Date.parse(data.fechainicial)
      fecha1=new Date(fecha1)
   
      let fecha2=Date.parse(data.fechafinal)
      fecha2=new Date(fecha2)
     
      if (fecha1> fecha2) {
          setErrorMessage("La fecha Inicial debe ser anterior o igual la fecha de Devolución");
          setTimeout(() => {
              setErrorMessage('')
          }, 2000);
          return
      }

      try {
          const response = await axios.get(`http://127.0.0.1:3000/api/carros/${data.placa}`);
       
         if(response.data==null ){
          setErrorMessage('Este Auto No se encuentra disponible')
          setTimeout(() => {
              setErrorMessage('')
          }, 2000);
          return
         }

          if (response.data.estado == false) {
              setErrorMessage('Este Auto No se encuentra disponible')
              setTimeout(() => {
                  setErrorMessage('')
              }, 2000);
              return
          }
          onUpdate(response.data)
          onSubmit(data)

      }
      catch (error) {
          console.log(error)
      }




  }




  const onUpdate=async(data) => {
   
    const {_id,placa,marca,valordiario}=data
      
    
    try {
      const response2 = await axios.put(`http://127.0.0.1:3000/api/carros/${_id}`,{
      placa,
      marca,
      valordiario,
      estado:false
      });
      if(response2){
        console.log('CocheDesactivado')
      }
    } catch (error) {
      
    }
  }








    const onSubmit =async (data) => {
      const {placa, fechainicial,fechafinal} = data;
      
      const fecha = (Date.parse(fechainicial))
          let fechaLista=new Date(fecha)
          fechaLista=fechaLista.getDate()+"/"+fechaLista.getMonth()+"/"+fechaLista.getFullYear()

      const fecha2 = (Date.parse(fecha2))
      let fechaLista2=new Date(fechafinal)
      fechaLista2=fechaLista2.getDate()+"/"+fechaLista2.getMonth()+"/"+fechaLista2.getFullYear()
      
      
      try {
        const response = await axios.post(`http://127.0.0.1:3000/api/rentas
      `, {
          numerorenta:parseInt(toString(Math.floor(Math.random() * 10)) +toString(Math.floor(Math.random() * 10)) +toString(Math.floor(Math.random() * 10))),
          placa,
          fechainicial:fechaLista,
          fechafinal: fechaLista2,
          estado:true
        });
        console.log(response.numerorenta)
        setAlerta("Automovil Rentado ...");
        onUpdate();
        setTimeout(() => {
            setAlerta('');
            reset();
           //navigation.navigate('vehiculo');
        }, 2000);


    } catch (error) {
        console.log(error)
    }
    finally {
        //setLoading(false);
    }



 






    };
  
    const {
      control,
      handleSubmit,
      formState: { errors },
      reset,
    } = useForm({
      defaultValues: {
        numerorenta:'',
        placa: '',
        usuario: '',
        fechainicial: '',
        fechafinal: '',
        estado:true
      },
    });
  
    return (
      <View style={styles.container}>
        <Text>Número de Placa</Text>
        <Text style={{ color: 'red', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase' }}>{errormessage}</Text>
            <Text style={{ color: 'green', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase' }}>{alerta}</Text>
        <Controller
      control={control}
      rules={{
       required: true,
       minLenght: 6,
       maxLength:6,
       pattern:/[A-Z]{3}[0-9]{3}/g
      }}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          placeholder="Inserte Placa del Vehículo"
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          left={<TextInput.Icon icon="license" />}
          style={{marginTop:10}}
        />
      )}
      name="placa"
    />
    {errors.placa?.type==="required" && <Text>Este Campo es Obligatorio</Text>}
    {errors.placa?.type==="pattern" && <Text>La placa debe tener 3 letras mayúsculas y 3 números ejm :"DDD-123"</Text>}
    {errors.placa?.type==="maxLength" && <Text>La placa tiene máximo 6 caracteres </Text>}
    {errors.placa?.type==="minLenght" && <Text>La placa tiene mínimo 6 caracteres </Text>}


    <Text>Fecha Inicial</Text>
    <Controller
         control={control}
         rules={{
         required: true,
       
         }}
         render={({ field: { onChange, onBlur, value } }) => (

     <View 
     style={{marginTop:10}}>
     <SafeAreaProvider>
     <DatePickerInput
       locale="es"
       label="Date"
       value={value}
       onChange={onChange}
       inputMode="start"
     />
     </SafeAreaProvider>
     </View>
    
     )}
       name="fechainicial"
     />
     {errors.fechainicial?.type==="required" && <Text>Este Campo es Obligatorio</Text>}



    <Text>Fecha Final</Text>

    <Controller
         control={control}
         rules={{
         required: true,
       
         }}
         render={({ field: { onChange, onBlur, value } }) => (

     <View 
     style={{marginTop:10}}>

     <SafeAreaProvider>
     <DatePickerInput
       locale="es"
       label="Date"
       value={value}
       onChange={onChange}
       inputMode="start"
     />
     </SafeAreaProvider>
     </View>
    
     )}
       name="fechafinal"
     />
     {errors.fechafinal?.type==="required" && <Text>Este Campo es Obligatorio</Text>}










    {/*Boton*/}
    <Button style={{marginTop:10}} mode="contained" textColor='white'  buttonColor='#2A4061' onPress={handleSubmit(onSearch)}>Rentar</Button>
      
    <Button style={{ marginTop: 10, width: 250 }} onPress={() => { navigation.navigate('Vehículos Disponibles') }} buttonColor='#6094E0' textColor='white' icon="help">Ver los Autos Disponibles</Button>

      
      
      
      

      </View>


          


    );
  };
  
  
  export default RentaVehiculo;
  