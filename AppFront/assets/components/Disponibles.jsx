import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, ActivityIndicator } from "react-native";
import { List, Button, Divider } from "react-native-paper";
import { Controller, useForm } from "react-hook-form";

import axios from "axios";
const Swal = require("sweetalert2");

export default function Disponibles() {
  const [isLoading, setIsLoading] = useState(true);
  const [vehicleData, setVehicleData] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  const {
    control,
    handleSubmit,
    formState: { errors },
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

  const fetchVehicleData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3000/api/carros");
      const data = await response.json();
      let disponibles=Array.from(data)
      const otro=disponibles.filter(disponible=>disponible.estado==true)
      setVehicleData(otro);
      setTotalPages(Math.ceil(data.length / perPage));
      setIsLoading(false);
    } catch (error) {
      console.error("Error al obtener los vehículos:", error);
    }
  };

  useEffect(() => {
    fetchVehicleData();
  }, [page]);

  const onDelete = (item) => {
    console.log(item._id);
    console.log(item.placa);
    console.log(item.marca);
    Swal.fire({
      title: "Estas seguro?",
      text: `Se eliminará el vehiculo de placas: ${item.placa}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteVehicle(item._id);
      }
    });
  };

  const deleteVehicle = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:3000/api/carros/${id}`);
      console.log(`Vehículo con ID ${id} eliminado correctamente.`);
      // Actualizar la lista de vehículos después de eliminar
      const updatedVehicleData = vehicleData.filter((item) => item._id !== id);
      setVehicleData(updatedVehicleData);
      Swal.fire("Ya está!", "El vehiculo ha sido eliminado.", "success");
    } catch (error) {
      console.error("Error al eliminar el vehículo:", error);
    }
  };

  const renderVehicleItem = ({ item }) => (
   
    <React.Fragment>
      <View style={styles.rowContainer}>
        <View style={styles.column}>
          <List.Item
            title={`Placa: ${item.placa}`}
            description={`Marca: ${item.marca}\nEstado: ${item.estado ? "Activo" : "Inactivo"}\nCosto de Renta Diario: $${item.costoRenta}`}
            style={styles.vehicleItem}
          />
        </View>
        <View style={styles.column}>
          <Button icon="delete" onPress={() => onDelete(item)}>
            Eliminar
          </Button>
        </View>
      </View>
      <Divider />
    </React.Fragment>
  );


  const loadNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const loadPreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const refreshList = () => {
    setIsLoading(true);
    fetchVehicleData();
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  const isFirstPage = page === 1;
  const isLastPage = page === totalPages;

  return (
    <View style={styles.container}>
      <FlatList
        data={vehicleData.slice((page - 1) * perPage, page * perPage)}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderVehicleItem}
        ItemSeparatorComponent={Divider}
      />
      <View style={styles.paginationContainer}>
        {!isFirstPage && (
          <Button
            mode="contained"
            onPress={loadPreviousPage}
            style={styles.paginationButton}
          >
            Anterior
          </Button>
        )}
        {!isLastPage && (
          <Button
            mode="contained"
            onPress={loadNextPage}
            style={styles.paginationButton}
          >
            Siguiente
          </Button>
        )}
      </View>
      <Button
        icon="update"
        onPress={refreshList}
        style={styles.refreshButton}
      >
        Actualizar
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  paginationButton: {
    marginHorizontal: 8,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  column: {
    flex: 1,
  },
  vehicleItem: {
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  deleteButton: {
    marginLeft: "auto",
  },
  deleteButtonLabel: {
    color: "red",
  },
  refreshButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
  },
});