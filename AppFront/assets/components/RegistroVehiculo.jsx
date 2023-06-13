import React, { useState } from "react";
import { TextInput, Button, Switch } from "react-native-paper";
//import { CheckBox, Switch  } from "react-native-elements";
import { useForm, Controller } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";
const Swal = require("sweetalert2");

export default function RegistroVehiculo() {
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");
  const [idsearch, setIdsearch] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [vehicleId, setVehicleId] = useState("");

  const {control,handleSubmit,formState: { errors },
    reset,
    setValue,
  } = useForm({
    defaultValues: {
        placa: "",
      marca: "",
      estado: "",
      valordiario: "",
    },
  });

  const resetFields = () => {
    reset({
      idsearch: "",
      marca: "",
      estado: "",
      valordiario: "",
    });
  };



  const onSubmit = async (data) => {
    const { placa, marca, estado, valordiario } = data;
    
    try {
        const response = await axios.get(
          `http://127.0.0.1:3000/api/carros/${idsearch}`
        );
        const vehicleData = response.data;
        setSearchResult(vehicleData);
        if (vehicleData){

            Swal.fire({
                icon: "error",
                title: "Vehículo ya registrado!",
                showConfirmButton: false,
                timer: 2500,
              });
        } else{
            try {
                const response = await axios.post(`http://127.0.0.1:3000/api/carros`, {
                  placa,
                  marca,
                  estado,
                  valordiario,
                });
                
                Swal.fire({
                  icon: "success",
                  title: "Vehiculo registrado exitosamente!",
                  showConfirmButton: false,
                  timer: 1500,
                });
              } catch (error) {
                console.log(error);
              } finally {
                reset();
              }
        }    

  } catch (error) {
        console.log(error);
    } finally {
        reset();
    }
  };

  const searchVehicle = async () => {
    console.log(idsearch)
    try {
      const response = await axios.get(
        `http://127.0.0.1:3000/api/carros/${idsearch}`
      );
      const vehicleData = response.data;
      setSearchResult(vehicleData);
      if (vehicleData) {
        setValue("placa", vehicleData.placa);
        setValue("marca", vehicleData.marca);
        setValue("estado", vehicleData.estado);
        setValue("valordiario", vehicleData.valordiario);
        // Obtener el id del vehículo
        const vehicleId = vehicleData._id;
        setVehicleId(vehicleId)
        console.log(vehicleId);
      } else {
        setIsError(true);
        setMessage("No se encontró ningún vehículo con esa placa.");
      }
    } catch (error) {
      console.log(error);
      setIsError(true);
      setMessage("Ocurrió un error al buscar el vehículo.");
    }
  };

  const editVehicle = async (data) => {
    const { placa, marca, estado, valordiario } = data;
    
    try {
      const response = await axios.put(`http://127.0.0.1:3000/api/carros/${vehicleId}`, {
          placa,
          marca,
          estado,
          valordiario,
        });
        console.log(vehicleId)
      Swal.fire({
        icon: "success",
        title: "Vehiculo actualizado exitosamente!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
    } finally {
        reset();
    }
  };

  return (
    <View style={styles.container}>
        <Controller
        control={control}
        rules={{ required: true,
          minLenght: 6,
          maxLength:6,
          pattern:/[A-Z]{3}[0-9]{3}/g}}
        render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
            label="Número de Placa"
            mode="outlined"
            left={<TextInput.Icon name="account" />}
            onChangeText={(value) => {
            setIdsearch(value);
            setValue("placa", value);
            }}
            value={idsearch}
        />
        )}
        name="placa"
      />
      {errors.placa && (
        
        <Text style={{ color: "red" }}>La placa del vehiculo es obligatoria.</Text>
      )}
      {errors.placa?.type==="required" && <Text>Este Campo es Obligatorio</Text>}
    {errors.placa?.type==="pattern" && <Text>La placa debe tener 3 letras mayúsculas y 3 números ejm :"DDD-123"</Text>}
    {errors.placa?.type==="maxLength" && <Text>La placa tiene máximo 6 caracteres </Text>}
    {errors.placa?.type==="minLenght" && <Text>La placa tiene mínimo 6 caracteres </Text>}

      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Marca"
            mode="outlined"
            left={<TextInput.Icon name="account" />}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="marca"
      />
      {errors.marca && (
        <Text style={{ color: "red" }}>La marca del vehiculo es obligatoria.</Text>
      )}

      <Controller
        control={control}
        //rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <Switch
            title="Activo"
            //checked={value}
            //mode="outlined"
            //status={value ? "checked" : "unchecked"}
            //left={<TextInput.Icon name="account" />}
            //onPress={() => onChange(!value)}
            onBlur={onBlur}
            //onChangeText={onChange}
            //value={value}
            value={value}
             onValueChange={onChange}
             color="blue"
          />
        )}
        name="estado"
      />
      {errors.estado && (
        <Text style={{ color: "red" }}>
          Es indispensable indicar la disponibilidad del vehiculo.
        </Text>
      )}

      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Costo de Renta Diario"
            mode="outlined"
            left={<TextInput.Icon name="account" />}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            keyboardType="numeric"
          />
        )}
        name="valordiario"
      />
      {errors.valordiario && (
        <Text style={{ color: "red" }}>
          Indique cual será el costo de renta por día.
        </Text>
      )}

      <Button
        icon="view-list"
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        style={{ backgroundColor: "#2A4061", marginTop: "10px" }}
      >
        Agregar
      </Button>

      <Button
        icon="magnify"
        mode="contained"
        onPress={searchVehicle}
        style={{ backgroundColor:"#6094E0", marginTop: 10 }}
      >
        Buscar Vehículo
      </Button>

      {searchResult && (
        <Button
          icon="pencil"
          mode="contained"
          onPress={handleSubmit(editVehicle)}
          style={{marginTop: 10 }}
        >
          Editar Vehículo
        </Button>

      )}

    <Button
    icon="delete"
    mode="contained"
    onPress={resetFields}
    style={{ backgroundColor: "#475161", marginTop: 10 }}
    >
    Borrar Campos
    </Button>

      {isError && <Text style={{ color: "red" }}>{message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center"
  },
});
