import { Text, View } from 'react-native';
import { useState } from 'react';
import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

//AppContexProvider
import { AppContexProvider } from '../contex/AppContexProvider';
//estilos, pueden copiar la ruta en cada componente
import { styles } from '../styles/Style'
//useState global
import Disponibles from './Disponibles';
//componentes
import VehiculosDisponibles from './VehiculosDisponibles';
import RegistroVehiculo from './RegistroVehiculo';
import Login from './login';
import RentaVehiculo from './RentaVehiculo';
import DevolucionVehiculo from './DevolucionVehiculo';

const Tab = createBottomTabNavigator();

const Home = () => {

    const [registro, setRegistro] = useState(true);

    const onIdentificaRol = (rol) => {
        setRegistro(rol);
    }

    const selectRol = registro;

    return (
        <AppContexProvider >
            <Tab.Navigator
                initialRouteName='login'
                screenOptions={{
                    tabBarActiveTintColor: '#2A4061',
                    tabBarActiveBackgroundColor: '#A8C0E6',
                    tabBarInactiveTintColor: 'black',
                    headerShown: false
                }
                }
            >
                {/* componente se oculta cuando se inicia como rol administrador */}
                {!selectRol && (
                    <Tab.Screen name='rentaVehiculo' component={RentaVehiculo} options={{

                        title: 'Renta_Vehiculo', tabBarIcon: ({ color, size }) => (
                            <Ionicons name='car' color={color} size={30} />
                        ),
                        tabBarVisible: false, // Mostrar siempre la pestaña
                        headerShown: true, // Mostrar siempre el encabezado
                    }}
                    />
                )}

                {/* componente se oculta cuando se inicia como rol usuario */}
                {selectRol && (
                    <Tab.Screen name='devolucionVehiculo' component={DevolucionVehiculo} options={{

                        title: 'Devolución_Vehiculo', tabBarIcon: ({ color, size }) => (
                            <Ionicons name='car' color={color} size={30} />
                        ),
                        tabBarVisible: false, // Mostrar siempre la pestaña
                        headerShown: true, // Mostrar siempre el encabezado
                    }}
                    />
                )}


              
                <Tab.Screen name='vehiculoDisponible' component={() => (<VehiculosDisponibles
                    registro={registro}
                    onIdentificaRol={onIdentificaRol}
                />)} options={{
                    //tabBarStyle: { display: "none" },
                    title: 'Vehiculos_Disponibles', tabBarIcon: ({ color, size }) => (
                        <Ionicons name='people' color={color} size={30} />
                    ),
                    tabBarVisible: false, // Ocultar la pestaña si no es administrador
                    headerShown: true, // Ocultar el encabezado si no es administrador
                }}
                />
              

                <Tab.Screen name='RegistroVehiculo' component={RegistroVehiculo} options={{

                    title: 'Registro_Vehiculo', tabBarIcon: ({ color, size }) => (
                        <Ionicons name='car' color={color} size={30} />
                    ),
                    tabBarVisible: true, // Mostrar siempre la pestaña
                    headerShown: true, // Mostrar siempre el encabezado
                }}
                />


                <Tab.Screen name='login' component={Login} options={{
                    tabBarStyle: { display: "none" },
                    title: 'Cerrar sesión', tabBarIcon: ({ color, size }) => (
                        <Ionicons name='close' color={color} size={30} />
                    ),
                    tabBarVisible: false, // Mostrar siempre la pestaña
                    headerShown: false, // Mostrar siempre el encabezado
                }}

                />
           

               

            </Tab.Navigator>
        </AppContexProvider>
    )
}

export default Home;